import { FaTachometerAlt, FaBook, FaMoneyCheckAlt, FaUserEdit, FaSignOutAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearTutorDetails } from '../../redux/tutorSlice';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

function TutorSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove('tutorToken'); 
    Cookies.remove('tutorRefreshToken'); 
    Cookies.remove('tutorId');

    dispatch(clearTutorDetails()); 
    navigate('/tutor'); 
  };

  const isActive = (path: string) => location.pathname === path;

  const sidebarItems = [
    { path: '/tutor/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/tutor/courselist', icon: <FaBook />, label: 'My Course' },
    { path: '/tutor/payouts', icon: <FaMoneyCheckAlt />, label: 'Payouts' },
    { path: '/tutor/profile', icon: <FaUserEdit />, label: 'Profile' },
    { 
      path: '/tutor', 
      icon: <FaSignOutAlt />, 
      label: 'Signout', 
      className: 'text-red-600',
      onClick: handleLogout
    }
  ];

  return (
    <div>
      {/* Sidebar - Only visible on medium or larger screens */}
      <div className="hidden md:block  ">
        <div className="w-64 shadow-lg bg-white text-black rounded-2xl flex-col h-full">
          <ul className="m-2 p-2 text-lg font-semibold">
            {sidebarItems.map(({ path, icon, label, className = '', onClick }) => (
              <li
                key={path}
                className={`p-2 m-2 flex items-center rounded-lg transition duration-300 ease-in-out ${isActive(path) ? 'bg-green-100 text-green-600' : 'hover:bg-green-100 hover:text-green-600'} ${className}`}
                onClick={onClick ? onClick : () => navigate(path)} // Use onClick if defined, otherwise navigate
              >
                <span className="mr-2 transition-transform duration-300 ease-in-out hover:scale-110">{icon}</span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>      
    </div>
  );
}

export default TutorSidebar;
