import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaUsers,
  FaVideo,
} from "react-icons/fa";

interface AdminHeaderProps {
  totalStudents: number;
  totalInstructors: number;
  totalCourses: number;
}
const AdminHeader: React.FC<AdminHeaderProps> = ({
  totalStudents,
  totalInstructors,
  totalCourses,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap justify-evenly p-4 mt-10 items-center gap-6 shadow-lg">
      {/* Card 1 */}
      <div className="w-full sm:w-52 h-28 p-4 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg shadow-lg flex flex-col justify-between items-center hover:from-orange-400 hover:to-orange-600">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-bold text-white">{totalStudents}</h1>
          <FaUsers className="text-white text-4xl" />
        </div>
        <h1 className="text-white text-center text-sm font-medium mt-2">
          Total Students
        </h1>
      </div>

      {/* Card 2 */}
      <div className="w-full sm:w-52 h-28 p-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg shadow-lg flex flex-col justify-between items-center hover:from-purple-500 hover:to-purple-700">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-bold text-white">{totalInstructors}</h1>
          <FaChalkboardTeacher className="text-white text-4xl" />
        </div>
        <h1 className="text-white text-center text-sm font-medium mt-2">
          Total Instructors
        </h1>
      </div>

      {/* Card 3 */}
      <div className="w-full sm:w-52 h-28 p-4 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg shadow-lg flex flex-col justify-between items-center hover:from-cyan-500 hover:to-cyan-700">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-bold text-white">
            {totalCourses || "N/A"}
          </h1>
          <FaBookOpen className="text-white text-4xl" />
        </div>
        <h1 className="text-white text-center text-sm font-medium mt-2">
          Total Courses
        </h1>
      </div>

      {/* Card 4 */}
      <div className="w-full sm:w-52 h-28 p-4 bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-lg flex flex-col justify-between items-center hover:from-green-500 hover:to-green-700">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-bold text-white">
            {totalCourses || "N/A"}
          </h1>
          <FaVideo className="text-white text-4xl" />
        </div>
        <h1 className="text-white text-center text-sm font-medium mt-2">
          Total Live Courses
        </h1>
      </div>
    </div>
  );
};

export default AdminHeader;
