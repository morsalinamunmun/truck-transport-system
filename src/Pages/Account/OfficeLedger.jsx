import { Toaster } from "react-hot-toast";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaFilter } from "react-icons/fa6";
import { FaFileExcel, FaFilePdf, FaPrint } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const OfficeLedger = () => {
  let openingBalance = 2000;
  let currentBalance = openingBalance;
  const [branch, setbranch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedBranch, setselectedBranch] = useState("");
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/branch/list`)
      .then((response) => {
        if (response.data.status === "Success") {
          const data = response.data.data;
          
          setbranch(data);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        setLoading(false);
      });
  }, []);
  const [officeList, setOfficeList] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/office/list`)
      .then((response) => {
        if (response.data.status === "Success") {
          const data = response.data.data;
          const uniqueOffices = Array.from(
            new Set(data.map((item) => item.branch_name)) 
          );
          setOfficeList(uniqueOffices);
        }
      })
      .catch((error) => {
        console.error("Error fetching office list:", error);
      });
  }, []);

  if (loading) return <p className="text-center mt-16">Loading data...</p>;
  // Filtered data based on selected customer
  const filteredBranch = branch.filter((item) => {
    const isBranchMatch = selectedBranch
      ? item.branch_name === selectedBranch
      : true;

    if (!isBranchMatch) return false;

    const itemDate = new Date(item.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return itemDate >= start && itemDate <= end;
    } else if (start) {
      return itemDate >= start;
    } else if (end) {
      return itemDate <= end;
    }

    return true;
  });

  // excel
  const exportToExcel = () => {
  const ws = XLSX.utils.json_to_sheet(filteredBranch);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Office Ledger");
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "office-ledger.xlsx");
};

// pdf
const exportToPdf = () => {
  const input = document.getElementById("ledger-table"); // we'll set this ID below
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "mm", "a4"); // landscape
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("office-ledger.pdf");
  });
};

// print
const handlePrint = () => {
  const printContents = document.getElementById("ledger-table").innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload(); // optional: reload after print
};


  return (
    <main className=" overflow-hidden">
      <Toaster />
      <div className="w-xs md:w-full overflow-hidden  max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 border border-gray-200">
        {/* Header */}
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[#11375B] capitalize flex items-center gap-3">
            OFFICE ledger : {selectedBranch}
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className="bg-primary text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <FaFilter /> Filter
            </button>
          </div>
        </div>

        {/* Export */}
        <div className="md:flex items-center justify-between mb-4">
          <div className="flex gap-1 md:gap-3 flex-wrap">
             <button
                            onClick={exportToExcel}
                            className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-green-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
                          >
                            <FaFileExcel className="" />
                            Excel
                          </button>
                        
                          <button
                            onClick={exportToPdf}
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
          {/* <div className="mt-3 md:mt-0">
            <div className="relative w-full">
              <label className="text-primary text-sm font-semibold">
                Select Branch Ledger
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setselectedBranch(e.target.value)}
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
              >
                <option value="">Select branch</option>
                {officeList.map((name, i) => (
                  <option key={i} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
          </div> */}
        </div>
        {/* Conditional Filter Section */}
        {showFilter && (
          <div className="md:flex gap-6 justify-between border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
            <div className="relative w-full">
              <input
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                placeholder="Start date"
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="relative w-full">
              <input
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                placeholder="End date"
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
        )}
        {/* Table */}
        <div id="ledger-table" className="w-full mt-5 overflow-x-auto border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="text-black capitalize font-bold">
              <tr>
                <th className="border border-gray-700 px-2 py-1">SL</th>
                <th className="border border-gray-700 px-2 py-1">Date</th>
                <th className="border border-gray-700 px-2 py-1">
                  Particulars
                </th>
                <th className="border border-gray-700 px-2 py-1">Mode</th>
                <th className="border border-gray-700 px-2 py-1">
                  Destination
                </th>
                <th className="border border-gray-700 px-2 py-1">TripExp</th>
                <th className="border border-gray-700 px-2 py-1">Due</th>
                <th className="border border-gray-700 px-2 py-1">CashIn</th>
                <th className="border border-gray-700 px-2 py-1">CashOut</th>
                <th className="border border-gray-700 py-1 text-center">
                  <p className="border-b">OpeningBalance 2000</p>Balance
                </th>
                <th className="border border-gray-700 px-2 py-1">Ref</th>
              </tr>
            </thead>
            <tbody className="text-black font-semibold">
              {filteredBranch?.map((dt, index) => {
                const expense = parseFloat(dt.trip_expense) || 0;
                const cashOut = parseFloat(dt.cash_out) || 0;
                currentBalance += expense - cashOut;
                return (
                  <tr key={index} className="hover:bg-gray-50 transition-all">
                    <td className="border border-gray-700 px-2 py-1 font-bold">
                      {index + 1}.
                    </td>
                    <td className="border border-gray-700 px-2 py-1">
                      {dt.date}
                    </td>
                    <td className="border border-gray-700 px-2 py-1">
                      {dt.remarks ? (
                        dt.remarks
                      ) : (
                        <span className="flex justify-center items-center">
                          --
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-700 px-2 py-1">
                      {dt.mode ? (
                        dt.mode
                      ) : (
                        <span className="flex justify-center items-center">
                          --
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-700 px-2 py-1">
                      {dt.unload_point? (
                        dt.unload_point
                      ) : (
                        <span className="flex justify-center items-center">
                          --
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-700 px-2 py-1">
                      {dt.trip_expense ? (
                        dt.trip_expense
                      ) : (
                        <span className="flex justify-center items-center">
                          --
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-700 px-2 py-1">
                      {dt.due}
                    </td>
                    <td className="border border-gray-700 px-2 py-1">
                      {dt.cash_in}
                    </td>
                    <td className="border border-gray-700 px-2 py-1">
                      {dt.cash_out}
                    </td>
                    <td className="border border-gray-700 px-2 py-1">
                      <span>
                        {currentBalance < 0
                          ? `(${Math.abs(currentBalance)})`
                          : currentBalance}
                      </span>
                    </td>
                    <td className="border border-gray-700 px-2 py-1">
                      {dt.ref}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default OfficeLedger;
