import React from 'react';
import { FaStar, FaUserGraduate, FaBookOpen } from 'react-icons/fa';
import tutorImage from '../../assets/profile.png';

function TutorHeader() {
  return (
    <div className="flex flex-wrap bg-gradient-to-b from-gray-100 to-white shadow-md justify-center items-center md:justify-normal md:items-normal p-4">
      {/* Profile Image */}
      <div className="flex-shrink-0  ml-4 pl-4 flex justify-center">
        <img
          className="w-[180px] h-[180px] rounded-full object-cover"
          src={tutorImage}
          alt="Tutor"
        />
      </div>
      
      

      {/* Tutor Info */}
      <div className="flex-grow flex flex-col justify-between ml-4">
        <div className="hidden  pl-2 sm:block font-bold text-3xl">Aaliya</div>
        <div className="flex flex-col sm:flex-row justify-evenly items-center m-4 space-y-4 sm:space-y-0">
          <ul className="flex space-x-4 text-lg">
          <li className="flex items-center">
              <FaStar className="text-yellow-500 mr-2" /> 0/5
            </li>
            <li className="flex items-center">
              <FaUserGraduate className="text-green-500 mr-2" /> 4 Enrolled Students
            </li>
            <li className="flex items-center">
              <FaBookOpen className="text-orange-500 mr-2" /> 2 Courses
            </li>
          </ul>
          <button className="disabled sm:rounded-lg p-2 sm:bg-green-500 text-white">
            Create Course
          </button>
          <button className="block   sm:hidden rounded-lg p-2 bg-green-500 text-white">
          Create Course
        </button>
        </div>
      </div>
      
    </div>
  );
}

export default TutorHeader;