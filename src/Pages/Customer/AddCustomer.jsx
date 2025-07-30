import BtnSubmit from "../../components/Button/BtnSubmit";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";
import { FormProvider, useForm } from "react-hook-form";
import { InputField, SelectField } from "../../components/Form/FormFields";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import useRefId from "../../hooks/useRef";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const [loading, setLoading] = useState(false)
  const dateRef = useRef(null);
  const methods = useForm();
  const navigate = useNavigate();
  const { handleSubmit, reset, register } = methods;
  const generateRefId = useRefId();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      formData.append("ref_id", generateRefId());
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/customer/create`,
        formData
      );
      const resData = response.data;
      // console.log("resData", resData);
      if (resData.status === "Success") {
        toast.success("Customer data saved successfully!", {
          position: "top-right",
        });
        reset();
        navigate("/tramessy/Customer")
      } else {
        toast.error("Server Error: " + (resData.message || "Unknown issue"));
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      toast.error("Server Error: " + errorMessage);
    }finally {
    setLoading(false); 
  }
  };

  return (
    <div className="mt-10">
      <Toaster />
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Customer information
      </h3>
      <div className="mx-auto p-6  rounded-b-md shadow border border-gray-300">
        <FormProvider {...methods} className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="md:flex justify-between gap-3">
              <div className="w-full">
                <InputField
                  name="date"
                  label="Date"
                  type="date"
                  required
                  inputRef={(e) => {
                    register("date").ref(e);
                    dateRef.current = e;
                  }}
                  icon={
                    <span
                      className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r"
                      onClick={() => dateRef.current?.showPicker?.()}
                    >
                      <FiCalendar className="text-white cursor-pointer" />
                    </span>
                  }
                />
              </div>
              <div className="w-full relative">
                <InputField
                  name="customer_name"
                  label="Customer Name"
                  required
                />
              </div>
            </div>
            {/*  */}
            <div className="mt-1 md:flex justify-between gap-3">
              <div className="mt-3 md:mt-0 w-full relative">
                <InputField name="mobile" label="Mobile" required />
              </div>
              <div className="mt-3 md:mt-0 w-full relative">
                <InputField name="email" label="Email" />
              </div>
            </div>
            {/*  */}
            <div className="mt-1 md:flex justify-between gap-3">
              <div className="w-full relative">
                <InputField name="address" label="Address" required />
              </div>
              <div className="w-full relative">
                <InputField name="due" label="Due Balance" required />
              </div>
              <div className="w-full">
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

            {/* Submit Button */}
            <div className="text-left">
              <BtnSubmit loading={loading}>Submit</BtnSubmit>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddCustomer;
