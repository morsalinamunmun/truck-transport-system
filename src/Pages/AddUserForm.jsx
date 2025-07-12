import { useForm, FormProvider } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import BtnSubmit from "../components/Button/BtnSubmit";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { InputField, SelectField } from "../components/Form/FormFields";

const AddUserForm = () => {
  const methods = useForm();
  const { handleSubmit, reset, watch } = methods;
  const password = watch("password");
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "https://api.tramessy.com/api/users",
        formData
      );
      const resData = response.data;

      if (resData.status === "success") {
        toast.success("User successfully added!", { position: "top-right" });
        reset();
      } else {
        toast.error("Server error: " + (resData.message || "Unknown issue"));
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      toast.error("Server error: " + errorMessage);
    }
  };

  return (
    <div className="mt-10">
      <Toaster />
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add User
      </h3>
      <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Row 1 */}
            <div className="md:flex justify-between gap-3">
              <div className="w-full">
                <InputField name="name" label="Name" required />
              </div>
              <div className="w-full">
                <InputField name="phone" label="Phone" type="number" required />
              </div>
            </div>

            {/* Row 2 */}
            <div className="md:flex justify-between gap-3">
              <div className="w-full">
                <InputField name="email" label="Email" type="email" required />
              </div>
              <div className="w-full">
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  required
                />
              </div>
              <div className="w-full">
                <InputField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  required
                  validate={(value) =>
                    value === password || "Passwords do not match"
                  }
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="md:flex justify-between gap-3">
              <div className="w-full relative">
                <SelectField
                  name="role"
                  label="User Type"
                  required
                  options={[
                    { value: "", label: "Select User Type..." },
                    { value: "User", label: "User" },
                    { value: "Admin", label: "Admin" },
                  ]}
                />
                <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
              </div>
              <div className="w-full relative">
                <SelectField
                  name="status"
                  label="Status"
                  required
                  options={[
                    { value: "", label: "Select Status..." },
                    { value: "Active", label: "Active" },
                    { value: "Inactive", label: "Inactive" },
                  ]}
                />
                <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6">
              <BtnSubmit>Submit</BtnSubmit>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddUserForm;
