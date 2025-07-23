// import React, { useEffect, useRef, useState } from "react";
// import BtnSubmit from "../../components/Button/BtnSubmit";
// import { Controller, FormProvider, useForm } from "react-hook-form";
// import { InputField, SelectField } from "../../components/Form/FormFields";
// import { FiCalendar } from "react-icons/fi";
// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
// import { IoMdClose } from "react-icons/io";

// const PurchaseForm = () => {
//   const methods = useForm();
//   const { handleSubmit, register, watch, reset, setValue, control } = methods;
//   const purChaseDateRef = useRef(null);
//   const [drivers, setDrivers] = useState([]);
//   const [vehicle, setVehicle] = useState([]);
//   const [branch, setBranch] = useState([]);
//   const [supplier, setSupplier] = useState([]);

//   const selectedCategory = watch("category");
//   // calculate Total Expense
//   const quantity = parseFloat(watch("quantity") || 0);
//   const unitPrice = parseFloat(watch("unit_price") || 0);
//   const totalPrice = quantity * unitPrice;
//   useEffect(() => {
//     const totalPrice = quantity * unitPrice;
//     setValue("total", totalPrice);
//   }, [quantity, unitPrice, setValue]);
//   // preview image
//   const [previewImage, setPreviewImage] = useState(null);
//   // generate ref id
//   const generateRefId = () => {
//     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     let refId = "";
//     for (let i = 0; i < 6; i++) {
//       refId += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return refId;
//   };
//   // select driver from api
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/driver/list`)
//       .then((response) => response.json())
//       .then((data) => setDrivers(data.data))
//       .catch((error) => console.error("Error fetching driver data:", error));
//   }, []);
//   const driverOptions = drivers.map((driver) => ({
//     value: driver.driver_name,
//     label: driver.driver_name,
//   }));
//   // select Vehicle No. from api
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/vehicle/list`)
//       .then((response) => response.json())
//       .then((data) => setVehicle(data.data))
//       .catch((error) => console.error("Error fetching vehicle data:", error));
//   }, []);

//   const vehicleOptions = vehicle.map((dt) => ({
//     value: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
//     label: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
//   }));
//   // select branch from api
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/office/list`)
//       .then((response) => response.json())
//       .then((data) => setBranch(data.data))
//       .catch((error) => console.error("Error fetching branch data:", error));
//   }, []);
//   const branchOptions = branch.map((branch) => ({
//     value: branch.branch_name,
//     label: branch.branch_name,
//   }));
//   // select supplier from api
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/supply/list`)
//       .then((response) => response.json())
//       .then((data) => setSupplier(data.data))
//       .catch((error) => console.error("Error fetching supply data:", error));
//   }, []);
//   const supplyOptions = supplier.map((supply) => ({
//     value: supply.contact_person_name,
//     label: supply.contact_person_name,
//   }));
//   // post data on server
//   const onSubmit = async (data) => {
//     console.log("purchase", data);
//     const refId = generateRefId();

//     try {
//       const purchaseFormData = new FormData();

//       // Append form fields
//       for (const key in data) {
//         purchaseFormData.append(key, data[key]);
//       }

//       // Additional fields
//       // purchaseFormData.append("ref_id", refId);
//       purchaseFormData.append("status", "Unpaid");

//       await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/api/purchase/create`,
//         purchaseFormData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       // Optional: Handle successful submission
//       // console.log("Purchase success", purchaseResponse.data);
//       toast.success("Purchase submitted successfully!", {
//         position: "top-right",
//       });
//       reset();
//     } catch (error) {
//       console.error(error);
//       const errorMessage =
//         error.response?.data?.message || error.message || "Unknown error";
//       toast.error("Server issue: " + errorMessage);
//     }
//   };

//   // todo set default status = unpaid, generate auto ref number from backend
//   return (
//     <div className="mt-10">
//       <Toaster />
//       <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
//         Add Purchase Information
//       </h3>
//       <FormProvider {...methods} className="">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="mx-auto p-6  rounded-md shadow space-y-4"
//         >
//           {/*  */}
//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <InputField
//                 name="date"
//                 label="Purchase Date"
//                 type="date"
//                 required
//                 inputRef={(e) => {
//                   register("date").ref(e);
//                   purChaseDateRef.current = e;
//                 }}
//                 icon={
//                   <span
//                     className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r"
//                     onClick={() => purChaseDateRef.current?.showPicker?.()}
//                   >
//                     <FiCalendar className="text-white cursor-pointer" />
//                   </span>
//                 }
//               />
//             </div>
//             <div className="w-full">
//               <SelectField
//                 name="category"
//                 label="Category"
//                 required
//                 options={[
//                   { value: "Fuel", label: "Fuel" },
//                   { value: "Engine Oil", label: "Engine Oil" },
//                   { value: "Parts", label: "Parts" },
//                   { value: "Stationary", label: "Stationary" },
//                   { value: "Snacks", label: "Snacks" },
//                   { value: "Electronics", label: "Electronics" },
//                   { value: "Furniture", label: "Furniture" },
//                 ]}
//               />
//             </div>
//             <div className="w-full">
//               <InputField name="item_name" label="Item Name" required />
//             </div>
//           </div>
//           {/* Engine Oil category */}
//           {selectedCategory === "Engine Oil" && (
//             <div className="md:flex justify-between gap-3">
//               <div className="w-full">
//                 <SelectField
//                   name="driver_name"
//                   label="Driver Name"
//                   required={true}
//                   options={driverOptions}
//                   control={control}
//                 />
//               </div>
//               <div className="w-full">
//                 <SelectField
//                   name="vehicle_no"
//                   label="Vehicle No."
//                   required={true}
//                   options={vehicleOptions}
//                   control={control}
//                 />
//               </div>
//             </div>
//           )}

//           {/*  */}
//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <SelectField
//                 name="branch_name"
//                 label="Branch Name"
//                 required={true}
//                 options={branchOptions}
//                 control={control}
//               />
//             </div>
//             <div className="w-full">
//               <SelectField
//                 name="supplier_name"
//                 label="Supplier Name"
//                 required={true}
//                 options={supplyOptions}
//                 control={control}
//               />
//             </div>
//             <div className="w-full">
//               <InputField name="quantity" label="Quantity" required />
//             </div>
//           </div>
//           {/*  */}
//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <InputField name="unit_price" label="Unit Price" required />
//             </div>
//             <div className="w-full">
//               <InputField
//                 name="purchase_amount"
//                 label="Total"
//                 readOnly
//                 defaultValue={totalPrice}
//                 value={totalPrice}
//                 required
//               />
//             </div>
//             <div className="w-full">
//               <InputField name="remarks" label="Remark" />
//             </div>
//           </div>
//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">
//                 Bill Image
//               </label>
//               <Controller
//                 name="bill_image"
//                 control={control}
//                 rules={{ required: "This field is required" }}
//                 render={({
//                   field: { onChange, ref },
//                   fieldState: { error },
//                 }) => (
//                   <div className="relative">
//                     <label
//                       htmlFor="bill_image"
//                       className="border p-2 rounded w-full block bg-white text-gray-300 text-sm cursor-pointer"
//                     >
//                       {previewImage ? "Image selected" : "Choose image"}
//                     </label>
//                     <input
//                       id="bill_image"
//                       type="file"
//                       accept="image/*"
//                       ref={ref}
//                       className="hidden"
//                       onChange={(e) => {
//                         const file = e.target.files[0];
//                         if (file) {
//                           const url = URL.createObjectURL(file);
//                           setPreviewImage(url);
//                           onChange(file);
//                         } else {
//                           setPreviewImage(null);
//                           onChange(null);
//                         }
//                       }}
//                     />
//                     {error && (
//                       <span className="text-red-600 text-sm">
//                         {error.message}
//                       </span>
//                     )}
//                   </div>
//                 )}
//               />
//             </div>
//           </div>
//           {/* Preview */}
//           {previewImage && (
//             <div className="mt-3 relative flex justify-end">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setPreviewImage(null);
//                   document.getElementById("bill_image").value = "";
//                 }}
//                 className="absolute top-2 right-2 text-red-600 bg-white shadow rounded-sm hover:text-white hover:bg-secondary transition-all duration-300 cursor-pointer font-bold text-xl p-[2px]"
//                 title="Remove image"
//               >
//                 <IoMdClose />
//               </button>
//               <img
//                 src={previewImage}
//                 alt="License Preview"
//                 className="max-w-xs h-auto rounded border border-gray-300"
//               />
//             </div>
//           )}
//           <BtnSubmit>Submit</BtnSubmit>
//         </form>
//       </FormProvider>
//     </div>
//   );
// };

// export default PurchaseForm;


// import { useEffect, useRef, useState } from "react"

// import { Controller, FormProvider, useForm } from "react-hook-form"

// import { FiCalendar } from "react-icons/fi"
// import toast, { Toaster } from "react-hot-toast"
// import axios from "axios"
// import { IoMdClose } from "react-icons/io"
// import BtnSubmit from "../../components/Button/BtnSubmit"
// import { InputField, SelectField } from "../../components/Form/FormFields"

// const PurchaseForm = () => {
//   const methods = useForm()
//   const { handleSubmit, register, watch, reset, setValue, control } = methods
//   const purChaseDateRef = useRef(null)
//   const [drivers, setDrivers] = useState([])
//   const [vehicle, setVehicle] = useState([])
//   const [branch, setBranch] = useState([])
//   const [supplier, setSupplier] = useState([])
//   const selectedCategory = watch("category")

//   // Calculate Total Expense
//   const quantity = Number.parseFloat(watch("quantity") || 0)
//   const unitPrice = Number.parseFloat(watch("unit_price") || 0)
//   const totalPrice = quantity * unitPrice

//   useEffect(() => {
//     setValue("purchase_amount", totalPrice.toFixed(2))
//   }, [quantity, unitPrice, setValue])

//   // Preview image
//   const [previewImage, setPreviewImage] = useState(null)

//   // Helper to reset conditional fields when category changes
//   useEffect(() => {
//     // Reset all category-specific fields
//     setValue("vehicle_no", "")
//     setValue("trip_id", "")
//     setValue("fuel_capacity", "")
//     setValue("fuel_type", "")
//     setValue("driver_name", "")
//     setValue("service_cost", "")

//     // Reset common fields that might need re-entry based on context
//     setValue("quantity", "")
//     setValue("unit_price", "")
//     setValue("item_name", "")
//   }, [selectedCategory, setValue])

//   // Fetch drivers from API
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/driver/list`)
//       .then((response) => response.json())
//       .then((data) => setDrivers(data.data))
//       .catch((error) => console.error("Error fetching driver data:", error))
//   }, [])
//   const driverOptions = drivers.map((driver) => ({
//     value: driver.driver_name,
//     label: driver.driver_name,
//   }))

//   // Fetch Vehicle No. from API
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/vehicle/list`)
//       .then((response) => response.json())
//       .then((data) => setVehicle(data.data))
//       .catch((error) => console.error("Error fetching vehicle data:", error))
//   }, [])
//   const vehicleOptions = vehicle.map((dt) => ({
//     value: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
//     label: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
//   }))

//   // Fetch branch from API
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/office/list`)
//       .then((response) => response.json())
//       .then((data) => setBranch(data.data))
//       .catch((error) => console.error("Error fetching branch data:", error))
//   }, [])
//   const branchOptions = branch.map((branch) => ({
//     value: branch.branch_name,
//     label: branch.branch_name,
//   }))

//   // Fetch supplier from API
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BASE_URL}/api/supply/list`)
//       .then((response) => response.json())
//       .then((data) => setSupplier(data.data))
//       .catch((error) => console.error("Error fetching supply data:", error))
//   }, [])
//   const supplyOptions = supplier.map((supply) => ({
//     value: supply.contact_person_name,
//     label: supply.contact_person_name,
//   }))

//   // Post data on server
//   const onSubmit = async (data) => {
//     console.log("purchase", data)
//     try {
//       const purchaseFormData = new FormData()
//       for (const key in data) {
//         if (key === "bill_image" && data[key] instanceof File) {
//           purchaseFormData.append(key, data[key])
//         } else if (data[key] !== undefined && data[key] !== null) {
//           purchaseFormData.append(key, data[key])
//         }
//       }
//       purchaseFormData.append("status", "Unpaid") // Default status

//       await axios.post(`${import.meta.env.VITE_BASE_URL}/api/purchase/create`, purchaseFormData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       toast.success("Purchase submitted successfully!", {
//         position: "top-right",
//       })
//       reset()
//       setPreviewImage(null) // Clear preview image on successful submission
//     } catch (error) {
//       console.error(error)
//       const errorMessage = error.response?.data?.message || error.message || "Unknown error"
//       toast.error("Server issue: " + errorMessage)
//     }
//   }

//   return (
//     <div className="mt-10">
//       <Toaster />
//       <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
//         Add Purchase Information
//       </h3>
//       <FormProvider {...methods}>
//         <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-6 rounded-md shadow space-y-4">
//           {/* Common Fields */}
//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <InputField
//                 name="date"
//                 label="Purchase Date"
//                 type="date"
//                 required
//                 inputRef={(e) => {
//                   register("date").ref(e)
//                   purChaseDateRef.current = e
//                 }}
//                 icon={
//                   <span
//                     className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r cursor-pointer"
//                     onClick={() => purChaseDateRef.current?.showPicker?.()}
//                   >
//                     <FiCalendar className="text-white" />
//                   </span>
//                 }
//               />
//             </div>
//             <div className="w-full">
//               <SelectField
//                 name="category"
//                 label="Category"
//                 required
//                 options={[
//                   { value: "Fuel", label: "Fuel" },
//                   { value: "Engine Oil", label: "Engine Oil" },
//                   { value: "Parts", label: "Parts" },
//                   { value: "Stationary", label: "Stationary" },
//                   { value: "Snacks", label: "Snacks" },
//                   { value: "Electronics", label: "Electronics" },
//                   { value: "Furniture", label: "Furniture" },
//                 ]}
//                 control={control}
//               />
//             </div>
//             <div className="w-full">
//               <InputField name="item_name" label="Item Name" required />
//             </div>
//           </div>

//           {/* Conditional Fields: Driver Name, Vehicle No. */}
//           {(selectedCategory === "Fuel" || selectedCategory === "Engine Oil" || selectedCategory === "Parts") && (
//             <div className="md:flex justify-between gap-3">
//               <div className="w-full">
//                 <SelectField
//                   name="driver_name"
//                   label="Driver Name"
//                   required={true}
//                   options={driverOptions}
//                   control={control}
//                 />
//               </div>
//               <div className="w-full">
//                 <SelectField
//                   name="vehicle_no"
//                   label="Vehicle No."
//                   required={true}
//                   options={vehicleOptions}
//                   control={control}
//                 />
//               </div>
//                {/* Conditional Fields: Parts specific */}
//           {selectedCategory === "Parts" && (
         
//               <div className="w-full">
//                 <InputField name="service_cost" label="Service Cost" type="number" required />
//               </div>
              
          
//           )}
//               {selectedCategory === "Fuel" && (
//                 <div className="w-full">
//                   <InputField name="trip_id" label="Trip ID" required />
//                 </div>
//               )}
//               {selectedCategory !== "Fuel" && (selectedCategory === "Engine Oil" ) && (
//                 <div className="w-full"></div> // Placeholder for alignment
//               )}
//             </div>
//           )}

//           {/* Conditional Fields: Fuel specific */}
//           {selectedCategory === "Fuel" && (
//             <div className="md:flex justify-between gap-3">
//               <div className="w-full">
//                 <InputField name="fuel_capacity" label="Fuel Capacity" type="number" required />
//               </div>
//               <div className="w-full">
//                 <SelectField
//                   name="fuel_type"
//                   label="Fuel Category"
//                   required
//                   options={[
//                     { value: "Petrol", label: "Petrol" },
//                     { value: "Diesel", label: "Diesel" },
//                     { value: "CNG", label: "CNG" },
//                     { value: "Octane", label: "Octane" },
//                   ]}
//                   control={control}
//                 />
//               </div>
//               <div className="w-full"></div> {/* Placeholder for alignment */}
//             </div>
//           )}


//           {/* Common Fields (continued) */}
//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <SelectField
//                 name="branch_name"
//                 label="Branch Name"
//                 required={true}
//                 options={branchOptions}
//                 control={control}
//               />
//             </div>
//             <div className="w-full">
//               <SelectField
//                 name="supplier_name"
//                 label="Supplier Name"
//                 required={true}
//                 options={supplyOptions}
//                 control={control}
//               />
//             </div>
//             <div className="w-full">
//               <InputField
//                 name="quantity"
//                 label={selectedCategory === "Fuel" ? "Fuel Quantity" : "Quantity"}
//                 type="number"
//                 required
//               />
//             </div>
//           </div>

//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <InputField
//                 name="unit_price"
//                 label={selectedCategory === "Fuel" ? "Price per Liter" : "Unit Price"}
//                 type="number"
//                 required
//               />
//             </div>
//             <div className="w-full">
//               <InputField name="purchase_amount" label="Total" readOnly value={totalPrice.toFixed(2)} required />
//             </div>
//             <div className="w-full">
//               <InputField name="remarks" label="Remark" />
//             </div>
//           </div>

//           <div className="md:flex justify-between gap-3">
//             <div className="w-full">
//               <label className="text-primary text-sm font-semibold">Bill Image</label>
//               <Controller
//                 name="bill_image"
//                 control={control}
//                 rules={{ required: "This field is required" }}
//                 render={({ field: { onChange, ref }, fieldState: { error } }) => (
//                   <div className="relative">
//                     <label
//                       htmlFor="bill_image"
//                       className="border p-2 rounded w-full block bg-white text-gray-300 text-sm cursor-pointer"
//                     >
//                       {previewImage ? "Image selected" : "Choose image"}
//                     </label>
//                     <input
//                       id="bill_image"
//                       type="file"
//                       accept="image/*"
//                       ref={ref}
//                       className="hidden"
//                       onChange={(e) => {
//                         const file = e.target.files[0]
//                         if (file) {
//                           const url = URL.createObjectURL(file)
//                           setPreviewImage(url)
//                           onChange(file)
//                         } else {
//                           setPreviewImage(null)
//                           onChange(null)
//                         }
//                       }}
//                     />
//                     {error && <span className="text-red-500 text-sm">{error.message}</span>}
//                   </div>
//                 )}
//               />
//             </div>
//             <div className="w-full"></div> {/* Placeholder for alignment */}
//             <div className="w-full"></div> {/* Placeholder for alignment */}
//           </div>

//           {/* Preview */}
//           {previewImage && (
//             <div className="mt-3 relative flex justify-end">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setPreviewImage(null)
//                   const fileInput = document.getElementById("bill_image")
//                   if (fileInput) {
//                     fileInput.value = ""
//                   }
//                   setValue("bill_image", null)
//                 }}
//                 className="absolute top-2 right-2 text-red-600 bg-white shadow rounded-sm hover:bg-secondary hover:text-white transition-all duration-300 cursor-pointer font-bold text-xl p-[2px]"
//                 title="Remove image"
//               >
//                 <IoMdClose />
//               </button>
//               <img
//                 src={previewImage || "/placeholder.svg"}
//                 alt="Bill Preview"
//                 className="max-w-xs h-auto rounded border border-gray-300"
//               />
//             </div>
//           )}
//           <BtnSubmit>Submit</BtnSubmit>
//         </form>
//       </FormProvider>
//     </div>
//   )
// }

// export default PurchaseForm



import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom" 
import { Controller, FormProvider, useForm } from "react-hook-form"
import { FiCalendar } from "react-icons/fi"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { IoMdClose } from "react-icons/io"
import { InputField, SelectField } from "../../components/Form/FormFields"
import BtnSubmit from "../../components/Button/BtnSubmit"
import useRefId from "../../hooks/useRef"


const PurchaseForm = () => {
  const { id } = useParams() // Get ID from URL params
  const methods = useForm()
  const { handleSubmit, register, watch, reset, setValue, control } = methods
  const purChaseDateRef = useRef(null)
  const [drivers, setDrivers] = useState([])
  const [vehicle, setVehicle] = useState([])
  const [branch, setBranch] = useState([])
  const [supplier, setSupplier] = useState([])
  const selectedCategory = watch("category")
  const navigate = useNavigate();
   // Loading states for dropdowns
  const [isLoadingDrivers, setIsLoadingDrivers] = useState(true)
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true)
  const [isLoadingBranches, setIsLoadingBranches] = useState(true)
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(true)

  // Calculate Total Expense
  const quantity = Number.parseFloat(watch("quantity") || 0)
  const unitPrice = Number.parseFloat(watch("unit_price") || 0)
  const totalPrice = quantity * unitPrice

  useEffect(() => {
    setValue("purchase_amount", totalPrice.toFixed(2))
  }, [quantity, unitPrice, setValue])

  // Preview image
  const [previewImage, setPreviewImage] = useState(null)

   // Helper to reset conditional fields when category changes
  useEffect(() => {
    // Only reset if category actually changes and it's not initial load with existing data
    if (methods.formState.isDirty && !methods.formState.isSubmitted) {
      setValue("vehicle_no", "")
      setValue("trip_id", "")
      setValue("fuel_capacity", "")
      setValue("fuel_type", "")
      setValue("driver_name", "")
      setValue("service_cost", "")
      setValue("quantity", "")
      setValue("unit_price", "")
      setValue("item_name", "")
    }
  }, [selectedCategory, setValue, methods.formState.isDirty, methods.formState.isSubmitted])

  // Fetch existing purchase data if ID is provided
  useEffect(() => {
    if (id) {
      const fetchPurchaseData = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/purchase/show/${id}`) // Assuming a show endpoint
          const data = response.data.data // Assuming data is nested under .data
          console.log("Fetched purchase data:", data)

          // Format date for input type="date"
          if (data.date) {
            data.date = new Date(data.date).toISOString().split("T")[0]
          }

          // Set form values
          reset(data) // Reset with all fetched data

            // Manually set all fields to ensure they are populated, especially for conditional fields
          setValue("date", data.date || "")
          setValue("category", data.category || "")
          setValue("item_name", data.item_name || "")
          setValue("driver_name", data.driver_name || "")
          setValue("vehicle_no", data.vehicle_no || "")
          setValue("fuel_type", data.fuel_type || "")
          setValue("trip_id", data.trip_id || "")
          setValue("fuel_capacity", data.fuel_capacity || "")
          setValue("service_cost", data.service_cost || "")
          setValue("branch_name", data.branch_name || "")
          setValue("supplier_name", data.supplier_name || "")
          setValue("quantity", data.quantity || "")
          setValue("unit_price", data.unit_price || "")
          setValue("purchase_amount", data.purchase_amount || "")
          setValue("remarks", data.remarks || "")

          if (data.bill_image) {
            setPreviewImage(data.bill_image) // Set image preview from URL
          }
        } catch (error) {
          console.error("Error fetching purchase data:", error)
          toast.error("Failed to load purchase data.")
        }
      }
      fetchPurchaseData()
    }
  }, [id, reset, setValue]) // Depend on 'id', 'reset', and 'setValue'

  // Fetch drivers from API
  useEffect(() => {
    setIsLoadingDrivers(true)
    fetch(`${import.meta.env.VITE_BASE_URL}/api/driver/list`)
      .then((response) => response.json())
      .then((data) => setDrivers(data.data))
      .catch((error) => console.error("Error fetching driver data:", error))
      .finally(() => setIsLoadingDrivers(false))
  }, [])
  const driverOptions = drivers.map((driver) => ({
    value: driver.driver_name,
    label: driver.driver_name,
  }))

  // Fetch Vehicle No. from API
  useEffect(() => {
    setIsLoadingVehicles(true)
    fetch(`${import.meta.env.VITE_BASE_URL}/api/vehicle/list`)
      .then((response) => response.json())
      .then((data) => setVehicle(data.data))
      .catch((error) => console.error("Error fetching vehicle data:", error))
      .finally(() => setIsLoadingVehicles(false))
  }, [])
  const vehicleOptions = vehicle.map((dt) => ({
    value: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
    label: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
  }))

  // Fetch branch from API
  useEffect(() => {
    setIsLoadingBranches(true)
    fetch(`${import.meta.env.VITE_BASE_URL}/api/office/list`)
      .then((response) => response.json())
      .then((data) => setBranch(data.data))
      .catch((error) => console.error("Error fetching branch data:", error))
      .finally(() => setIsLoadingBranches(false))
  }, [])

  // Fetch supplier from API
  useEffect(() => {
    setIsLoadingSuppliers(true)
    fetch(`${import.meta.env.VITE_BASE_URL}/api/supply/list`)
      .then((response) => response.json())
      .then((data) => setSupplier(data.data))
      .catch((error) => console.error("Error fetching supply data:", error))
      .finally(() => setIsLoadingSuppliers(false))
  }, [])
  const supplyOptions = supplier.map((supply) => ({
    value: supply.contact_person_name,
    label: supply.contact_person_name,
  }))

  // database unique id create
    const generateRefId = useRefId();
  // Post or Update data on server
  const onSubmit = async (data) => {
    console.log("Submitting purchase data:", data)
    const refId = generateRefId();
    try {
      const purchaseFormData = new FormData()
      for (const key in data) {
        // Only append bill_image if it's a new File object
        if (key === "bill_image" && data[key] instanceof File) {
          purchaseFormData.append(key, data[key])
        } else if (key !== "bill_image" && data[key] !== undefined && data[key] !== null) {
          // Append other fields, excluding bill_image if it's not a new file
          purchaseFormData.append(key, data[key])
        }
      }

      // Add or update status if needed, or let backend handle it
      if (!id) {
        purchaseFormData.append("status", "Unpaid") // Default status for new purchases
      }

      if (id) {
        // Update existing purchase
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/purchase/update/${id}`, purchaseFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        toast.success("Purchase updated successfully!", {
          position: "top-right",
        })
        navigate('/tramessy/Purchase/PurchaseList')
      } else {
        // Create new purchase
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/purchase/create`, purchaseFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        toast.success("Purchase submitted successfully!", {
          position: "top-right",
        })
        reset()
        navigate('/tramessy/Purchase/PurchaseList')
        setPreviewImage(null) // Clear preview image on successful submission
      }
    } catch (error) {
      console.error(error)
      const errorMessage = error.response?.data?.message || error.message || "Unknown error"
      toast.error("Server issue: " + errorMessage)
    }
  }

  const formTitle = id ? "Update Purchase Information" : "Add Purchase Information"
  const submitButtonText = id ? "Update Purchase" : "Add Purchase"

  return (
    <div className="mt-10">
      <Toaster />
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">{formTitle}</h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-6 rounded-md shadow space-y-4">
          {/* Common Fields */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField
                name="date"
                label="Purchase Date"
                type="date"
                required={!id}
                inputRef={(e) => {
                  register("date").ref(e)
                  purChaseDateRef.current = e
                }}
                icon={
                  <span
                    className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r cursor-pointer"
                    onClick={() => purChaseDateRef.current?.showPicker?.()}
                  >
                    <FiCalendar className="text-white" />
                  </span>
                }
              />
            </div>
            <div className="w-full">
              <SelectField
                name="category"
                label="Category"
                required={!id}
                options={[
                  { value: "Fuel", label: "Fuel" },
                  { value: "Engine Oil", label: "Engine Oil" },
                  { value: "Parts", label: "Parts" },
                  { value: "Stationary", label: "Stationary" },
                  { value: "Snacks", label: "Snacks" },
                  { value: "Electronics", label: "Electronics" },
                  { value: "Furniture", label: "Furniture" },
                ]}
                control={control}
              />
            </div>
            <div className="w-full">
              <InputField name="item_name" label="Item Name"  />
            </div>
          </div>

          {/* Conditional Fields: Driver Name, Vehicle No. */}
          {(selectedCategory === "Fuel" || selectedCategory === "Engine Oil" || selectedCategory === "Parts") && (
            <div className="md:flex justify-between gap-3">
              <div className="w-full">
                <SelectField
                  name="driver_name"
                  label="Driver Name"
                  required={!id}
                  options={driverOptions}
                  control={control}
                  isLoading={isLoadingDrivers}
                />
              </div>
              <div className="w-full">
                <SelectField
                  name="vehicle_no"
                  label="Vehicle No."
                  required={!id}
                  options={vehicleOptions}
                  control={control}
                  isLoading={isLoadingVehicles}
                />
              </div>
              {/* Conditional Fields: Parts specific */}
          {selectedCategory === "Parts" && (
              <div className="w-full">
                <InputField name="service_cost" label="Service Cost" type="number"  />
              </div>
          )}
              {selectedCategory === "Fuel" && (
                <div className="w-full">
                  <InputField name="trip_id" label="Trip ID" required={!id}/>
                </div>
              )}
              {selectedCategory !== "Fuel" && (selectedCategory === "Engine Oil" ) && (
                <div className="w-full"></div> // Placeholder for alignment
              )}
            </div>
          )}

          {/* Conditional Fields: Fuel specific */}
          {selectedCategory === "Fuel" && (
            <div className="md:flex justify-between gap-3">
              <div className="w-full">
                <InputField name="fuel_capacity" label="Fuel Capacity" type="number" required />
              </div>
              <div className="w-full">
                <SelectField
                  name="fuel_type"
                  label="Fuel Category"
                  required={!id}
                  options={[
                    { value: "Petrol", label: "Petrol" },
                    { value: "Diesel", label: "Diesel" },
                    { value: "CNG", label: "CNG" },
                    { value: "Octane", label: "Octane" },
                  ]}
                  control={control}
                />
              </div>
              <div className="w-full"></div> {/* Placeholder for alignment */}
            </div>
          )}


          {/* Common Fields (continued) */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <SelectField
                name="branch_name"
                label="Branch Name"
                required={!id}
                options={[{value:"Head Office", label: "Head Office"}]}
                control={control}
              />
            </div>
            <div className="w-full">
              <SelectField
                name="supplier_name"
                label="Supplier Name"
                required={!id}
                options={supplyOptions}
                control={control}
                isLoading={isLoadingSuppliers}
              />
            </div>
            <div className="w-full">
              <InputField
                name="quantity"
                label={selectedCategory === "Fuel" ? "Fuel Quantity" : "Quantity"}
                type="number"
                required={!id}
              />
            </div>
          </div>

          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField
                name="unit_price"
                label={selectedCategory === "Fuel" ? "Price per Liter" : "Unit Price"}
                type="number"
                required={!id}
              />
            </div>
            <div className="w-full">
              <InputField name="purchase_amount" label="Total" readOnly value={totalPrice.toFixed(2)} required={!id} />
            </div>
            <div className="w-full">
              <InputField name="remarks" label="Remark" />
            </div>
          </div>

          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">Bill Image</label>
              <Controller
                name="bill_image"
                control={control}
                rules={{ required: !id }} // Required only for new purchases
                render={({ field: { onChange, ref }, fieldState: { error } }) => (
                  <div className="relative">
                    <label
                      htmlFor="bill_image"
                      className="border p-2 rounded w-full block bg-white text-gray-300 text-sm cursor-pointer"
                    >
                      {previewImage ? "Image selected" : "Choose image"}
                    </label>
                    <input
                      id="bill_image"
                      type="file"
                      accept="image/*"
                      ref={ref}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) {
                          const url = URL.createObjectURL(file)
                          setPreviewImage(url)
                          onChange(file)
                        } else {
                          setPreviewImage(null)
                          onChange(null)
                        }
                      }}
                    />
                    {error && <span className="text-red-500 text-sm">{error.message}</span>}
                  </div>
                )}
              />
            </div>
            <div className="w-full"></div> {/* Placeholder for alignment */}
            <div className="w-full"></div> {/* Placeholder for alignment */}
          </div>

          {/* Preview */}
          {previewImage && (
            <div className="mt-3 relative flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setPreviewImage(null)
                  const fileInput = document.getElementById("bill_image")
                  if (fileInput) {
                    fileInput.value = "" // Clear file input
                  }
                  setValue("bill_image", null) // Clear react-hook-form value
                }}
                className="absolute top-2 right-2 text-red-600 bg-white shadow rounded-sm hover:bg-secondary hover:text-white transition-all duration-300 cursor-pointer font-bold text-xl p-[2px]"
                title="Remove image"
              >
                <IoMdClose />
              </button>
              <img
                src={previewImage || "/placeholder.svg"}
                alt="Bill Preview"
                className="max-w-xs h-auto rounded border border-gray-300"
              />
            </div>
          )}
          <BtnSubmit>{submitButtonText}</BtnSubmit>
        </form>
      </FormProvider>
    </div>
  )
}

export default PurchaseForm
