import React  from "react";
import { Link, useNavigate } from "react-router-dom";
import profileImage from "../../../assets/profile.png";

const TutorNavbar: React.FC = () => {
const navigate= useNavigate()
  const handleProfileClick = () => {
    
     navigate('/tutor/profile')
    
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
            to="/dashboard"
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

export default TutorNavbar;
