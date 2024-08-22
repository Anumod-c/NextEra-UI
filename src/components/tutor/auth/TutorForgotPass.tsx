import React, { useEffect } from 'react'
import tutorLoginImage from '../../../assets/tutorlogin.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { tutorEndpoints } from '../../../constraints/endpoints/tutorEndpoints';

import * as Yup from 'yup';
import {Form,Formik,ErrorMessage, Field} from 'formik';
import axios from 'axios';


const validationSchema =Yup.object({
  email:Yup.string().email("Invalid Email address").required("Email Required")
})

const initialValues={
  email:''
}

const TutorForgotPass: React.FC=()=> {
  const navigate =  useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem('tutorToken');
    if(token){
      navigate('/tutor/dashboard')
    }
  },[navigate]);
  const handleSubmit=async(values : typeof initialValues,{setSubmitting}:{setSubmitting:(isSubmitting:boolean)=>void})=>{
    try{
      const response = await axios.post(tutorEndpoints.forgotPassword,values);
      if(response.data.success){
        console.log(response)
        navigate('/tutor/otp',{ state: { forgotPass: true,email: values.email } })
      }else{
        toast.error("Email not exist")
      }
      

    }catch(error){
      console.log('forgot password',error)
    }finally{
      setSubmitting(false)
    }
  }
return (
  <div className='flex h-screen'>
    <div className='flex-1 bg-[#6227c2] flex justify-center items-center'>
      <img src= {tutorLoginImage} alt="login-img" className='w-4/5 max-w-lg' />
    </div>
    
    <div className='flex-1   flex flex-col justify-center items-center p-6'>        
      <h2 className='text-2xl font-bold mb-2'>Forgot Password? </h2>
      <p className='text-gray-600 mb-4'>No worries , Please upload you registered email address</p>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
      <Form  className='w-full max-w-sm'>
        <Field type="email" name ='email'  placeholder='Email' className='w-full p-3 m-4 border shadow-lg  rounded'/>
        <ErrorMessage name='email' component='div' className="text-red-500 mx-2 px-2  text-xs" />
        <button  disabled={isSubmitting} type='submit'className='w-full p-3 m-4 bg-[#000000]  text-white rounded-2xl hover:bg-[#44237a] '>{isSubmitting ? 'Submitting...' : "Submit"}</button>
        {isSubmitting && (
              <div className='flex justify-center'>
                <span>Loading...</span>
              </div>
            )}
      </Form>
      )}
      </Formik>
    
    </div>
  </div>
)
}



 


export default TutorForgotPass
