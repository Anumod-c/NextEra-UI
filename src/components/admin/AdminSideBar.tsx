import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaChalkboardTeacher, FaDollarSign, FaSignOutAlt } from 'react-icons/fa';

interface AdminSideBarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AdminSideBar: React.FC<AdminSideBarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Users', path: '/admin/userlist', icon: <FaUser className="mr-2" /> },
    { name: 'Tutor', path: '/admin/tutorlist', icon: <FaChalkboardTeacher className="mr-2" /> },
    { name: 'Payouts', path: '/admin/payouts', icon: <FaDollarSign className="mr-2" /> },
    { name: 'Logout', path: '/admin/logout', icon: <FaSignOutAlt className="mr-2" /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-black text-white flex flex-col p-4 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0 w-64' : 'translate-x-[-100%] w-0'} md:translate-x-0 md:w-64 overflow-hidden `}
    >
      <button
        className="absolute top-4 right-4 text-white md:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      <h1 className="text-2xl m-4 mt-8 font-bold">Admin Sidebar</h1> {/* Adjusted margin-top */}
      <nav className="mt-14"> {/* Added margin-top */}
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center m-6   text-xl p-4 rounded-lg transition duration-300 ease-in-out hover:text-[#40D1FF]"
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSideBar;
