import React from 'react'
import UserNavbar from '../../components/user/UserNavbar'
import Course from '../../components/user/Course'

function UserHome() {
  return (
    <div>
        <>
        <UserNavbar/>
        </>
        <div className='flex p-4 justify-center items-center'>
        <h1 className='p-4 text-2xl'>User Home</h1> 
        </div>
        
      <Course/>
    </div>
    
  )
}

export default UserHome
