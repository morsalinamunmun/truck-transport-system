import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaTruck,
  FaChartPie,
  FaUsers,
  FaUserPlus,
  FaArrowUp,
} from "react-icons/fa";
import dayjs from "dayjs"

const StatisticsCard = () => {
  const [tripData, setTripData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
const [activeVehicleList, setActiveVehicleList] = useState([])

  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalSales: 0,
    totalTrips: 0,
    todayTrips: 0,
    todaySales: 0,
    totalProfit: 1595,
    avgTripValue: 0,
    totalDistance: 0,
    activeVehicles: 0,
    topRoute: "",
    peakHour: "",
  })

  // activc gari
  const handleActiveVehicleClick = () => {
  const vehicles = [...new Set(tripData.map((trip) => trip.vehicle_number || trip.vehicle))].filter(Boolean)
  setActiveVehicleList(vehicles)
  setIsModalOpen(true)
}

  const today = dayjs().format("YYYY-MM-DD")

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/trip/list`)
        const trips = response.data?.data || []

        setTripData(trips)

        // Calculate comprehensive stats
        const todayTrips = trips.filter((trip) => dayjs(trip.created_at || trip.date).format("YYYY-MM-DD") === today)

        const totalSales = trips.reduce((sum, trip) => sum + Number.parseFloat(trip.amount || trip.fare || 0), 0)
        const todaySales = todayTrips.reduce((sum, trip) => sum + Number.parseFloat(trip.amount || trip.fare || 0), 0)

        // Calculate additional metrics
        const avgTripValue = trips.length > 0 ? totalSales / trips.length : 0
        const totalDistance = trips.reduce((sum, trip) => sum + Number.parseFloat(trip.distance || 0), 0)

        // Get unique vehicles
        const uniqueVehicles = [...new Set(trips.map((trip) => trip.vehicle_number || trip.vehicle))].filter(Boolean)

        // Find most popular route
        const routeCounts = {}
        trips.forEach((trip) => {
          const route = `${trip.from_location || trip.from} → ${trip.to_location || trip.to}`
          routeCounts[route] = (routeCounts[route] || 0) + 1
        })
        const topRoute = Object.keys(routeCounts).reduce((a, b) => (routeCounts[a] > routeCounts[b] ? a : b), "")

        // Find peak hour
        const hourCounts = {}
        trips.forEach((trip) => {
          const hour = dayjs(trip.created_at || trip.date).format("HH")
          hourCounts[hour] = (hourCounts[hour] || 0) + 1
        })
        const peakHour = Object.keys(hourCounts).reduce((a, b) => (hourCounts[a] > hourCounts[b] ? a : b), "")

        setStats({
          totalSales,
          totalTrips: trips.length,
          todayTrips: todayTrips.length,
          todaySales,
          totalProfit: totalSales,
          avgTripValue,
          totalDistance,
          activeVehicles: uniqueVehicles.length,
          topRoute,
          peakHour: peakHour ? `${peakHour}:00` : "N/A",
        })

        // Process chart data
        processChartData(trips)
        processVehiclePerformance(trips)
        processRouteAnalysis(trips)
      } catch (error) {
        console.error("Error fetching trip data:", error)
      }
    }

    fetchTripData()
  }, [today])

  // trip
    const [dailySales, setDailySales] = useState({});
  const [todayTripCount, setTodayTripCount] = useState(0);
   useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/trip/list`)
      .then((response) => {
        const data = response.data.data;
        const today = new Date().toISOString().split("T")[0];
        const sale = data
          .filter((item) => item.date === today)
          .reduce((sum, trip) => sum + parseFloat(trip.total_rent || 0), 0);

        setDailySales(sale);
      })
      .catch((error) => {
        console.error("Error fetching trip data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/trip/list`)
      .then((res) => {
        const allTrips = res.data.data;
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0];
        // Filter trips matching today's date
        const todayTrips = allTrips.filter((trip) => trip.date === today);
        // Set today's trip count
        setTodayTripCount(todayTrips.length);
      });
  }, []);

  return (
    <div className="">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-5">
  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Daily Income</p>
                <p className="text-3xl font-bold text-gray-900"> {(typeof dailySales === "number" ? dailySales : dailySales?.amount || 0).toLocaleString()} TK</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
  <svg
    className="w-8 h-8 text-purple-600"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <text
      x="5"
      y="18"
      fontSize="26"
      fontWeight="bold"
      fill="currentColor"
    >
      ৳
    </text>
  </svg>
</div>

            </div>
          </div>
          {/* avarage tk */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Average Trip Value</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgTripValue.toFixed(0)} TK</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* daily trip */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Daily Trip</p>
                <p className="text-3xl font-bold text-gray-900">{stats.todayTrips.toFixed(0)}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

{/* active vehicle */}
          <div  onClick={handleActiveVehicleClick} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Vehicles</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeVehicles}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
          

          {/* <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Distance</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalDistance.toFixed(0)} KM</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
          </div> */}
        </div>

        {/* modal gari */}
        {/* {isModalOpen && (
          <>
             <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
        onClick={() => setIsModalOpen(false)}
      >
        &times;
      </button>
      <h2 className="text-xl font-semibold mb-4">Active Vehicles</h2>
      {activeVehicleList.length > 0 ? (
        <ul className="list-disc list-inside text-gray-800 space-y-1 max-h-60 overflow-y-auto">
          {activeVehicleList.map((vehicle, idx) => (
            <li key={idx}>{vehicle}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">কোনো Active গাড়ি নেই।</p>
      )}
    </div>
  </div>
          </>
)} */}

    </div>
    
  );
};

export default StatisticsCard;
