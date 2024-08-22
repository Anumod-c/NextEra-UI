import React from "react";
import { Link, useNavigate } from "react-router-dom";
import profileImage from "../../assets/profile.png";

const UserNavbar: React.FC = () => {
  const navigate = useNavigate();
  const token =  localStorage.getItem('userToken');
  const handleProfileClick = () => {
    if (token) {
      // Navigate to profile page if token is present
      navigate('/profile');
    } else {
      // Navigate to login page if token is not present
      navigate('/login');
    }
  };
  return (
    <nav className="bg-white  p-4 shadow-lg flex">
      <div className="container flex justify-evenly items-center ">
        <div className="flex">
          <input
            className="flex-1 px-4 py-2 border-none  outline-none focus:ring-1 focus:ring-blue-300"
            type="text"
            placeholder="Search..."
          />
          <button className="ml-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-300">
            Search
          </button>
        </div>
        <div className="flex  space-x-6">
          <Link
            to="/"
            className="text-black text-lg font-semibold hover:text-gray-200"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="text-black text-lg font-semibold hover:text-gray-200"
          >
            Courses
          </Link>
          <Link
            to="/discussions"
            className="text-black text-lg font-semibold hover:text-gray-200"
          >
            Discussions
          </Link>
        </div>
      </div>
      <div className="flex pr-4 space-x-4">
        
      <button
          onClick={handleProfileClick}
          className="text-black text-lg font-semibold hover:text-gray-200 flex items-center"
        >
          <img src={profileImage} alt="Profile" className="w-12 h-12" />
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
