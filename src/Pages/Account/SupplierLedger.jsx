import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { MdOutlineArrowDropDown } from "react-icons/md";

const SupplierLedger = () => {
  let openingBalance = 2000;
  let currentBalance = openingBalance;
  const [supplies, setSupplies] = useState([]); // Supplier dropdown options
  const [supplierLedger, setSupplierLedger] = useState([]); // Ledger data for table
  const [loading, setLoading] = useState(true); // Loading only for initial ledger fetch
  const [selectedSupplier, setSelectedSupplier] = useState("");

  // Fetch supplies once, no loading state here
  useEffect(() => {
    axios
      .get("https://api.tramessy.com/mstrading/api/supply/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setSupplies(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching supplies:", error);
      });
  }, []);

  // Fetch full ledger on mount, set loading only here
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.tramessy.com/mstrading/api/supplierLedger/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setSupplierLedger(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching ledger data:", error);
        setLoading(false);
      });
  }, []);

  // Filter ledger data client-side on supplier change, no loading state here
  useEffect(() => {
    if (!selectedSupplier) {
      // Show all ledger data when no supplier is selected
      axios
        .get("https://api.tramessy.com/mstrading/api/supplierLedger/list")
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
        .get("https://api.tramessy.com/mstrading/api/supplierLedger/list")
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

  if (loading) return <p className="text-center mt-16">Loading data...</p>;

  return (
    <main className="bg-gradient-to-br from-gray-100 to-white md:p-2 overflow-hidden">
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
            <div className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer">
              CSV
            </div>

            <button className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer">
              Excel
            </button>

            <button className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer">
              PDF
            </button>

            <button className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer">
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
              {supplies.map((supply, idx) => (
                <option key={idx} value={supply.contact_person_name}>
                  {supply.contact_person_name}
                </option>
              ))}
            </select>
            <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
          </div>
        </div>

        {/* Table */}
        <div className="w-full mt-5 overflow-x-auto border border-gray-200">
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
