import  { useState } from 'react';
import { FaTachometerAlt, FaBook, FaUserGraduate, FaMoneyCheckAlt, FaUserEdit, FaLock, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'; // Import useLocation



function TutorSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); // Get the current location

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path:string) => location.pathname === path; // Check if the path is active

  return (
    <div>
      {/* Mobile Menu Bar */}
      <div className="md:hidden flex items-center p-4 bg-white shadow-lg">
        <button onClick={toggleSidebar} className="text-xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-0 z-50 flex ${isSidebarOpen ? 'block' : 'hidden'} md:block md:relative`}>
        <div
          className={`md:w-64 w-64 shadow-lg bg-white text-black rounded-md flex-col h-full transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative z-50`}
        >
          <ul className='m-2 p-2 text-lg font-semibold'>
            <li  className={`p-2 m-2 flex items-center rounded-lg transition duration-300 ease-in-out ${isActive('/tutor/dashboard') ? 'bg-green-100 text-green-600' : 'hover:bg-green-100 hover:text-green-600'}`}>
              <FaTachometerAlt className='mr-2 transition-transform duration-300 ease-in-out hover:scale-110' />
              Dashboard
            </li>
            <li className={`p-2 m-2 flex items-center rounded-lg transition duration-300 ease-in-out ${isActive('/tutor/courses') ? 'bg-orange-100 text-orange-600' : 'hover:bg-orange-100 hover:text-orange-600'}`}>
              <FaBook className='mr-2 transition-transform duration-300 ease-in-out hover:scale-110' />
              My Course
            </li>
            <li className={`p-2 m-2 flex items-center rounded-lg transition duration-300 ease-in-out ${isActive('/tutor/students') ? 'bg-blue-100 text-blue-600' : 'hover:bg-blue-100 hover:text-blue-600'}`}>
              <FaUserGraduate className='mr-2 transition-transform duration-300 ease-in-out hover:scale-110' />
              Student
            </li>
            <li className={`p-2 m-2 flex items-center rounded-lg transition duration-300 ease-in-out ${isActive('/tutor/payouts') ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-yellow-100 hover:text-yellow-600'}`}>
              <FaMoneyCheckAlt className='mr-2 transition-transform duration-300 ease-in-out hover:scale-110' />
              Payouts
            </li>
            <li className={`p-2 m-2 flex items-center rounded-lg transition duration-300 ease-in-out ${isActive('/tutor/edit-profile') ? 'bg-teal-100 text-teal-600' : 'hover:bg-teal-100 hover:text-teal-600'}`}>
              <FaUserEdit className='mr-2 transition-transform duration-300 ease-in-out hover:scale-110' />
              Edit Profile
            </li>
            <li className={`p-2 m-2 flex items-center rounded-lg transition duration-300 ease-in-out ${isActive('/tutor/privacy-security') ? 'bg-purple-100 text-purple-600' : 'hover:bg-purple-100 hover:text-purple-600'}`}>
              <FaLock className='mr-2 transition-transform duration-300 ease-in-out hover:scale-110' />
              Privacy & Security
            </li>
            <li className='p-2 m-2 flex items-center text-red-600 rounded-lg transition duration-300 ease-in-out hover:bg-red-100 hover:text-red-700'>
              <FaSignOutAlt className='mr-2 transition-transform duration-300 ease-in-out hover:scale-110' />
              Signout
            </li>
          </ul>
        </div>
        {/* Backdrop for Mobile View */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={toggleSidebar}
        ></div>
      </div>
    </div>
  );
}

export default TutorSidebar;
