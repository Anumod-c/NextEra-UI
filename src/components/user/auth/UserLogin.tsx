import { useEffect, useState } from 'react';
import { Player } from "@lottiefiles/react-lottie-player";
import Cookies from 'js-cookie';
import { motion } from 'framer-motion'; // Import motion
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { userEndpoints } from "../../../constraints/endpoints/userEndPoints";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/userSlice";

const validationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Email must be a valid Gmail address"
    ).required("Email is required"),
  password: Yup.string().required("Password Required"),
});

const initialValues = {
  email: "",
  password: "",
};

function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    const queryparams = new URLSearchParams(location.search);
    const message = queryparams.get('message');
    if (message == 'blocked') {
      toast.error("You have beed blocked by admin. Contact admin for more information")
    }
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async (CredentialResponse: CredentialResponse) => {
    const { credential } = CredentialResponse;
    try {
      const result = await axios.post(userEndpoints.googleLogin, {
        credential,
      });
      console.log(result.data, "Google Login Result");
      if (result.data.result.success) {
        Cookies.set('userToken', JSON.stringify(result.data.token.accessToken));

        Cookies.set('userRefreshToken', JSON.stringify(result.data.token.refreshToken));

        localStorage.setItem('userRefreshToken', JSON.stringify(result.data.token.refreshToken))

        const { _id, name, email, phone, facebook, purchasedCourses, instagram, linkedin, twitter, age, bio, completedCourses, coursesEnrolled, profilePicture, status } = result.data.result.user;
        
        Cookies.set('userId', _id);
        
        console.log('Login result: id', _id);

        if (!status) {
          return toast.error("You have beed blocked by admin. Contact admin for more information")
        }
        dispatch(setUser({ id: _id, name, email, purchasedCourses, phone, facebook, instagram, linkedin, twitter, age, bio, completedCourses, coursesEnrolled, profilePicture }));

        navigate("/home");
      } else {
        toast.info("Couldn't login with Google");
      }
    } catch (error) {
      toast.error("Google login failed");
      console.log(error, "Error in Google login");
    }
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const result = await axios.post(userEndpoints.login, values);
      console.log('Login resultssss:', result.data);

      if (result.data.result.success) {

        Cookies.set('userToken', JSON.stringify(result.data.token.accessToken));

        Cookies.set('userRefreshToken', JSON.stringify(result.data.token.refreshToken));

        localStorage.setItem('userRefreshToken', JSON.stringify(result.data.token.refreshToken))

        Cookies.set('userId', JSON.stringify(result.data.token.refreshToken));

        const { _id, name, email, phone, purchasedCourses, facebook, instagram, linkedin, twitter, age, bio, completedCourses, coursesEnrolled, profilePicture, status } = result.data.result.userData;
        
        Cookies.set('userId', _id);
        
        console.log('Login result: id', _id);

        if (!status) {
          return toast.error("You are blocked by the admin. Contact admin for furthur details")
        }
        dispatch(setUser({ id: _id, name, email, phone, facebook, instagram, linkedin, twitter, age, bio, completedCourses, coursesEnrolled, profilePicture, purchasedCourses }));

        navigate("/home");
      } else {
        toast.error(result.data.result.message);
      }
    } catch (err) {
      console.log(err, "Error in User Login");
      toast.error("An error occurred while logging in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 bg-[#ecf5fb] flex justify-center items-center animate-fadeIn">
        <motion.div
          className="flex-1 bg-[#ecf5fb] flex justify-center items-center"
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
          initial={{ x: 100, opacity: 0 }} // Start position
          animate={{ x: 0, opacity: 1 }} // End position
          exit={{ x: 100, opacity: 0 }} // Exit animation
          transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }} // Smooth easing
        >
          <h2 className="text-2xl font-bold mb-2">User Login</h2>
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
                  className="w-full p-3 m-4 border shadow-lg rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mx-2 px-2 text-xs"
                />
                <div className='relative'>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    placeholder='Password'
                    className='w-full p-3 m-4 border shadow-lg rounded'
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='text-red-500 text-xs mx-2 px-2'
                  />
                </div>
                <a
                  className="flex justify-end text-blue-800"
                  onClick={() => navigate("/forgotPassword")}
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
                    <span>Loading</span>
                  </div>
                )}
                {/* Google login */}
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
                    onClick={() => navigate("/register")}
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

export default UserLogin;
