import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const OverViewCard = () => {
  const [expiringDocs, setExpiringDocs] = useState([]);
  const [octenCost, setOctenCost] = useState(0);
  const [dieselCost, setDieselCost] = useState(0);
  const [petrolCost, setPetrolCost] = useState(0);
  const [gasCost, setGasCost] = useState(0);

  const today = dayjs().format("YYYY-MM-DD");

  // রিমাইন্ডার ফেচ
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          "https://api.tramessy.com/api/vehicle"
        );
        const vehicles = response.data?.data || [];

        const todayDate = dayjs();
        const expiring = [];

        vehicles.forEach((vehicle) => {
          ["fitness_date", "road_permit_date", "text_date"].forEach((type) => {
            const date = dayjs(vehicle[type]);
            if (
              date.isValid() &&
              date.diff(todayDate, "day") <= 7 &&
              date.diff(todayDate, "day") >= 0
            ) {
              expiring.push({
                vehicle: vehicle.registration_number,
                document: type.replace(/_/g, " ").toUpperCase(),
                expireDate: date.format("DD-MM-YYYY"),
              });
            }
          });
        });

        setExpiringDocs(expiring);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchVehicles();
  }, []);

  // আজকের ফুয়েল এবং গ্যাস Cost
  useEffect(() => {
    const fetchFuelData = async () => {
      try {
        const response = await axios.get("https://api.tramessy.com/api/fuel");
        const fuels = response.data?.data || [];

        let octen = 0;
        let diesel = 0;
        let petrol = 0;
        let gas = 0;

        fuels.forEach((fuel) => {
          if (fuel.date_time === today) {
            const totalPrice = parseFloat(fuel.total_price) || 0;
            const type = (fuel.type || "").toLowerCase();

            if (type === "octen") {
              octen += totalPrice;
            } else if (type === "diesel") {
              diesel += totalPrice;
            } else if (type === "petroll" || type === "petrol") {
              petrol += totalPrice;
            } else if (type === "gas") {
              gas += totalPrice;
            }
          }
        });

        setOctenCost(octen);
        setDieselCost(diesel);
        setPetrolCost(petrol);
        setGasCost(gas);
      } catch (error) {
        console.error("Error fetching fuel data:", error);
      }
    };

    fetchFuelData();
  }, [today]);

  const totalCost = octenCost + dieselCost + petrolCost + gasCost;

  return (
    <div className="md:p-5">
      <ul className="md:flex gap-3">
        {/* আয় কার্ড */}
        <li className="bg-white rounded-md p-3 w-full md:w-full mb-3">
          <div className="text-primary border-b pb-3 border-gray-300">
            <h3 className="font-semibold">Today Income</h3>
          </div>
          <div className="p-3 text-primary font-semibold text-sm space-y-2">
            <div className="flex items-center gap-3">
              <p className="flex justify-between w-full border-t mt-3 pt-3">
                <span>Total Profit</span> - <span>1595</span>
                {/* চাইলে ডাইনামিক করতে পারো */}
              </p>
            </div>
          </div>
        </li>

        {/* ব্যয় কার্ড */}
        <li className="bg-white rounded-md p-3 w-full md:w-full mb-3">
          <div className="text-primary border-b pb-3 border-gray-300">
            <h3 className="font-semibold">Today Expense</h3>
          </div>
          <div className="p-3 text-primary font-semibold text-sm space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>Octen Cost</span> - <span>{octenCost.toFixed(2)} TK</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>Diesel Cost</span> -{" "}
                <span>{dieselCost.toFixed(2)} TK</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>Petrol Cost</span> -{" "}
                <span>{petrolCost.toFixed(2)} TK</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary w-[6px] h-[6px] rounded-full" />
              <p className="flex justify-between w-full">
                <span>Gas Cost</span> - <span>{gasCost.toFixed(2)} TK</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="flex justify-between w-full border-t mt-3 pt-3">
                <span>Total Expense</span> -{" "}
                <span>{totalCost.toFixed(2)} TK</span>
              </p>
            </div>
          </div>
        </li>

        {/* রিমাইন্ডার কার্ড */}
        <li className="bg-white rounded-md p-3 w-full md:w-full mb-3">
          <div className="text-primary border-b pb-3 border-gray-300">
            <h3 className="font-semibold">Remainder</h3>
          </div>
          <div className="py-3 text-primary font-semibold text-sm space-y-2">
            {expiringDocs.length > 0 ? (
              expiringDocs.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-full">
                    <p>Vehicle No: {item.vehicle}</p>
                    <p>Document's Name: {item.document}</p>
                    <p>Expired Date: {item.expireDate}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No expiration date.</p>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OverViewCard;
