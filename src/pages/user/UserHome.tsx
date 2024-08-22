import React from 'react'
import UserNavbar from '../../components/user/UserNavbar'

function UserHome() {
  return (
    <div>
        <>
        <UserNavbar/>
        </>
        <div className='flex p-4 justify-center items-center'>
        <h1 className='p-4 text-2xl'>User Home</h1> 
        </div>
      
    </div>
    
  )
}

export default UserHome
