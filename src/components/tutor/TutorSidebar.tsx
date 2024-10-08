import  { useState } from 'react';
import { FaTachometerAlt, FaBook, FaUserGraduate, FaMoneyCheckAlt, FaUserEdit, FaLock, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation



function TutorSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); // Get the current location
  const navigate= useNavigate()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path:string) => location.pathname === path; // Check if the path is active
  const sidebarItems = [
    { path: '/tutor/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/tutor/courselist', icon: <FaBook />, label: 'My Course' },
    { path: '/tutor/students', icon: <FaUserGraduate />, label: 'Students' },
    { path: '/tutor/payouts', icon: <FaMoneyCheckAlt />, label: 'Payouts' },
    { path: '/tutor/edit-profile', icon: <FaUserEdit />, label: 'Edit Profile' },
    { path: '/tutor/privacy-security', icon: <FaLock />, label: 'Privacy & Security' },
    { path: '/tutor/signout', icon: <FaSignOutAlt />, label: 'Signout', className: 'text-red-600' },
  ];

  return (
    <div>
      {/* Mobile Menu Bar */}
      <div className="md:hidden flex items-center p-4 bg-white shadow-lg sticky">
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
            {sidebarItems.map(({ path, icon, label, className = '' }) => (
              <li
                key={path}
                className={`p-2 m-2 flex items-center rounded-lg transition duration-300 ease-in-out ${isActive(path) ? 'bg-green-100 text-green-600' : 'hover:bg-green-100 hover:text-green-600'} ${className}`}
                onClick={() => navigate(path)} // Navigate on click
              >
                <span className='mr-2 transition-transform duration-300 ease-in-out hover:scale-110'>{icon}</span>
                {label}
              </li>
            ))}
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
