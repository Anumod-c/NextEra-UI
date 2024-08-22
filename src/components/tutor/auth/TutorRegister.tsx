import tutorRegisterImage from '../../../assets/tutorlogin.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Formik,Form,ErrorMessage,Field} from 'formik'
import * as Yup from 'yup';
import { tutorEndpoints } from '../../../constraints/endpoints/tutorEndpoints';
import { toast } from 'sonner';
import { useEffect } from 'react';



const initialValues ={
  name: '',
  email: '',
  phone : '',
  password : '',
  confirmPassword : '',
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.number().positive().integer().required("Phone number is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  ).required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Password must match').required("Confirm passoword is required")
})


const TutorRegister: React.FC = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem('tutorToken');
    if(token){
      navigate('/tutor/dashboard')
    }
  },[navigate]);
  const handleSubmit = async(values:typeof initialValues, {setSubmitting}:{setSubmitting:(isSubmitting:boolean)=>void}) => {
   try{
    const response = await axios.post(tutorEndpoints.register,values)
    console.log("data send from client");
    if (response.data.success) {
      console.log("register client andd navigate to otp", response.data);
      navigate(`/tutor/otp`);
    } else {
      toast.info(response.data.message);
    }
   }catch(err){
    console.log(err,"Eroor int tutot register")
    toast.error("Couldnt register this account")
   }finally{
    setSubmitting(false)
   }
      
  };



  return (
    <div className='flex h-screen'>
      <div className={`flex-1  bg-[#6227c2]  flex justify-center items-center`}>
        <img src={tutorRegisterImage} alt="register-img" className='w-4/5 max-w-lg' />
      </div>
      <div className='flex-1 flex flex-col justify-center items-center p-6'>
        <h2 className='text-2xl font-bold mb-2'>Tutor Registration</h2>
        <p className='text-gray-600 mb-4'>Create your account with Tutor</p>
       
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
        <Form  className='w-full max-w-sm'>
            <Field name='name' type="text" placeholder='Name' className='w-full p-3 m-4 border shadow-lg rounded' />
              <ErrorMessage name="name" component="div" className="text-red-500 mx-2 px-2  text-xs" />
              <Field name='email' type="email" placeholder='Email' className='w-full p-3 m-4 border shadow-lg rounded' />
              <ErrorMessage name="email" component="div" className="text-red-500 mx-2 px-2  text-xs" />

              <Field name='phone' type="number" placeholder='Phone Number' className='w-full p-3 m-4 border shadow-lg rounded' />
              <ErrorMessage name="phone" component="div" className="text-red-500 mx-2 px-2  text-xs" />

              <Field name='password' type="password" placeholder='Password' className='w-full p-3 m-4 border shadow-lg rounded' />
              <ErrorMessage name="password" component="div" className="text-red-500 mx-2 px-2  text-xs" />

              <Field name='confirmPassword' type="password" placeholder='Confirm Password' className='w-full p-3 m-4 border shadow-lg rounded' />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 mx-2 px-2  text-xs" />

          <button type='submit' disabled={isSubmitting} className='w-full p-3 m-4 bg-[#000000] text-white rounded-2xl hover:bg-[#44237a]'>{isSubmitting ? 'Submitting...' : "Register"}</button>
          <div className='flex justify-center'>
            <p className='px-2'>Already have an account?</p>
            <a  onClick={()=>navigate('/tutor')} className='text-blue-800'>Login here</a>
          </div>
        </Form>
      )}
        </Formik>

      </div>
    </div>
  );
};

export default TutorRegister;
