

// import { useEffect, useState, useRef } from "react";
// import { FaFileExcel, FaFilePdf, FaFilter, FaPrint } from "react-icons/fa6";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.vfs;

// const SelectCustomerLedger = ({ customer }) => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [showFilter, setShowFilter] = useState(false);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const tableRef = useRef();

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BASE_URL}/api/customerLedger/list`)
//       .then((res) => {
//         if (res.data.status === "Success") {
//           setData(res.data.data);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error:", err);
//         setLoading(false);
//       });
//   }, []);


//   const exportToExcel = () => {
//     const rows = customer.map((dt, index) => ({
//       SL: index + 1,
//       Date: dt.bill_date,
//       Customer: dt.customer_name,
//       "Vehicle No": dt.vehicle_no,
//       "Loading Point": dt.load_point,
//       "Unloading Point": dt.unload_point,
//       "Total Rent": dt.body_cost
//     }));
//     const worksheet = XLSX.utils.json_to_sheet(rows);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Ledger");
//     XLSX.writeFile(workbook, `${customerName}-Ledger.xlsx`);
//   };

//   const exportToPDF = () => {
//     const docDefinition = {
//       content: [
//         { text: `${customerName} Ledger`, style: "header" },
//         {
//           table: {
//             headerRows: 1,
//             widths: ["auto", "auto", "*", "auto", "auto", "auto", "auto"],
//             body: [
//               [
//                 "SL.",
//                 "Date",
//                 "Customer",
//                 "Vehicle No",
//                 "Loading Point",
//                 "Unloading Point",
//                 "Total Rent",
//               ],
//               ...filteredLedger.map((dt, index) => [
//                 index + 1,
//                 dt.bill_date,
//                 dt.customer_name,
//                 dt.vehicle_no,
//                 dt.load_point,
//                 dt.unload_point,
//                 dt.body_cost,
//               ]),
//               [
//                 { text: "Total", colSpan: 6, alignment: "right" },
//                 {}, {}, {}, {}, {},
//                 totalRent.toFixed(2)
//               ]
//             ]
//           }
//         }
//       ],
//       styles: {
//         header: {
//           fontSize: 18,
//           bold: true,
//           margin: [0, 0, 0, 10]
//         }
//       }
//     };
//     pdfMake.createPdf(docDefinition).download(`${customerName}-Ledger.pdf`);
//   };

//   const handlePrint = () => {
//     const printContent = tableRef.current;
//     const printWindow = window.open("", "", "width=900,height=600");
//     printWindow.document.write("<html><head><title>Print Ledger</title></head><body>");
//     printWindow.document.write(printContent.innerHTML);
//     printWindow.document.write("</body></html>");
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//     printWindow.close();
//   };

//   // if (loading)
//   //   return <p className="text-center mt-16">Loading customer data...</p>;

//   return (
//     <div className="md:p-4">
//       <div className="w-xs md:w-full overflow-x-auto">
//         <div className="md:flex items-center justify-between mb-6">
//           <h1 className="text-xl font-extrabold text-[#11375B]">
//             {customerName} Ledger
//           </h1>
//         </div>

//         <div className="flex justify-between mb-4">
//           <div className="flex gap-2 ">
//           <button
//             onClick={exportToExcel}
//             className="flex items-center gap-2 py-2 px-5 bg-gray-50 hover:bg-primary text-primary hover:text-white rounded-md shadow-md shadow-green-200 transition-all duration-300"
//           >
//             <FaFileExcel /> Excel
//           </button>
//           <button
//             onClick={exportToPDF}
//             className="flex items-center gap-2 py-2 px-5 bg-gray-50 hover:bg-primary text-primary hover:text-white rounded-md shadow-md shadow-amber-200 transition-all duration-300"
//           >
//             <FaFilePdf /> PDF
//           </button>
//           <button
//             onClick={handlePrint}
//             className="flex items-center gap-2 py-2 px-5 bg-gray-50 hover:bg-primary text-primary hover:text-white rounded-md shadow-md shadow-blue-200 transition-all duration-300"
//           >
//             <FaPrint /> Print
//           </button>
//         </div>
//         <div className="flex gap-2">
//             <button
//               onClick={() => setShowFilter((prev) => !prev)}
//               className="border border-primary text-primary px-4 py-1 rounded-md shadow-lg flex items-center gap-2 hover:scale-105 transition-all duration-300"
//             >
//               <FaFilter /> Filter
//             </button>
//           </div>
//         </div>

//         {showFilter && (
//           <div className="flex gap-4 border border-gray-300 rounded-md p-5 mb-5">
//             <div className="w-full">
//               {/* <label className="block mb-1 text-sm font-medium">Start Date</label> */}
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//             <div className="w-full">
//               {/* <label className="block mb-1 text-sm font-medium">End Date</label> */}
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
//               />
//             </div>
//             <div className="flex gap-2">
//                                                   <button
//                                                     onClick={() => setCurrentPage(1)}
//                                                     className="bg-primary text-white px-4 py-1 md:py-0 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300  cursor-pointer"
//                                                   >
//                                                     <FaFilter /> Filter
//                                                   </button>
//                                                 </div>
//           </div>
//         )}

//         <div ref={tableRef}>
//           <table className="min-w-full text-sm text-left text-gray-900">
//             <thead className="bg-gray-100 text-gray-800 font-bold">
//               <tr>
//                 <th className="border border-gray-700 px-2 py-1">SL.</th>
//                 <th className="border border-gray-700 px-2 py-1">Date</th>
//                 <th className="border border-gray-700 px-2 py-1">Customer</th>
//                 <th className="border border-gray-700 px-2 py-1">Vehicle No</th>
//                 <th className="border border-gray-700 px-2 py-1">Loading Point</th>
//                 <th className="border border-gray-700 px-2 py-1">Unloading Point</th>
//                 <th className="border border-gray-700 px-2 py-1">Total Rent</th>
//               </tr>
//             </thead>
//             <tbody>
//               {customer.map((dt, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="border border-gray-700 px-2 py-1">{index + 1}</td>
//                   <td className="border border-gray-700 px-2 py-1">{dt.bill_date}</td>
//                   <td className="border border-gray-700 px-2 py-1">{dt.customer_name}</td>
//                   <td className="border border-gray-700 px-2 py-1">{dt.vehicle_no}</td>
//                   <td className="border border-gray-700 px-2 py-1">{dt.load_point}</td>
//                   <td className="border border-gray-700 px-2 py-1">{dt.unload_point}</td>
//                   <td className="border border-gray-700 px-2 py-1">
//                     {parseFloat(dt.body_cost).toFixed(2)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot>
//               <tr className="font-bold bg-gray-100">
//                 <td colSpan={6} className="border border-black px-2 py-1 text-right">
//                   Total
//                 </td>
//                 <td className="border border-black px-2 py-1">{totalRent.toFixed(2)}</td>
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
import { CloudCog } from "lucide-react";
pdfMake.vfs = pdfFonts.vfs;

const SelectCustomerLadger = ({ customer, selectedCustomerName }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef();
   const [customerList, setCustomerList] = useState([]);
  // customer
   // Fetch customer list with dues
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/customer/list`)
      .then(res => {
        if (res.data.status === "Success") {
          setCustomerList(res.data.data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  // Find selected customer due
  const selectedCustomer = customerList.find(
    cust => cust.customer_name === selectedCustomerName
  );
  const dueAmount = selectedCustomer ? parseFloat(selectedCustomer.due) : 0;

  // filter date 
  const filteredLedger = customer.filter((entry) => {
  const entryDate = new Date(entry.bill_date).setHours(0,0,0,0);
  const start = startDate ? new Date(startDate).setHours(0,0,0,0) : null;
  const end = endDate ? new Date(endDate).setHours(0,0,0,0) : null;

  if (start && !end) {
    // Filter exact date
    return entryDate === start;
  } else if (start && end) {
    // Filter range inclusive
    return entryDate >= start && entryDate <= end;
  } else {
    // No date filter
    return true;
  }
});

  const totalRent = filteredLedger.reduce(
    (sum, entry) => sum + parseFloat(entry.rec_amount || 0),
    0
  );

  const customerName = filteredLedger[0]?.customer_name || "All Customers";




  const exportToExcel = () => {
    const rows = filteredLedger.map((dt, index) => ({
      SL: index + 1,
      Date: dt.bill_date,
      Customer: dt.customer_name,
      "Vehicle No": dt.vehicle_no,
      "Loading Point": dt.load_point,
      "Unloading Point": dt.unload_point,
      "Total Rent": dt.body_cost,
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
                totalRent.toFixed(2),
              ],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
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
  return (
    <div className="md:p-4">
      <div className="w-xs md:w-full overflow-x-auto">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B]">
            {filteredLedger.length > 0
  ? filteredLedger[0].customer_name
  : "All Customers"} Ledger
          </h1>
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
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
    <div className="relative w-full">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
      />
      {startDate && (
        <button
          onClick={() => setStartDate("")}
          className="absolute right-8 top-1.5 text-gray-600 hover:text-gray-900"
          aria-label="Clear start date"
          type="button"
        >
          &times;
        </button>
      )}
    </div>

    <div className="relative w-full">
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
      />
      {endDate && (
        <button
          onClick={() => setEndDate("")}
          className="absolute right-8 top-1.5 text-gray-600 hover:text-gray-900"
          aria-label="Clear end date"
          type="button"
        >
          &times;
        </button>
      )}
    </div>
  </div>
)}


        {loading ? (
          <p className="text-center mt-16">Loading...</p>
        ) : (
          <div ref={tableRef}>
            <table className="min-w-full text-sm text-left text-gray-900">
              <thead className="bg-gray-100 text-gray-800 font-bold">
                <tr>
                  <th className="border border-gray-700 px-2 py-1">SL.</th>
                  <th className="border border-gray-700 px-2 py-1">Date</th>
                  <th className="border border-gray-700 px-2 py-1">Customer</th>
                  <th className="border border-gray-700 px-2 py-1">Create</th>
                  {/* <th className="border border-gray-700 px-2 py-1">Loading Point</th> */}
                  {/* <th className="border border-gray-700 px-2 py-1">Unloading Point</th> */}
                  <th className="border border-gray-700 px-2 py-1">Total Rent {selectedCustomerName && (
            <p className="text-sm font-medium text-gray-800">
               Opening Amount: ৳{dueAmount.toFixed(2)}
            </p>
          )}</th>
                </tr>
              </thead>
              <tbody>
                {filteredLedger.map((dt, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-700 px-2 py-1">{index + 1}</td>
                    <td className="border border-gray-700 px-2 py-1">{dt.bill_date}</td>
                    <td className="border border-gray-700 px-2 py-1">{dt.customer_name}</td>
                    <td className="border border-gray-700 px-2 py-1">{dt.created_by}</td>
                    {/* <td className="border border-gray-700 px-2 py-1">{dt.load_point}</td> */}
                    {/* <td className="border border-gray-700 px-2 py-1">{dt.unload_point}</td> */}
                    <td className="border border-gray-700 px-2 py-1">
                      {parseFloat(dt.rec_amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold bg-gray-100">
                  <td colSpan={4} className="border border-black px-2 py-1 text-right">
                   Total (Including Opening Amount)
                  </td>
                  <td className="border border-black px-2 py-1">{(totalRent + dueAmount).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCustomerLadger;
