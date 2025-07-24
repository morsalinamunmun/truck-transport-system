
// import { useEffect, useState, useRef } from "react"
// import axios from "axios"
// import jsPDF from "jspdf"
// import autoTable from "jspdf-autotable"
// import * as XLSX from "xlsx"
// import { saveAs } from "file-saver"
// import dayjs from "dayjs"
// import { Edit, FileText, FileSpreadsheet, FileImage, Printer, Plus, Filter, X } from "lucide-react"

// const DailyExpense = () => {
//   const [expenses, setExpenses] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState("")
//   const printRef = useRef()
//   const [isModalVisible, setIsModalVisible] = useState(false)
//   const [editingId, setEditingId] = useState(null)
//   const [formData, setFormData] = useState({
//     date: "",
//     paid_to: "",
//     pay_amount: "",
//     payment_category: "",
//     remarks: "",
//   })
//   const [errors, setErrors] = useState({})

//   const showToast = (message, type = "success") => {
//     const toast = document.createElement("div")
//     toast.textContent = message
//     toast.className = `fixed top-5 right-5 px-6 py-3 rounded-lg text-white font-medium z-50 transition-all duration-300 ${
//       type === "success" ? "bg-green-500" : "bg-red-500"
//     }`
//     document.body.appendChild(toast)
//     setTimeout(() => toast.remove(), 3000)
//   }

//   const showModal = async (record = null) => {
//     if (record) {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/expense/${record.id}`)
//         const data = res.data?.data
//         setFormData({
//           date: data?.date || "",
//           paid_to: data?.paid_to || "",
//           pay_amount: data?.pay_amount || "",
//           payment_category: data?.payment_category || "",
//           remarks: data?.remarks || "",
//         })
//         setEditingId(record.id)
//       } catch (err) {
//         showToast("ডেটা লোড করতে সমস্যা হয়েছে", "error")
//       }
//     } else {
//       setFormData({
//         date: "",
//         paid_to: "",
//         pay_amount: "",
//         payment_category: "",
//         remarks: "",
//       })
//       setEditingId(null)
//     }
//     setIsModalVisible(true)
//   }

//   const handleCancel = () => {
//     setFormData({
//       date: "",
//       paid_to: "",
//       pay_amount: "",
//       payment_category: "",
//       remarks: "",
//     })
//     setEditingId(null)
//     setIsModalVisible(false)
//     setErrors({})
//   }

//   useEffect(() => {
//     fetchExpenses()
//   }, [])

//   const fetchExpenses = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/expense/list`)
//       setExpenses(response.data?.data || [])
//       setLoading(false)
//     } catch (err) {
//       showToast("ডেটা লোড করতে সমস্যা হয়েছে", "error")
//       setLoading(false)
//     }
//   }

//   const validateForm = () => {
//     const newErrors = {}
//     if (!formData.date) newErrors.date = "তারিখ দিন"
//     if (!formData.paid_to) newErrors.paid_to = "প্রাপকের নাম দিন"
//     if (!formData.pay_amount) newErrors.pay_amount = "পরিমাণ দিন"
//     if (!formData.payment_category) newErrors.payment_category = "ক্যাটাগরি দিন"

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleFormSubmit = async (e) => {
//     e.preventDefault()

//     if (!validateForm()) return

//     try {
//       const payload = {
//         ...formData,
//         date: dayjs(formData.date).format("YYYY-MM-DD"),
//       }

//       if (editingId) {
//         await axios.post(`${import.meta.env.VITE_BASE_URL}/api/expense/update/${editingId}`, payload)
//         showToast("খরচ আপডেট হয়েছে")
//       } else {
//         await axios.post(`${import.meta.env.VITE_BASE_URL}/api/expense/save`, payload)
//         showToast("খরচ যুক্ত করা হয়েছে")
//       }

//       handleCancel()
//       fetchExpenses()
//     } catch (err) {
//       console.error(err)
//       showToast("অপারেশন ব্যর্থ হয়েছে", "error")
//     }
//   }

//   const filteredData = expenses.filter((item) =>
//     [item.paid_to, item.pay_amount, item.payment_category, item.remarks]
//       .join(" ")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase()),
//   )

//   const exportCSV = () => {
//     const csvContent = [
//       ["Serial", "Date", "Paid To", "Amount", "Category", "Remarks"],
//       ...filteredData.map((item, i) => [
//         i + 1,
//         item.date,
//         item.paid_to,
//         item.pay_amount,
//         item.payment_category,
//         item.remarks,
//       ]),
//     ]
//       .map((row) => row.join(","))
//       .join("\n")

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
//     saveAs(blob, "general_expense.csv")
//   }

//   const exportExcel = () => {
//     const data = filteredData.map((item, i) => ({
//       ক্রমিক: i + 1,
//       তারিখ: item.date,
//       "যাকে প্রদান": item.paid_to,
//       পরিমাণ: item.pay_amount,
//       ক্যাটাগরি: item.payment_category,
//       মন্তব্য: item.remarks,
//     }))

//     const ws = XLSX.utils.json_to_sheet(data)
//     const wb = XLSX.utils.book_new()
//     XLSX.utils.book_append_sheet(wb, ws, "General Expense")
//     const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })
//     saveAs(new Blob([buffer]), "general_expense.xlsx")
//   }

//   const exportPDF = () => {
//     const doc = new jsPDF()
//     autoTable(doc, {
//       head: [["Serial", "Date", "Paid To", "Amount", "Category", "Remarks"]],
//       body: filteredData.map((item, i) => [
//         i + 1,
//         item.date,
//         item.paid_to,
//         item.pay_amount,
//         item.payment_category,
//         item.remarks,
//       ]),
//     })
//     doc.save("general_expense.pdf")
//   }

//   const printTable = () => {
//     const content = printRef.current.innerHTML
//     const win = window.open("", "", "width=900,height=650")
//     win.document.write(`
//       <html>
//         <head>
//           <title>Print</title>
//           <style>
//             body { font-family: Arial, sans-serif; }
//             table { width: 100%; border-collapse: collapse; }
//             th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
//             th { background-color: #f5f5f5; }
//           </style>
//         </head>
//         <body>${content}</body>
//       </html>
//     `)
//     win.document.close()
//     win.focus()
//     win.print()
//     win.close()
//   }

//   return (
//     <div className=" min-h-screen">
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 border-b border-gray-200 gap-4">
//           <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//             <FileText size={24} />
//             দৈনিক খরচের তালিকা
//           </h1>
//           <div className="flex gap-3">
//             <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors">
//               <Filter size={16} />
//               Filter
//             </button>
//             <button
//               onClick={() => showModal()}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//             >
//               <Plus size={16} />
//               নতুন খরচ
//             </button>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50 border-b border-gray-200 gap-4">
//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={exportCSV}
//               className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               <FileText size={16} />
//               CSV
//             </button>
//             <button
//               onClick={exportExcel}
//               className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               <FileSpreadsheet size={16} />
//               Excel
//             </button>
//             <button
//               onClick={exportPDF}
//               className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               <FileImage size={16} />
//               PDF
//             </button>
//             <button
//               onClick={printTable}
//               className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               <Printer size={16} />
//               Print
//             </button>
//           </div>

//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium text-gray-700">Search:</span>
//             <input
//               type="text"
//               className="px-3 py-2 border border-gray-300 rounded-md text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto" ref={printRef}>
//           <table className="w-full">
//             <thead>
//               <tr className="bg-blue-700 text-white">
//                 <th className="px-3 py-3 text-left text-sm font-semibold w-16">#</th>
//                 <th className="px-3 py-3 text-left text-sm font-semibold">তারিখ</th>
//                 <th className="px-3 py-3 text-left text-sm font-semibold">যাকে প্রদান</th>
//                 <th className="px-3 py-3 text-left text-sm font-semibold">পরিমাণ</th>
//                 <th className="px-3 py-3 text-left text-sm font-semibold">ক্যাটাগরি</th>
//                 <th className="px-3 py-3 text-left text-sm font-semibold">মন্তব্য</th>
//                 <th className="px-3 py-3 text-left text-sm font-semibold w-24">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="7" className="px-3 py-10 text-center text-gray-500">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : filteredData.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="px-3 py-16 text-center text-gray-500">
//                     <div className="flex flex-col items-center">
//                       <X size={48} className="opacity-30 mb-4" />
//                       <span>No Expense data found.</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredData.map((item, index) => (
//                   <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
//                     <td className="px-3 py-3 text-sm">{index + 1}</td>
//                     <td className="px-3 py-3 text-sm">{item.date}</td>
//                     <td className="px-3 py-3 text-sm">{item.paid_to}</td>
//                     <td className="px-3 py-3 text-sm">{item.pay_amount}</td>
//                     <td className="px-3 py-3 text-sm">{item.payment_category}</td>
//                     <td className="px-3 py-3 text-sm">{item.remarks}</td>
//                     <td className="px-3 py-3 text-sm">
//                       <button
//                         onClick={() => showModal(item)}
//                         className="flex items-center gap-1 px-2 py-1 text-xs border border-gray-300 rounded bg-white hover:bg-gray-50 transition-colors"
//                       >
//                         <Edit size={12} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             {/* Modal Header */}
//             <div className="flex justify-between items-center p-5 border-b border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900">{editingId ? "খরচ আপডেট করুন" : "নতুন খরচ যুক্ত করুন"}</h2>
//               <button onClick={handleCancel} className="p-1 hover:bg-gray-100 rounded transition-colors">
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <form onSubmit={handleFormSubmit}>
//               <div className="p-5">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">তারিখ *</label>
//                     <input
//                       type="date"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       value={formData.date}
//                       onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                     />
//                     {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">যাকে প্রদান *</label>
//                     <input
//                       type="text"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="প্রাপকের নাম"
//                       value={formData.paid_to}
//                       onChange={(e) => setFormData({ ...formData, paid_to: e.target.value })}
//                     />
//                     {errors.paid_to && <p className="text-red-500 text-xs mt-1">{errors.paid_to}</p>}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">পরিমাণ *</label>
//                     <input
//                       type="number"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="পরিমাণ"
//                       value={formData.pay_amount}
//                       onChange={(e) => setFormData({ ...formData, pay_amount: e.target.value })}
//                     />
//                     {errors.pay_amount && <p className="text-red-500 text-xs mt-1">{errors.pay_amount}</p>}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">ক্যাটাগরি *</label>
//                     <input
//                       type="text"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="ক্যাটাগরি"
//                       value={formData.payment_category}
//                       onChange={(e) => setFormData({ ...formData, payment_category: e.target.value })}
//                     />
//                     {errors.payment_category && <p className="text-red-500 text-xs mt-1">{errors.payment_category}</p>}
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">মন্তব্য</label>
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="মন্তব্য"
//                     value={formData.remarks}
//                     onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
//                   />
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="flex justify-end gap-3 p-5 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={handleCancel}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   বাতিল করুন
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                 >
//                   সাবমিট
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default DailyExpense



import { useEffect, useState, useRef } from "react"
import axios from "axios"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import dayjs from "dayjs"
import { Edit, FileText, FileSpreadsheet, FileImage, Printer, Plus, Filter, X } from "lucide-react"
import { FaFileExcel, FaFilePdf, FaFilter, FaPrint, FaTruck } from "react-icons/fa"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import toast, { Toaster } from "react-hot-toast"
import { FaPlus } from "react-icons/fa6"
import { Link } from "react-router-dom"

const DailyExpense = () => {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const printRef = useRef()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    date: "",
    paid_to: "",
    pay_amount: "",
    payment_category: "",
    remarks: "",
  })
  const [errors, setErrors] = useState({})
  // Date filter state
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  // modal show handler
  const showModal = async (record = null) => {
    if (record) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/expense/${record.id}`)
        const data = res.data?.data
        setFormData({
          date: data?.date || "",
          paid_to: data?.paid_to || "",
          pay_amount: data?.pay_amount || "",
          payment_category: data?.payment_category || "",
          remarks: data?.remarks || "",
        })
        setEditingId(record.id)
      } catch (err) {
        // showToast("ডেটা লোড করতে সমস্যা হয়েছে", "error")
        console.log("error show modal")
      }
    } else {
      setFormData({
        date: "",
        paid_to: "",
        pay_amount: "",
        payment_category: "",
        remarks: "",
      })
      setEditingId(null)
    }
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setFormData({
      date: "",
      paid_to: "",
      pay_amount: "",
      payment_category: "",
      remarks: "",
    })
    setEditingId(null)
    setIsModalVisible(false)
    setErrors({})
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/expense/list`)
      setExpenses(response.data?.data || [])
      setLoading(false)
    } catch (err) {
      console.log("Data feching issue", "error")
      setLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.date) newErrors.date = "তারিখ দিন"
    if (!formData.paid_to) newErrors.paid_to = "প্রাপকের নাম দিন"
    if (!formData.pay_amount) newErrors.pay_amount = "পরিমাণ দিন"
    if (!formData.payment_category) newErrors.payment_category = "ক্যাটাগরি দিন"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      const payload = {
        ...formData,
        date: dayjs(formData.date).format("YYYY-MM-DD"),
      }

      if (editingId) {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/expense/update/${editingId}`, payload)
        toast.success("Expense Data Update successful")
      } else {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/expense/save`, payload)
        toast.success("Epense Added successful")
      }

      handleCancel()
      fetchExpenses()
    } catch (err) {
      console.error(err)
      toast.error("অপারেশন ব্যর্থ হয়েছে", "error")
    }
  }

  const filteredData = expenses.filter((item) =>
    [item.paid_to, item.pay_amount, item.payment_category, item.remarks]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  )
// csv
  const exportCSV = () => {
    const csvContent = [
      ["Serial", "Date", "Paid To", "Amount", "Category", "Remarks"],
      ...filteredData.map((item, i) => [
        i + 1,
        item.date,
        item.paid_to,
        item.pay_amount,
        item.payment_category,
        item.remarks,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, "general_expense.csv")
  }
// excel
  const exportExcel = () => {
    const data = filteredData.map((item, i) => ({
      ক্রমিক: i + 1,
      তারিখ: item.date,
      "যাকে প্রদান": item.paid_to,
      পরিমাণ: item.pay_amount,
      ক্যাটাগরি: item.payment_category,
      মন্তব্য: item.remarks,
    }))

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "General Expense")
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })
    saveAs(new Blob([buffer]), "general_expense.xlsx")
  }
// pdf
  const exportPDF = () => {
    const doc = new jsPDF()
    autoTable(doc, {
      head: [["Serial", "Date", "Paid To", "Amount", "Category", "Remarks"]],
      body: filteredData.map((item, i) => [
        i + 1,
        item.date,
        item.paid_to,
        item.pay_amount,
        item.payment_category,
        item.remarks,
      ]),
    })
    doc.save("general_expense.pdf")
  }
// print
  const printTable = () => {
    const content = printRef.current.innerHTML
    const win = window.open("", "", "width=900,height=650")
    win.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `)
    win.document.close()
    win.focus()
    win.print()
    win.close()
  }

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredExpense = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
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
    <div className=" min-h-screen">
      <Toaster/>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 p-4">
        {/* Header */}
                <div className="md:flex items-center justify-between mb-6">
                  <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
                    <FaTruck className="text-[#11375B] text-2xl" />
                    Sallary Expense 
                  </h1>
                  <div className="mt-3 md:mt-0 flex gap-2">
                    {/* <Link to="/tramessy/AddSallaryExpenseForm"> */}
                                  <button onClick={() => showModal()} className="bg-primary text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                                    <FaPlus /> Add 
                                  </button>
                                {/* </Link> */}
                    <button
                      onClick={() => setShowFilter((prev) => !prev)} // Toggle filter
                      className=" text-primary border border-primary px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <FaFilter /> Filter
                    </button>
                  </div>
                </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
          <div className="flex flex-wrap gap-2">

                        <button
              onClick={exportCSV}
              className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-cyan-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
            >
              <FileText size={16} />
              CSV
            </button>
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
                                        onClick={printTable}
                                        className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-blue-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
                                      >
                                        <FaPrint className="" />
                                        Print
                                      </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Search:</span>
            <input
              type="text"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

         {/* Conditional Filter Section */}
                {showFilter && (
                  <div className="md:flex gap-5 border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
                    <div className="relative w-full">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="Start date"
                        className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                      />
                    </div>
        
                    <div className="relative w-full">
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="End date"
                        className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                      />
                    </div>
                    <div className="mt-3 md:mt-0 flex gap-2">
                                                          <button
                                                            onClick={() => setCurrentPage(1)}
                                                            className="bg-primary text-white px-4 py-1 md:py-0 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
                                                          >
                                                            <FaFilter /> Filter
                                                          </button>
                                                        </div>
                  </div>
                )}

        {/* Table */}
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200" ref={printRef}>
          <table className="min-w-full text-sm text-left">
            <thead className="bg-primary text-white capitalize text-xs">
              <tr className="">
                <th className="px-3 py-3 text-left text-sm font-semibold w-16">SL</th>
                <th className="px-3 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-3 py-3 text-left text-sm font-semibold">Paid To</th>
                <th className="px-3 py-3 text-left text-sm font-semibold">Amount</th>
                <th className="px-3 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-3 py-3 text-left text-sm font-semibold">Remarks</th>
                <th className="px-3 py-3 text-left text-sm font-semibold w-24">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-3 py-10 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredExpense.length === 0 ? (
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
          No Expense data found.
        </div>
      </td>
    </tr>
  ) : (
                filteredExpense.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-3 text-sm">{index + 1}</td>
                    <td className="px-3 py-3 text-sm">{item.date}</td>
                    <td className="px-3 py-3 text-sm">{item.paid_to}</td>
                    <td className="px-3 py-3 text-sm">{item.pay_amount}</td>
                    <td className="px-3 py-3 text-sm">{item.payment_category}</td>
                    <td className="px-3 py-3 text-sm">{item.remarks}</td>
                    <td className="px-3 py-3 text-sm">
                      <button
                        onClick={() => showModal(item)}
                        className="flex items-center gap-1 px-2 py-1 text-xs border border-gray-300 rounded bg-white hover:bg-gray-50 transition-colors"
                      >
                        <Edit size={12} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* pagination */}
                {
                  filteredExpense.length === 0 ? (
                    ""
                  )
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

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000ad] z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-6  max-w-2xl border border-gray-300">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 ">
              <h2 className="text-lg font-semibold text-gray-900">{editingId ? "খরচ আপডেট করুন" : "নতুন খরচ যুক্ত করুন"}</h2>
              <button onClick={handleCancel} className="p-1 hover:bg-gray-100 rounded transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleFormSubmit}>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Paid To *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Paid To"
                      value={formData.paid_to}
                      onChange={(e) => setFormData({ ...formData, paid_to: e.target.value })}
                    />
                    {errors.paid_to && <p className="text-red-500 text-xs mt-1">{errors.paid_to}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Amount"
                      value={formData.pay_amount}
                      onChange={(e) => setFormData({ ...formData, pay_amount: e.target.value })}
                    />
                    {errors.pay_amount && <p className="text-red-500 text-xs mt-1">{errors.pay_amount}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Category"
                      value={formData.payment_category}
                      onChange={(e) => setFormData({ ...formData, payment_category: e.target.value })}
                    />
                    {errors.payment_category && <p className="text-red-500 text-xs mt-1">{errors.payment_category}</p>}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Remarks"
                    value={formData.remarks}
                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 p-5 ">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DailyExpense
