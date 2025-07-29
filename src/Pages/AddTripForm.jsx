
// import { useForm, FormProvider, useWatch } from "react-hook-form";

// import { Calendar, ChevronDown, Menu, X, User } from "lucide-react";
// import { InputField, SelectField } from "../components/Form/FormFields";
// import { FiCalendar } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import toast, { ToastBar, Toaster } from "react-hot-toast";
// import { useEffect, useRef, useState } from "react";

// export default function AddTripForm() {
//   const navigate = useNavigate();
//   const dateRef = useRef(null);

//   const methods = useForm({
//     defaultValues: {
//       date: "",
//       load_point: "",
//       unload_point: "",
//       vehicle_no: "",
//       driver_name: "",
//       driver_mobile: "",
//       fuel_cost: "",
//       toll_cost: "",
//       police_cost: "",
//       driver_commission: "",
//       labor: "",
//       others: "",
//       damarageDay: "",
//       damarageRate: "",
//       customer: "",
//       parking_cost: "",
//       night_guard: "",
//       feri_cost: "",
//       chada: "",
//       food_cost: "",
//       total_exp: 0,
//       total: 0,
//       damarageTotal: 0,
//       transport_type: "",
//       total_rent: "",
//       challan: "",
//       trip_rent: "",
//       advance: "",
//       due_amount: "",
//       customer_mobile: "",
//       driver_adv: "",
//     },
//   })

//   const { handleSubmit, control, watch, setValue, register } = methods
//   const selectedTransport = watch("transport_type")

//   // Watch fields for total expense calculation
//   const fuelCost = Number.parseFloat(watch("fuel_cost") || 0)
//   const tollCost = Number.parseFloat(watch("toll_cost") || 0)
//   const policeCost = Number.parseFloat(watch("police_cost") || 0)
//   const driverCommision = Number.parseFloat(watch("driver_commission") || 0)
//   const labourCost = Number.parseFloat(watch("labor") || 0)
//   const othersCost = Number.parseFloat(watch("others") || 0)
//   const parkingCost = Number.parseFloat(watch("parking_cost") || 0)
//   const nightGuardCost = Number.parseFloat(watch("night_guard") || 0)
//   const feriCost = Number.parseFloat(watch("feri_cost") || 0)
//   const chadaCost = Number.parseFloat(watch("chada") || 0)
//   const foodCost = Number.parseFloat(watch("food_cost") || 0)
//   const damarageDay = Number.parseFloat(watch("damarageDay") || 0)
//   const damarageRate = Number.parseFloat(watch("damarageRate") || 0)

//   // Calculate Total Expense for own_transport
//   useEffect(() => {
//     const total =
//       driverCommision +
//       labourCost +
//       parkingCost +
//       nightGuardCost +
//       tollCost +
//       feriCost +
//       policeCost +
//       foodCost +
//       chadaCost +
//       fuelCost +
//       othersCost
//     setValue("total_exp", total)
//   }, [
//     driverCommision,
//     labourCost,
//     parkingCost,
//     nightGuardCost,
//     tollCost,
//     feriCost,
//     policeCost,
//     chadaCost,
//     foodCost,
//     fuelCost,
//     othersCost,
//     setValue,
//   ])

//   // Calculate total and damarageTotal (from original watchFields useEffect)
//   useEffect(() => {
//     const total = fuelCost + tollCost + policeCost + driverCommision + labourCost + foodCost + othersCost
//     const damarageTotal = damarageDay * damarageRate
//     setValue("total", total)
//     setValue("damarageTotal", damarageTotal)
//   }, [
//     fuelCost,
//     tollCost,
//     policeCost,
//     driverCommision,
//     labourCost,
//     foodCost,
//     othersCost,
//     damarageDay,
//     damarageRate,
//     setValue,
//   ])
//    const onSubmit = async (data) => {
//   try {
//     const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/trip/create`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     if (res.ok) {
//       toast.success("Trip Added successfully!"); 
//       navigate("/tramessy/tripList"); 
//     } else {
//       toast.error("Failed to Added the trip.");
//     }
//   } catch (error) {
//     console.error(error);
//     toast.error("Something went wrong.");
//   }
// };

// // select vehicle from api
// const [vehicle, setVehicle] = useState([]);
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/vehicle/list`)
//       .then((response) => response.json())
//       .then((data) => setVehicle(data.data))
//       .catch((error) => console.error("Error fetching driver data:", error));
//   }, []);

//   const vehicleOptions = vehicle.map((vehicle) => ({
//     value: vehicle.vehicle_name,
//     label: vehicle.vehicle_name,
//   }));
//   // driver
//   const [driver, setDriver] = useState([]);
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/driver/list`)
//       .then((response) => response.json())
//       .then((data) => setDriver(data.data))
//       .catch((error) => console.error("Error fetching driver data:", error));
//   }, []);

//   const driverOptions = driver.map((driver) => ({
//     value: driver.driver_name,
//     label: driver.driver_name,
//      mobile: driver.driver_mobile,
//   }));

//    // Driver name এর পরিবর্তন দেখুন
// const selectedDriverName = useWatch({
//   control,
//   name: "driverName",
// });

// useEffect(() => {
//   const selectedDriver = driverOptions.find(d => d.value === selectedDriverName);
//   if (selectedDriver) {
//     methods.setValue("driverMobile", selectedDriver.mobile || "");
//   }
// }, [selectedDriverName, driverOptions, methods]);

// // select vendor Vehicle No. from api
//   const [vendorVehicle, setVendorVehicle] = useState([]);
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/rent/list`)
//       .then((response) => response.json())
//       .then((data) => setVendorVehicle(data.data))
//       .catch((error) => console.error("Error fetching vehicle data:", error));
//   }, []);
//   const vendorVehicleOptions = vendorVehicle.map((dt) => ({
//     value: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
//     label: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
//   }));
//   console.log(vendorVehicleOptions, 'vendorVeh')

//   // select own driver from api
//   const [vendor, setVendorDrivers] = useState([]);
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/rent/list`)
//       .then((response) => response.json())
//       .then((data) => setVendorDrivers(data.data))
//       .catch((error) => console.error("Error fetching vendor data:", error));
//   }, []);
//   const vendorDriverOptions = vendor?.map((dt) => ({
//     value: dt.vendor_name,
//     label: dt.vendor_name,
//     contact: dt.mobile,
//   }));

//   console.log(vendorDriverOptions, "vendorD")

//    // select own driver from api
//   const [drivers, setDrivers] = useState([]);
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/driver/list`)
//       .then((response) => response.json())
//       .then((data) => setDrivers(data.data))
//       .catch((error) => console.error("Error fetching driver data:", error));
//   }, []);
//   const ownDriverOptions = drivers.map((driver) => ({
//     value: driver.driver_name,
//     label: driver.driver_name,
//     contact: driver.driver_mobile,
//   }));

// // customer
//   const [customer, setCustomer] = useState([]);
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/customer/list`)
//       .then((response) => response.json())
//       .then((data) => setCustomer(data.data))
//       .catch((error) => console.error("Error fetching driver data:", error));
//   }, []);

//   const customerOptions = customer.map((customer) => ({
//     value: customer.customer_name,
//     label: customer.customer_name,
//      mobile: customer.mobile,
//   }));
//   console.log(customer, "c")
//    // Driver name এর পরিবর্তন দেখুন
// const selectedCustomerName = useWatch({
//   control,
//   name: "customerName",
// });

// useEffect(() => {
//   const selectedCustomer = customerOptions.find(d => d.value === selectedCustomerName);
//   if (selectedCustomer) {
//     methods.setValue("mobile", selectedCustomer.mobile || "");
//   }
// }, [selectedCustomerName, customerOptions, methods]);

//   return (
//     <FormProvider {...methods}>
//       <Toaster/>
//       <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen mt-10">
//         {/* Header */}
//         {/* <div className="bg-white px-4 py-3 flex items-center justify-between ">
//           <h1 className="text-xl font-semibold text-gray-800">Trip Create</h1>
//           <div className="flex items-center text-sm text-gray-600">
//             <span className="text-primary hover:underline cursor-pointer">Home</span>
//             <span className="mx-2">/</span>
//             <span>Trip Report</span>
//           </div>
//         </div> */}

//         {/* Form Header */}
//         <div className="bg-primary text-white px-4 py-2 rounded-t-md">
//           <h2 className="text-lg font-medium">Trip Create Form</h2>
//         </div>

//         <div className="rounded-b-md shadow border border-gray-200">
//           <div className="p-4 space-y-2">
//           {/* Trip & Destination Section */}
//           <div className="bg-white rounded-lg border border-gray-300 p-4">
//             <h3 className="text-orange-500 font-medium text-center mb-6">Trip & Destination Section!</h3>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6">
//                <div className="relative w-full">
//               <InputField
//                 name="date"
//                 label="Date"
//                 type="date"
//                 required
//                 inputRef={(e) => {
//                   register("date").ref(e);
//                   dateRef.current = e;
//                 }}
//                 icon={
//                   <span
//                     className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r"
//                     onClick={() => dateRef.current?.showPicker?.()}
//                   >
//                     <FiCalendar className="text-white cursor-pointer" />
//                   </span>
//                 }
//               />
//             </div>
//               <SelectField name="customer" label="Customer Name" options={customerOptions} control={control} required />
//               <InputField name="customer_mobile" label="Customer Number" />
              
//             </div>
//             <div className="flex gap-x-6">
//                <div className="w-full"> <InputField name="load_point" label="Load Point" placeholder="Load Point" /></div>
//               <div className="w-full"><InputField name="unload_point" label="Unload Point" placeholder="Unload Point" /></div>
//               </div>
//           </div>

//           {/* Vehicle & Driver Information */}
//           <div className="bg-white rounded-lg border border-gray-300 p-4">
//             <h3 className="text-orange-500 font-medium text-center mb-6">Vehicle & Driver Information!</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6">
//                       <SelectField
//                         name="transport_type"
//                         label="Transport Type"
//                         required
//                         options={[
//                           { value: "own_transport", label: "Own Transport" },
//                           {
//                             value: "vendor_transport",
//                             label: "Vendor Transport",
//                           },
//                         ]}
//                       />
//                       {/* vehicle no transportn based */}
//               {selectedTransport === "own_transport" ? (
//                         <SelectField
//                           name="vehicle_no"
//                           label="Vehicle No."
//                           required={true}
//                           options={vehicleOptions}
//                           control={control}
//                         />
//                       ) : selectedTransport === "vendor_transport" ? (
//                         <SelectField
//                           name="vehicle_no"
//                           label="Vehicle No."
//                           required={true}
//                           options={vendorVehicleOptions}
//                           control={control}
//                         />
//                       ) : (
//                         <SelectField
//                           name="vehicle_no"
//                           label="Vehicle No."
//                           defaultValue={"Please select transport first"}
//                           required={true}
//                           options={[
//                             {
//                               label: "Please select transport first",
//                               value: "",
//                               disabled: true,
//                             },
//                           ]}
//                           control={control}
//                         />
//                       )}
//                       {/* vehicle no transportn based */}
//                {selectedTransport === "own_transport" ? (
//                         <SelectField
//                           name="driver_name"
//                           label="Driver Name"
//                           required
//                           control={control}
//                           options={ownDriverOptions}
//                           onSelectChange={(selectedOption) => {
//                             setValue(
//                               "driver_mobile",
//                               selectedOption?.contact || ""
//                             );
//                           }}
//                         />
//                       ) : selectedTransport === "vendor_transport" ? (
//                         <SelectField
//                           name="driver_name"
//                           label="Driver Name"
//                           required
//                           control={control}
//                           options={vendorDriverOptions}
//                         />
//                       ) : (
//                         <SelectField
//                           name="driver_name"
//                           label="Driver Name"
//                           required
//                           control={control}
//                           options={[
//                             {
//                               label: "Please select transport first",
//                               value: "",
//                               disabled: true,
//                             },
//                           ]}
//                         />
//                       )}
//               {/* <InputField name="driverMobile" label="Driver Mobile" required /> */}
//               <InputField
//                         name="total_rent"
//                         label="Total Rent/Bill Amount"
//                         type="number"
//                         required
//                       />
//                       <InputField name="challan" label="Challan" required />
//             </div>
//           </div>
//           {/* own transport */}
//           {selectedTransport === "own_transport" && (
//               <div className="border border-gray-300 p-5 rounded-md mt-5">
//                 <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
//                   <div className="w-full">
//                     <InputField
//                       name="driver_adv"
//                       label="Driver Advance"
//                       required
//                       type="number"
//                     />
//                   </div>
//                   <div className="w-full">
//                     <InputField
//                       name="driver_commission"
//                       label="Driver Commission"
//                       required
//                       type="number"
//                     />
//                   </div>
//                   <div className="w-full">
//                     <InputField
//                       name="labor"
//                       label="Labour Cost"
//                       type="number"
//                     />
//                   </div>
//                   <div className="w-full">
//                     <InputField name="fuel_cost" label="Fuel Cost" />
//                   </div>
//                 </div>
//                 <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
//                   <div className="w-full">
//                     <InputField
//                       name="parking_cost"
//                       label="Parking Cost"
//                       type="number"
//                     />
//                   </div>
//                   <div className="w-full">
//                     <InputField
//                       name="night_guard"
//                       label="Night Guard Cost"
//                       type="number"
//                     />
//                   </div>
//                   <div className="w-full">
//                     <InputField
//                       name="toll_cost"
//                       label="Toll Cost"
//                       type="number"
//                     />
//                   </div>
//                   <div className="w-full">
//                     <InputField
//                       name="feri_cost"
//                       label="Feri Cost"
//                       type="number"
//                     />
//                   </div>
//                 </div>
//                 <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
//                   <div className="w-full">
//                     <InputField
//                       name="police_cost"
//                       label="Police Cost"
//                       type="number"
//                     />
//                   </div>
//                   <div className="w-full">
//                     <InputField name="chada" label="Chada" type="number" />
//                   </div>
//                   <div className="w-full">
//                     <InputField name="food_cost" label="Food Cost" type="number" />
//                   </div>

//                   <div className="w-full">
//                     {/* <InputField
//                       name="total_exp"
//                       label="Total Expense"
//                       readOnly
//                       defaultValue={totalExpense}
//                       value={totalExpense}
//                       required
//                     /> */}
//                      <InputField name="total_exp" label="Total Expense" readOnly value={watch("total_exp")} />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* vendor transport */}
//             {selectedTransport === "vendor_transport" && (
//               <div className="border border-gray-300 p-5 rounded-md mt-5 md:mt-3 md:flex justify-between gap-3">
//                 <div className="w-full">
//                   <InputField
//                     name="trip_rent"
//                     label="Trip Rent"
//                     required
//                     type="number"
//                   />
//                 </div>
//                 <div className="w-full">
//                   <InputField name="advance" label="Advance" required />
//                 </div>
//                 <div className="w-full">
//                   <InputField name="due_amount" label="Due Amount" required />
//                 </div>
//               </div>
//             )}

//           {/* Running Cost Section */}
//           {/* <div className="bg-white rounded-lg border border-gray-300 p-4">
//             <h3 className="text-orange-500 font-medium text-center mb-6">Running Cost Section!</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 mb-2">
//               <InputField name="fuelCost" label="Fuel Cost" />
//               <InputField name="tollCost" label="Toll Cost" />
//               <InputField name="policeCost" label="Police Cost" />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6">
//               <InputField name="commission" label="Commission" />
//               <InputField name="labour" label="Labour" />
//               <InputField name="others" label="Others" />
//               <InputField name="total" label="Total" readOnly />
//             </div>
//           </div> */}

//           {/* Damage Section */}
//           {/* <div className="bg-white rounded-lg border border-gray-300 p-4">
//             <h3 className="text-orange-500 font-medium text-center mb-6">Damarage Section!</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6">
//               <InputField name="damarageDay" label="Damarage Day" />
//               <InputField name="damarageRate" label="Damarage Rate" />
//               <InputField name="damarageTotal" label="Damarage Total" readOnly />
//             </div>
//           </div> */}

//           {/* Customer & Payment Section */}
//           {/* <div className="bg-white rounded-lg border border-gray-300 p-4">
//             <h3 className="text-orange-500 font-medium text-center mb-6">Customer & Payment Section!</h3>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5">
              
//               <InputField name="rent_Amount" label="Rent Amount" />
//             </div>
//           </div> */}

//           {/* Submit Button */}
//           <div className="flex justify-start">
//             <button type="submit" className="bg-slate-800 text-white px-8 py-2 rounded-md hover:bg-slate-700 transition-colors">
//               Submit
//             </button>
//           </div>
//         </div>

//         {/* Bottom Navigation */}
//         <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2 flex items-center justify-between md:hidden">
//           <div className="flex items-center space-x-4">
//             <Menu className="h-6 w-6 text-gray-600" />
//             <span className="text-gray-600">Home</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <X className="h-5 w-5 text-gray-600" />
//             <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
//               <User className="h-5 w-5 text-white" />
//             </div>
//           </div>
//         </div>
//         </div>
//       </form>
//     </FormProvider>
//   );
// }




// import { useForm, FormProvider, useWatch } from "react-hook-form"
// import { Calendar, Menu, X, User } from "lucide-react"
// import { useNavigate, useParams } from "react-router-dom" // Using react-router-dom
// import toast, { Toaster } from "react-hot-toast"
// import { useEffect, useRef, useState } from "react"
// import { InputField, SelectField } from "../components/Form/FormFields"

// export default function AddTripForm() {
//   const navigate = useNavigate()
//   const { id } = useParams() // Get ID from URL params
//   const dateRef = useRef(null)

//   const methods = useForm({
//     defaultValues: {
//       date: "",
//       load_point: "",
//       unload_point: "",
//       vehicle_no: "",
//       driver_name: "",
//       driver_mobile: "",
//       fuel_cost: "",
//       toll_cost: "",
//       police_cost: "",
//       driver_commission: "",
//       labor: "",
//       others: "",
//       damarageDay: "",
//       damarageRate: "",
//       customer: "",
//       parking_cost: "",
//       night_guard: "",
//       feri_cost: "",
//       chada: "",
//       food_cost: "",
//       total_exp: 0,
//       total: 0,
//       damarageTotal: 0,
//       transport_type: "",
//       total_rent: "",
//       challan: "",
//       trip_rent: "",
//       advance: "",
//       due_amount: "",
//       customer_mobile: "",
//       driver_adv: "",
//     },
//   })

//   const { handleSubmit, control, watch, setValue, register, reset } = methods
//   const selectedTransport = watch("transport_type")

//   // Watch fields for total expense calculation
//   const fuelCost = Number.parseFloat(watch("fuel_cost") || 0)
//   const tollCost = Number.parseFloat(watch("toll_cost") || 0)
//   const policeCost = Number.parseFloat(watch("police_cost") || 0)
//   const driverCommision = Number.parseFloat(watch("driver_commission") || 0)
//   const labourCost = Number.parseFloat(watch("labor") || 0)
//   const othersCost = Number.parseFloat(watch("others") || 0)
//   const parkingCost = Number.parseFloat(watch("parking_cost") || 0)
//   const nightGuardCost = Number.parseFloat(watch("night_guard") || 0)
//   const feriCost = Number.parseFloat(watch("feri_cost") || 0)
//   const chadaCost = Number.parseFloat(watch("chada") || 0)
//   const foodCost = Number.parseFloat(watch("food_cost") || 0)
//   const damarageDay = Number.parseFloat(watch("damarageDay") || 0)
//   const damarageRate = Number.parseFloat(watch("damarageRate") || 0)

//   // Calculate Total Expense for own_transport
//   useEffect(() => {
//     const total =
//       driverCommision +
//       labourCost +
//       parkingCost +
//       nightGuardCost +
//       tollCost +
//       feriCost +
//       policeCost +
//       foodCost +
//       chadaCost +
//       fuelCost +
//       othersCost
//     setValue("total_exp", total)
//   }, [
//     driverCommision,
//     labourCost,
//     parkingCost,
//     nightGuardCost,
//     tollCost,
//     feriCost,
//     policeCost,
//     chadaCost,
//     foodCost,
//     fuelCost,
//     othersCost,
//     setValue,
//   ])

//   // Calculate total and damarageTotal (from original watchFields useEffect)
//   useEffect(() => {
//     const total = fuelCost + tollCost + policeCost + driverCommision + labourCost + foodCost + othersCost
//     const damarageTotal = damarageDay * damarageRate
//     setValue("total", total)
//     setValue("damarageTotal", damarageTotal)
//   }, [
//     fuelCost,
//     tollCost,
//     policeCost,
//     driverCommision,
//     labourCost,
//     foodCost,
//     othersCost,
//     damarageDay,
//     damarageRate,
//     setValue,
//   ])

//   useEffect(() => {
//     if (tripData) {
//       reset({
//         driver_name: tripData.driver_name || "",
//         driver_mobile: tripData.driver_mobile || "",
//         driver_commission: tripData.driver_commission || "",
//         driver_adv: tripData.driver_adv || "",
//         vehicle_no: tripData.vehicle_no || "",
//         load_point: tripData.load_point || "",
//         unload_point: tripData.unload_point || "",
//         total_rent: tripData.total_rent || "",
//         total_exp: tripData.total_exp || "",
//         // Add other fields as needed
//       });
//     }
//   }, [tripData, reset]);
//   // Fetch existing trip data for update if ID is present
//   useEffect(() => {
//     if (id) {
//       const fetchTripData = async () => {
//         try {
//           const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/trip/show/${id}`)
//           if (res.ok) {
//             const data = await res.json()
//           console.log("Trip data:", data)
//             // Format date for input type="date"
//             if (data.date) {
//               data.date = new Date(data.date).toISOString().split("T")[0]
//             }
//             reset(data) // Populate form with fetched data
            
//           } else {
//             toast.error("Failed to fetch trip data.")
//           }
//         } catch (error) {
//           console.error("Error fetching trip data:", error)
//           toast.error("Something went wrong while fetching trip data.")
//         }
//       }
//       fetchTripData()
//     }
//   }, [id, reset]) // Depend on 'id' and 'reset'

//   const onSubmit = async (data) => {
//     let url = ""
//     let method = ""
//     let successMessage = ""
//     let errorMessage = ""

//     if (id) {
//       // Update existing trip
//       url = `${import.meta.env.VITE_BASE_URL}/api/trip/update/${id}`
//       method = "PUT"
//       successMessage = "Trip updated successfully!"
//       errorMessage = "Failed to update the trip."
//     } else {
//       // Add new trip
//       url = `${import.meta.env.VITE_BASE_URL}/api/trip/create`
//       method = "POST"
//       successMessage = "Trip Added successfully!"
//       errorMessage = "Failed to add the trip."
//     }

//     try {
//       const res = await fetch(url, {
//         method: method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       })
//       if (res.ok) {
//         toast.success(successMessage)
//         navigate("/tramessy/tripList")
//       } else {
//         toast.error(errorMessage)
//       }
//     } catch (error) {
//       console.error(error)
//       toast.error("Something went wrong.")
//     }
//   }

//   // select vehicle from api
//   const [vehicle, setVehicle] = useState([])
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/vehicle/list`)
//       .then((response) => response.json())
//       .then((data) => setVehicle(data.data))
//       .catch((error) => console.error("Error fetching vehicle data:", error))
//   }, [])
//   const vehicleOptions = vehicle.map((vehicle) => ({
//     value: vehicle.vehicle_name,
//     label: vehicle.vehicle_name,
//   }))

//   // driver
//   const [driver, setDriver] = useState([])
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/driver/list`)
//       .then((response) => response.json())
//       .then((data) => setDriver(data.data))
//       .catch((error) => console.error("Error fetching driver data:", error))
//   }, [])
//   const driverOptions = driver.map((driver) => ({
//     value: driver.driver_name,
//     label: driver.driver_name,
//     mobile: driver.driver_mobile,
//   }))

//   // Driver name এর পরিবর্তন দেখুন
//   const selectedDriverName = useWatch({
//     control,
//     name: "driver_name",
//   })
//   useEffect(() => {
//     const selectedDriver = driverOptions.find((d) => d.value === selectedDriverName)
//     if (selectedDriver) {
//       methods.setValue("driver_mobile", selectedDriver.mobile || "")
//     }
//   }, [selectedDriverName, driverOptions, methods])

//   // select vendor Vehicle No. from api
//   const [vendorVehicle, setVendorVehicle] = useState([])
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/rent/list`)
//       .then((response) => response.json())
//       .then((data) => setVendorVehicle(data.data))
//       .catch((error) => console.error("Error fetching vehicle data:", error))
//   }, [])
//   const vendorVehicleOptions = vendorVehicle.map((dt) => ({
//     value: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
//     label: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
//   }))

//   // select own driver from api (this seems to be vendor drivers based on original code)
//   const [vendorDrivers, setVendorDrivers] = useState([])
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/rent/list`)
//       .then((response) => response.json())
//       .then((data) => setVendorDrivers(data.data))
//       .catch((error) => console.error("Error fetching vendor data:", error))
//   }, [])
//   const vendorDriverOptions = vendorDrivers?.map((dt) => ({
//     value: dt.vendor_name,
//     label: dt.vendor_name,
//     contact: dt.mobile,
//   }))

//   // select own driver from api (this seems to be actual own drivers based on original code)
//   const [ownDrivers, setOwnDrivers] = useState([])
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/driver/list`)
//       .then((response) => response.json())
//       .then((data) => setOwnDrivers(data.data))
//       .catch((error) => console.error("Error fetching driver data:", error))
//   }, [])
//   const ownDriverOptions = ownDrivers.map((driver) => ({
//     value: driver.driver_name,
//     label: driver.driver_name,
//     contact: driver.driver_mobile,
//   }))

//   // customer
//   const [customer, setCustomer] = useState([])
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/customer/list`)
//       .then((response) => response.json())
//       .then((data) => setCustomer(data.data))
//       .catch((error) => console.error("Error fetching customer data:", error))
//   }, [])
//   const customerOptions = customer.map((customer) => ({
//     value: customer.customer_name,
//     label: customer.customer_name,
//     mobile: customer.mobile,
//   }))

//   // Customer name এর পরিবর্তন দেখুন
//   const selectedCustomerName = useWatch({
//     control,
//     name: "customer",
//   })
//   useEffect(() => {
//     const selectedCustomer = customerOptions.find((d) => d.value === selectedCustomerName)
//     if (selectedCustomer) {
//       methods.setValue("customer_mobile", selectedCustomer.mobile || "")
//     }
//   }, [selectedCustomerName, customerOptions, methods])

//   return (
//     <FormProvider {...methods}>
//       <Toaster />
//       <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen mt-10">
//         {/* Form Header */}
//         <div className="bg-primary text-white px-4 py-2 rounded-t-md">
//           <h2 className="text-lg font-medium">{id ? "Update Trip Form" : "Trip Create Form"}</h2>
//         </div>
//         <div className="rounded-b-md shadow border border-gray-200">
//           <div className="p-4 space-y-2">
//             {/* Trip & Destination Section */}
//             <div className="bg-white rounded-lg border border-gray-300 p-4">
//               <h3 className="text-orange-500 font-medium text-center mb-6">Trip & Destination Section!</h3>
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6">
//                 <div className="relative w-full">
//                   <InputField
//                     name="date"
//                     label="Date"
//                     type="date"
//                     required
//                     inputRef={(e) => {
//                       register("date").ref(e)
//                       dateRef.current = e
//                     }}
//                     icon={
//                       <span
//                         className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r"
//                         onClick={() => dateRef.current?.showPicker?.()}
//                       >
//                         <Calendar className="text-white cursor-pointer" />
//                       </span>
//                     }
//                   />
//                 </div>
//                 <SelectField
//                   name="customer"
//                   label="Customer Name"
//                   options={customerOptions}
//                   control={control}
//                   required
//                 />
//                 <InputField name="customer_mobile" label="Customer Number"  />
//               </div>
//               <div className="flex gap-x-6">
//                 <div className="w-full">
//                   {" "}
//                   <InputField name="load_point" label="Load Point" placeholder="Load Point" />
//                 </div>
//                 <div className="w-full">
//                   <InputField name="unload_point" label="Unload Point" placeholder="Unload Point" />
//                 </div>
//               </div>
//             </div>
//             {/* Vehicle & Driver Information */}
//             <div className="bg-white rounded-lg border border-gray-300 p-4">
//               <h3 className="text-orange-500 font-medium text-center mb-6">Vehicle & Driver Information!</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6">
//                 <SelectField
//                   name="transport_type"
//                   label="Transport Type"
//                   required
//                   options={[
//                     { value: "own_transport", label: "Own Transport" },
//                     {
//                       value: "vendor_transport",
//                       label: "Vendor Transport",
//                     },
//                   ]}
//                 />
//                 {/* vehicle no transportn based */}
//                 {selectedTransport === "own_transport" ? (
//                   <SelectField
//                     name="vehicle_no"
//                     label="Vehicle No."
//                     required={true}
//                     options={vehicleOptions}
//                     control={control}
//                   />
//                 ) : selectedTransport === "vendor_transport" ? (
//                   <SelectField
//                     name="vehicle_no"
//                     label="Vehicle No."
//                     required={true}
//                     options={vendorVehicleOptions}
//                     control={control}
//                   />
//                 ) : (
//                   <SelectField
//                     name="vehicle_no"
//                     label="Vehicle No."
//                     defaultValue={""}
//                     required={true}
//                     options={[
//                       {
//                         label: "Please select transport first",
//                         value: "",
//                         disabled: true,
//                       },
//                     ]}
//                     control={control}
//                   />
//                 )}
//                 {/* driver name transport based */}
//                 {selectedTransport === "own_transport" ? (
//                   <SelectField
//                     name="driver_name"
//                     label="Driver Name"
//                     required
//                     control={control}
//                     options={ownDriverOptions}
//                     onSelectChange={(selectedOption) => {
//                       setValue("driver_mobile", selectedOption?.contact || "")
//                     }}
//                   />
//                 ) : selectedTransport === "vendor_transport" ? (
//                   <SelectField
//                     name="driver_name"
//                     label="Driver Name"
//                     required
//                     control={control}
//                     options={vendorDriverOptions}
//                   />
//                 ) : (
//                   <SelectField
//                     name="driver_name"
//                     label="Driver Name"
//                     required
//                     control={control}
//                     defaultValue={""}
//                     options={[
//                       {
//                         label: "Please select transport first",
//                         value: "",
//                         disabled: true,
//                       },
//                     ]}
//                   />
//                 )}
//                 <InputField name="total_rent" label="Total Rent/Bill Amount" type="number" required />
//                 <InputField name="challan" label="Challan" required />
//               </div>
//             </div>
//             {/* own transport */}
//             {selectedTransport === "own_transport" && (
//               <div className="border border-gray-300 p-5 rounded-md mt-5">
//                 <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
//                   <div className="w-full">
//                     <InputField name="driver_adv" label="Driver Advance" required type="number" />
//                   </div>
//                   <div className="w-full">
//                     <InputField name="driver_commission" label="Driver Commission" required type="number" />
//                   </div>
//                   <div className="w-full">
//                     <InputField name="labor" label="Labour Cost" type="number" />
//                   </div>
//                   <div className="w-full">
//                     <InputField name="fuel_cost" label="Fuel Cost" type="number" />
//                   </div>
//                 </div>
//                 <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
//                   <div className="w-full">
//                     <InputField name="parking_cost" label="Parking Cost" type="number" />
//                   </div>
//                   <div className="w-full">
//                     <InputField name="night_guard" label="Night Guard Cost" type="number" />
//                   </div>
//                   <div className="w-full">
//                     <InputField name="toll_cost" label="Toll Cost" type="number" />
//                   </div>
//                   <div className="w-full">
//                     <InputField name="feri_cost" label="Feri Cost" type="number" />
//                   </div>
//                 </div>
//                 <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
//                   <div className="w-full">
//                     <InputField name="police_cost" label="Police Cost" type="number" />
//                   </div>
//                   <div className="w-full">
//                     <InputField name="chada" label="Chada" type="number" />
//                   </div>
//                   <div className="w-full">
//                     <InputField name="food_cost" label="Food Cost" type="number" />
//                   </div>
//                   <div className="w-full">
//                     <InputField name="total_exp" label="Total Expense" readOnly value={watch("total_exp")} />
//                   </div>
//                 </div>
//               </div>
//             )}
//             {/* vendor transport */}
//             {selectedTransport === "vendor_transport" && (
//               <div className="border border-gray-300 p-5 rounded-md mt-5 md:mt-3 md:flex justify-between gap-3">
//                 <div className="w-full">
//                   <InputField name="trip_rent" label="Trip Rent" required type="number" />
//                 </div>
//                 <div className="w-full">
//                   <InputField name="advance" label="Advance" required type="number" />
//                 </div>
//                 <div className="w-full">
//                   <InputField name="due_amount" label="Due Amount" required type="number" />
//                 </div>
//               </div>
//             )}
//             {/* Submit Button */}
//             <div className="flex justify-start">
//               <button
//                 type="submit"
//                 className="bg-slate-800 text-white px-8 py-2 rounded-md hover:bg-slate-700 transition-colors"
//               >
//                 {id ? "Update Trip" : "Submit"}
//               </button>
//             </div>
//           </div>
//           {/* Bottom Navigation */}
//           <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2 flex items-center justify-between md:hidden">
//             <div className="flex items-center space-x-4">
//               <Menu className="h-6 w-6 text-gray-600" />
//               <span className="text-gray-600">Home</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <X className="h-5 w-5 text-gray-600" />
//               <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
//                 <User className="h-5 w-5 text-white" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </FormProvider>
//   )
// }





import { useForm, FormProvider, useWatch } from "react-hook-form"
import { Calendar, Menu, X, User } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom" // Using react-router-dom
import toast, { Toaster } from "react-hot-toast"
import { useEffect, useRef, useState } from "react"
import { InputField, SelectField } from "../components/Form/FormFields"
import useRefId from "../hooks/useRef"
import BtnSubmit from "../components/Button/BtnSubmit"


export default function AddTripForm() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams() // Get ID from URL params
  const dateRef = useRef(null)

  const methods = useForm({
    defaultValues: {
      date: "",
      load_point: "",
      unload_point: "",
      vehicle_no: "",
      driver_name: "",
      driver_mobile: "",
      fuel_cost: "",
      toll_cost: "",
      police_cost: "",
      driver_commission: "",
      labor: "",
      others: "",
      damarageDay: "",
      damarageRate: "",
      customer: "",
      parking_cost: "",
      night_guard: "",
      feri_cost: "",
      chada: "",
      food_cost: "",
      total_exp: 0,
      total: 0,
      damarageTotal: 0,
      transport_type: "",
      total_rent: "",
      challan: "",
      trip_rent: "",
      advance: "",
      due_amount: "",
      customer_mobile: "",
      driver_adv: "",
    },
  })

  const { handleSubmit, control, watch, setValue, register, reset } = methods
  const selectedTransport = watch("transport_type")

  // Watch fields for total expense calculation
  const fuelCost = Number.parseFloat(watch("fuel_cost") || 0)
  const tollCost = Number.parseFloat(watch("toll_cost") || 0)
  const policeCost = Number.parseFloat(watch("police_cost") || 0)
  const driverCommision = Number.parseFloat(watch("driver_commission") || 0)
  const labourCost = Number.parseFloat(watch("labor") || 0)
  const othersCost = Number.parseFloat(watch("others") || 0)
  const parkingCost = Number.parseFloat(watch("parking_cost") || 0)
  const nightGuardCost = Number.parseFloat(watch("night_guard") || 0)
  const feriCost = Number.parseFloat(watch("feri_cost") || 0)
  const chadaCost = Number.parseFloat(watch("chada") || 0)
  const foodCost = Number.parseFloat(watch("food_cost") || 0)
  const damarageDay = Number.parseFloat(watch("damarageDay") || 0)
  const damarageRate = Number.parseFloat(watch("damarageRate") || 0)

  // Calculate Total Expense for own_transport
  useEffect(() => {
    const total =
      driverCommision +
      labourCost +
      parkingCost +
      nightGuardCost +
      tollCost +
      feriCost +
      policeCost +
      foodCost +
      chadaCost +
      fuelCost +
      othersCost
    setValue("total_exp", total)
  }, [
    driverCommision,
    labourCost,
    parkingCost,
    nightGuardCost,
    tollCost,
    feriCost,
    policeCost,
    chadaCost,
    foodCost,
    fuelCost,
    othersCost,
    setValue,
  ])

  // Calculate total and damarageTotal (from original watchFields useEffect)
  useEffect(() => {
    const total = fuelCost + tollCost + policeCost + driverCommision + labourCost + foodCost + othersCost
    const damarageTotal = damarageDay * damarageRate
    setValue("total", total)
    setValue("damarageTotal", damarageTotal)
  }, [
    fuelCost,
    tollCost,
    policeCost,
    driverCommision,
    labourCost,
    foodCost,
    othersCost,
    damarageDay,
    damarageRate,
    setValue,
  ])

  // State variables for options
  const [vehicle, setVehicle] = useState([])
  const [driver, setDriver] = useState([])
  const [vendorVehicle, setVendorVehicle] = useState([])
  const [vendorDrivers, setVendorDrivers] = useState([])
  const [customer, setCustomer] = useState([])
  const [vendors, setVendors] = useState([])
console.log(vendors, 'ven')
  // Fetch all necessary data (trip and options) in one go
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch all options concurrently
        const [vehicleRes, driverRes, vendorVehicleRes, vendorDriversRes, customerRes, vendorRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BASE_URL}/api/vehicle/list`),
          fetch(`${import.meta.env.VITE_BASE_URL}/api/driver/list`),
          fetch(`${import.meta.env.VITE_BASE_URL}/api/rent/list`), // Vendor vehicles
          fetch(`${import.meta.env.VITE_BASE_URL}/api/rent/list`), // Vendor drivers (assuming same endpoint)
          fetch(`${import.meta.env.VITE_BASE_URL}/api/customer/list`),
          fetch(`${import.meta.env.VITE_BASE_URL}/api/vendor/list`)
        ])

        const [vehicleData, driverData, vendorVehicleData, vendorDriversData, customerData, vendorListData] = await Promise.all([
          vehicleRes.json(),
          driverRes.json(),
          vendorVehicleRes.json(),
          vendorDriversRes.json(),
          customerRes.json(),
          vendorRes.json()
        ])

        setVehicle(vehicleData.data)
        setDriver(driverData.data)
        setVendorVehicle(vendorVehicleData.data)
        setVendorDrivers(vendorDriversData.data)
        setCustomer(customerData.data)
        setVendors(vendorListData.data)

        // If in update mode, fetch trip data and reset form
        if (id) {
          const apiResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/trip/show/${id}`)
          if (apiResponse.ok) {
            const { data: tripData } = await apiResponse.json() 

            // Format date for input type="date"
            if (tripData.date) {
              tripData.date = new Date(tripData.date).toISOString().split("T")[0]
            }

            // Ensure numbers are parsed correctly if they come as strings from API
            // Spread tripData first to include all fields, then override numeric ones
            const parsedTripData = {
              ...tripData, // Spread all fields from the extracted tripData
              fuel_cost: Number.parseFloat(tripData.fuel_cost || 0),
              toll_cost: Number.parseFloat(tripData.toll_cost || 0),
              police_cost: Number.parseFloat(tripData.police_cost || 0),
              driver_commission: Number.parseFloat(tripData.driver_commission || 0),
              labor: Number.parseFloat(tripData.labor || 0),
              others: Number.parseFloat(tripData.others || 0),
              parking_cost: Number.parseFloat(tripData.parking_cost || 0),
              night_guard: Number.parseFloat(tripData.night_guard || 0),
              feri_cost: Number.parseFloat(tripData.feri_cost || 0),
              chada: Number.parseFloat(tripData.chada || 0),
              food_cost: Number.parseFloat(tripData.food_cost || 0),
              total_exp: Number.parseFloat(tripData.total_exp || 0),
              total: Number.parseFloat(tripData.total || 0),
              damarageTotal: Number.parseFloat(tripData.damarageTotal || 0),
              total_rent: Number.parseFloat(tripData.total_rent || 0),
              trip_rent: Number.parseFloat(tripData.trip_rent || 0),
              advance: Number.parseFloat(tripData.advance || 0),
              due_amount: Number.parseFloat(tripData.due_amount || 0),
              driver_adv: Number.parseFloat(tripData.driver_adv || 0),
            }
            console.log("Data to reset with (parsed and flattened):", parsedTripData) // Debugging log
            reset(parsedTripData) // Populate form with fetched data
          } else {
            toast.error("Failed to fetch trip data.")
          }
        }
      } catch (error) {
        console.error("Error fetching initial data:", error)
        toast.error("Something went wrong while fetching initial data.")
      }
    }

    fetchAllData()
  }, [id, reset]) // Depend on 'id' and 'reset'

  // Option mappings (these will now use the state variables populated above)
  const vehicleOptions = vehicle.map((vehicle) => ({
    value: vehicle.vehicle_name,
    label: vehicle.vehicle_name,
  }))
  const driverOptions = driver.map((driver) => ({
    value: driver.driver_name,
    label: driver.driver_name,
    mobile: driver.driver_mobile,
  }))
  const vendorVehicleOptions = vendorVehicle.map((dt) => ({
    value: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
    label: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
  }))
  const vendorDriverOptions = vendorDrivers?.map((dt) => ({
    value: dt.vendor_name,
    label: dt.vendor_name,
    contact: dt.mobile,
  }))
  const ownDriverOptions = driver.map((driver) => ({
    // Using 'driver' state here, assuming it contains all drivers
    value: driver.driver_name,
    label: driver.driver_name,
    contact: driver.driver_mobile,
  }))
  const customerOptions = customer.map((customer) => ({
    value: customer.customer_name,
    label: customer.customer_name,
    mobile: customer.mobile,
  }))
// database unique id create
  const generateRefId = useRefId();
  const onSubmit = async (data) => {
    const refId = generateRefId();
    let url = ""
    let method = ""
    let successMessage = ""
    let errorMessage = ""

    if (id) {
      // Update existing trip
      url = `${import.meta.env.VITE_BASE_URL}/api/trip/update/${id}`
      method = "POST"
      successMessage = "Trip updated successfully!"
      errorMessage = "Failed to update the trip."
    } else {
      data.ref_id= refId;
      // Add new trip
      url = `${import.meta.env.VITE_BASE_URL}/api/trip/create`
      method = "POST"
      successMessage = "Trip Added successfully!"
      errorMessage = "Failed to add the trip."
    }

    try {
      setLoading(true);
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        toast.success(successMessage)
        navigate("/tramessy/tripList")
      } else {
        toast.error(errorMessage)
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong.")
    } finally {
    setLoading(false); 
  }
  }

  // Driver name এর পরিবর্তন দেখুন
  const selectedDriverName = useWatch({
    control,
    name: "driver_name",
  })
  useEffect(() => {
    const selectedDriver = driverOptions.find((d) => d.value === selectedDriverName)
    if (selectedDriver) {
      methods.setValue("driver_mobile", selectedDriver.mobile || "")
    }
  }, [selectedDriverName, driverOptions, methods])

  // Customer name এর পরিবর্তন দেখুন
  const selectedCustomerName = useWatch({
    control,
    name: "customer",
  })
  useEffect(() => {
    const selectedCustomer = customerOptions.find((d) => d.value === selectedCustomerName)
    if (selectedCustomer) {
      methods.setValue("customer_mobile", selectedCustomer.mobile || "")
    }
  }, [selectedCustomerName, customerOptions, methods])
  // vendor name
const vendorOptions = vendors.map((vendor) => ({
  value: vendor.vendor_name,
  label: vendor.vendor_name,
}))
  return (
    <FormProvider {...methods}>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen mt-10">
        {/* Form Header */}
        <div className="bg-primary text-white px-4 py-2 rounded-t-md">
          <h2 className="text-lg font-medium">{id ? "Update Trip Form" : "Trip Create Form"}</h2>
        </div>
        <div className="rounded-b-md shadow border border-gray-200">
          <div className="p-4 space-y-2">
            {/* Trip & Destination Section */}
            <div className="bg-white rounded-lg border border-gray-300 p-4">
              <h3 className="text-orange-500 font-medium text-center mb-6">Trip & Destination Section!</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6">
                <div className="relative w-full">
                  <InputField
                    name="date"
                    label="Date"
                    type="date"
                    required={!id}
                    inputRef={(e) => {
                      // This ref is for the date picker functionality
                      dateRef.current = e
                    }}
                    icon={
                      <span
                        className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r"
                        onClick={() => dateRef.current?.showPicker?.()}
                      >
                        <Calendar className="text-white cursor-pointer" />
                      </span>
                    }
                  />
                </div>
                <SelectField
                  name="customer"
                  label="Customer Name"
                  options={customerOptions}
                  control={control}
                  required={!id}
                />
                <InputField name="customer_mobile" label="Customer Number" />
              </div>
              <div className="flex gap-x-6">
                <div className="w-full">
                  {" "}
                  <InputField name="load_point" label="Load Point" placeholder="Load Point" required={!id}/>
                </div>
                <div className="w-full">
                  <InputField name="unload_point" label="Unload Point" placeholder="Unload Point" required={!id}/>
                </div>
              </div>
            </div>
            {/* Vehicle & Driver Information */}
            <div className="bg-white rounded-lg border border-gray-300 p-4">
              <h3 className="text-orange-500 font-medium text-center mb-6">Vehicle & Driver Information!</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6">
                <SelectField
                  name="transport_type"
                  label="Transport Type"
                  required={!id}
                  options={[
                    { value: "own_transport", label: "Own Transport" },
                    {
                      value: "vendor_transport",
                      label: "Vendor Transport",
                    },
                  ]}
                />
                {/* vehicle no transportn based */}
                {selectedTransport === "own_transport" ? (
                  <SelectField
                    name="vehicle_no"
                    label="Vehicle No."
                    required={!id}
                    options={vehicleOptions}
                    control={control}
                  />
                ) : selectedTransport === "vendor_transport" ? (
                  <SelectField
                    name="vehicle_no"
                    label="Vehicle No."
                    required={!id}
                    options={vendorVehicleOptions}
                    control={control}
                  />
                ) : (
                  <SelectField
                    name="vehicle_no"
                    label="Vehicle No."
                    defaultValue={""}
                    required={!id}
                    options={[
                      {
                        label: "Please select transport first",
                        value: "",
                        disabled: true,
                      },
                    ]}
                    control={control}
                  />
                )}
                {/* vendor name */}
                { selectedTransport === "vendor_transport" ? (
                  <SelectField
                    name="vendor_name"
                    label="Vendor Name"
                    required={!id}
                    control={control}
                    options={vendorOptions}
                  />
                ) : ""}
                {/* driver name transport based */}
                {selectedTransport === "own_transport" ? (
                  <SelectField
                    name="driver_name"
                    label="Driver Name"
                    required={!id}
                    control={control}
                    options={ownDriverOptions}
                    onSelectChange={(selectedOption) => {
                      setValue("driver_mobile", selectedOption?.contact || "")
                    }}
                  />
                ) : selectedTransport === "vendor_transport" ? (
                  <SelectField
                    name="driver_name"
                    label="Driver Name"
                    required={!id}
                    control={control}
                    options={vendorDriverOptions}
                  />
                ) : (
                  <SelectField
                    name="driver_name"
                    label="Driver Name"
                    required={!id}
                    control={control}
                    defaultValue={""}
                    options={[
                      {
                        label: "Please select transport first",
                        value: "",
                        disabled: true,
                      },
                    ]}
                  />
                )}
                <InputField name="total_rent" label="Total Rent/Bill Amount" type="number" required={!id} />
                <InputField name="challan" label="Challan" required={!id} />
              </div>
            </div>
            {/* own transport */}
            {selectedTransport === "own_transport" && (
              <div className="border border-gray-300 p-5 rounded-md mt-5">
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full">
                    <InputField name="driver_adv" label="Driver Advance"  type="number" />
                  </div>
                  <div className="w-full">
                    <InputField name="driver_commission" label="Driver Commission"  type="number" />
                  </div>
                  <div className="w-full">
                    <InputField name="labor" label="Labour Cost" type="number" />
                  </div>
                  <div className="w-full">
                    <InputField name="fuel_cost" label="Fuel Cost" type="number" />
                  </div>
                </div>
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full">
                    <InputField name="parking_cost" label="Parking Cost" type="number" />
                  </div>
                  <div className="w-full">
                    <InputField name="night_guard" label="Night Guard Cost" type="number" />
                  </div>
                  <div className="w-full">
                    <InputField name="toll_cost" label="Toll Cost" type="number" />
                  </div>
                  <div className="w-full">
                    <InputField name="feri_cost" label="Feri Cost" type="number" />
                  </div>
                </div>
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full">
                    <InputField name="police_cost" label="Police Cost" type="number" />
                  </div>
                  <div className="w-full">
                    <InputField name="chada" label="Chada" type="number" />
                  </div>
                  <div className="w-full">
                    <InputField name="food_cost" label="Food Cost" type="number" />
                  </div>
                  <div className="w-full">
                    <InputField name="total_exp" label="Total Expense" readOnly />
                  </div>
                </div>
              </div>
            )}
            {/* vendor transport */}
            {selectedTransport === "vendor_transport" && (
              <div className="border border-gray-300 p-5 rounded-md mt-5 md:mt-3 md:flex justify-between gap-3">
                <div className="w-full">
                  <InputField name="total_exp" label="Trip Expense" required={!id} type="number" />
                </div>
                <div className="w-full">
                  <InputField name="advance" label="Advance" required={!id} type="number" />
                </div>
                <div className="w-full">
                  <InputField name="due_amount" label="Due Amount" required={!id} type="number" />
                </div>
              </div>
            )}
            {/* Submit Button */}
            <div className="flex justify-start">
              <BtnSubmit
                // type="submit"
                // className="bg-slate-800 text-white px-8 py-2 rounded-md hover:bg-slate-700 transition-colors"
                loading={loading}
              >
                {id ? "Update Trip" : "Submit"}
              </BtnSubmit>
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
  )
}
