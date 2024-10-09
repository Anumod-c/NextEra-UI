import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileImage from "../../assets/profile.png";
import { FaBars, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { clearUserDetails } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


const UserNavbar: React.FC = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
const dispatch= useDispatch()

const {id,profilePicture} = useSelector((state: RootState) => state.user);
  const userToken = Cookies.get("userToken");

  const isLoggedIn = !!id || !!userToken; // Check if the user is logged in

  const handleLogout =()=>{
   
    Cookies.remove('userToken')
dispatch(clearUserDetails())
    
      navigate('/login')
    
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleProfileClick = () => {
    // Navigate to profile page
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            
            <Link  className="text-xl font-bold" to={'/'}>NextEra</Link>
          </div>

          {/* Search Bar */}
          <div className=" md:flex flex-grow mx-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 rounded-md text-black"
            />
          </div>


          {/* Desktop Menu */}
          <div className="hidden justify-center items-center p-4 m-4 md:flex space-x-4">
            <Link to={'/home'} className="hover:text-gray-400">
                Home
            </Link>

            <Link to={'/allCourse'}>Courses</Link>
            <Link to={'/contact'} className="hover:text-gray-400">
               Contact
            </Link>
            <Link to={'/about'} className="hover:text-gray-400">
              About
            </Link>
            <Link to={'/dicussion'} className="hover:text-gray-400">
              Discussion
            </Link>
            
                        {/* Profile & Auth Buttons */}
                        {isLoggedIn ? (
              <>
                <button
                  onClick={handleProfileClick}
                  
                >
                  <img className="rounded-full w-14 object-cover h-14 p-2 " src={profilePicture||profileImage} alt="Profile" />
                </button>
                <button onClick={handleLogout} className="hover:text-gray-400">
                  Logout
                </button>
              </>
            ) : (
              <Link
  to="/login"
  className="border border-blue-500 p-2 mx-4 rounded-md hover:bg-blue-400  hover:text-white transition duration-300 ease-in-out"
>
  Login
</Link>

            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" className="block text-center py-2 hover:bg-gray-700">
            My Course
          </a>
          <a href="#" className="block text-center py-2 hover:bg-gray-700">
            Discussion
          </a>
          <Link to={'/profile'} className="block text-center py-2 hover:bg-gray-700">
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
