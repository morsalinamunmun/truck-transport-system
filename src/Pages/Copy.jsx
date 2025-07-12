import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import BtnSubmit from "../components/Button/BtnSubmit";
import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "../components/Form/FormFields";
import { MdOutlineArrowDropDown } from "react-icons/md";
const AddTripForm = () => {
  const methods = useForm();
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Trip
      </h3>
      <FormProvider {...methods} className="">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-3 mx-auto bg-gray-100 rounded-md shadow"
        >
          {/* Trip & Destination Section */}
          <div className="border border-gray-300 p-3 md:p-5 rounded-b-md">
            <h5 className="text-primary font-semibold text-center md:pb-5">
              <span className="py-2 border-b-2 border-primary">
                Trip and Destination Section
              </span>
            </h5>
            <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
              <div className="w-full">
                <InputField name="date" label="Date" required />
              </div>
              <div className="w-full">
                <InputField name="load_point" label="Load Point" required />
              </div>
              <div className="w-full">
                <InputField name="unload_point" label="Unload Point" required />
              </div>
            </div>
          </div>

          {/* Vehicle and Driver Info */}
          <div className="border border-gray-300 p-5 rounded-md">
            <h5 className="text-primary font-semibold text-center pb-5">
              <span className="py-2 border-b-2 border-primary">
                Vehicle and Driver Information
              </span>
            </h5>
            <div className="md:flex justify-between gap-3">
              <div className="w-full relative">
                <InputField name="driver_name" label="Driver Name" required />
              </div>
              <div className="w-full relative">
                <InputField
                  name="driver_mobile"
                  label="Driver Mobile"
                  required
                />
              </div>
              <div className="w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Transport Type <span className="text-red-500">*</span>
                </label>
                <select className="w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none">
                  <option value="">Select Transport Type</option>
                  <option value="own_transport">Own Transport</option>
                  <option value="vendor_transport">Vendor Transport</option>
                </select>
                <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
              </div>
            </div>
            <div className="md:flex justify-between gap-3">
              <div className="w-full relative">
                <InputField name="vehicle_no" label="Vehicle Number" required />
              </div>
            </div>
          </div>
          {/* {Product information} */}
          <div className="border border-gray-300 p-5 rounded-md">
            <h5 className="text-primary font-semibold text-center pb-5">
              <span className="py-2 border-b-2 border-primary">
                Product Information
              </span>
            </h5>
            <div className="md:flex justify-between gap-3">
              <div className="w-full relative">
                <InputField name="product_name" label="Product Name" required />
              </div>
              <div className="w-full relative">
                <InputField name="quantity" label="Quantity" required />
              </div>
            </div>
          </div>

          {/* Trip Expenses */}
          <div className="border border-gray-300 p-5 rounded-md">
            <h5 className="text-primary font-semibold text-center pb-5">
              <span className="py-2 border-b-2 border-primary">
                Trip Expenses
              </span>
            </h5>
            <div className="md:flex justify-between gap-3">
              <div className="w-full relative">
                <InputField
                  name="driver_commission"
                  label="Driver Commission"
                  required
                />
              </div>
              <div className="w-full relative">
                <InputField name="toll_cost" label="Toll cost" required />
              </div>
              <div className="w-full relative">
                <InputField name="food_cost" label="Food Cost" required />
              </div>
            </div>
            <div className="md:flex justify-between gap-3">
              <div className="w-full relative">
                <InputField name="other_cost" label="Other Cost" required />
              </div>
              <div className="w-full relative">
                <InputField name="total_cost" label="Total Cost" required />
              </div>
            </div>
          </div>
          {/* Customer and Chalan Information */}
          <div className="border border-gray-300 p-5 rounded-md">
            <h5 className="text-primary font-semibold text-center pb-5">
              <span className="py-2 border-b-2 border-primary">
                Customer and Chalan Information
              </span>
            </h5>
            <div className="md:flex justify-between gap-3">
              <div className="w-full relative">
                <InputField
                  name="customer_name"
                  label="Customer Name"
                  required
                />
              </div>
              <div className="w-full relative">
                <InputField name="chalan_no" label="Chalan No" required />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-left">
            <BtnSubmit>Submit</BtnSubmit>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddTripForm;
