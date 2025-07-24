import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaFileExcel, FaFilePdf, FaPrint } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const SupplierLedger = () => {
  let openingBalance = 2000;
  let currentBalance = openingBalance;
  const [supplier, setSupplier] = useState([]); // Supplier dropdown options
  const [supplierLedger, setSupplierLedger] = useState([]); // Ledger data for table
  const [loading, setLoading] = useState(true); // Loading only for initial ledger fetch
  const [selectedSupplier, setSelectedSupplier] = useState("");

  // Fetch full ledger on mount, set loading only here
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/supplierLedger/list`)
      .then((response) => {
        if (response.data.status === "Success") {
          setSupplier(response.data.data)
          setSupplierLedger(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching ledger data:", error);
        setLoading(false);
      });
  }, []);

  const supplierNames = [
  ...new Set(supplier.map((item) => item.supplier_name).filter(Boolean)),
];
console.log(supplierNames)

  // Filter ledger data client-side on supplier change, no loading state here
  useEffect(() => {
    if (!selectedSupplier) {
      // Show all ledger data when no supplier is selected
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/supplierLedger/list`)
        .then((response) => {
          if (response.data.status === "Success") {
            setSupplierLedger(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching ledger data:", error);
        });
    } else {
      // Filter ledger data by selected supplier
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/supplierLedger/list`)
        .then((response) => {
          if (response.data.status === "Success") {
            const filtered = response.data.data.filter(
              (item) => item.supplier_name === selectedSupplier
            );
            setSupplierLedger(filtered);
          }
        })
        .catch((error) => {
          console.error("Error fetching ledger data:", error);
        });
    }
  }, [selectedSupplier]);

  // excel
   const exportSuppliersToExcel = () => {
  const dataToExport = supplierLedger.map((item, index) => ({
    SL: index + 1,
    Date: item.date || "",
    Particulars: item.remarks || "",
    Mode: item.mode || "",
    PurchaseAmount: item.purchase_amount || 0,
    PaymentAmount: item.payment_amount || 0,
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Supplier Ledger");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, `Supplier_Ledger_${selectedSupplier || "All"}.xlsx`);
};

    // PDF
    const exportSuppliersToPDF = () => {
  const doc = new jsPDF();

  const tableColumn = [
    "SL.",
    "Date",
    "Particulars",
    "Mode",
    "PurchaseAmount",
    "PaymentAmount",
    "Balance",
  ];

  let pdfRows = [];
  let runningBalance = 2000;

  supplierLedger.forEach((item, index) => {
    const purchase = parseFloat(item.purchase_amount) || 0;
    const payment = parseFloat(item.payment_amount) || 0;
    runningBalance += purchase - payment;

    pdfRows.push([
      index + 1,
      item.date || "",
      item.remarks || "",
      item.mode || "",
      purchase.toFixed(2),
      payment.toFixed(2),
      runningBalance.toFixed(2),
    ]);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: pdfRows,
    startY: 20,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [17, 55, 91],
      textColor: [255, 255, 255],
    },
    theme: "striped",
  });

  doc.save(`Supplier_Ledger_${selectedSupplier || "All"}.pdf`);
};

  
    // Print
    const printTable = () => {
  const content = document.getElementById("supplier-ledger-table").innerHTML;
  const printWindow = window.open("", "", "width=900,height=700");
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Supplier Ledger</title>
        <style>
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
          }
          th, td {
            padding: 4px;
            font-size: 12px;
          }
          table {
            width: 100%;
          }
        </style>
      </head>
      <body>${content}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
};


  if (loading) return <p className="text-center mt-16">Loading data...</p>;

  return (
    <main className=" overflow-hidden">
      <Toaster />
      <div className="w-xs md:w-full overflow-hidden max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 border border-gray-200">
        {/* Header */}
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[#11375B] capitalize flex items-center gap-3">
            Supplier ledger
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2"></div>
        </div>

        {/* Export and Supplier Filter */}
        <div className="md:flex items-center justify-between mb-4">
          <div className="flex gap-1 md:gap-3 flex-wrap">

             <button
                            onClick={exportSuppliersToExcel}
                            className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-green-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
                          >
                            <FaFileExcel className="" />
                            Excel
                          </button>
                        
                          <button
                            onClick={exportSuppliersToPDF}
                            className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-amber-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
                          >
                            <FaFilePdf className="" />
                            PDF
                          </button>
                        
                          <button
                            onClick={printTable}
                            className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-blue-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
                          >
                            <FaPrint className="" />
                            Print
                          </button>
          </div>
          <div className="mt-3 md:mt-0 w-full md:w-64 relative">
            <label className="text-primary text-sm font-semibold">
              Select Supplier Ledger
            </label>
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              className="mt-1 w-full text-gray-700 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
            >
              <option value="">Select supplier</option>
              {supplierNames.map((supply, idx) => (
                <option key={idx} value={supply}>
                  {supply}
                </option>
              ))}
            </select>
            <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
          </div>
        </div>

        {/* Table */}
        <div id="supplier-ledger-table" className="w-full mt-5 overflow-x-auto border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="text-black capitalize font-bold">
              <tr>
                <th className="border border-gray-700 px-2 py-1">SL.</th>
                <th className="border border-gray-700 px-2 py-1">Date</th>
                <th className="border border-gray-700 px-2 py-1">
                  Particulars
                </th>
                <th className="border border-gray-700 px-2 py-1">Mode</th>
                <th className="border border-gray-700 px-2 py-1">
                  PurchaseAmount
                </th>
                <th className="border border-gray-700 px-2 py-1">
                  PaymentAmount
                </th>
                <th className="border border-gray-700 py-1 text-center">
                  <p className="border-b">OpeningBalance 2000</p>Balance
                </th>
              </tr>
            </thead>
            <tbody className="text-black font-semibold">
              {supplierLedger?.map((dt, index) => {
                const purchase = parseFloat(dt.purchase_amount) || 0;
                const payment = parseFloat(dt.payment_amount) || 0;
                currentBalance += purchase - payment;
                return (
                  <tr key={index} className="hover:bg-gray-50 transition-all">
                    <td className="border border-gray-700 px-2 py-1 font-bold">
                      {index + 1}.
                    </td>
                    <td className="border border-gray-700 px-2 py-1">
                      {dt.date}
                    </td>
                    <td className="border border-gray-700 px-2 py-1">
                      {dt.remarks}
                    </td>
                    <td className="border border-gray-700 px-2 py-1">
                      {dt.mode}
                    </td>
                    <td className="border border-gray-700 px-2 py-1">
                      {dt.purchase_amount}
                    </td>
                    <td className="border border-gray-700 px-2 py-1">
                      {dt.payment_amount}
                    </td>
                    <td className="border border-gray-700 px-2 py-1">
                      {currentBalance}
                    </td>
                  </tr>
                );
              })}
              {/* {(() => {
                let openingBalance = 2000;
                let currentBalance = openingBalance;
                return supplierLedger.map((dt, index) => {
                  const purchase = parseFloat(dt.purchase_amount) || 0;
                  const payment = parseFloat(dt.payment_amount) || 0;
                  currentBalance += purchase - payment;

                  return (
                    <tr key={index} className="hover:bg-gray-50 transition-all">
                      <td className="border border-gray-700 px-2 py-1 font-bold">
                        {index + 1}.
                      </td>
                      <td className="border border-gray-700 px-2 py-1">
                        {dt.data}
                      </td>
                      <td className="border border-gray-700 px-2 py-1">
                        {dt.remarks}
                      </td>
                      <td className="border border-gray-700 px-2 py-1">
                        {dt.mode}
                      </td>
                      <td className="border border-gray-700 px-2 py-1">
                        {dt.purchase_amount}
                      </td>
                      <td className="border border-gray-700 px-2 py-1">
                        {dt.payment_amount}
                      </td>
                      <td className="border border-gray-700 px-2 py-1">
                        {currentBalance}
                      </td>
                    </tr>
                  );
                });
              })()} */}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default SupplierLedger;
