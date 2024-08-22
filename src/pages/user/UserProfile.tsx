import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../../components/user/UserNavbar';

function UserProfile() {
const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('userToken');
        if(!token){
          navigate('/')
        }else{
            navigate('/profile')
        }
      },[navigate]);
  return (
    <div>
        <UserNavbar/>
        <div className='flex justify-center text-center items-center m-5 p-6'>
         <h1>User Profile</h1> 
    </div>

    </div>
  )
}

export default UserProfile
