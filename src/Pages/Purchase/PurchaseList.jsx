import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import { FaPlus, FaUserSecret } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PurchaseList = () => {
  const [purchase, setPurchase] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://api.tramessy.com/mstrading/api/purchase/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setPurchase(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p className="text-center mt-16">Loading data...</p>;
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-2">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-2 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <FaUserSecret className="text-[#11375B] text-2xl" />
            Purchase List
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/tramessy/Purchase/PurchaseForm">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaPlus /> Purchase
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white capitalize text-sm border border-gray-600">
              <tr>
                <th className="px-2 py-2">SL.</th>
                <th className="px-2 py-2">Supplier Name</th>
                <th className="px-2 py-2">Category</th>
                <th className="px-2 py-2">Item Name</th>
                <th className="px-2 py-2">Quantity</th>
                <th className="px-2 py-2">Unit Price</th>
                <th className="px-2 py-2">Total</th>
                <th className="px-2 py-2">Bill Image</th>
                <th className="px-2 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              {purchase?.map((dt, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-all border border-gray-200"
                >
                  <td className="px-2 py-2 font-bold">{index + 1}</td>
                  <td className="px-2 py-2">{dt.supplier_name}</td>
                  <td className="px-2 py-2">{dt.category}</td>
                  <td className="px-2 py-2">{dt.item_name}</td>

                  <td className="px-2 py-2">{dt.quantity}</td>
                  <td className="px-2 py-2">{dt.unit_price}</td>
                  <td className="px-2 py-2">{dt.total}</td>
                  <td className="px-2 py-2">
                    <img
                      src={`https://api.tramessy.com/mstrading/public/uploads/purchase/${dt.bill_image}`}
                      alt=""
                      className="w-20 h-20 rounded-full"
                    />
                  </td>
                  <td className="px-2 action_column">
                    <div className="flex gap-1">
                      <Link
                        to={`/tramessy/Purchase/UpdatePurchaseForm/${dt.id}`}
                      >
                        <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                          <FaPen className="text-[12px]" />
                        </button>
                      </Link>
                      <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                        <FaEye className="text-[12px]" />
                      </button>
                      {/* <button className="text-red-900 hover:text-white hover:bg-red-900 px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                        <FaTrashAlt className="text-[12px]" />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseList;
