
// import { useState } from "react"
// import { Calendar, ChevronDown, Menu, X, User } from "lucide-react"

// export default function AddTripForm() {
//   const [date, setDate] = useState("09-07-2025")

//   return (
//     <div className="min-h-screen bg-gray-50 rounded">
//       {/* Header */}
//       <div className="bg-white px-4 py-3 flex items-center justify-between ">
//         <h1 className="text-xl font-semibold text-gray-800">Trip Create</h1>
//         <div className="flex items-center text-sm text-gray-600">
//           <span className="text-primary hover:underline cursor-pointer">Home</span>
//           <span className="mx-2">/</span>
//           <span>Trip Report</span>
//         </div>
//       </div>

//       {/* Form Header */}
//       <div className="bg-primary text-white px-4 py-3 rounded-t-lg">
//         <h2 className="text-lg font-medium">Trip Create Form</h2>
//       </div>

//       <div className="p-4 space-y-6">
//         {/* Trip & Destination Section */}
//         <div className="bg-white rounded-lg border border-gray-300 p-6">
//           <h3 className="text-orange-500 font-medium text-center mb-6">Trip & Distatination section!</h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Date <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//                 <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Trip Time</label>
//               <input
//                 type="text"
//                 placeholder="trip time"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Load point</label>
//               <input
//                 type="text"
//                 placeholder="Load point"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Unload point</label>
//               <input
//                 type="text"
//                 placeholder="Unload point"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Vehicle & Driver Information Section */}
//         <div className="bg-white rounded-lg border border-gray-300 p-6">
//           <h3 className="text-orange-500 font-medium text-center mb-6">Vehicle & Driver Information !</h3>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle No</label>
//               <div className="relative">
//                 <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white">
//                   <option value="">Select Vehicle</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Driver Name</label>
//               <input
//                 type="text"
//                 placeholder="Driver Name"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-100"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Driver Mobile</label>
//               <input
//                 type="text"
//                 placeholder="Driver Mobile"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-100"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Running Cost Section */}
//         <div className="bg-white rounded-lg border border-gray-300 p-6">
//           <h3 className="text-orange-500 font-medium text-center mb-6">Running Cost Section!</h3>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Cost</label>
//               <input
//                 type="text"
//                 placeholder="Fuel Cost"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Toll Cost</label>
//               <input
//                 type="text"
//                 placeholder="Toll Cost"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Police Cost</label>
//               <input
//                 type="text"
//                 placeholder="Police Cost"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Commission</label>
//               <input
//                 type="text"
//                 placeholder="Commission"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Labour</label>
//               <input
//                 type="text"
//                 placeholder="Labour Cost"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Others</label>
//               <input
//                 type="text"
//                 placeholder="Other Cost"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Total</label>
//               <input
//                 type="text"
//                 placeholder="Total"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-100"
//                 readOnly
//               />
//             </div>
//           </div>
//         </div>

//         {/* Damage Section */}
//         <div className="bg-white rounded-lg border border-gray-300 p-6">
//           <h3 className="text-orange-500 font-medium text-center mb-6">Damarage Section!</h3>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Damarage Day</label>
//               <input
//                 type="text"
//                 placeholder="Trip Cost"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Damarage rate</label>
//               <input
//                 type="text"
//                 placeholder="Other Cost"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Damarage Total</label>
//               <input
//                 type="text"
//                 placeholder="Total"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-100"
//                 readOnly
//               />
//             </div>
//           </div>
//         </div>

//         {/* Customer & Payment Section */}
//         <div className="bg-white rounded-lg border border-gray-300 p-6">
//           <h3 className="text-orange-500 font-medium text-center mb-6">Customer & Payment Section!</h3>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
//               <input
//                 type="text"
//                 placeholder="Customer name"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Rent Amount</label>
//               <input
//                 type="text"
//                 placeholder="Rent Amount"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Advance Payment</label>
//               <input
//                 type="text"
//                 placeholder="Advance payment"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-start">
//           <button className="bg-slate-800 text-white px-8 py-2 rounded-md hover:bg-slate-700 transition-colors">
//             Submit
//           </button>
//         </div>
//       </div>

//       {/* Bottom Navigation */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2 flex items-center justify-between md:hidden">
//         <div className="flex items-center space-x-4">
//           <Menu className="h-6 w-6 text-gray-600" />
//           <span className="text-gray-600">Home</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <X className="h-5 w-5 text-gray-600" />
//           <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
//             <User className="h-5 w-5 text-white" />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import { useForm, FormProvider, useWatch } from "react-hook-form";

import { Calendar, ChevronDown, Menu, X, User } from "lucide-react";
import { InputField, SelectField } from "../components/Form/FormFields";
import { FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function AddTripForm() {
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      date: "",
      tripTime: "",
      loadPoint: "",
      unloadPoint: "",
      vehicleNo: "",
      driverName: "",
      driverMobile: "",
      fuelCost: "",
      tollCost: "",
      policeCost: "",
      commission: "",
      labour: "",
      others: "",
      damageDay: "",
      damageRate: "",
      customerName: "",
      rentAmount: "",
      advancePayment: ""
    },
  });
   
  const { handleSubmit, control,  watch } = methods;

  const watchFields = watch([
    "fuelCost",
    "tollCost",
    "policeCost",
    "commission",
    "labour",
    "others",
    "damarageDay",
    "damarageRate",
  ]);

  // total cost
  useEffect(() => {
      const keys = [
        "fuelCost",
        "tollCost",
        "policeCost",
        "commission",
        "labour",
        "others",
        "damarageDay",
        "damarageRate",
      ];
const values = watchFields.reduce((acc, val, i) => {
      acc[keys[i]] = Number(val || 0);
      return acc;
    }, {});

    const total =
      values.fuelCost +
      values.tollCost +
      values.policeCost +
      values.commission +
      values.labour +
      values.others;

    const damarageTotal = values.damarageDay * values.damarageRate;

    methods.setValue("total", total);
    methods.setValue("damarageTotal", damarageTotal);
  }, [watchFields, methods]);

   const onSubmit = async (data) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/trip/${data.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Trip Added successfully!"); 
      navigate("/tramessy/tripList"); 
    } else {
      toast.error("Failed to Added the trip.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong.");
  }
};

// select vehicle from api
const [vehicle, setVehicle] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/vehicle/list`)
      .then((response) => response.json())
      .then((data) => setVehicle(data.data))
      .catch((error) => console.error("Error fetching driver data:", error));
  }, []);

  const vehicleOptions = vehicle.map((vehicle) => ({
    value: vehicle.vehicle_name,
    label: vehicle.vehicle_name,
  }));
  // driver
  const [driver, setDriver] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/driver/list`)
      .then((response) => response.json())
      .then((data) => setDriver(data.data))
      .catch((error) => console.error("Error fetching driver data:", error));
  }, []);

  const driverOptions = driver.map((driver) => ({
    value: driver.driver_name,
    label: driver.driver_name,
     mobile: driver.driver_mobile,
  }));

   // Driver name এর পরিবর্তন দেখুন
const selectedDriverName = useWatch({
  control,
  name: "driverName",
});

useEffect(() => {
  const selectedDriver = driverOptions.find(d => d.value === selectedDriverName);
  if (selectedDriver) {
    methods.setValue("driverMobile", selectedDriver.mobile || "");
  }
}, [selectedDriverName, driverOptions, methods]);

// customer
  const [customer, setCustomer] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/customer/list`)
      .then((response) => response.json())
      .then((data) => setCustomer(data.data))
      .catch((error) => console.error("Error fetching driver data:", error));
  }, []);

  const customerOptions = customer.map((customer) => ({
    value: customer.customer_name,
    label: customer.customer_name,
     mobile: customer.mobile,
  }));
  console.log(customer, "c")
   // Driver name এর পরিবর্তন দেখুন
const selectedCustomerName = useWatch({
  control,
  name: "customerName",
});

useEffect(() => {
  const selectedCustomer = customerOptions.find(d => d.value === selectedCustomerName);
  if (selectedCustomer) {
    methods.setValue("mobile", selectedCustomer.mobile || "");
  }
}, [selectedCustomerName, customerOptions, methods]);

  return (
    <FormProvider {...methods}>
      <Toaster/>
      <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen mt-10">
        {/* Header */}
        {/* <div className="bg-white px-4 py-3 flex items-center justify-between ">
          <h1 className="text-xl font-semibold text-gray-800">Trip Create</h1>
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-primary hover:underline cursor-pointer">Home</span>
            <span className="mx-2">/</span>
            <span>Trip Report</span>
          </div>
        </div> */}

        {/* Form Header */}
        <div className="bg-primary text-white px-4 py-2 rounded-t-md">
          <h2 className="text-lg font-medium">Trip Create Form</h2>
        </div>

        <div className="rounded-b-md shadow border border-gray-200">
          <div className="p-4 space-y-2">
          {/* Trip & Destination Section */}
          <div className="bg-white rounded-lg border border-gray-300 p-4">
            <h3 className="text-orange-500 font-medium text-center mb-6">Trip & Destination Section!</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InputField name="date" label="Date" required icon={<span
                                  className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r"
                                  onClick={() => registrationDateRef.current?.showPicker?.()}
                                >
                                  <FiCalendar className="text-white cursor-pointer" />
                                </span>} />
              <InputField name="tripTime" label="Trip Time" placeholder="Trip Time" />
              <InputField name="loadPoint" label="Load Point" placeholder="Load Point" />
              <InputField name="unloadPoint" label="Unload Point" placeholder="Unload Point" />
            </div>
          </div>

          {/* Vehicle & Driver Information */}
          <div className="bg-white rounded-lg border border-gray-300 p-4">
            <h3 className="text-orange-500 font-medium text-center mb-6">Vehicle & Driver Information!</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6">
              <SelectField name="vehicleNo" label="Vehicle No" options={vehicleOptions} control={control} required />
              <SelectField name="driverName" label="Driver Name" options={driverOptions} control={control} required />
              <InputField name="driverMobile" label="Driver Mobile" readOnly />
            </div>
          </div>

          {/* Running Cost Section */}
          <div className="bg-white rounded-lg border border-gray-300 p-4">
            <h3 className="text-orange-500 font-medium text-center mb-6">Running Cost Section!</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 mb-2">
              <InputField name="fuelCost" label="Fuel Cost" />
              <InputField name="tollCost" label="Toll Cost" />
              <InputField name="policeCost" label="Police Cost" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6">
              <InputField name="commission" label="Commission" />
              <InputField name="labour" label="Labour" />
              <InputField name="others" label="Others" />
              <InputField name="total" label="Total" readOnly />
            </div>
          </div>

          {/* Damage Section */}
          <div className="bg-white rounded-lg border border-gray-300 p-4">
            <h3 className="text-orange-500 font-medium text-center mb-6">Damarage Section!</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6">
              <InputField name="damarageDay" label="Damarage Day" />
              <InputField name="damarageRate" label="Damarage Rate" />
              <InputField name="damarageTotal" label="Damarage Total" readOnly />
            </div>
          </div>

          {/* Customer & Payment Section */}
          <div className="bg-white rounded-lg border border-gray-300 p-4">
            <h3 className="text-orange-500 font-medium text-center mb-6">Customer & Payment Section!</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
              <SelectField name="customerName" label="Customer Name" options={customerOptions} control={control} required />
              <InputField name="mobile" label="Customer Number" />
              <InputField name="rentAmount" label="Rent Amount" />
              <InputField name="advancePayment" label="Advance Payment" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-start">
            <button type="submit" className="bg-slate-800 text-white px-8 py-2 rounded-md hover:bg-slate-700 transition-colors">
              Submit
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2 flex items-center justify-between md:hidden">
          <div className="flex items-center space-x-4">
            <Menu className="h-6 w-6 text-gray-600" />
            <span className="text-gray-600">Home</span>
          </div>
          <div className="flex items-center space-x-2">
            <X className="h-5 w-5 text-gray-600" />
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        </div>
      </form>
    </FormProvider>
  );
}
