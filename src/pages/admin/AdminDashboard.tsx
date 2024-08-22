import React, { useEffect } from 'react';
import AdminSideBar from '../../components/admin/AdminSideBar';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem('adminToken');
    if(!token){
      navigate('/admin')
    }else{
      navigate('/admin/dashboard')
    }
  },[navigate]);
  return (
    <div className='main flex'>
      <AdminSideBar />
      <div className='right-side-body flex-1  p-8 ml-[16.67%]  flex justify-center'>
        <h1 className='text-2xl'>Welcome To Admin Dashboard</h1>
      </div>
    </div>
  );
}

export default AdminDashboard;
