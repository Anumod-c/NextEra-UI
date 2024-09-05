// import React from 'react';
import { Player } from "@lottiefiles/react-lottie-player";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
// import { userAxios } from '../../../constraints/axios/userAxios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

import { } from "@react-oauth/google";
import { userEndpoints } from "../../../constraints/endpoints/userEndPoints";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import {useState } from "react";
import  {userAxios}  from "../../../constraints/axios/userAxios";
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
  const dispatch= useDispatch()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisiblility = () => {
    setShowPassword(!showPassword)
  }



  const handleGoogleLogin = async (CredentialResponse: CredentialResponse) => {
    const { credential } = CredentialResponse;
    try {
      const result = await axios.post(userEndpoints.googleLogin, {
        credential,
      });
      console.log(result.data.result, "lllllllllllllllllllllllllllllllllll");

      if (result.data.result.success) {
        Cookies.set('accessToken',JSON.stringify(result.data.token), { expires: 15 / 1440 }); //
        navigate("/home");
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
    { setSubmitting }: { setSubmitting: (isSumbitting: boolean) => void }
  ) => {
    try {
      const result = await userAxios.post(userEndpoints.login, values);
      console.log('resulteeeeee',result.data);
      
      if (result.data.result.success) {
          const {_id,name,email,phone}=result.data.result.userData;
          dispatch(setUser({id:_id,name,email,phone}));


        console.log(result.data.token.accessToken);
        Cookies.set('accessToken',JSON.stringify(result.data.token.accessToken), { expires: 15 / 1440 }); // Expires in 15 minutes
        Cookies.set('refreshToken', JSON.stringify(result.data.token.refreshToken), { expires: 7 }); // Expires in 7 days        // localStorage.setItem('userToken', result.data.token);
        navigate("/home");
        toast.success("Logged in Successfully");
      } else {
        toast.error("User dont exist");
      }
    } catch (err) {
      console.log(err, "Error in User Login");
      toast.error("An error Occured while login");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex h-screen">
      
      <div className="flex-1 bg-[#ecf5fb] flex justify-center items-center">
      <Player
              autoplay
              loop
              src="https://lottie.host/7100dd4f-826b-421f-801b-752477ccd826/vBS1LriaZx.json"
              style={{ height: "80%", width: "80%" }}
            />      </div>
      <div className="flex-1   flex flex-col justify-center items-center p-6">
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
                className="w-full p-3 m-4 border shadow-lg  rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 mx-2 px-2  text-xs"
              />
              <div className='relative'>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='Password'
                  className='w-full p-3 m-4 border shadow-lg rounded'
                />
                <span
                  onClick={togglePasswordVisiblility}
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
                  onClick={() => navigate("/register")}
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

export default UserLogin;
