import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TutorNavbar from '../../components/tutor/auth/TutorNavbar';

function TutorDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('tutorToken');

  useEffect(()=>{
    if(!token){
      navigate('/tutor')
    }else{
      navigate('/tutor/dashboard')
    }
  })

  return (
    <div>
        <>
        <TutorNavbar/>
        </>
        <div className='flex p-4 justify-center items-center'>
        <p className='p-4'>Tutor Home</p> 
        </div>
      
    </div>
  )
}

export default TutorDashboard
