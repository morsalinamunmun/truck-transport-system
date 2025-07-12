import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaTruck,
  FaChartPie,
  FaUsers,
  FaUserPlus,
  FaArrowUp,
} from "react-icons/fa";

const StatisticsCard = () => {
  const [trips, setTrips] = useState([]);
  const [vehicle, setvehicle] = useState([]);
  const [users, setUsers] = useState([]);
  const [driver, setDriver] = useState([]);
  // trips
  useEffect(() => {
    axios.get("https://api.tramessy.com/api/trip").then((res) => {
      setTrips(res.data.data);
    });
  }, []);
  // vehicle
  useEffect(() => {
    axios.get("https://api.tramessy.com/api/vehicle").then((res) => {
      setvehicle(res.data.data);
    });
  }, []);
  // users
  useEffect(() => {
    axios.get("https://api.tramessy.com/api/users").then((res) => {
      setUsers(res.data.data);
    });
  }, []);
  // drivers
  useEffect(() => {
    axios.get("https://api.tramessy.com/api/driver").then((res) => {
      setDriver(res.data.data);
    });
  }, []);

  return (
    <div className="px-1 md:px-5 py-6">
      <ul className="grid grid-cols-2 md:flex gap-3 justify-between">
        {/* Total Trips Card */}
        <li className="bg-white p-2 md:p-3 rounded-md drop-shadow-lg w-full">
          <div className="bg-gray-100 rounded-r-md flex gap-2 md:gap-10 items-center md:pr-7 p-3 md:p-0">
            <span className="hidden md:flex bg-[#11375B] p-3 rounded-md">
              <FaTruck className="text-white text-3xl" />
            </span>
            <div>
              <h3 className="text-[#11375B] md:font-semibold">Total Trip</h3>
              <span className="text-gray-500 font-semibold">
                {trips.length}
              </span>
            </div>
          </div>
          <button className="w-full mt-3 md:mt-7 text-white font-semibold text-sm bg-[#11375B] md:px-3 py-1 rounded-md hover:bg-[#062238] transition-all duration-700 cursor-pointer hover:scale-105">
            <span className="pr-1 md:pr-3">More info</span>
            <FaArrowUp className="inline-block" />
          </button>
        </li>

        {/* Total vehicle Card */}
        <li className="bg-white p-2 md:p-3 rounded-md drop-shadow-lg w-full">
          <div className="bg-gray-100 rounded-r-md flex gap-2 md:gap-10 items-center md:pr-7 p-3 md:p-0">
            <span className="hidden md:flex bg-[#11375B] p-3 rounded-md">
              <FaChartPie className="text-white text-3xl" />
            </span>
            <div>
              <h3 className="text-[#11375B] md:font-semibold">Total Vehicle</h3>
              <span className="text-gray-500 font-semibold">
                {vehicle.length}
              </span>
            </div>
          </div>
          <button className="w-full mt-3 md:mt-7 text-white font-semibold text-sm bg-[#11375B] md:px-3 py-1 rounded-md hover:bg-[#062238] transition-all duration-700 cursor-pointer hover:scale-105">
            <span className="pr-1 md:pr-3">More info</span>
            <FaArrowUp className="inline-block" />
          </button>
        </li>

        {/* Total Customers Card */}
        <li className="bg-white p-2 md:p-3 rounded-md drop-shadow-lg w-full">
          <div className="bg-gray-100 rounded-r-md flex gap-2 md:gap-10 items-center md:pr-0 p-3 md:p-0">
            <span className="hidden md:flex bg-[#11375B] p-3 rounded-md">
              <FaUsers className="text-white text-3xl" />
            </span>
            <div>
              {/* todo */}
              <h3 className="text-[#11375B] md:font-semibold">
                Total Customer
              </h3>
              <span className="text-gray-500 font-semibold">
                {users.length}
              </span>
            </div>
          </div>
          <button className="w-full mt-3 md:mt-7 text-white font-semibold text-sm bg-[#11375B] md:px-3 py-1 rounded-md hover:bg-[#062238] transition-all duration-700 cursor-pointer hover:scale-105">
            <span className="pr-1 md:pr-3">
              {" "}
              <span className="pr-1 md:pr-3">More info</span>
            </span>
            <FaArrowUp className="inline-block" />
          </button>
        </li>

        {/* Drivers Card */}
        <li className="bg-white p-2 md:p-3 rounded-md drop-shadow-lg w-full">
          <div className="bg-gray-100 rounded-r-md flex gap-2 md:gap-10 items-center md:pr-7 p-3 md:p-0">
            <span className="hidden md:flex bg-[#11375B] p-3 rounded-md">
              <FaUserPlus className="text-white text-3xl" />
            </span>
            <div>
              <h3 className="text-[#11375B] md:font-semibold">Driver</h3>
              <span className="text-gray-500 font-semibold">
                {driver.length}
              </span>
            </div>
          </div>
          <button className="w-full mt-3 md:mt-7 text-white font-semibold text-sm bg-[#11375B] md:px-3 py-1 rounded-md hover:bg-[#062238] transition-all duration-700 cursor-pointer hover:scale-105">
            <span className="pr-1 md:pr-3">
              {" "}
              <span className="pr-1 md:pr-3">More info</span>
            </span>
            <FaArrowUp className="inline-block" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StatisticsCard;
