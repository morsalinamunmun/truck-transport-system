// import { useEffect, useState } from "react";
// import { FaFileExcel, FaFilePdf, FaFilter, FaPrint } from "react-icons/fa6";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// import axios from "axios";
// pdfMake.vfs = pdfFonts.vfs;

// const SelectCustomerLedger = ({ customerName }) => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [showFilter, setShowFilter] = useState(false);
//   const [yamaha, setYamaha] = useState([]);
//   const [loading, setLoading] = useState(true);
//   let runningBalance = 2000;
//   // load data from server
//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BASE_URL}/api/customerLedger/list`)
//       .then((response) => {
//         if (response.data.status === "Success") {
//           setYamaha(response.data.data);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching driver data:", error);
//         setLoading(false);
//       });
//   }, []);
//   const yamahaLedger = yamaha?.filter((dt) => dt.customer_name === customerName);
//   const totalBodyFare = yamahaLedger.reduce(
//     (sum, dt) => sum + (parseFloat(dt.body_cost) || 0),
//     0
//   );
//   const totalFuelCost = yamahaLedger.reduce(
//     (sum, dt) => sum + (parseFloat(dt.fuel_cost) || 0),
//     0
//   );
//   // Calculate Total BillAmount
//   const totalBill = yamahaLedger.reduce((sum, dt) => {
//     const rent = parseFloat(dt.body_cost || 0);
//     const vatAmount = (rent * 15) / 100;
//     return sum + rent + vatAmount;
//   }, 0);
//   // Calculate Total Net Bill after tax
//   const netBill = yamahaLedger.reduce((sum, dt) => {
//     const body = parseFloat(dt.body_cost || 0);
//     const fuel = parseFloat(dt?.fuel_cost) || 0;
//     const vatAmount = (body * 5) / 100;
//     return sum + body - vatAmount + fuel;
//   }, 0);
//   if (loading) return <p className="text-center mt-16">Loading Yamaha...</p>;
//   return (
//     <div className=" md:p-4">
//       <div className="w-xs md:w-full overflow-hidden overflow-x-auto">
//         <div className="md:flex items-center justify-between mb-6">
//           <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
//             Yamaha Ledger
//           </h1>
//           <div className="mt-3 md:mt-0 flex gap-2">
//             <button
//               onClick={() => setShowFilter((prev) => !prev)}
//               className="border border-primary text-primary px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
//             >
//               <FaFilter /> Filter
//             </button>
//           </div>
//         </div>
//         {/* export */}
//         <div className="md:flex justify-between items-center">
//           <div className="flex gap-1 md:gap-3 text-primary font-semibold rounded-md">
//              <button
//                             // onClick={exportToExcel}
//                             className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-green-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
//                           >
//                             <FaFileExcel className="" />
//                             Excel
//                           </button>
                        
//                           <button
//                             // onClick={exportToPDF}
//                             className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-amber-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
//                           >
//                             <FaFilePdf className="" />
//                             PDF
//                           </button>
                        
//                           <button
//                             // onClick={handlePrint}
//                             className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-blue-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
//                           >
//                             <FaPrint className="" />
//                             Print
//                           </button>
//           </div>
//         </div>

//         {showFilter && (
//           <div className="md:flex gap-6 justify-between border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
//             <div className="relative w-full">
//               <label className="block mb-1 text-sm font-medium">
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//             <div className="relative w-full">
//               <label className="block mb-1 text-sm font-medium">End Date</label>
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//           </div>
//         )}

//         <div className="mt-5 overflow-x-auto">
//           <table className="min-w-full text-sm text-left text-gray-900">
//             <thead className="capitalize text-sm">
//               <tr>
//                 <th className="border border-gray-700 px-2 py-1">SL.</th>
//                 <th className="border border-gray-700 px-2 py-1 min-w-[90px]">
//                   Date
//                 </th>
//                 <th className="border border-gray-700 px-2 py-1">Product</th>
//                 <th className="border border-gray-700 px-2 py-1">Portfolio</th>
//                 <th className="border border-gray-700 px-2 py-1">Vehicle</th>
//                 <th className="border border-gray-700 px-2 py-1">Chalan</th>
//                 <th className="border border-gray-700 px-2 py-1">From</th>
//                 <th className="border border-gray-700 px-2 py-1">
//                   Destination
//                 </th>
//                 <th className="border border-gray-700 px-2 py-1">Quantity</th>
//                 <th className="border border-gray-700 px-2 py-1">BodyFare</th>
//                 <th className="border border-gray-700 px-2 py-1">Dropping</th>
//                 <th className="border border-gray-700 px-2 py-1">FuelCost</th>
//                 <th className="border border-gray-700 p-1 text-center">
//                   BillAmount
//                   <br />
//                   with VAT & TAX
//                 </th>{" "}
//                 <th className="border border-gray-700 p-1 text-center">
//                   Net Bill
//                   <br />
//                   Receivable after Tax
//                 </th>
//                 <th className="border border-gray-700 p-1 text-center">
//                   ReceiveAmount
//                 </th>
//                 <th className="text-center border border-black py-1">
//                   <p className="border-b">OpeningBalance 2000</p>
//                   Balance
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="font-semibold">
//               {yamahaLedger?.map((dt, index) => {
//                 // Bill Amount with VAT & TAX
//                 const rent = parseFloat(dt?.body_cost) || 0;
//                 const vatAmount = (rent * 15) / 100;
//                 const totalVatTax = rent + vatAmount;
//                 // Net Bill Receivable after Tax
//                 const body = parseFloat(dt?.body_cost) || 0;
//                 const fuel = parseFloat(dt?.fuel_cost) || 0;
//                 const billAmount = (body * 5) / 100;
//                 const totalBillAmount = body - billAmount + fuel;
//                 // Receive amount
//                 const received = parseFloat(dt.bill_amount || 0);
//                 // update balance
//                 runningBalance += totalBillAmount;
//                 runningBalance -= received;
//                 return (
//                   <tr key={index} lassName="hover:bg-gray-50 transition-all">
//                     <td className="border border-gray-700 p-1 font-bold">
//                       {index + 1}.
//                     </td>
//                     <td className="border border-gray-700 p-1 w-2xl min-w-[90px]">
//                       {dt.bill_date}
//                     </td>
//                     <td className="border border-gray-700 p-1">Motorcycle</td>
//                     <td className="border border-gray-700 p-1">Yamaha</td>
//                     <td className="border border-gray-700 p-1">
//                       {dt.vehicle_no}
//                     </td>
//                     <td className="border border-gray-700 p-1">{dt.chalan}</td>
//                     <td className="border border-gray-700 p-1">
//                       {dt.load_point}
//                     </td>
//                     <td className="border border-gray-700 p-1">
//                       {dt.unload_point}
//                     </td>
//                     <td className="border border-gray-700 p-1">{dt.qty}</td>
//                     <td className="border border-gray-700 p-1">
//                       {dt.body_cost}
//                     </td>
//                     <td className="border border-gray-700 p-1"></td>
//                     <td className="border border-gray-700 p-1">
//                       {dt.fuel_cost}
//                     </td>
//                     <td className="border border-gray-700 p-1">
//                       {totalVatTax}
//                     </td>
//                     <td className="border border-gray-700 p-1">
//                       {totalBillAmount}
//                     </td>
//                     <td className="border border-gray-700 p-1">
//                       {dt.bill_amount}
//                     </td>
//                     <td className="border border-gray-700 p-1">
//                       {runningBalance.toFixed(2)}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//             <tfoot>
//               <tr className="font-bold">
//                 <td
//                   colSpan={9}
//                   className="border border-black px-2 py-1 text-right"
//                 >
//                   Total
//                 </td>
//                 <td className="border border-black px-2 py-1">
//                   {totalBodyFare}
//                 </td>
//                 <td className="border border-black px-2 py-1"></td>
//                 <td className="border border-black px-2 py-1">
//                   {totalFuelCost}
//                 </td>
//                 <td className="border border-black px-2 py-1">{totalBill}</td>
//                 <td className="border border-black px-2 py-1">{netBill}</td>
//                 <td className="border border-black px-2 py-1"></td>
//                 <td className="border border-black px-2 py-1"></td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SelectCustomerLedger;


import { useEffect, useState, useRef } from "react";
import { FaFileExcel, FaFilePdf, FaFilter, FaPrint } from "react-icons/fa6";
import axios from "axios";
import * as XLSX from "xlsx";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.vfs;

const SelectCustomerLedger = ({ customerName }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/customerLedger/list`)
      .then((res) => {
        if (res.data.status === "Success") {
          setData(res.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  const filteredLedger = data?.filter(
    (item) => item.customer_name === customerName
  );

  const totalRent = filteredLedger.reduce(
    (sum, item) => sum + (parseFloat(item.body_cost) || 0),
    0
  );

  const exportToExcel = () => {
    const rows = filteredLedger.map((dt, index) => ({
      SL: index + 1,
      Date: dt.bill_date,
      Customer: dt.customer_name,
      "Vehicle No": dt.vehicle_no,
      "Loading Point": dt.load_point,
      "Unloading Point": dt.unload_point,
      "Total Rent": dt.body_cost
    }));
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ledger");
    XLSX.writeFile(workbook, `${customerName}-Ledger.xlsx`);
  };

  const exportToPDF = () => {
    const docDefinition = {
      content: [
        { text: `${customerName} Ledger`, style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "*", "auto", "auto", "auto", "auto"],
            body: [
              [
                "SL.",
                "Date",
                "Customer",
                "Vehicle No",
                "Loading Point",
                "Unloading Point",
                "Total Rent",
              ],
              ...filteredLedger.map((dt, index) => [
                index + 1,
                dt.bill_date,
                dt.customer_name,
                dt.vehicle_no,
                dt.load_point,
                dt.unload_point,
                dt.body_cost,
              ]),
              [
                { text: "Total", colSpan: 6, alignment: "right" },
                {}, {}, {}, {}, {},
                totalRent.toFixed(2)
              ]
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };
    pdfMake.createPdf(docDefinition).download(`${customerName}-Ledger.pdf`);
  };

  const handlePrint = () => {
    const printContent = tableRef.current;
    const printWindow = window.open("", "", "width=900,height=600");
    printWindow.document.write("<html><head><title>Print Ledger</title></head><body>");
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  if (loading)
    return <p className="text-center mt-16">Loading customer data...</p>;

  return (
    <div className="md:p-4">
      <div className="w-xs md:w-full overflow-x-auto">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B]">
            {customerName} Ledger
          </h1>
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex gap-2 ">
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 py-2 px-5 bg-gray-50 hover:bg-primary text-primary hover:text-white rounded-md shadow-md shadow-green-200 transition-all duration-300"
          >
            <FaFileExcel /> Excel
          </button>
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 py-2 px-5 bg-gray-50 hover:bg-primary text-primary hover:text-white rounded-md shadow-md shadow-amber-200 transition-all duration-300"
          >
            <FaFilePdf /> PDF
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 py-2 px-5 bg-gray-50 hover:bg-primary text-primary hover:text-white rounded-md shadow-md shadow-blue-200 transition-all duration-300"
          >
            <FaPrint /> Print
          </button>
        </div>
        <div className="flex gap-2">
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className="border border-primary text-primary px-4 py-1 rounded-md shadow-lg flex items-center gap-2 hover:scale-105 transition-all duration-300"
            >
              <FaFilter /> Filter
            </button>
          </div>
        </div>

        {showFilter && (
          <div className="flex gap-4 border border-gray-300 rounded-md p-5 mb-5">
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
        )}

        <div ref={tableRef}>
          <table className="min-w-full text-sm text-left text-gray-900">
            <thead className="bg-gray-100 text-gray-800 font-bold">
              <tr>
                <th className="border border-gray-700 px-2 py-1">SL.</th>
                <th className="border border-gray-700 px-2 py-1">Date</th>
                <th className="border border-gray-700 px-2 py-1">Customer</th>
                <th className="border border-gray-700 px-2 py-1">Vehicle No</th>
                <th className="border border-gray-700 px-2 py-1">Loading Point</th>
                <th className="border border-gray-700 px-2 py-1">Unloading Point</th>
                <th className="border border-gray-700 px-2 py-1">Total Rent</th>
              </tr>
            </thead>
            <tbody>
              {filteredLedger.map((dt, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-700 px-2 py-1">{index + 1}</td>
                  <td className="border border-gray-700 px-2 py-1">{dt.bill_date}</td>
                  <td className="border border-gray-700 px-2 py-1">{dt.customer_name}</td>
                  <td className="border border-gray-700 px-2 py-1">{dt.vehicle_no}</td>
                  <td className="border border-gray-700 px-2 py-1">{dt.load_point}</td>
                  <td className="border border-gray-700 px-2 py-1">{dt.unload_point}</td>
                  <td className="border border-gray-700 px-2 py-1">
                    {parseFloat(dt.body_cost).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold bg-gray-100">
                <td colSpan={6} className="border border-black px-2 py-1 text-right">
                  Total
                </td>
                <td className="border border-black px-2 py-1">{totalRent.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SelectCustomerLedger;
