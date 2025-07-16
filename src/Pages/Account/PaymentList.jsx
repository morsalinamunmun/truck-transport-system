import axios from "axios";
import { useEffect, useState } from "react";
import { FaFilter, FaUserSecret } from "react-icons/fa6";
import { InputField } from "../../components/Form/FormFields";
import { FormProvider, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import BtnSubmit from "../../components/Button/BtnSubmit";
import useRefId from "../../hooks/useRef";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFileExcel, FaFilePdf, FaPrint } from "react-icons/fa";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const PaymentList = () => {
  const generateRefId = useRefId();
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // search
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/payment/list`)
      .then((response) => {
        if (response.data.status === "Success") {
          setPayment(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payment data:", error);
        setLoading(false);
      });
  }, []);
  // Filter by date
  const filteredPayment = payment.filter((trip) => {
    const tripDate = new Date(trip.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return tripDate >= start && tripDate <= end;
    } else if (start) {
      return tripDate.toDateString() === start.toDateString();
    } else {
      return true;
    }
  });
  // search
  const filteredPaymentList = filteredPayment.filter((dt) => {
    const term = searchTerm.toLowerCase();
    return (
      dt.date?.toLowerCase().includes(term) ||
      dt.item_name?.toLowerCase().includes(term) ||
      dt.supplier_name?.toLowerCase().includes(term) ||
      dt.purchase_id?.toLowerCase().includes(term) ||
      dt.category?.toLowerCase().includes(term) ||
      dt.quantity?.toLowerCase().includes(term) ||
      dt.unit_price?.toLowerCase().includes(term) ||
      dt.total?.toLowerCase().includes(term) ||
      dt.due_amount?.toLowerCase().includes(term) ||
      dt.pay_amount?.toLowerCase().includes(term) ||
      dt.branch_name?.toLowerCase().includes(term)
    );
  });
  

  // excel
  const exportToExcel = () => {
    const exportData = filteredPaymentList.map((dt, index) => ({
      SL: index + 1,
      Date: dt.date,
      SupplierName: dt.supplier_name,
      Category: dt.category,
      ItemName: dt.item_name,
      Quantity: dt.quantity,
      UnitPrice: dt.unit_price,
      TotalAmount: dt.total,
      PayAmount: dt.pay_amount,
      DueAmount: parseFloat(dt.total) - parseFloat(dt.pay_amount),
      Status:
        parseFloat(dt.pay_amount) === 0
          ? "Unpaid"
          : parseFloat(dt.pay_amount) >= parseFloat(dt.total)
          ? "Paid"
          : "Partial",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, "PaymentReport.xlsx");
  };
  // pdf
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "SL",
      "Date",
      "Supplier Name",
      "Category",
      "Item Name",
      "Qty",
      "Unit Price",
      "Total",
      "Paid",
      "Due",
      "Status",
    ];

    const tableRows = filteredPaymentList.map((dt, index) => [
      index + 1,
      dt.date,
      dt.supplier_name,
      dt.category,
      dt.item_name,
      dt.quantity,
      dt.unit_price,
      dt.total,
      dt.pay_amount,
      parseFloat(dt.total) - parseFloat(dt.pay_amount),
      parseFloat(dt.pay_amount) === 0
        ? "Unpaid"
        : parseFloat(dt.pay_amount) >= parseFloat(dt.total)
        ? "Paid"
        : "Partial",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
    });

    doc.save("PaymentReport.pdf");
  };
  // handle print
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const tableRows = filteredPaymentList.map(
      (dt, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${dt.date}</td>
        <td>${dt.supplier_name}</td>
        <td>${dt.category}</td>
        <td>${dt.item_name}</td>
        <td>${dt.quantity}</td>
        <td>${dt.unit_price}</td>
        <td>${dt.total}</td>
        <td>${dt.pay_amount}</td>
        <td>${parseFloat(dt.total) - parseFloat(dt.pay_amount)}</td>
        <td>${
          parseFloat(dt.pay_amount) === 0
            ? "Unpaid"
            : parseFloat(dt.pay_amount) >= parseFloat(dt.total)
            ? "Paid"
            : "Partial"
        }</td>
      </tr>
    `
    );

    const htmlContent = `
    <html>
      <head>
        <title>Print Report</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 6px;
            text-align: left;
          }
          th {
            background-color: #11375B;
            color: white;
          }
        </style>
      </head>
      <body>
        <h3>Payment Report</h3>
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Date</th>
              <th>Supplier Name</th>
              <th>Category</th>
              <th>Item Name</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Due</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows.join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };
  // onsubmit
  const onSubmit = async (data) => {
    const refId = generateRefId();
    if (!data.pay_amount || isNaN(data.pay_amount)) {
      toast.error("Invalid payment amount", { position: "top-right" });
      return;
    }
    if (data.pay_amount > data.due_amount) {
      toast.error("The payment amount cannot be more than the due amount", {
        position: "top-right",
      });
      return;
    }
    const previousAmount = parseFloat(selectedPayment.pay_amount) || 0;
    const newAmount = parseFloat(data.pay_amount);
    const updatedAmount = previousAmount + newAmount;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/payment/update/${selectedPayment.id}`,
        {
          pay_amount: updatedAmount,
        }
      );

      if (response.data.status === "Success") {
        // --- Second API: Supplier Ledger Create ---
        const supplierFormData = new FormData();
        supplierFormData.append("date", new Date().toISOString().split("T")[0]);
        supplierFormData.append("supplier_name", selectedPayment.supplier_name);
        supplierFormData.append("remarks", data.note);
        supplierFormData.append("pay_amount", data.pay_amount);
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/supplierLedger/create`,
          supplierFormData
        );

        // --- Third API: Branch Ledger Create ---
        const branchLedgerFormData = new FormData();
        branchLedgerFormData.append(
          "date",
          new Date().toISOString().split("T")[0]
        );
        branchLedgerFormData.append("branch_name", selectedPayment.branch_name);
        branchLedgerFormData.append("remarks", data.note);
        branchLedgerFormData.append("cash_out", data.pay_amount);
        branchLedgerFormData.append("ref_id", refId);
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/branch/create`,
          branchLedgerFormData
        );

        toast.success("Payment updated successfully!", {
          position: "top-right",
        });

        // UI update
        setPayment((prevList) =>
          prevList.map((item) =>
            item.id === selectedPayment.id
              ? {
                  ...item,
                  pay_amount: updatedAmount,
                  status:
                    updatedAmount === 0
                      ? "Unpaid"
                      : updatedAmount < parseFloat(item.total)
                      ? "Partial"
                      : "Paid",
                }
              : item
          )
        );
        setShowModal(false);
      } else {
        toast.error(response.data.message || "Failed to update.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Server error");
    }
  };

  // pagination
  const [currentPage, setCurrentPage] = useState([1]);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = filteredPaymentList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(currentPayments.length / itemsPerPage);
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((currentPage) => currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages)
      setCurrentPage((currentPage) => currentPage + 1);
  };
  const handlePageClick = (number) => {
    setCurrentPage(number);
  };

  if (loading) return <p className="text-center mt-16">Loading data...</p>;

  return (
    <div className=" ">
      <Toaster />
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-4 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2 ">
                <FaUserSecret className="text-[#11375B] text-2xl" />
                Payment List
              </h2>
          <div className="mt-3 md:mt-0 flex gap-2">
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className="border border-primary text-primary px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <FaFilter /> Filter
            </button>
          </div>
        </div>
        {/* export and search */}
        <div className="md:flex justify-between items-center">
          <div className="flex flex-wrap md:flex-row gap-1 md:gap-3 text-primary font-semibold rounded-md">

            <button
                onClick={exportToExcel}
                className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-green-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
              >
                <FaFileExcel className="" />
                Excel
              </button>
            
              <button
                onClick={exportToPDF}
                className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-amber-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
              >
                <FaFilePdf className="" />
                PDF
              </button>
            
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-blue-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
              >
                <FaPrint className="" />
                Print
              </button>
          </div>
          {/* search */}
          <div className="mt-3 md:mt-0">
            <span className="text-primary font-semibold pr-3">Search: </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              placeholder="Search list..."
              className="border border-gray-300 rounded-md outline-none text-xs py-2 ps-2 pr-5"
            />
          </div>
        </div>
        {showFilter && (
          <div className="md:flex gap-6 justify-between border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
            <div className="relative w-full">
              {/* <label className="block mb-1 text-sm font-medium">
                Start Date
              </label> */}
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="relative w-full">
              {/* <label className="block mb-1 text-sm font-medium">End Date</label> */}
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="flex gap-2">
                                      <button
                                        onClick={() => setCurrentPage(1)}
                                        className="bg-primary text-white px-4 py-1 md:py-0 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300  cursor-pointer"
                                      >
                                        <FaFilter /> Filter
                                      </button>
                                    </div>
          </div>
        )}

        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white capitalize text-xs">
              <tr>
                <th className="px-1 py-2">SL.</th>
                <th className="px-1 py-2">Date</th>
                <th className="px-1 py-2">Supplier Name</th>
                <th className="px-1 py-2">Category</th>
                <th className="px-1 py-2">Item Name</th>
                <th className="px-1 py-2">Quantity</th>
                <th className="px-1 py-2">Unit Price</th>
                <th className="px-1 py-2">Total Amount</th>
                <th className="px-1 py-2">Pay Amount</th>
                <th className="px-1 py-2">Due Amount</th>
                <th className="px-1 py-2">Status</th>
                <th className="px-1 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              { 
              currentPayments.length === 0 ? (
    <tr>
      <td colSpan="8" className="text-center py-10 text-gray-500 italic">
        <div className="flex flex-col items-center">
          <svg
            className="w-12 h-12 text-gray-300 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 9.75L14.25 14.25M9.75 14.25L14.25 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          No vehicle data found.
        </div>
      </td>
    </tr>
  )
              :(currentPayments?.map((dt, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-all border border-gray-200"
                >
                  <td className="px-1 py-2 font-bold">{index + 1}</td>
                  <td className="px-1 py-2">{dt.date}</td>
                  <td className="px-1 py-2">{dt.supplier_name}</td>
                  <td className="px-1 py-2">{dt.category}</td>
                  <td className="px-1 py-2">{dt.item_name}</td>
                  <td className="px-1 py-2">{dt.quantity}</td>
                  <td className="px-1 py-2">{dt.unit_price}</td>
                  <td className="px-1 py-2">{dt.total}</td>
                  <td className="px-1 py-2">{dt.pay_amount}</td>
                  <td className="px-1 py-2">{dt.total - dt.pay_amount}</td>
                  <td className="px-1 py-2">
                    {(() => {
                      const total = parseFloat(dt.total) || 0;
                      const paid = parseFloat(dt.pay_amount) || 0;
                      const due = total - paid;

                      let status = "Unpaid";
                      if (due === 0) {
                        status = "Paid";
                      } else if (paid > 0 && due > 0) {
                        status = "Partial";
                      }

                      return (
                        <select
                          value={status}
                          disabled
                          className="appearance-none text-xs font-semibold rounded-md px-2 py-1 border border-gray-300 bg-gray-100 text-gray-700"
                        >
                          <option value="Paid">Paid</option>
                          <option value="Unpaid">Unpaid</option>
                          <option value="Partial">Partial</option>
                        </select>
                      );
                    })()}
                  </td>

                  <td className="px-1 action_column">
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          if (
                            parseFloat(dt.total) - parseFloat(dt.pay_amount) <=
                            0
                          )
                            return;
                          setSelectedPayment(dt);
                          setShowModal(true);
                          reset({
                            due_amount: dt.total - dt.pay_amount,
                            pay_amount: dt.pay_amount,
                            // note: dt.item_name,
                          });
                        }}
                        className={`px-1 py-1 rounded shadow-md transition-all cursor-pointer ${
                          parseFloat(dt.total) - parseFloat(dt.pay_amount) > 0
                            ? "text-primary hover:bg-primary hover:text-white"
                            : "text-green-700 bg-gray-200 cursor-not-allowed"
                        }`}
                        disabled={
                          parseFloat(dt.total) - parseFloat(dt.pay_amount) <= 0
                        }
                      >
                        {parseFloat(dt.total) - parseFloat(dt.pay_amount) > 0
                          ? "Pay Now"
                          : "Complete"}
                      </button>
                    </div>
                  </td>
                </tr>
              )))
              }
            </tbody>
          </table>
        </div>
         {/* pagination */}
              {
                currentPayments.length === 0 ? ("")
              :(<div className="mt-10 flex justify-center">
                <div className="space-x-2 flex items-center">
                  <button
                    onClick={handlePrevPage}
                    className={`p-2 ${
                      currentPage === 1 ? "bg-gray-300" : "bg-primary text-white"
                    } rounded-sm`}
                    disabled={currentPage === 1}
                  >
                    <GrFormPrevious />
                  </button>
                  {[...Array(totalPages).keys()].map((number) => (
                    <button
                      key={number + 1}
                      onClick={() => handlePageClick(number + 1)}
                      className={`px-3 py-1 rounded-sm ${
                        currentPage === number + 1
                          ? "bg-primary text-white hover:bg-gray-200 hover:text-primary transition-all duration-300 cursor-pointer"
                          : "bg-gray-200 hover:bg-primary hover:text-white transition-all cursor-pointer"
                      }`}
                    >
                      {number + 1}
                    </button>
                  ))}
                  <button
                    onClick={handleNextPage}
                    className={`p-2 ${
                      currentPage === totalPages
                        ? "bg-gray-300"
                        : "bg-primary text-white"
                    } rounded-sm`}
                    disabled={currentPage === totalPages}
                  >
                    <GrFormNext />
                  </button>
                </div>
              </div>)}
      </div>

      {/* modal start */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 z-50  flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-[#11375B]">
              Update Payment
            </h2>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputField
                  name="due_amount"
                  label="Due Amount"
                  required
                  readOnly
                />
                <InputField name="pay_amount" label="Pay Amount" required />
                <InputField name="note" label="Note" required />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-200 px-4 rounded mt-4 hover:bg-primary hover:text-white cursor-pointer transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <BtnSubmit>Submit</BtnSubmit>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
      {/* modal end */}
    </div>
  );
};

export default PaymentList;
