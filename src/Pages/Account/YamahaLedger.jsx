import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from "axios";
pdfMake.vfs = pdfFonts.vfs;

const YamahaLedger = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [yamaha, setYamaha] = useState([]);
  const [loading, setLoading] = useState(true);
  let runningBalance = 2000;
  // load data from server
  useEffect(() => {
    axios
      .get("https://api.tramessy.com/mstrading/api/customerLedger/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setYamaha(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        setLoading(false);
      });
  }, []);
  const yamahaLedger = yamaha?.filter((dt) => dt.customer_name === "Yamaha");
  const totalBodyFare = yamahaLedger.reduce(
    (sum, dt) => sum + (parseFloat(dt.body_cost) || 0),
    0
  );
  const totalFuelCost = yamahaLedger.reduce(
    (sum, dt) => sum + (parseFloat(dt.fuel_cost) || 0),
    0
  );
  // Calculate Total BillAmount
  const totalBill = yamahaLedger.reduce((sum, dt) => {
    const rent = parseFloat(dt.body_cost || 0);
    const vatAmount = (rent * 15) / 100;
    return sum + rent + vatAmount;
  }, 0);
  // Calculate Total Net Bill after tax
  const netBill = yamahaLedger.reduce((sum, dt) => {
    const body = parseFloat(dt.body_cost || 0);
    const fuel = parseFloat(dt?.fuel_cost) || 0;
    const vatAmount = (body * 5) / 100;
    return sum + body - vatAmount + fuel;
  }, 0);
  if (loading) return <p className="text-center mt-16">Loading Yamaha...</p>;
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-gradient-to-br from-gray-100 to-white">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            Yamaha Ledger
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <FaFilter /> Filter
            </button>
          </div>
        </div>
        {/* export */}
        <div className="md:flex justify-between items-center">
          <div className="flex gap-1 md:gap-3 text-primary font-semibold rounded-md">
            <button className="py-2 px-5 hover:bg-primary bg-gray-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer">
              Excel
            </button>
            <button className="py-2 px-5 hover:bg-primary bg-gray-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer">
              PDF
            </button>
            <button className="py-2 px-5 hover:bg-primary bg-gray-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer">
              Print
            </button>
          </div>
        </div>

        {showFilter && (
          <div className="md:flex gap-6 justify-between border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
            <div className="relative w-full">
              <label className="block mb-1 text-sm font-medium">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="relative w-full">
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

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-900">
            <thead className="capitalize text-sm">
              <tr>
                <th className="border border-gray-700 px-2 py-1">SL.</th>
                <th className="border border-gray-700 px-2 py-1 min-w-[90px]">
                  Date
                </th>
                <th className="border border-gray-700 px-2 py-1">Product</th>
                <th className="border border-gray-700 px-2 py-1">Portfolio</th>
                <th className="border border-gray-700 px-2 py-1">Vehicle</th>
                <th className="border border-gray-700 px-2 py-1">Chalan</th>
                <th className="border border-gray-700 px-2 py-1">From</th>
                <th className="border border-gray-700 px-2 py-1">
                  Destination
                </th>
                <th className="border border-gray-700 px-2 py-1">Quantity</th>
                <th className="border border-gray-700 px-2 py-1">BodyFare</th>
                <th className="border border-gray-700 px-2 py-1">Dropping</th>
                <th className="border border-gray-700 px-2 py-1">FuelCost</th>
                <th className="border border-gray-700 p-1 text-center">
                  BillAmount
                  <br />
                  with VAT & TAX
                </th>{" "}
                <th className="border border-gray-700 p-1 text-center">
                  Net Bill
                  <br />
                  Receivable after Tax
                </th>
                <th className="border border-gray-700 p-1 text-center">
                  ReceiveAmount
                </th>
                <th className="text-center border border-black py-1">
                  <p className="border-b">OpeningBalance 2000</p>
                  Balance
                </th>
              </tr>
            </thead>
            <tbody className="font-semibold">
              {yamahaLedger?.map((dt, index) => {
                // Bill Amount with VAT & TAX
                const rent = parseFloat(dt?.body_cost) || 0;
                const vatAmount = (rent * 15) / 100;
                const totalVatTax = rent + vatAmount;
                // Net Bill Receivable after Tax
                const body = parseFloat(dt?.body_cost) || 0;
                const fuel = parseFloat(dt?.fuel_cost) || 0;
                const billAmount = (body * 5) / 100;
                const totalBillAmount = body - billAmount + fuel;
                // Receive amount
                const received = parseFloat(dt.bill_amount || 0);
                // update balance
                runningBalance += totalBillAmount;
                runningBalance -= received;
                return (
                  <tr key={index} lassName="hover:bg-gray-50 transition-all">
                    <td className="border border-gray-700 p-1 font-bold">
                      {index + 1}.
                    </td>
                    <td className="border border-gray-700 p-1 w-2xl min-w-[90px]">
                      {dt.bill_date}
                    </td>
                    <td className="border border-gray-700 p-1">Motorcycle</td>
                    <td className="border border-gray-700 p-1">Yamaha</td>
                    <td className="border border-gray-700 p-1">
                      {dt.vehicle_no}
                    </td>
                    <td className="border border-gray-700 p-1">{dt.chalan}</td>
                    <td className="border border-gray-700 p-1">
                      {dt.load_point}
                    </td>
                    <td className="border border-gray-700 p-1">
                      {dt.unload_point}
                    </td>
                    <td className="border border-gray-700 p-1">{dt.qty}</td>
                    <td className="border border-gray-700 p-1">
                      {dt.body_cost}
                    </td>
                    <td className="border border-gray-700 p-1"></td>
                    <td className="border border-gray-700 p-1">
                      {dt.fuel_cost}
                    </td>
                    <td className="border border-gray-700 p-1">
                      {totalVatTax}
                    </td>
                    <td className="border border-gray-700 p-1">
                      {totalBillAmount}
                    </td>
                    <td className="border border-gray-700 p-1">
                      {dt.bill_amount}
                    </td>
                    <td className="border border-gray-700 p-1">
                      {runningBalance.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td
                  colSpan={9}
                  className="border border-black px-2 py-1 text-right"
                >
                  Total
                </td>
                <td className="border border-black px-2 py-1">
                  {totalBodyFare}
                </td>
                <td className="border border-black px-2 py-1"></td>
                <td className="border border-black px-2 py-1">
                  {totalFuelCost}
                </td>
                <td className="border border-black px-2 py-1">{totalBill}</td>
                <td className="border border-black px-2 py-1">{netBill}</td>
                <td className="border border-black px-2 py-1"></td>
                <td className="border border-black px-2 py-1"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default YamahaLedger;
