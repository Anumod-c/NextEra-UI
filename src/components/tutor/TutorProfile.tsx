import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import profileImage from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TutorProfile: React.FC = () => {
  const {
    name,
    email,
    phone,
    bio,
    profilePicture,
    expertise,
    qualifications,
    instagram,
    facebook,
    linkedin,
    twitter,
  } = useSelector((state: RootState) => state.tutor);

  const navigate = useNavigate();

  return (
    <div className="max-w-screen-2xl mx-auto p-6 bg-gradient-to-b from-gray-100 to-white shadow-lg rounded-lg">
      {/* Profile Header Section */}
      <div className="flex items-center mb-6">
        <div className="relative w-[160px] h-[160px] mr-6">
          <img
            src={profilePicture || profileImage}
            alt={`${name}'s profile`}
            className="w-full h-full object-cover rounded-full shadow-md"
          />
          
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">{name}</h1>
          <p className="text-gray-600 mt-2">Expert in: </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {expertise && expertise.length > 0 ? (
              expertise.map((item, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </div>
          <button
            onClick={() => navigate("/tutor/edit-profile")}
            className="mt-3 bg-green-500 text-white py-2 px-4 rounded-lg"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Contact Information
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-2 rounded-md border shadow-md">
              <p className="text-gray-600 font-medium">Name</p>
              <p className="text-gray-900">{name || "Unknown User"}</p>
            </div>

            <div className="bg-gray-50 p-2 rounded-md border shadow-md">
              <p className="text-gray-600 font-medium">Email</p>
              <p className="text-gray-900">{email || "john.doe@example.com"}</p>
            </div>
            <div className="bg-gray-50 p-2 rounded-md border shadow-md">
              <p className="text-gray-600 font-medium">Phone</p>
              <p className="text-gray-900">{phone || "+123456789"}</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">About Me</h2>
          <p className="text-gray-600">{bio || "No bio available."}</p>
        </div>
      </div>

      {/* Qualifications Section */}
      <div className="bg-gray-50 rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Qualifications
        </h2>
        {qualifications?.map((qualification, index) => (
          <div key={index} className="mb-3">
            <p className="text-gray-600">
              <strong>Qualification:</strong> {qualification.qualification}
            </p>
          </div>
        ))}
      </div>

      {/* Social Media Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Social Media
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-md border shadow-md">
            <FaFacebook className="text-blue-600" />
            <p className="text-gray-900">Facebook: {facebook}</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-md border shadow-md">
            <FaInstagram className="text-pink-500" />
            <p className="text-gray-900">Instagram: {instagram}</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-md border shadow-md">
            <FaLinkedin className="text-blue-500" />
            <p className="text-gray-900">Linkedin: {linkedin}</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-md border shadow-md">
            <FaTwitter className="text-blue-400" />
            <p className="text-gray-900">Twitter: {twitter}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
