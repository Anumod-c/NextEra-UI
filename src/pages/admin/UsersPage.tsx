import React, { useState } from 'react'
import AdminSideBar from '../../components/admin/AdminSideBar'
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminHeader from '../../components/admin/AdminHeader';

function TutorPage()  {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
    return (
      <div className="flex">
      {/* Sidebar */}
      <AdminSideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
        {/* Navbar */}
        <AdminNavbar/>
        <>
        <AdminHeader/>
        <div className='flex justify-center text-3xl font-semibold m-4 p-4'>
           Users list
        </div>
        <div className="flex-grow bg-white mt-4 p-4">
          <h1>Table wll be llisted ere shortly</h1>
        </div>
        
        </>
        
      </div>
     
    </div>
    )
  }

export default TutorPage
