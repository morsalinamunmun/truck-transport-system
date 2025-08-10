

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
  const { id } = useParams()
  const methods = useForm()
  const { handleSubmit, register, watch, reset, setValue, control, formState } = methods
  const purChaseDateRef = useRef(null)
  const [drivers, setDrivers] = useState([])
  const [vehicle, setVehicle] = useState([])
  const [supplier, setSupplier] = useState([])
  const selectedCategory = watch("category")
  const navigate = useNavigate();
  
  // Loading states
  const [isLoadingDrivers, setIsLoadingDrivers] = useState(true)
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true)
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(true)
  const [isLoadingFormSubmit, setIsLoadingFormSubmit] = useState(false)
  const [isLoadingFormData, setIsLoadingFormData] = useState(false)

   // Watch all relevant fields for total calculation
  const quantity = Number.parseFloat(watch("quantity") || 0)
  const unitPrice = Number.parseFloat(watch("unit_price") || 0)
  const serviceCost = Number.parseFloat(watch("service_cost") || 0)

  // Calculate Total Expense
  useEffect(() => {
    const productTotal = quantity * unitPrice
    const totalPrice = selectedCategory === "Parts" 
      ? productTotal + serviceCost 
      : productTotal
    
    setValue("purchase_amount", totalPrice.toFixed(2))
  }, [quantity, unitPrice, serviceCost, selectedCategory, setValue])

  // Preview image
  const [previewImage, setPreviewImage] = useState(null)

  // Helper to reset conditional fields when category changes (only for new forms)
  useEffect(() => {
    if (!id && formState.isDirty && !formState.isSubmitted) {
      const fieldsToReset = [
        "vehicle_no", "trip_id", "fuel_capacity", "fuel_type", 
        "driver_name", "service_cost", "quantity", "unit_price", "item_name"
      ]
      fieldsToReset.forEach(field => setValue(field, ""))
    }
  }, [selectedCategory, setValue, formState.isDirty, formState.isSubmitted, id])

  // Fetch all necessary data first
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch drivers
        setIsLoadingDrivers(true)
        const driversRes = await fetch(`${import.meta.env.VITE_BASE_URL}/api/driver/list`)
        const driversData = await driversRes.json()
        setDrivers(driversData.data)

        // Fetch vehicles
        setIsLoadingVehicles(true)
        const vehiclesRes = await fetch(`${import.meta.env.VITE_BASE_URL}/api/vehicle/list`)
        const vehiclesData = await vehiclesRes.json()
        setVehicle(vehiclesData.data)

        // Fetch suppliers
        setIsLoadingSuppliers(true)
        const suppliersRes = await fetch(`${import.meta.env.VITE_BASE_URL}/api/supply/list`)
        const suppliersData = await suppliersRes.json()
        setSupplier(suppliersData.data)
      } catch (error) {
        console.error("Error fetching initial data:", error)
        toast.error("Failed to load initial data")
      } finally {
        setIsLoadingDrivers(false)
        setIsLoadingVehicles(false)
        setIsLoadingSuppliers(false)
      }
    }

    fetchInitialData()
  }, [])

  // Fetch existing purchase data after initial data is loaded
  useEffect(() => {
    if (id && !isLoadingDrivers && !isLoadingVehicles && !isLoadingSuppliers) {
      const fetchPurchaseData = async () => {
        setIsLoadingFormData(true)
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/purchase/show/${id}`)
          const data = response.data.data
          
          // Format date for input type="date"
          if (data.date) {
            data.date = new Date(data.date).toISOString().split("T")[0]
          }

          // First set the category to ensure conditional fields render
          setValue("category", data.category || "")

          // Small delay to ensure fields are registered before setting values
          setTimeout(() => {
            reset(data)
            
            // Manually set important fields that might be conditional
            const fieldsToSet = {
              date: data.date || "",
              item_name: data.item_name || "",
              driver_name: data.driver_name || "",
              vehicle_no: data.vehicle_no || "",
              fuel_type: data.fuel_type || "",
              trip_id: data.trip_id || "",
              fuel_capacity: data.fuel_capacity || "",
              service_cost: data.service_cost || "",
              branch_name: data.branch_name || "Head Office",
              supplier_name: data.supplier_name || "",
              quantity: data.quantity || "",
              unit_price: data.unit_price || "",
              purchase_amount: data.purchase_amount || "",
              remarks: data.remarks || ""
            }

            Object.entries(fieldsToSet).forEach(([key, value]) => {
              setValue(key, value)
            })

            if (data.bill_image) {
              setPreviewImage(`${import.meta.env.VITE_BASE_URL}/storage/${data.bill_image}`)
            }
          }, 100)
        } catch (error) {
          console.error("Error fetching purchase data:", error)
          toast.error("Failed to load purchase data.")
        } finally {
          setIsLoadingFormData(false)
        }
      }
      fetchPurchaseData()
    }
  }, [id, reset, setValue, isLoadingDrivers, isLoadingVehicles, isLoadingSuppliers])

  // Prepare options for dropdowns
  const driverOptions = drivers.map((driver) => ({
    value: driver.driver_name,
    label: driver.driver_name,
  }))

  const vehicleOptions = vehicle.map((dt) => ({
    value: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number}`,
    label: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number}`,
  }))

  const supplyOptions = supplier.map((supply) => ({
    value: supply.business_name,
    label: supply.business_name,
  }))

  // database unique id create
  const generateRefId = useRefId();

  // Post or Update data on server
  const onSubmit = async (data) => {
    // console.log("Submitting purchase data:", data)
    const refId = generateRefId();
    setIsLoadingFormSubmit(true)
    try {
      const purchaseFormData = new FormData()
      for (const key in data) {
        if (key === "bill_image" && data[key] instanceof File) {
          purchaseFormData.append(key, data[key])
        } else if (key !== "bill_image" && data[key] !== undefined && data[key] !== null) {
          purchaseFormData.append(key, data[key])
        }
      }

      if (!id) {
        purchaseFormData.append("status", "Unpaid")
      }

      if (id) {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/purchase/update/${id}`, purchaseFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        toast.success("Purchase updated successfully!")
        navigate('/tramessy/Purchase/PurchaseList')
      } else {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/purchase/create`, purchaseFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        toast.success("Purchase submitted successfully!")
        reset()
        navigate('/tramessy/Purchase/PurchaseList')
        setPreviewImage(null)
      }
    } catch (error) {
      console.error(error)
      const errorMessage = error.response?.data?.message || error.message || "Unknown error"
      toast.error("Server issue: " + errorMessage)
    } finally {
      setIsLoadingFormSubmit(false)
    }
  }

  const formTitle = id ? "Update Purchase Information" : "Add Purchase Information"
  const submitButtonText = id ? "Update Purchase" : "Add Purchase"

  // Show loading state while form data is being loaded
  if (isLoadingFormData && id) {
    return (
      <div className="mt-10 flex justify-center items-center h-64">
        <div className="text-primary">Loading purchase data...</div>
      </div>
    )
  }

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
              <InputField name="item_name" label="Item Name" />
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
              {selectedCategory === "Parts" && (
                <div className="w-full">
                  <InputField name="service_cost" label="Service Cost" type="number" />
                </div>
              )}
              {selectedCategory !== "Parts" && (
                <div className="w-full"></div>
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
              {/* <div className="w-full">
                <InputField name="trip_id" label="Trip ID" />
              </div> */}
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
              <InputField name="purchase_amount" label="Total" readOnly value={watch("purchase_amount") || "0.00"}  required={!id} />
            </div>
            <div className="w-full">
              <InputField name="remarks" label="Remark" />
            </div>
          </div>

          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">Bill Image <span className="text-red-500">*</span></label>
              <Controller
                name="bill_image"
                control={control}
                rules={{
                  required: !id ? "This field is required" : false
                }}
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
            <div className="w-full"></div>
            <div className="w-full"></div>
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
                    fileInput.value = ""
                  }
                  setValue("bill_image", null)
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
          
          <BtnSubmit loading={isLoadingFormSubmit || isLoadingFormData}>
            {submitButtonText}
          </BtnSubmit>
        </form>
      </FormProvider>
    </div>
  )
}

export default PurchaseForm