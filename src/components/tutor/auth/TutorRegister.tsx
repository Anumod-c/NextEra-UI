import { motion } from 'framer-motion';
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup';
import { tutorEndpoints } from '../../../constraints/endpoints/tutorEndpoints';
import { toast } from 'sonner';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const initialValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().matches(
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
    "Email must be a valid Gmail address"
  ).required("Email is required"),
  phone: Yup.number().typeError("Phone number must be a number")
    .test(
      "len",
      "Phone number must be exactly 10 digits",
      (val) => val !== undefined && val.toString().length === 10
    ),
  password: Yup.string().min(8, "Password must be at least 8 characters").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  ).required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Password must match').required("Confirm passoword is required")
})


const TutorRegister: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisiblility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const response = await axios.post(tutorEndpoints.register, values)
      console.log("data send from client");
      if (response.data.success) {
        console.log("register client andd navigate to otp", response.data);
        navigate('/tutor/otp');
      } else {
        toast.info(response.data.message);
      }
    } catch (err) {
      console.log(err, "Eroor int tutot register")
      toast.error("Couldnt register this account")
    } finally {
      setSubmitting(false)
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
      <div className='flex-1 flex flex-col justify-center items-center p-6'>
        <motion.div
          className="flex-1 flex flex-col justify-center items-center p-6"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
        >
          <h2 className='text-2xl font-bold mb-2'>Tutor Registration</h2>
          <p className='text-gray-600 mb-4'>Create your account with Tutor</p>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className='w-full max-w-sm'>
                <Field name='name' type="text" placeholder='Name' className='w-full p-3 m-4 border shadow-lg rounded' />
                <ErrorMessage name="name" component="div" className="text-red-500 mx-2 px-2  text-xs" />
                <Field name='email' type="email" placeholder='Email' className='w-full p-3 m-4 border shadow-lg rounded' />
                <ErrorMessage name="email" component="div" className="text-red-500 mx-2 px-2  text-xs" />
                <Field name='phone' type="number" placeholder='Phone Number' className='w-full p-3 m-4 border shadow-lg rounded' />
                <ErrorMessage name="phone" component="div" className="text-red-500 mx-2 px-2  text-xs" />
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
                <button type='submit' disabled={isSubmitting} className='w-full p-3 m-4 bg-[#000000] text-white rounded-2xl hover:bg-[#44237a]'>{isSubmitting ? 'Submitting...' : "Register"}</button>
                <div className='flex justify-center'>
                  <p className='px-2'>Already have an account?</p>
                  <a onClick={() => navigate('/tutor')} className='text-blue-800'>Login here</a>
                </div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </div>
  );
};

export default TutorRegister;
