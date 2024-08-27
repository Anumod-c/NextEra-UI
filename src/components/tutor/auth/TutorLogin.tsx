import React, { useState } from "react";
import tutorLoginImage from "../../../assets/tutorlogin.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import {} from "@react-oauth/google";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { tutorEndpoints } from "../../../constraints/endpoints/tutorEndpoints";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Email must be a valid Gmail address"
    )
    .required("Email Required"),
  password: Yup.string().required("Pasword Required"),
});

function TutorLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisiblility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async (CredentialResponse: CredentialResponse) => {
    const { credential } = CredentialResponse;
    try {
      const result = await axios.post(tutorEndpoints.googleLogin, {
        credential,
      });
      console.log(result, "result of googlelogin");
      if (result.data.success) {
        localStorage.setItem("tutorToken", result.data.token);
        navigate("/tutor/dashboard");
      } else {
        toast.info("Couldnt login with google");
      }
    } catch (error) {
      toast.error("Google login Failed");
      console.log(error, "error in google login");
    }
  };
  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const result = await axios.post(tutorEndpoints.login, values);
      if (result.data.success) {
        console.log(result.data);
        localStorage.setItem("tutorToken", result.data.token);
        navigate("/tutor/dashboard");
        toast.success("tutor logged in successfull");
      } else {
        toast.error("User dont exist");
      }
    } catch (err) {
      toast.error("An Error occured during login");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-[#6227c2] flex justify-center items-center">
        <img src={tutorLoginImage} alt="login-img" className="w-4/5 max-w-lg" />
      </div>
      <div className="flex-1   flex flex-col justify-center items-center p-6">
        <h2 className="text-2xl font-bold mb-2">Tutor Login</h2>
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

              <a
                className="flex justify-end text-blue-800"
                onClick={() => navigate("/tutor/forgotPassword")}
              >
                Forgot Passoword?
              </a>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-3 m-4 bg-[#000000]  text-white rounded-2xl hover:bg-[#44237a] "
              >
                {isSubmitting ? "Submitting..." : "Login"}
              </button>
              {isSubmitting && (
                <div className="flex justify-center">
                  <span>Loading</span>
                </div>
              )}
              {/* google login */}
              <div className="flex justify-center mb-4">
                <div className=" w-1/4 border-t border-gray-300 mt-3"></div>
                <span className="mx-4">or continue with</span>
                <div className="w-1/4 border-t border-gray-300 mt-3"></div>
              </div>
              <div className="flex justify-center mb-4">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => console.log("Login Failed")}
                />
              </div>
              <div className="flex justify-center">
                <p className="px-2">Dont have an account?</p>
                <a
                  className="flex justify-center text-blue-800"
                  onClick={() => navigate("/tutor/register")}
                >
                  Register here
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default TutorLogin;
