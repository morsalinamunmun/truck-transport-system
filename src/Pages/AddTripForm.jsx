
// import { useForm, FormProvider, useWatch } from "react-hook-form"
// import { Calendar, Menu, X, User } from "lucide-react"
// import { useNavigate, useParams } from "react-router-dom" // Using react-router-dom
// import toast, { Toaster } from "react-hot-toast"
// import { useEffect, useRef, useState } from "react"
// import { InputField, SelectField } from "../components/Form/FormFields"
// import useRefId from "../hooks/useRef"
// import BtnSubmit from "../components/Button/BtnSubmit"


// export default function AddTripForm() {
//   const [loading, setLoading] = useState(false)
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
//       d_day: "",
//       d_amount: "",
//       customer: "",
//       parking_cost: "",
//       night_guard: "",
//       feri_cost: "",
//       chada: "",
//       food_cost: "",
//       total_exp: 0,
//       total: 0,
//       d_total: 0,
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
//   const d_day = Number.parseFloat(watch("d_day") || 0)
//   const d_amount = Number.parseFloat(watch("d_amount") || 0)

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

//   // Calculate total and d_total (from original watchFields useEffect)
//   useEffect(() => {
//     const total = fuelCost + tollCost + policeCost + driverCommision + labourCost + foodCost + othersCost
//     const d_total = d_day * d_amount
//     setValue("total", total)
//     setValue("d_total", d_total)
//   }, [
//     fuelCost,
//     tollCost,
//     policeCost,
//     driverCommision,
//     labourCost,
//     foodCost,
//     othersCost,
//     d_day,
//     d_amount,
//     setValue,
//   ])

//   // State variables for options
//   const [vehicle, setVehicle] = useState([])
//   const [driver, setDriver] = useState([])
//   const [vendorVehicle, setVendorVehicle] = useState([])
//   const [vendorDrivers, setVendorDrivers] = useState([])
//   const [customer, setCustomer] = useState([])
//   const [vendors, setVendors] = useState([])

//   // Fetch all necessary data (trip and options) in one go
//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         // Fetch all options concurrently
//         const [vehicleRes, driverRes, vendorVehicleRes, vendorDriversRes, customerRes, vendorRes] = await Promise.all([
//           fetch(`${import.meta.env.VITE_BASE_URL}/api/vehicle/list`),
//           fetch(`${import.meta.env.VITE_BASE_URL}/api/driver/list`),
//           fetch(`${import.meta.env.VITE_BASE_URL}/api/rent/list`), // Vendor vehicles
//           fetch(`${import.meta.env.VITE_BASE_URL}/api/rent/list`), // Vendor drivers (assuming same endpoint)
//           fetch(`${import.meta.env.VITE_BASE_URL}/api/customer/list`),
//           fetch(`${import.meta.env.VITE_BASE_URL}/api/vendor/list`)
//         ])

//         const [vehicleData, driverData, vendorVehicleData, vendorDriversData, customerData, vendorListData] = await Promise.all([
//           vehicleRes.json(),
//           driverRes.json(),
//           vendorVehicleRes.json(),
//           vendorDriversRes.json(),
//           customerRes.json(),
//           vendorRes.json()
//         ])

//         setVehicle(vehicleData.data)
//         setDriver(driverData.data)
//         setVendorVehicle(vendorVehicleData.data)
//         setVendorDrivers(vendorDriversData.data)
//         setCustomer(customerData.data)
//         setVendors(vendorListData.data)

//         // If in update mode, fetch trip data and reset form
//         if (id) {
//           const apiResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/trip/show/${id}`)
//           if (apiResponse.ok) {
//             const { data: tripData } = await apiResponse.json() 

//             // Format date for input type="date"
//             if (tripData.date) {
//               tripData.date = new Date(tripData.date).toISOString().split("T")[0]
//             }

//             // Ensure numbers are parsed correctly if they come as strings from API
//             // Spread tripData first to include all fields, then override numeric ones
//             const parsedTripData = {
//               ...tripData, // Spread all fields from the extracted tripData
//               fuel_cost: Number.parseFloat(tripData.fuel_cost || 0),
//               toll_cost: Number.parseFloat(tripData.toll_cost || 0),
//               police_cost: Number.parseFloat(tripData.police_cost || 0),
//               driver_commission: Number.parseFloat(tripData.driver_commission || 0),
//               labor: Number.parseFloat(tripData.labor || 0),
//               others: Number.parseFloat(tripData.others || 0),
//               parking_cost: Number.parseFloat(tripData.parking_cost || 0),
//               night_guard: Number.parseFloat(tripData.night_guard || 0),
//               feri_cost: Number.parseFloat(tripData.feri_cost || 0),
//               chada: Number.parseFloat(tripData.chada || 0),
//               food_cost: Number.parseFloat(tripData.food_cost || 0),
//               total_exp: Number.parseFloat(tripData.total_exp || 0),
//               total: Number.parseFloat(tripData.total || 0),
//               d_total: Number.parseFloat(tripData.d_total || 0),
//               total_rent: Number.parseFloat(tripData.total_rent || 0),
//               trip_rent: Number.parseFloat(tripData.trip_rent || 0),
//               advance: Number.parseFloat(tripData.advance || 0),
//               due_amount: Number.parseFloat(tripData.due_amount || 0),
//               driver_adv: Number.parseFloat(tripData.driver_adv || 0),
//             }
          
//             reset(parsedTripData) // Populate form with fetched data
//           } else {
//             toast.error("Failed to fetch trip data.")
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching initial data:", error)
//         toast.error("Something went wrong while fetching initial data.")
//       }
//     }

//     fetchAllData()
//   }, [id, reset]) // Depend on 'id' and 'reset'

//   // Option mappings (these will now use the state variables populated above)
//   const vehicleOptions = vehicle.map((vehicle) => ({
//     value: vehicle.vehicle_name,
//     label: vehicle.vehicle_name,
//   }))
//   const driverOptions = driver.map((driver) => ({
//     value: driver.driver_name,
//     label: driver.driver_name,
//     mobile: driver.driver_mobile,
//   }))
//   const vendorVehicleOptions = vendorVehicle.map((dt) => ({
//     value: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
//     label: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
//   }))
//   const vendorDriverOptions = vendorDrivers?.map((dt) => ({
//     value: dt.vendor_name,
//     label: dt.vendor_name,
//     contact: dt.mobile,
//   }))
//   const ownDriverOptions = driver.map((driver) => ({
//     // Using 'driver' state here, assuming it contains all drivers
//     value: driver.driver_name,
//     label: driver.driver_name,
//     contact: driver.driver_mobile,
//   }))
//   const customerOptions = customer.map((customer) => ({
//     value: customer.customer_name,
//     label: customer.customer_name,
//     mobile: customer.mobile,
//   }))
// // database unique id create
//   const generateRefId = useRefId();
//   const onSubmit = async (data) => {
//     const refId = generateRefId();
//     let url = ""
//     let method = ""
//     let successMessage = ""
//     let errorMessage = ""

//     if (id) {
//       // Update existing trip
//       url = `${import.meta.env.VITE_BASE_URL}/api/trip/update/${id}`
//       method = "POST"
//       successMessage = "Trip updated successfully!"
//       errorMessage = "Failed to update the trip."
//     } else {
//       data.ref_id= refId;
//       // Add new trip
//       url = `${import.meta.env.VITE_BASE_URL}/api/trip/create`
//       method = "POST"
//       successMessage = "Trip Added successfully!"
//       errorMessage = "Failed to add the trip."
//     }

//     try {
//       setLoading(true);
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
//     } finally {
//     setLoading(false); 
//   }
//   }

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
//   // vendor name
// const vendorOptions = vendors.map((vendor) => ({
//   value: vendor.vendor_name,
//   label: vendor.vendor_name,
// }))
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
//                     required={!id}
//                     inputRef={(e) => {
//                       // This ref is for the date picker functionality
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
//                   required={!id}
//                 />
//                 <InputField name="customer_mobile" label="Customer Number" />
//               </div>
//               <div className="flex gap-x-6">
//                 <div className="w-full">
//                   {" "}
//                   <InputField name="load_point" label="Load Point" placeholder="Load Point" required={!id}/>
//                 </div>
//                 <div className="w-full">
//                   <InputField name="unload_point" label="Unload Point" placeholder="Unload Point" required={!id}/>
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
//                   required={!id}
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
//                     required={!id}
//                     options={vehicleOptions}
//                     control={control}
//                   />
//                 ) : selectedTransport === "vendor_transport" ? (
//                   <SelectField
//                     name="vehicle_no"
//                     label="Vehicle No."
//                     required={!id}
//                     options={vendorVehicleOptions}
//                     control={control}
//                   />
//                 ) : (
//                   <SelectField
//                     name="vehicle_no"
//                     label="Vehicle No."
//                     defaultValue={""}
//                     required={!id}
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
//                 {/* vendor name */}
//                 { selectedTransport === "vendor_transport" ? (
//                   <SelectField
//                     name="vendor_name"
//                     label="Vendor Name"
//                     required={!id}
//                     control={control}
//                     options={vendorOptions}
//                   />
//                 ) : ""}
//                 {/* driver name transport based */}
//                 {selectedTransport === "own_transport" ? (
//                   <SelectField
//                     name="driver_name"
//                     label="Driver Name"
//                     required={!id}
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
//                     required={!id}
//                     control={control}
//                     options={vendorDriverOptions}
//                   />
//                 ) : (
//                   <SelectField
//                     name="driver_name"
//                     label="Driver Name"
//                     required={!id}
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
//                 <InputField name="total_rent" label="Total Rent/Bill Amount" type="number" required={!id} />
//                 <InputField name="challan" label="Challan" required={!id} />
//               </div>
//             </div>
//             {/* own transport */}
//             {selectedTransport === "own_transport" && (
//               <div className="border border-gray-300 p-5 rounded-md mt-5">
//                 <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
//                   <div className="w-full">
//                     <InputField name="driver_adv" label="Driver Advance"  type="number" />
//                   </div>
//                   <div className="w-full">
//                     <InputField name="driver_commission" label="Driver Commission"  type="number" />
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
//                     <InputField name="total_exp" label="Total Expense" readOnly />
//                   </div>
//                 </div>
//               </div>
//             )}
//             {/* vendor transport */}
//             {selectedTransport === "vendor_transport" && (
//               <div className="border border-gray-300 p-5 rounded-md mt-5 md:mt-3 md:flex justify-between gap-3">
//                 <div className="w-full">
//                   <InputField name="total_exp" label="Trip Expense" required={!id} type="number" />
//                 </div>
//                 <div className="w-full">
//                   <InputField name="advance" label="Advance" required={!id} type="number" />
//                 </div>
//                 <div className="w-full">
//                   <InputField name="due_amount" label="Due Amount" required={!id} type="number" />
//                 </div>
//               </div>
//             )}
//             {/* Submit Button */}
//             <div className="flex justify-start">
//               <BtnSubmit
//                 // type="submit"
//                 // className="bg-slate-800 text-white px-8 py-2 rounded-md hover:bg-slate-700 transition-colors"
//                 loading={loading}
//               >
//                 {id ? "Update Trip" : "Submit"}
//               </BtnSubmit>
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

import { useForm, FormProvider, useWatch } from "react-hook-form";
import { Calendar, Menu, X, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { InputField, SelectField } from "../components/Form/FormFields";
import useRefId from "../hooks/useRef";
import BtnSubmit from "../components/Button/BtnSubmit";

export default function AddTripForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dateRef = useRef(null);

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
      d_day: "",
      d_amount: "",
      d_total: 0,
      customer: "",
      parking_cost: "",
      night_guard: "",
      feri_cost: "",
      chada: "",
      food_cost: "",
      total_exp: 0,
      total: 0,
      transport_type: "",
      total_rent: "",
      challan: "",
      trip_rent: "",
      advance: "",
      due_amount: "",
      customer_mobile: "",
      driver_adv: "",
    },
  });

  const { handleSubmit, control, watch, setValue, reset } = methods;
  const selectedTransport = watch("transport_type");

  // Watch all expense fields
  const [
    fuelCost,
    tollCost,
    policeCost,
    driverCommision,
    labourCost,
    othersCost,
    parkingCost,
    nightGuardCost,
    feriCost,
    chadaCost,
    foodCost,
    d_day,
    d_amount,
  ] = watch([
    "fuel_cost",
    "toll_cost",
    "police_cost",
    "driver_commission",
    "labor",
    "others",
    "parking_cost",
    "night_guard",
    "feri_cost",
    "chada",
    "food_cost",
    "d_day",
    "d_amount",
  ]);

  // Calculate totals
  useEffect(() => {
    // Calculate total expenses
    const totalExp =
      (Number(driverCommision) || 0) +
      (Number(labourCost) || 0) +
      (Number(parkingCost) || 0) +
      (Number(nightGuardCost) || 0) +
      (Number(tollCost) || 0) +
      (Number(feriCost) || 0) +
      (Number(policeCost) || 0) +
      (Number(foodCost) || 0) +
      (Number(chadaCost) || 0) +
      (Number(fuelCost) || 0) +
      (Number(othersCost) || 0);

    setValue("total_exp", totalExp);

    // Calculate damarage total
    const d_total = (Number(d_day) || 0) * (Number(d_amount) || 0);
    setValue("d_total", d_total);
  }, [
    driverCommision,
    labourCost,
    parkingCost,
    nightGuardCost,
    tollCost,
    feriCost,
    policeCost,
    foodCost,
    chadaCost,
    fuelCost,
    othersCost,
    d_day,
    d_amount,
    setValue,
  ]);

  // State for dropdown options
  const [vehicle, setVehicle] = useState([]);
  const [driver, setDriver] = useState([]);
  const [vendorVehicle, setVendorVehicle] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [vendorDrivers, setVendorDrivers] = useState([])

  // Fetch all necessary data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          vehicleRes,
          driverRes,
          vendorVehicleRes,
          vendorDriversRes,
          customerRes,
          vendorRes,
        ] = await Promise.all([
          fetch(`${import.meta.env.VITE_BASE_URL}/api/vehicle/list`),
          fetch(`${import.meta.env.VITE_BASE_URL}/api/driver/list`),
          fetch(`${import.meta.env.VITE_BASE_URL}/api/rent/list`),
          fetch(`${import.meta.env.VITE_BASE_URL}/api/rent/list`),
          fetch(`${import.meta.env.VITE_BASE_URL}/api/customer/list`),
          fetch(`${import.meta.env.VITE_BASE_URL}/api/vendor/list`),
        ]);

        const [
          vehicleData,
          driverData,
          vendorVehicleData,
          vendorDriversData,
          customerData,
          vendorData,
        ] = await Promise.all([
          vehicleRes.json(),
          driverRes.json(),
          vendorVehicleRes.json(),
          vendorDriversRes.json(),
          customerRes.json(),
          vendorRes.json(),
        ]);

        setVehicle(vehicleData.data);
        setDriver(driverData.data);
        setVendorVehicle(vendorVehicleData.data);
        setVendorDrivers(vendorDriversData.data)
        setCustomer(customerData.data);
        setVendors(vendorData.data);

        if (id) {
          const tripRes = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/trip/show/${id}`
          );
          if (tripRes.ok) {
            const { data: tripData } = await tripRes.json();

            if (tripData.date) {
              tripData.date = new Date(tripData.date).toISOString().split("T")[0];
            }

            const parsedTripData = {
              ...tripData,
              fuel_cost: Number(tripData.fuel_cost) || 0,
              toll_cost: Number(tripData.toll_cost) || 0,
              police_cost: Number(tripData.police_cost) || 0,
              driver_commission: Number(tripData.driver_commission) || 0,
              labor: Number(tripData.labor) || 0,
              others: Number(tripData.others) || 0,
              parking_cost: Number(tripData.parking_cost) || 0,
              night_guard: Number(tripData.night_guard) || 0,
              feri_cost: Number(tripData.feri_cost) || 0,
              chada: Number(tripData.chada) || 0,
              food_cost: Number(tripData.food_cost) || 0,
              d_day: Number(tripData.d_day) || 0,
              d_amount: Number(tripData.d_amount) || 0,
              d_total: Number(tripData.d_total) || 0,
              total_exp: Number(tripData.total_exp) || 0,
              total_rent: Number(tripData.total_rent) || 0,
              trip_rent: Number(tripData.trip_rent) || 0,
              advance: Number(tripData.advance) || 0,
              due_amount: Number(tripData.due_amount) || 0,
              driver_adv: Number(tripData.driver_adv) || 0,
            };

            reset(parsedTripData);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load form data");
      }
    };

    fetchAllData();
  }, [id, reset]);

  // Generate options for dropdowns
  const vehicleOptions = vehicle.map((v) => ({
    value: v.vehicle_name,
    label: v.vehicle_name,
  }));

  const driverOptions = driver.map((d) => ({
    value: d.driver_name,
    label: d.driver_name,
    mobile: d.driver_mobile,
  }));

  const vendorVehicleOptions = vendorVehicle.map((v) => ({
    value: `${v.registration_zone} ${v.registration_serial} ${v.registration_number}`,
    label: `${v.registration_zone} ${v.registration_serial} ${v.registration_number}`,
  }));

  const vendorOptions = vendors.map((v) => ({
    value: v.vendor_name,
    label: v.vendor_name,
  }));

  const vendorDriverOptions = vendorDrivers.map((driver) => ({
  value: driver.vendor_name,
  label: driver.vendor_name,
  contact: driver.mobile,
}));

  const customerOptions = customer.map((c) => ({
    value: c.customer_name,
    label: c.customer_name,
    mobile: c.mobile,
  }));

  // Handle driver mobile number update
  const selectedDriver = useWatch({ control, name: "driver_name" });
  useEffect(() => {
    const driver = driverOptions.find((d) => d.value === selectedDriver);
    if (driver) {
      setValue("driver_mobile", driver.mobile || "");
    }
  }, [selectedDriver, driverOptions, setValue]);

  // Handle customer mobile number update
  const selectedCustomer = useWatch({ control, name: "customer" });
  useEffect(() => {
    const customer = customerOptions.find((c) => c.value === selectedCustomer);
    if (customer) {
      setValue("customer_mobile", customer.mobile || "");
    }
  }, [selectedCustomer, customerOptions, setValue]);

  // Handle form submission
  const generateRefId = useRefId();
  const onSubmit = async (data) => {
    const refId = generateRefId();
    
    try {
      setLoading(true);
      const url = id
        ? `${import.meta.env.VITE_BASE_URL}/api/trip/update/${id}`
        : `${import.meta.env.VITE_BASE_URL}/api/trip/create`;
      
      if (!id) {
        data.ref_id = refId;
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(id ? "Trip updated successfully!" : "Trip created successfully!");
        navigate("/tramessy/tripList");
      } else {
        throw new Error(id ? "Failed to update trip" : "Failed to create trip");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen mt-10">
        {/* Form Header */}
        <div className="bg-primary text-white px-4 py-2 rounded-t-md">
          <h2 className="text-lg font-medium">{id ? "Update Trip" : "Create Trip"}</h2>
        </div>

        <div className="rounded-b-md shadow border border-gray-200">
          <div className="p-4 space-y-2">
            {/* Trip & Destination Section */}
            <div className="bg-white rounded-lg border border-gray-300 p-4">
              <h3 className="text-orange-500 font-medium text-center mb-6">
                Trip & Destination
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6">
                <div className="relative w-full">
                  <InputField
                    name="date"
                    label="Date"
                    type="date"
                    required={!id}
                    inputRef={(e) => {
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
                  label="Customer"
                  options={customerOptions}
                  control={control}
                  required={!id}
                />
                <InputField name="customer_mobile" label="Customer Mobile" readOnly />
              </div>
              <div className="flex gap-x-6 mt-4">
                <div className="w-full">
                  <InputField
                    name="load_point"
                    label="Load Point"
                    required={!id}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    name="unload_point"
                    label="Unload Point"
                    required={!id}
                  />
                </div>
              </div>
            </div>

            {/* Vehicle & Driver Information */}
            <div className="bg-white rounded-lg border border-gray-300 p-4">
              <h3 className="text-orange-500 font-medium text-center mb-6">
                Vehicle & Driver Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6">
                <SelectField
                  name="transport_type"
                  label="Transport Type"
                  options={[
                    { value: "own_transport", label: "Own Transport" },
                    { value: "vendor_transport", label: "Vendor Transport" },
                  ]}
                  control={control}
                  required={!id}
                />

                {selectedTransport === "own_transport" ? (
                  <SelectField
                    name="vehicle_no"
                    label="Vehicle No."
                    options={vehicleOptions}
                    control={control}
                    required={!id}
                  />
                ) : selectedTransport === "vendor_transport" ? (
                  <SelectField
                    name="vehicle_no"
                    label="Vehicle No."
                    options={vendorVehicleOptions}
                    control={control}
                    required={!id}
                  />
                ) : (
                  <SelectField
                    name="vehicle_no"
                    label="Vehicle No."
                    options={[{ label: "Select transport type first", value: "", disabled: true }]}
                    control={control}
                  />
                )}

                {selectedTransport === "vendor_transport" && (
                  <SelectField
                    name="vendor_name"
                    label="Vendor Name"
                    options={vendorOptions}
                    control={control}
                    required={!id}
                  />
                )}

                {selectedTransport === "own_transport" ? (
                  <SelectField
                    name="driver_name"
                    label="Driver Name"
                    options={driverOptions}
                    control={control}
                    required={!id}
                  />
                ) : selectedTransport === "vendor_transport" ? (
                  <SelectField
                    name="driver_name"
                    label="Driver Name"
                    options={vendorDriverOptions}
                    control={control}
                    required={!id}
                  />
                ) : (
                  <SelectField
                    name="driver_name"
                    label="Driver Name"
                    options={[{ label: "Select transport type first", value: "", disabled: true }]}
                    control={control}
                  />
                )}

                {/* <InputField name="driver_mobile" label="Driver Mobile" readOnly /> */}
                <InputField name="total_rent" label="Total Rent" type="number" required={!id} />
                <InputField name="challan" label="Challan No." required={!id} />
              </div>
            </div>

            {/* Demurrage Section — Shared by both Own & Vendor Transport */}
{(selectedTransport === "own_transport" || selectedTransport === "vendor_transport") && (
  <div className="border border-gray-300 p-5 rounded-md mt-5">
    <h3 className="text-orange-500 font-medium text-center mb-6">
      Demurrage Details
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <InputField
        name="d_day"
        label="Demurrage Days"
        type="number"
        onChange={(e) => {
          const days = Number(e.target.value) || 0;
          setValue("d_day", days);
          setValue("d_total", days * (Number(d_amount) || 0));
        }}
      />
      <InputField
        name="d_amount"
        label="Demurrage Rate/Day"
        type="number"
        onChange={(e) => {
          const rate = Number(e.target.value) || 0;
          setValue("d_amount", rate);
          setValue("d_total", (Number(d_day) || 0) * rate);
        }}
      />
      <InputField
        name="d_total"
        label="Total Demurrage"
        type="number"
        readOnly
      />
    </div>
  </div>
)}


            {/* Own Transport Expenses Section */}
            {selectedTransport === "own_transport" && (
              <div className="border border-gray-300 p-5 rounded-md mt-5">
                <h3 className="text-orange-500 font-medium text-center mb-6">
                  Expense Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <InputField name="driver_adv" label="Driver Advance" type="number" />
                  <InputField name="driver_commission" label="Driver Commission" type="number" />
                  <InputField name="labor" label="Labour Cost" type="number" />
                  <InputField name="fuel_cost" label="Fuel Cost" type="number" />
                </div>

                {/* Damarage Section */}
                {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <InputField
                    name="d_day"
                    label="Damarage Days"
                    type="number"
                    onChange={(e) => {
                      const days = Number(e.target.value) || 0;
                      setValue("d_day", days);
                      setValue("d_total", days * (Number(d_amount) || 0));
                    }}
                  />
                  <InputField
                    name="d_amount"
                    label="Damarage Rate/Day"
                    type="number"
                    onChange={(e) => {
                      const rate = Number(e.target.value) || 0;
                      setValue("d_amount", rate);
                      setValue("d_total", (Number(d_day) || 0) * rate);
                    }}
                  />
                  <InputField
                    name="d_total"
                    label="Total Damarage"
                    type="number"
                    readOnly
                  />
                  <InputField name="parking_cost" label="Parking Cost" type="number" />
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <InputField name="night_guard" label="Night Guard" type="number" />
                  <InputField name="toll_cost" label="Toll Cost" type="number" />
                  <InputField name="feri_cost" label="Feri Cost" type="number" />
                  <InputField name="police_cost" label="Police Cost" type="number" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <InputField name="chada" label="Chada" type="number" />
                  <InputField name="food_cost" label="Food Cost" type="number" />
                  <InputField name="others" label="Other Costs" type="number" />
                  <InputField name="total_exp" label="Total Expense" readOnly />
                </div>
              </div>
            )}

            {/* Vendor Transport Section */}
            {selectedTransport === "vendor_transport" && (
              <div className="border border-gray-300 p-5 rounded-md mt-5">
                <h3 className="text-orange-500 font-medium text-center mb-6">
                  Vendor Payment Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField name="total_exp" label="Vendor Rent" type="number" required={!id} />
                  <InputField name="advance" label="Advance" type="number" required={!id} />
                  <InputField name="due_amount" label="Due Amount" type="number" required={!id} />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-start mt-6">
              <BtnSubmit loading={loading}>
                {id ? "Update Trip" : "Create Trip"}
              </BtnSubmit>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

