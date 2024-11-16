import React, { useEffect, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import profileImage from "../../assets/profile.png";
import { FaBars, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { clearUserDetails } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { MdGroups2,MdLogout } from "react-icons/md";
interface NavbarProps{
  showSearch?: boolean;
  onSearch?:(query:string)=>void;
}

const UserNavbar: React.FC<NavbarProps>= ({onSearch,showSearch}) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [serachQuery,setSearchQuery]= useState('');

  useEffect(()=>{
    const delayDebouncingFn = setTimeout(() => {
      if(onSearch){
        onSearch(serachQuery)
      }
    }, 500);
    return ()=>clearTimeout(delayDebouncingFn);
  },[serachQuery,onSearch])
const dispatch= useDispatch()

const {id,profilePicture} = useSelector((state: RootState) => state.user);
  const userToken = Cookies.get("userToken");

  const isLoggedIn = !!id || !!userToken; // Check if the user is logged in

  const handleLogout =()=>{
   
    Cookies.remove('userToken')
    Cookies.remove('userRefreshToken') 
    Cookies.remove('userrId');


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
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update the search query
  };
  return (
    <nav className="      bg-gradient-to-b from-blue-900  to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            
            <Link  className="text-xl font-bold" to={'/'}>NextEra</Link>
          </div>

          {showSearch && (
            <div className="md:flex flex-grow mx-4">
              <input
                type="text"
                value={serachQuery}
                onChange={handleSearchInput}
                placeholder="Search..."
                className="w-full p-2 rounded-md text-black"
              />
            </div>
          )}



          {/* Desktop Menu */}
          <div className="hidden justify-center items-center p-4 m-4 md:flex space-x-4">
            <Link to={'/home'} className="hover:text-gray-400 ">
                Home
            </Link>

            <Link to={'/allCourse'} className="hover:text-gray-400 " >Courses</Link>
            <Link to={'/contact'} className="hover:text-gray-400 ">
               Contact
            </Link>
            <Link to={'/about'} className="hover:text-gray-400 ">
              About
            </Link>
            <Link to={'/discussion'} className="hover:text-gray-400 text-3xl">
              <MdGroups2/>
            </Link>
            
                        {/* Profile & Auth Buttons */}
                        {isLoggedIn ? (
              <>
                <button
                  onClick={handleProfileClick}
                  
                >
                  <img className="rounded-full w-14 object-cover h-14 p-2 " src={profilePicture||profileImage} alt="Profile" />
                </button>
                <button onClick={handleLogout} className="hover:text-gray-400 pl-4 text-2xl">
                  <MdLogout/>
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
          <Link to={'/discussion'} className="block text-center py-2 hover:bg-gray-700">
          Discussion
          </Link>
          <Link to={'/profile'} className="block text-center py-2 hover:bg-gray-700">
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
