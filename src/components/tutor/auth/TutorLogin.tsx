import { useEffect, useState } from "react";
import { motion } from 'framer-motion'; 
import { Player } from "@lottiefiles/react-lottie-player";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { } from "@react-oauth/google";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { tutorEndpoints } from "../../../constraints/endpoints/tutorEndpoints";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setTutor } from "../../../redux/tutorSlice";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    const queryparams = new URLSearchParams(location.search);
    const message = queryparams.get('message');
    if (message == 'blocked') {
      toast.error("You have beed blocked by admin. Contact admin for more informations")
    }
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async (CredentialResponse: CredentialResponse) => {
    const { credential } = CredentialResponse;
    try {
      const result = await axios.post(tutorEndpoints.googleLogin, {
        credential,
      });
      console.log(result.data, "result of googlelogin");
      if (result.data.success) {
        Cookies.set('tutorToken', JSON.stringify(result.data.token.accessToken));
        Cookies.set('tutorRefreshToken', JSON.stringify(result.data.token.refreshToken));
        localStorage.setItem('tutorRefreshToken', JSON.stringify(result.data.token.refreshToken))
        Cookies.set('tutorId', JSON.stringify(result.data.tutor._id));
        const { _id, email, bio, cv, expertise, status, name, isVerified, phone, profilePicture, qualifications, instagram, twitter, facebook, linkedin } = result.data.tutor;
        Cookies.set('tutorId', _id)

        if (!status) {
          return toast.error(
            "You are blocked by the admin. Contact admin for furthur details"
          );
        }

        dispatch(setTutor({ id: _id, name, email, phone, bio, isVerified, cv, expertise, profilePicture, qualifications, status, instagram, twitter, facebook, linkedin }))
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
        Cookies.set('tutorToken', JSON.stringify(result.data.token.accessToken));
        Cookies.set('tutorRefreshToken', JSON.stringify(result.data.token.refreshToken));
        localStorage.setItem('tutorRefreshToken', JSON.stringify(result.data.token.refreshToken))
        const { _id, email, bio, cv, expertise, status, name, instagram, isVerified, facebook, linkedin, phone, twitter, profilePicture, qualifications } = result.data.tutorData;
        Cookies.set('tutorId', _id)
        if (!status) {
          return toast.error(
            "You are blocked by the admin. Contact admin for furthur details"
          );
        }
        Cookies.set('tutorId', _id);
        dispatch(setTutor({ id: _id, name, email, phone, bio, cv, facebook, instagram, isVerified, linkedin, twitter, expertise, profilePicture, qualifications, status }))
        console.log(result.data, "gg");
        navigate("/tutor/dashboard");
        toast.success("tutor logged in successfull");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      toast.error("An Error occured during login");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 bg-[#6227c2] flex justify-center items-center animate-fadeIn">
        <motion.div
          className="flex-1 bg-[#6227c2] flex justify-center items-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: -10, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
        >
          <Player
            autoplay
            loop
            src="https://lottie.host/7100dd4f-826b-421f-801b-752477ccd826/vBS1LriaZx.json"
            style={{ height: "80%", width: "80%" }}
          />
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-6 animate-fadeIn">
        <motion.div
          className="flex-1 flex flex-col justify-center items-center p-6"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
        >
          <h2 className="text-2xl font-bold mb-2">Tutor Login</h2>
          <p className="text-gray-600 mb-4">
            Welcome back! Please log in with your account
          </p>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="w-full max-w-sm">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 m-4 border shadow-lg rounded"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 mx-2 px-2 text-xs" />
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full p-3 m-4 border shadow-lg rounded"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mx-2 px-2" />
                </div>
                <a
                  className="flex justify-end text-blue-800"
                  onClick={() => navigate("/tutor/forgotPassword")}
                >
                  Forgot Password?
                </a>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full p-3 m-4 bg-[#000000] text-white rounded-2xl hover:bg-[#44237a]"
                >
                  {isSubmitting ? "Submitting..." : "Login"}
                </button>
                {isSubmitting && (
                  <div className="flex justify-center">
                    <span>Loading...</span>
                  </div>
                )}
                <div className="flex justify-center mb-4">
                  <div className="w-1/4 border-t border-gray-300 mt-3"></div>
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
                  <p className="px-2">Don't have an account?</p>
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
        </motion.div>
      </div>
    </div>
  );
}

export default TutorLogin;
