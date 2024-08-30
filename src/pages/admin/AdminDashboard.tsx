import React, { useState, useEffect } from 'react';
import AdminSideBar from '../../components/admin/AdminSideBar';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminBarGraph from '../../components/admin/AdminBarGraph';
import AdminPieGraph from '../../components/admin/AdminPieGraph';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    } else {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

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
          Sales report
        </div>
        <div className="flex-grow bg-white mt-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2  p-4 gap-4">
            <div className="bg-slate-100 shadow-lg flex items-center  rounded-lg ">
              <AdminBarGraph />
            </div>
            <div className="bg-slate-100 flex items-center shadow-lg   rounded-lg ">
              <AdminPieGraph />
            </div>
          </div>
        </div>
        
        </>
        
      </div>
     
    </div>
  );
};

export default AdminDashboard;