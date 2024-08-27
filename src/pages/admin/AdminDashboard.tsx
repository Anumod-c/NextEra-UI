import React, { useState, useEffect } from 'react';
import AdminSideBar from '../../components/admin/AdminSideBar';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/admin/AdminNavbar';

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
        <AdminNavbar 
          toggleSidebar={toggleSidebar} 
          // toggleNavbarMenu={toggleNavbarMenu} 
          // isNavbarMenuOpen={isNavbarMenuOpen} 
        />
        <div className="p-8 flex justify-center items-center"  >
          <h1 className="text-2xl">Welcome To Admin Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;