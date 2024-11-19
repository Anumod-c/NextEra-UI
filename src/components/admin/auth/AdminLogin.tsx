import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LOGO from "../../../assets/Nextera_Logo.jpg";
import axios from "axios";
import { adminEndpoints } from "../../../constraints/endpoints/adminEndpoints";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";

const validationSchema = Yup.object({
  email: Yup.string().matches(
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
    "Email must be a valid Gmail address"
  ),
  password: Yup.string().required("Passoword required"),
});

const initialValues = {
  email: "",
  password: "",
};

function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisiblility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const result = await axios.post(adminEndpoints.login, values);
      if (result.data.success) {
        console.log("data", result.data);

        Cookies.set(
          "adminToken",
          JSON.stringify(result.data.token.accessToken)
        );
        Cookies.set(
          "adminRefreshToken",
          JSON.stringify(result.data.token.refreshToken)
        );
        localStorage.setItem(
          "adminRefreshToken",
          JSON.stringify(result.data.token.refreshToken)
        );
        console.log(result.data);
        navigate("/admin/dashboard");
        toast.success("admin logged in succesfully");
      } else {
        toast.error("Login failed");
      }
    } catch (err) {
      console.log("Error occured", err);
      toast.error("An error occurred. Please try again");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 bg-[#1d863e] flex justify-center items-center">
        <img src={LOGO} alt="login-img" className="w-full h-full" />
      </div>
      <div className="flex-1   flex flex-col justify-center items-center p-6">
        <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
        <p className="text-gray-600 mb-4">
          Nice to see you again! Please log in with your account
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-sm">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 m-4 border shadow-lg  rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 mx-2 px-2  text-xs"
              />
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 m-4 border shadow-lg rounded"
                />
                <span
                  onClick={togglePasswordVisiblility}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mx-2 px-2"
                />
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full p-3 m-4 bg-[#000000]  text-white rounded-2xl hover:bg-[#44237a] "
              >
                {" "}
                {isSubmitting ? "Submitting..." : "Login"}
              </button>
              {isSubmitting && (
                <div className="flex justify-center">
                  <span>Loading...</span>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AdminLogin;
