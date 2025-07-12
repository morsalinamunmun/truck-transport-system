import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFileExcel, FaFilePdf, FaPrint } from "react-icons/fa6";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const VehicleReport = () => {
  const [vehicles, setVehicles] = useState([]);
  const [trips, setTrips] = useState([]);
  const [filterMonth, setFilterMonth] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("https://api.tramessy.com/mstrading/api/vehicle/list")
      .then(res => setVehicles(res.data.data))
      .catch(console.error);

    axios.get("https://api.tramessy.com/mstrading/api/trip/list")
      .then(res => setTrips(res.data.data))
      .catch(console.error);
  }, []);

  const tripsFiltered = trips.filter(t => !filterMonth || new Date(t.date).toISOString().slice(0,7) === filterMonth);

  const vehicleStats = vehicles.map(v => {
    const vt = tripsFiltered.filter(t => t.vehicle_no === v.vehicle_no);
    const tripsCount = vt.length;
    const rentSum = vt.reduce((s, t) => s + Number(t.total_rent||0), 0);
    const expSum = vt.reduce((s, t) => s + Number(t.total_exp||0), 0);
    return { number: v.vehicle_no, tripsCount, rentSum, expSum, profit: rentSum - expSum };
  });

  const exportExcel = () => {
    const data = vehicleStats.map((v,i)=>({
      SL: i+1, Vehicle: v.number, Trips: v.tripsCount,
      Rent: v.rentSum, Expense: v.expSum, Profit: v.profit
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "VehicleReport");
    XLSX.writeFile(wb, "Vehicle_Report.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF("landscape");
    const head=[["SL","Vehicle","Trips","Rent","Expense","Profit"]];
    const body = vehicleStats.map((v,i)=>[i+1,v.number,v.tripsCount,v.rentSum,v.expSum,v.profit]);
    autoTable(doc,{ head, body, theme:"grid" });
    doc.save("Vehicle_Report.pdf");
  };

  const printReport = () => {
    const html = document.getElementById("vehicle-report").outerHTML;
    const w = window.open("","","width=900,height=650");
    w.document.write(`<html><head><title>Vehicle Report</title><style>
      table{width:100%;border-collapse:collapse;}th,td{border:1px solid #ccc;padding:6px}thead{background:#11375B;color:#fff}
      </style></head><body><h3>Vehicle Summary Report</h3>${html}</body></html>`);
    w.document.close(); w.print(); w.close();
  };

  // pagination
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVehiclesReport = vehicleStats.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(vehicleStats.length / itemsPerPage);
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
      <h2 className="text-2xl font-bold text-[#11375B] mb-5">Vehicle Summary Report</h2>
      <div className="flex items-center justify-between mb-4">
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
        <input type="month" value={filterMonth} onChange={e=>setFilterMonth(e.target.value)} className="border px-3 py-1 rounded"/>

      </div>
      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
        <table id="vehicle-report" className="min-w-full text-sm text-left">
          <thead className="bg-[#11375B] text-white capitalize text-sm">
            <tr className="px-2 py-3"><th>SL</th><th className="px-2 py-3">Vehicle No</th><th className="px-2 py-3">Trips</th><th className="px-2 py-3">Rent</th><th className="px-2 py-3">Expense</th><th className="px-2 py-3">Profit</th></tr></thead>
          <tbody>
            {
               currentVehiclesReport.length === 0 ? (
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
  )  :
            (currentVehiclesReport.map((v,i)=>
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-2 py-3">{i+1}</td><td className="px-2 py-3">{v.number}</td><td className="px-2 py-3">{v.tripsCount}</td><td className="px-2 py-3">{v.rentSum}</td><td className="px-2 py-3">{v.expSum}</td><td className="px-2 py-3">{v.profit}</td></tr>
            ))
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
                  <GrFormPrevious/>
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

export default VehicleReport;
