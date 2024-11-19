import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

interface IEditProfile {
  email: string;
  name: string;
  phone: string;
  age?: number;
  bio?: string;
  instagram: string;
  facebook: string;
  twitter: string;
  linkedin: string;

}

const ProfileDetails: React.FC<IEditProfile> = ({ email, name, age, phone, bio, facebook, instagram, linkedin, twitter }) => {
  return (
    <>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* User Profile Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Details */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-2 rounded-md border shadow-md">
                <p className="text-gray-600 font-medium">Name</p>
                <p className="text-gray-900">{name || "Unknown User"}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded-md border shadow-md">
                <p className="text-gray-600 font-medium">Age</p>
                <p className="text-gray-900">{age || "N/A"}</p>
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

            {/* Bio Section */}
            <div className="bg-gray-50 p-4 rounded-md border shadow-md h-full">
              <p className="text-gray-600 font-medium">Bio</p>
              <p className="text-gray-900 mt-2">{bio || "No bio available."}</p>
            </div>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Social Media</h2>
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
    </>
  );
};

export default ProfileDetails;
