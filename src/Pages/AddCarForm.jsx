import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FiCalendar } from "react-icons/fi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import BtnSubmit from "../components/Button/BtnSubmit";
import { InputField, SelectField } from "../components/Form/FormFields";
import useRefId from "../hooks/useRef";
const AddCarForm = () => {
  const methods = useForm();
  const { handleSubmit, register, reset, control } = methods;
  const registrationDateRef = useRef(null);
  const taxDateRef = useRef(null);
  const roadPermitRef = useRef(null);
  const fitnessDateRef = useRef(null);
  const insuranceDateRef = useRef(null);
  // select driver from api
  const [drivers, setDrivers] = useState([]);
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

  // post vehicle
  const generateRefId = useRefId();
  const onSubmit = async (data) => {
    console.log("add car data", data);
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      formData.append("ref_id", generateRefId());
      const response = await axios.post(
        "https://api.tramessy.com/mstrading/api/vehicle/create",
        formData
      );
      const resData = response.data;
      console.log("resData", resData);
      if (resData.status === "Success") {
        toast.success("Vehicle saved successfully!", { position: "top-right" });
        reset();
      } else {
        toast.error("Server error: " + (resData.message || "Unknown issue"));
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      toast.error("Server error: " + errorMessage);
    }
  };

  return (
    <FormProvider {...methods} className="">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        <Toaster position="top-center" reverseOrder={false} />
        <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
          Add Vehicle Information
        </h3>

        <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
          {/* Vehicle & Driver Name */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="vehicle_name" label="Vehicle Name" required />
            </div>
            <div className="relative mt-2 md:mt-0 w-full">
              <SelectField
                name="driver_name"
                label="Driver Name"
                required={true}
                options={driverOptions}
                control={control}
              />
            </div>
          </div>

          {/* Category & Size */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full relative">
              <SelectField
                name="vehicle_category"
                label="Vehicle Category"
                required
                options={[
                  { value: "", label: "Select Vehicle category..." },
                  { value: "Pickup", label: "Pickup" },
                  { value: "Covered Van", label: "Covered Van" },
                  { value: "Open Truck", label: "Open Truck" },
                ]}
              />
            </div>

            <div className="relative mt-2 md:mt-0 w-full">
              <SelectField
                name="vehicle_size"
                label="Vehicle Size/Capacity"
                required
                options={[
                  { value: "", label: "Select Vehicle size..." },
                  { value: "4 Ton", label: "4 Ton" },
                  { value: "3 Ton", label: "3 Ton" },
                  { value: "22 Ton", label: "22 Ton" },
                  { value: "7 Feet", label: "7 Feet" },
                  { value: "9 Feet", label: "9 Feet" },
                  { value: "12 Feet", label: "12 Feet" },
                  { value: "14 Feet", label: "14 Feet" },
                  { value: "16 Feet", label: "16 Feet" },
                  { value: "18 Feet", label: "18 Feet" },
                  { value: "20 Feet", label: "20 Feet" },
                  { value: "23 Feet", label: "23 Feet" },
                ]}
              />
            </div>
            <div className="w-full">
              <InputField name="fuel_capacity" label="Fuel Capacity" required />
            </div>
          </div>

          {/* Registration Number & Serial */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField
                name="registration_number"
                label="Registration Number"
                required
              />
            </div>
            <div className="mt-2 md:mt-0 w-full">
              <SelectField
                name="registration_serial"
                label="Registration Serial"
                required
                options={[
                  { value: "Ta", label: "Ta" },
                  { value: "Tha", label: "Tha" },
                  { value: "Da", label: "Da" },
                  { value: "Dha", label: "Dha" },
                  { value: "Na", label: "Na" },
                  { value: "M", label: "M" },
                  { value: "Sh", label: "Sh" },
                ]}
              />
            </div>
            <div className="relative w-full">
              <SelectField
                name="registration_zone"
                label="Registration Zone"
                required
                options={[
                  { value: "", label: "Select zone..." },
                  { value: "Dhaka Metro", label: "Dhaka Metro" },
                  { value: "Chatto Metro", label: "Chatto Metro" },
                  { value: "Sylhet Metro", label: "Sylhet Metro" },
                  { value: "Rajshahi Metro", label: "Rajshahi Metro" },
                  { value: "Khulna Metro", label: "Khulna Metro" },
                  { value: "Rangpur Metro", label: "Rangpur Metro" },
                  { value: "Barisal Metro", label: "Barisal Metro" },
                  { value: "Dhaka", label: "Dhaka" },
                  { value: "Narayanganj", label: "Narayanganj" },
                  { value: "Gazipur", label: "Gazipur" },
                  { value: "Tangail", label: "Tangail" },
                  { value: "Manikgonj", label: "Manikgonj" },
                  { value: "Munshigonj", label: "Munshigonj" },
                  { value: "Faridpur", label: "Faridpur" },
                  { value: "Rajbari", label: "Rajbari" },
                  { value: "Narsingdi", label: "Narsingdi" },
                  { value: "Kishorgonj", label: "Kishorgonj" },
                  { value: "Shariatpur", label: "Shariatpur" },
                  { value: "Gopalgonj", label: "Gopalgonj" },
                  { value: "Madaripur", label: "Madaripur" },
                  { value: "Chattogram", label: "Chattogram" },
                  { value: "Cumilla", label: "Cumilla" },
                  { value: "Feni", label: "Feni" },
                  { value: "Brahmanbaria", label: "Brahmanbaria" },
                  { value: "Noakhali", label: "Noakhali" },
                  { value: "Chandpur", label: "Chandpur" },
                  { value: "Lokkhipur", label: "Lokkhipur" },
                  { value: "Bandarban", label: "Bandarban" },
                  { value: "Rangamati", label: "Rangamati" },
                  { value: "CoxsBazar", label: "CoxsBazar" },
                  { value: "Khagrasori", label: "Khagrasori" },
                  { value: "Barisal", label: "Barisal" },
                  { value: "Barguna", label: "Barguna" },
                  { value: "Bhola", label: "Bhola" },
                  { value: "Patuakhali", label: "Patuakhali" },
                  { value: "Pirojpur", label: "Pirojpur" },
                  { value: "Jhalokati", label: "Jhalokati" },
                  { value: "Khulna", label: "Khulna" },
                  { value: "Kustia", label: "Kustia" },
                  { value: "Jashore", label: "Jashore" },
                  { value: "Chuadanga", label: "Chuadanga" },
                  { value: "Satkhira", label: "Satkhira" },
                  { value: "Bagerhat", label: "Bagerhat" },
                  { value: "Meherpur", label: "Meherpur" },
                  { value: "Jhenaidah", label: "Jhenaidah" },
                  { value: "Norail", label: "Norail" },
                  { value: "Magura", label: "Magura" },
                  { value: "Rangpur", label: "Rangpur" },
                  { value: "Ponchogor", label: "Ponchogor" },
                  { value: "Thakurgaon", label: "Thakurgaon" },
                  { value: "Kurigram", label: "Kurigram" },
                  { value: "Dinajpur", label: "Dinajpur" },
                  { value: "Nilfamari", label: "Nilfamari" },
                  { value: "Lalmonirhat", label: "Lalmonirhat" },
                  { value: "Gaibandha", label: "Gaibandha" },
                  { value: "Rajshahi", label: "Rajshahi" },
                  { value: "Pabna", label: "Pabna" },
                  { value: "Bagura", label: "Bagura" },
                  { value: "Joypurhat", label: "Joypurhat" },
                  { value: "Nouga", label: "Nouga" },
                  { value: "Natore", label: "Natore" },
                  { value: "Sirajgonj", label: "Sirajgonj" },
                  { value: "Chapainawabganj", label: "Chapainawabganj" },
                  { value: "Sylhet", label: "Sylhet" },
                  { value: "Habiganj", label: "Habiganj" },
                  { value: "Moulvibazar", label: "Moulvibazar" },
                  { value: "Sunamgonj", label: "Sunamgonj" },
                  { value: "Mymensingh", label: "Mymensingh" },
                  { value: "Netrokona", label: "Netrokona" },
                  { value: "Jamalpur", label: "Jamalpur" },
                  { value: "Sherpur", label: "Sherpur" },
                ]}
              />
            </div>
          </div>

          {/* Registration Zone */}
          <div className="md:flex justify-between gap-3">
            {/* Registration Date */}
            <div className="relative w-full">
              <InputField
                name="registration_date"
                label="Registration Date"
                type="date"
                required
                inputRef={(e) => {
                  register("registration_date").ref(e);
                  registrationDateRef.current = e;
                }}
                icon={
                  <span
                    className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r"
                    onClick={() => registrationDateRef.current?.showPicker?.()}
                  >
                    <FiCalendar className="text-white cursor-pointer" />
                  </span>
                }
              />
            </div>

            {/* Tax Expiry Date */}
            <div className="mt-2 md:mt-0 w-full">
              <InputField
                name="tax_date"
                label="Tax Expiry Date"
                type="date"
                required
                inputRef={(e) => {
                  register("tax_date").ref(e);
                  taxDateRef.current = e;
                }}
                icon={
                  <span
                    className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r"
                    onClick={() => taxDateRef.current?.showPicker?.()}
                  >
                    <FiCalendar className="text-white cursor-pointer" />
                  </span>
                }
              />
            </div>
            <div className="w-full">
              <InputField
                name="road_permit_date"
                label="Road Permit Date"
                type="date"
                required
                inputRef={(e) => {
                  register("road_permit_date").ref(e);
                  roadPermitRef.current = e;
                }}
                icon={
                  <span
                    className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r"
                    onClick={() => roadPermitRef.current?.showPicker?.()}
                  >
                    <FiCalendar className="text-white cursor-pointer" />
                  </span>
                }
              />
              <label className="text-primary text-sm font-semibold"></label>
            </div>
          </div>

          {/* Road Permit & Fitness Date & Status */}
          <div className="md:flex justify-between gap-3">
            <div className="mt-2 md:mt-0 w-full">
              <InputField
                name="fitness_date"
                label="Fitness Expiry Date"
                type="date"
                required
                inputRef={(e) => {
                  register("fitness_date").ref(e);
                  fitnessDateRef.current = e;
                }}
                icon={
                  <span
                    className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r"
                    onClick={() => fitnessDateRef.current?.showPicker?.()}
                  >
                    <FiCalendar className="text-white cursor-pointer" />
                  </span>
                }
              />
            </div>
            <div className="mt-2 md:mt-0 w-full">
              <InputField
                name="insurance_date"
                label="Insurance Expiry Date"
                type="date"
                required
                inputRef={(e) => {
                  register("insurance_date").ref(e);
                  insuranceDateRef.current = e;
                }}
                icon={
                  <span
                    className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r"
                    onClick={() => insuranceDateRef.current?.showPicker?.()}
                  >
                    <FiCalendar className="text-white cursor-pointer" />
                  </span>
                }
              />
            </div>

            <div className="w-full relative">
              <SelectField
                name="status"
                label="Status"
                required
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" },
                ]}
              />
            </div>
          </div>

          <div className="text-left">
            <BtnSubmit>Submit</BtnSubmit>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddCarForm;
