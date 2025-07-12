// import { useState } from "react";
// import { FaFilter, FaTruck } from "react-icons/fa6";

// const DriverReport = () => {
//   const [showFilter, setShowFilter] = useState(false);
//   return (
//     <main className="bg-gradient-to-br from-gray-100 to-white md:p-4">
//       <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
//         {/* Header */}
//         <div className="md:flex items-center justify-between mb-6">
//           <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
//             <FaTruck className="text-[#11375B] text-2xl" />
//             Driver List
//           </h1>
//           <div className="mt-3 md:mt-0 flex gap-2">
//             <button
//               onClick={() => setShowFilter((prev) => !prev)}
//               className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
//             >
//               <FaFilter /> Filter
//             </button>
//           </div>
//         </div>

//         {/* Export */}
//         <div className="md:flex justify-between mb-4">
//           <div className="flex gap-1 md:gap-3 flex-wrap">
//             <div
//               filename="drivers.csv"
//               className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all"
//             >
//               CSV
//             </div>
//             <button className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer">
//               Excel
//             </button>
//             <button className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer">
//               PDF
//             </button>
//             <button className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer">
//               Print
//             </button>
//           </div>
//           <div className="mt-3 md:mt-0">
//             <span className="text-primary font-semibold pr-3">Search: </span>
//             <input
//               type="text"
//               placeholder="Search..."
//               className="border border-gray-300 rounded-md outline-none text-xs py-2 ps-2 pr-5"
//             />
//           </div>
//         </div>
//         {/* Conditional Filter Section */}
//         {showFilter && (
//           <div className="md:flex gap-5 border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
//             <div className="relative w-full">
//               <input
//                 type="date"
//                 placeholder="Start date"
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>

//             <div className="relative w-full">
//               <input
//                 type="date"
//                 placeholder="End date"
//                 className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//           </div>
//         )}
//         {/* Table */}
//         <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
//           <table className="min-w-full text-sm text-left">
//             <thead className="bg-[#11375B] text-white capitalize text-sm">
//               <tr>
//                 <th className="px-2 py-3">#</th>
//                 <th className="px-2 py-3">Name</th>
//                 <th className="px-2 py-3">Mobile</th>
//                 <th className="px-2 py-3">Address</th>
//                 <th className="px-2 py-3">Emergency</th>
//                 <th className="px-2 py-3">License</th>
//                 <th className="px-2 py-3">Expired</th>
//                 <th className="px-2 py-3">Status</th>
//               </tr>
//             </thead>
//             <tbody className="text-[#11375B] font-semibold bg-gray-100">
//               <tr className="hover:bg-gray-50 transition-all">
//                 <td className="px-2 py-4 font-bold">1</td>
//                 <td className="px-2 py-4">Korim Mia</td>
//                 <td className="px-2 py-4">01756000000</td>
//                 <td className="px-2 py-4">Nikunja - 02</td>
//                 <td className="px-2 py-4">0150000000</td>
//                 <td className="px-2 py-4">1210DA</td>
//                 <td className="px-2 py-4">15-12-2026</td>
//                 <td className="px-2 py-4">
//                   <span className="text-white bg-green-700 px-3 py-1 rounded-md text-xs font-semibold">
//                     Active
//                   </span>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default DriverReport;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFileExcel, FaFilePdf, FaPrint } from "react-icons/fa6";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const DriverReport = () => {
  const [drivers, setDrivers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [filterMonth, setFilterMonth] = useState("");
  // pagination
    const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("https://api.tramessy.com/mstrading/api/driver/list")
      .then(res => setDrivers(res.data.data))
      .catch(console.error);

    axios.get("https://api.tramessy.com/mstrading/api/trip/list")
      .then(res => setTrips(res.data.data))
      .catch(console.error);
  }, []);

  // Filter trips by month
  const tripsFiltered = trips.filter(t => {
    if (!filterMonth) return true;
    return new Date(t.date).toISOString().slice(0,7) === filterMonth;
  });

  // Aggregate per driver
  const driverStats = drivers.map(driver => {
    const dt = tripsFiltered.filter(t => t.driver_name === driver.name);
    const totalTrips = dt.length;
    const totalRent = dt.reduce((sum, t) => sum + Number(t.total_rent||0), 0);
    const totalExp = dt.reduce((sum, t) => sum + Number(t.total_exp||0), 0);
    return {
      name: driver.name,
      mobile: driver.mobile,
      totalTrips, totalRent, totalExp,
      totalProfit: totalRent - totalExp
    };
  });

  const exportExcel = () => {
    const data = driverStats.map((d,i) => ({
      SL: i+1,
      Driver: d.name,
      Mobile: d.mobile,
      "Trips": d.totalTrips,
      "Rent": d.totalRent,
      "Expense": d.totalExp,
      "Profit": d.totalProfit
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DriverReport");
    XLSX.writeFile(wb, "Driver_Report.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF("landscape");
    const head = [["SL","Driver","Mobile","Trips","Rent","Expense","Profit"]];
    const body = driverStats.map((d,i) => [i+1, d.name, d.mobile, d.totalTrips, d.totalRent, d.totalExp, d.totalProfit]);
    autoTable(doc,{ head, body, theme:"grid" });
    doc.save("Driver_Report.pdf");
  };

  const printReport = () => {
    const html = document.getElementById("driver-report").outerHTML;
    const w = window.open("", "", "width=900,height=650");
    w.document.write(`<html><head><title>Driver Report</title>
      <style>table{width:100%;border-collapse:collapse;}th,td{border:1px solid #ccc;padding:6px}thead{background:#11375B;color:#fff}</style>
      </head><body><h3>Driver Report</h3>${html}</body></html>`);
    w.document.close(); w.print(); w.close();
  };
  // pagination
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDriverReport = driverStats.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(driverStats.length / itemsPerPage);
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

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-[#11375B] mb-5">Driver Performance Report</h2>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
              onClick={exportExcel}
              className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-green-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
            >
              <FaFileExcel className="" />
              Excel
            </button>
          
            <button
              onClick={exportPDF}
              className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-amber-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
            >
              <FaFilePdf className="" />
              PDF
            </button>
          
            <button
              onClick={printReport}
              className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-blue-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
            >
              <FaPrint className="" />
              Print
            </button>
        </div>
        <input type="month" value={filterMonth} onChange={e=>setFilterMonth(e.target.value)} className="border px-3 py-1 rounded" />
      </div>

      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
        <table id="driver-report" className="min-w-full text-sm text-left">
          <thead className="bg-[#11375B] text-white capitalize text-sm">
            <tr><th className="px-2 py-3">SL</th><th className="px-2 py-3">Driver</th><th className="px-2 py-3">Mobile</th><th className="px-2 py-3">Trips</th><th className="px-2 py-3">Rent</th><th className="px-2 py-3">Expense</th><th className="px-2 py-3">Profit</th></tr>
          </thead>
          <tbody>
            {
              currentDriverReport.length === 0 ? (
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
          No report data found.
        </div>
      </td>
    </tr>
  )  :
            (currentDriverReport.map((d,i)=>(
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-2 py-3">{i+1}</td>
                <td className="px-2 py-3">{d.name}</td>
                <td className="px-2 py-3">{d.mobile}</td>
                <td className="px-2 py-3">{d.totalTrips}</td>
                <td className="px-2 py-3">{d.totalRent}</td>
                <td className="px-2 py-3">{d.totalExp}</td>
                <td>{d.totalProfit}</td>
              </tr>
            )))
            }
          </tbody>
        </table>
      </div>
      {/* pagination */}
            <div className="mt-10 flex justify-center">
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
            </div>
    </div>
  );
};

export default DriverReport;
