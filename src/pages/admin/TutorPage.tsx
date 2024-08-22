import React from 'react'
import AdminSideBar from '../../components/admin/AdminSideBar'

function TutorPage()  {
    return (
      <div className='main flex'>
        <AdminSideBar />
        <div className='right-side-body flex-1  p-8 ml-[16.67%]  flex justify-center'>
          <h1 className='text-2xl'>Welcome To Admin userList</h1>
        </div>
      </div>
    )
  }

export default TutorPage
