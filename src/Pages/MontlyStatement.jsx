import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { SlCalender } from "react-icons/sl";

const MonthlyStatement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [tripRes, fuelRes, maintenanceRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/trip`),
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/fuel`),
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/maintenance`),
      ]);

      const tripData = tripRes.data.data || [];
      const fuelData = fuelRes.data.data || [];
      const maintenanceData = maintenanceRes.data.data || [];

      const allMonths = {};
      const getMonthKey = date => dayjs(date).format("YYYY-MM");

      tripData.forEach(item => {
        const month = getMonthKey(item.trip_date);
        if (!allMonths[month]) allMonths[month] = { income: 0, trip: 0, maintain: 0 };

        allMonths[month].income += parseFloat(item.trip_price) || 0;
        allMonths[month].trip +=
          (parseFloat(item.fuel_price) || 0) +
          (parseFloat(item.gas_price) || 0) +
          (parseFloat(item.other_expenses) || 0) +
          (parseFloat(item.demarage) || 0) +
          (parseFloat(item.driver_percentage) || 0);
      });

      fuelData.forEach(item => {
        const month = getMonthKey(item.date_time);
        if (!allMonths[month]) allMonths[month] = { income: 0, trip: 0, maintain: 0 };

        allMonths[month].trip +=
          (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0);
      });

      maintenanceData.forEach((item) => {
        const month = getMonthKey(item.date);
        if (!allMonths[month]) {
          allMonths[month] = { income: 0, trip: 0, maintain: 0 };
        }

        const maintenanceCost = parseFloat(item.total_cost || item.cost || 0);
        allMonths[month].maintain += maintenanceCost;
      });

      const sorted = Object.entries(allMonths)
        .sort(([a], [b]) => dayjs(b).diff(dayjs(a)))
        .map(([month, value], index) => {
          const totalExpense = value.trip + value.maintain;
          return {
            id: index + 1,
            month: dayjs(month).format("MMMM YYYY"),
            income: value.income,
            trip: value.trip,
            maintain: value.maintain,
            total: totalExpense,
            profit: value.income - totalExpense,
          };
        });

      setData(sorted);
    } catch (err) {
      console.error("Error loading statement data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getTotal = (key) =>
    data.reduce((acc, cur) => acc + parseFloat(cur[key] || 0), 0);

  return (
    <div className="p-4">
      <div className="bg-white p-4 shadow rounded-md">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
          <SlCalender className="text-lg" />
          Monthly Statement
        </h2>

        {loading ? (
          <p className="mt-4 text-center text-gray-600">Loading...</p>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border border-gray-200 text-sm  rounded-xl">
              <thead className="bg-primary text-white rounded-xl">
                <tr>
                  <th className="px-3 py-2 border">#</th>
                  <th className="px-3 py-2 border">Month</th>
                  <th className="px-3 py-2 border">Income</th>
                  <th className="px-3 py-2 border">Trip Cost</th>
                  <th className="px-3 py-2 border">Maintenance</th>
                  <th className="px-3 py-2 border">Total Expense</th>
                  <th className="px-3 py-2 border">Net Profit</th>
                </tr>
              </thead>
              <tbody>
                {
                    data.length === 0 ? (
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
          No data found.
        </div>
      </td>
    </tr>
  ) 
                :(data.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-100 transition-all"
                  >
                    <td className="px-3 py-2  text-center">{item.id}</td>
                    <td className="px-3 py-2 ">{item.month}</td>
                    <td className="px-3 py-2  text-green-600">
                      {item.income.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-3 py-2  text-red-500">
                      {item.trip.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-3 py-2  text-red-500">
                      {item.maintain.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-3 py-2  text-red-500">
                      {item.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td
                      className={`px-3 py-2  font-semibold ${
                        item.profit >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.profit.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                )))
                }

                {/* Summary Row */}
                <tr className="bg-blue-50 font-bold">
                  <td className="px-3 py-2 text-center" colSpan={2}>
                    Total
                  </td>
                  <td className="px-3 py-2  text-green-700">
                    {getTotal("income").toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-3 py-2  text-red-600">
                    {getTotal("trip").toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-3 py-2  text-red-600">
                    {getTotal("maintain").toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-3 py-2  text-red-600">
                    {(getTotal("trip") + getTotal("maintain")).toLocaleString(
                      undefined,
                      { minimumFractionDigits: 2 }
                    )}
                  </td>
                  <td className="px-3 py-2  text-green-700">
                    {(getTotal("income") -
                      getTotal("trip") -
                      getTotal("maintain")).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyStatement;
