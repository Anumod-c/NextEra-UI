import userRegisterImage from "../../../assets/tutorlogin.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { userEndpoints } from "../../../constraints/endpoints/userEndPoints";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "sonner";

import axios from "axios";
import {  useState } from "react";

const intitalValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Email must be a valid Gmail address"
    )
    .required("Email is required"),
  phone: Yup.number()
    .typeError("Phone number must be a number")
    .test(
      "len",
      "Phone number must be exactly 10 digits",
      (val) => val !== undefined && val.toString().length === 10
    )
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Password must match")
    .required("Confirm passoword is required"),
});
const UserRegister: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisiblility = () => {
    setShowPassword(!showPassword)
  }
  // useEffect(() => {
  //   const token = localStorage.getItem("userToken");
  //   if (token) {
  //     navigate("/");
  //   }
  // }, [navigate]);
  const handleSubmit = async (
    values: typeof intitalValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await axios.post(userEndpoints.register, values);
      console.log("data send from client");
      if (response.data.success) {
        console.log("register client andd navigate to otp", response.data);
        navigate(`/otp`);
      } else {
        toast.info(response.data.message);
      }
    } catch (err) {
      console.log(err, "registeration error");
      toast.error("Couldnt submit the form");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className={`flex-1 bg-[#6227c2] flex justify-center items-center`}>
        <img
          src={userRegisterImage}
          alt="register-img"
          className="w-4/5 max-w-lg"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <h2 className="text-2xl font-bold mb-2"> User Registration</h2>
        <p className="text-gray-600 mb-4">Create your account with User</p>
        <Formik
          initialValues={intitalValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-sm">
              <Field
                name="name"
                type="text"
                placeholder="Name"
                className="w-full p-3 m-4 border shadow-lg rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 mx-2 px-2  text-xs"
              />
              <Field
                name="email"
                type="text"
                placeholder="Email"
                className="w-full p-3 m-4 border shadow-lg rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 mx-2 px-2  text-xs"
              />

              <Field
                name="phone"
                type="number"
                placeholder="Phone Number"
                className="w-full p-3 m-4 border shadow-lg rounded"
              />
              <ErrorMessage
                name="phone"
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

              <div className='relative'>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  placeholder='confirmPassword'
                  className='w-full p-3 m-4 border shadow-lg rounded'
                />
                <span
                  onClick={togglePasswordVisiblility}
                  className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
                <ErrorMessage
                  name='confirmPassword'
                  component='div'
                  className='text-red-500 text-xs mx-2 px-2'
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full p-3 m-4 bg-[#000000] text-white rounded-2xl hover:bg-[#44237a]"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
              {isSubmitting && (
                <div className="flex justify-center">
                  <span>Loading...</span>
                </div>
              )}
              <div className="flex justify-center">
                <p className="px-2">Already have an account?</p>
                <a onClick={() => navigate("/login")} className="text-blue-800">
                  Login here
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserRegister;
