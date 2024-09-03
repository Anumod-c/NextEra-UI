import React from 'react';
import profileImage from '../../assets/profile.png'
import UserNavbar from '../../components/user/UserNavbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
const UserProfile: React.FC = () => {
  const {name,email,phone} = useSelector((state:RootState)=>state.user)
  return (

    <>
    <UserNavbar/>
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Profile Header */}
      <div className="flex items-center mb-6 border-b border-gray-200 pb-4">
        <img
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        <div className="ml-6">
          <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
          <p className="text-lg text-gray-600">{email}</p>
          <p className="text-lg text-gray-600">{phone}</p>

          <p className="text-md text-gray-500 mt-2">Bio: Enthusiastic learner and educator.</p>
        </div>
      </div>

      {/* Educational Details */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Educational Details</h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Courses Enrolled</h3>
          <ul className="list-disc list-inside pl-5 text-gray-600">
            <li>Course 1 - In Progress</li>
            <li>Course 2 - In Progress</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Completed Courses</h3>
          <ul className="list-disc list-inside pl-5 text-gray-600">
            <li>Completed Course 1</li>
            <li>Completed Course 2</li>
          </ul>
        </div>
      </div>

      {/* Account Settings */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Account Settings</h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Edit Profile
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg ml-4 hover:bg-gray-700 transition duration-300">
            Change Password
          </button>
        </div>
      </div>

      {/* Activity History */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Activity History</h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Activity</h3>
          <ul className="list-disc list-inside pl-5 text-gray-600">
            <li>Commented on Course 1</li>
            <li>Completed Quiz in Course 2</li>
          </ul>
        </div>
      </div>
    </div>
    </>

  );
};

export default UserProfile;
