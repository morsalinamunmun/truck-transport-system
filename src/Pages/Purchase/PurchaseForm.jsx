import React, { useEffect, useRef, useState } from "react";
import BtnSubmit from "../../components/Button/BtnSubmit";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { InputField, SelectField } from "../../components/Form/FormFields";
import { FiCalendar } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

const PurchaseForm = () => {
  const methods = useForm();
  const { handleSubmit, register, watch, reset, setValue, control } = methods;
  const purChaseDateRef = useRef(null);
  const [drivers, setDrivers] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [branch, setBranch] = useState([]);
  const [supplier, setSupplier] = useState([]);

  const selectedCategory = watch("category");
  // calculate Total Expense
  const quantity = parseFloat(watch("quantity") || 0);
  const unitPrice = parseFloat(watch("unit_price") || 0);
  const totalPrice = quantity * unitPrice;
  useEffect(() => {
    const totalPrice = quantity * unitPrice;
    setValue("total", totalPrice);
  }, [quantity, unitPrice, setValue]);
  // preview image
  const [previewImage, setPreviewImage] = useState(null);
  // generate ref id
  // const generateRefId = () => {
  //   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  //   let refId = "";
  //   for (let i = 0; i < 6; i++) {
  //     refId += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return refId;
  // };
  // select driver from api
  useEffect(() => {
    fetch("https://api.tramessy.com/mstrading/api/driver/list")
      .then((response) => response.json())
      .then((data) => setDrivers(data.data))
      .catch((error) => console.error("Error fetching driver data:", error));
  }, []);
  const driverOptions = drivers.map((driver) => ({
    value: driver.driver_name,
    label: driver.driver_name,
  }));
  // select Vehicle No. from api
  useEffect(() => {
    fetch("https://api.tramessy.com/mstrading/api/vehicle/list")
      .then((response) => response.json())
      .then((data) => setVehicle(data.data))
      .catch((error) => console.error("Error fetching vehicle data:", error));
  }, []);

  const vehicleOptions = vehicle.map((dt) => ({
    value: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
    label: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
  }));
  // select branch from api
  useEffect(() => {
    fetch("https://api.tramessy.com/mstrading/api/office/list")
      .then((response) => response.json())
      .then((data) => setBranch(data.data))
      .catch((error) => console.error("Error fetching branch data:", error));
  }, []);
  const branchOptions = branch.map((branch) => ({
    value: branch.branch_name,
    label: branch.branch_name,
  }));
  // select supplier from api
  useEffect(() => {
    fetch("https://api.tramessy.com/mstrading/api/supply/list")
      .then((response) => response.json())
      .then((data) => setSupplier(data.data))
      .catch((error) => console.error("Error fetching supply data:", error));
  }, []);
  const supplyOptions = supplier.map((supply) => ({
    value: supply.contact_person_name,
    label: supply.contact_person_name,
  }));
  // post data on server
  const onSubmit = async (data) => {
    console.log("purchase", data);
    // const refId = generateRefId();

    try {
      const purchaseFormData = new FormData();

      // Append form fields
      for (const key in data) {
        purchaseFormData.append(key, data[key]);
      }

      // Additional fields
      // purchaseFormData.append("ref_id", refId);
      purchaseFormData.append("status", "Unpaid");

      await axios.post(
        "https://api.tramessy.com/mstrading/api/purchase/create",
        purchaseFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Optional: Handle successful submission
      // console.log("Purchase success", purchaseResponse.data);
      toast.success("Purchase submitted successfully!", {
        position: "top-right",
      });
      reset();
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      toast.error("Server issue: " + errorMessage);
    }
  };

  // todo set default status = unpaid, generate auto ref number from backend
  return (
    <div className="mt-10">
      <Toaster />
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Purchase Information
      </h3>
      <FormProvider {...methods} className="">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto p-6 bg-gray-100 rounded-md shadow space-y-4"
        >
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField
                name="date"
                label="Purchase Date"
                type="date"
                required
                inputRef={(e) => {
                  register("date").ref(e);
                  purChaseDateRef.current = e;
                }}
                icon={
                  <span
                    className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r"
                    onClick={() => purChaseDateRef.current?.showPicker?.()}
                  >
                    <FiCalendar className="text-white cursor-pointer" />
                  </span>
                }
              />
            </div>
            <div className="w-full">
              <SelectField
                name="category"
                label="Category"
                required
                options={[
                  { value: "Fuel", label: "Fuel" },
                  { value: "Engine Oil", label: "Engine Oil" },
                  { value: "Parts", label: "Parts" },
                  { value: "Stationary", label: "Stationary" },
                  { value: "Snacks", label: "Snacks" },
                  { value: "Electronics", label: "Electronics" },
                  { value: "Furniture", label: "Furniture" },
                ]}
              />
            </div>
            <div className="w-full">
              <InputField name="item_name" label="Item Name" required />
            </div>
          </div>
          {/* Engine Oil category */}
          {selectedCategory === "Engine Oil" && (
            <div className="md:flex justify-between gap-3">
              <div className="w-full">
                <SelectField
                  name="driver_name"
                  label="Driver Name"
                  required={true}
                  options={driverOptions}
                  control={control}
                />
              </div>
              <div className="w-full">
                <SelectField
                  name="vehicle_no"
                  label="Vehicle No."
                  required={true}
                  options={vehicleOptions}
                  control={control}
                />
              </div>
            </div>
          )}

          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <SelectField
                name="branch_name"
                label="Branch Name"
                required={true}
                options={branchOptions}
                control={control}
              />
            </div>
            <div className="w-full">
              <SelectField
                name="supplier_name"
                label="Supplier Name"
                required={true}
                options={supplyOptions}
                control={control}
              />
            </div>
            <div className="w-full">
              <InputField name="quantity" label="Quantity" required />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="unit_price" label="Unit Price" required />
            </div>
            <div className="w-full">
              <InputField
                name="purchase_amount"
                label="Total"
                readOnly
                defaultValue={totalPrice}
                value={totalPrice}
                required
              />
            </div>
            <div className="w-full">
              <InputField name="remarks" label="Remark" />
            </div>
          </div>
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                Bill Image
              </label>
              <Controller
                name="bill_image"
                control={control}
                rules={{ required: "This field is required" }}
                render={({
                  field: { onChange, ref },
                  fieldState: { error },
                }) => (
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
                        const file = e.target.files[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setPreviewImage(url);
                          onChange(file);
                        } else {
                          setPreviewImage(null);
                          onChange(null);
                        }
                      }}
                    />
                    {error && (
                      <span className="text-red-600 text-sm">
                        {error.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
          {/* Preview */}
          {previewImage && (
            <div className="mt-3 relative flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setPreviewImage(null);
                  document.getElementById("bill_image").value = "";
                }}
                className="absolute top-2 right-2 text-red-600 bg-white shadow rounded-sm hover:text-white hover:bg-secondary transition-all duration-300 cursor-pointer font-bold text-xl p-[2px]"
                title="Remove image"
              >
                <IoMdClose />
              </button>
              <img
                src={previewImage}
                alt="License Preview"
                className="max-w-xs h-auto rounded border border-gray-300"
              />
            </div>
          )}
          <BtnSubmit>Submit</BtnSubmit>
        </form>
      </FormProvider>
    </div>
  );
};

export default PurchaseForm;
