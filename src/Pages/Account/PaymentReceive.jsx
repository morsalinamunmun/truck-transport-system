import axios from "axios";
import { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { Link } from "react-router-dom";

const PaymentReceive = () => {
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch payment data
  useEffect(() => {
    axios
      .get("https://api.tramessy.com/mstrading/api/paymentRecived/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setPayment(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trip data:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p className="text-center mt-16">Loading payment...</p>;
  return (
    <div className=" md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <MdOutlineAirplaneTicket className="text-[#11375B] text-2xl" />
            payment List
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/tramessy/account/PaymentReceiveForm">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaPlus /> payment
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white capitalize text-sm">
              <tr>
                <th className="px-2 py-3">SL.</th>
                <th className="px-2 py-3">Date</th>
                <th className="px-2 py-3">CustomerName</th>
                <th className="px-2 py-3">BranchName</th>
                <th className="px-2 py-3">BillRef</th>
                <th className="px-2 py-3">Amount</th>
                <th className="px-2 py-3">CashType</th>
                <th className="px-2 py-3">Note</th>
                <th className="px-2 py-3">CreatedBy</th>
                <th className="px-2 py-3">Status</th>
                <th className="px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              {
                payment.length === 0 ? (
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
              (payment?.map((dt, index) => (
                <tr className="hover:bg-gray-50 transition-all border border-gray-200">
                  <td className="px-2 py-1 font-bold">{index + 1}.</td>
                  <td className="px-2 py-1">{dt.date}</td>
                  <td className="px-2 py-1">{dt.customer_name}</td>
                  <td className="px-2 py-1">{dt.branch_name}</td>
                  <td className="px-2 py-1">{dt.bill_ref}</td>
                  <td className="px-2 py-1">{dt.amount}</td>
                  <td className="px-2 py-1">{dt.cash_type}</td>
                  <td className="px-2 py-1">{dt.note}</td>
                  <td className="px-2 py-1">{dt.created_by}</td>
                  <td className="px-2 py-1">{dt.status}</td>
                  <td className="px-2 action_column">
                    <div className="flex gap-1">
                      <Link to={`/tramessy/UpdatepaymentForm/${dt.id}`}>
                        <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                          <FaPen className="text-[12px]" />
                        </button>
                      </Link>
                      <button
                        // onClick={() => {
                        //   setSelectedEmployeeId(dt.id);
                        //   setIsOpen(true);
                        // }}
                        className="text-red-900 hover:text-white hover:bg-red-900 px-2 py-1 rounded shadow-md transition-all cursor-pointer"
                      >
                        <FaTrashAlt className="text-[12px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              )))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceive;
