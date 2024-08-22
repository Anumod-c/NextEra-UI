import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminSideBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  if(!token){
    navigate('/admin')
  }else{
    navigate('/admin/dashboard')
  }
  // Array of navigation items
  const navItems = [
    { name: 'Users', path: '/admin/userlist' },
    { name: 'Tutor', path: '/admin/tutorlist' },
    { name: 'Payouts', path: '/admin/payouts' },
    { name: 'Logouts', path: '/admin/logout' },
    
  ];

  return (
    <div className='h-screen w-1/6 bg-black text-white flex flex-col p-4 fixed left-0'>
      <h1 className='text-2xl m-4'>Admin Side Bar</h1>
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className='m-4 text-xl hover:text-blue-400 cursor-pointer'
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default AdminSideBar;
