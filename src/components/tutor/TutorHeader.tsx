import { FaStar, FaUserGraduate, FaBookOpen, FaExclamationTriangle } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import tutorImage from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import tutorAxios from "../../constraints/axios/tutorAxios";
import { tutorEndpoints } from "../../constraints/endpoints/tutorEndpoints";
import { useEffect, useState } from "react";

function TutorHeader() {
  const { name, profilePicture, isVerified } = useSelector((state: RootState) => state.tutor)
  const tutorId = useSelector((state: RootState) => state.tutor.id);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalCourses, setTotalCourses] = useState<number>(0);
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const [courseResponse, studentResponse] = await Promise.all([
          tutorAxios.get<number>(`${tutorEndpoints.getTotalCoursesCount}/${tutorId}`),
          tutorAxios.get<number>(`${tutorEndpoints.getTotalStudentsCount}/${tutorId}`),
        ])
        setTotalStudents(studentResponse.data);
        setTotalCourses(courseResponse.data);
      } catch (error) {
        console.log("Error in fetching header data", error)
      }
    }
    fetchHeaderData();
  });
  const navigate = useNavigate()
  const handleAddCourse = () => {
    navigate('/tutor/addcourse')
  }
  return (
    <div className="flex flex-wrap bg-gradient-to-b from-gray-100 to-white shadow-md justify-center items-center md:justify-normal md:items-normal p-4">
      {/* Profile Image */}
      <div className="flex-shrink-0  ml-4 pl-4 flex justify-center">
        <img
          className="w-[180px] h-[180px] rounded-full object-cover"
          src={profilePicture || tutorImage}
          alt="Tutor"
        />
      </div>
      {/* Tutor Info */}
      <div className="flex-grow flex flex-col justify-between ml-4">
        <div className="hidden  pl-2 sm:block font-bold text-3xl">{name} {isVerified && (
          <VscVerifiedFilled className="inline text-blue-500  mb-2" />
        )}
        </div>
        <div className="flex flex-col sm:flex-row justify-evenly items-center m-4 space-y-4 sm:space-y-0">
          <ul className="flex space-x-12  text-lg">
            <li className="flex items-center">
              <FaStar className="text-yellow-500 mr-2" /> 0/5
            </li>
            <li className="flex items-center">
              <FaUserGraduate className="text-green-500 mr-2" /> {totalStudents} Enrolled
              Students
            </li>
            <li className="flex items-center">
              <FaBookOpen className="text-orange-500 mr-2" /> {totalCourses} Courses
            </li>
          </ul>
          {
            isVerified ? (
              <>
                {/* Button for larger screens */}
                <button onClick={handleAddCourse} className="hidden sm:inline-block rounded-lg p-2 bg-green-500 text-white">
                  Create Course
                </button>
                {/* Button for smaller screens */}
                <button onClick={handleAddCourse} className="sm:hidden rounded-lg p-2 bg-green-500 text-white">
                  Create Course
                </button>
              </>
            ) : (
              // Display "Verification Pending" message if not verified
              <div className="flex items-center space-x-2 rounded-lg p-2 bg-yellow-100 border border-yellow-300 text-yellow-700 relative group">
                <FaExclamationTriangle className="text-yellow-500" />
                <span className="font-medium">Verification Pending</span>
                <div className="absolute left-0 bottom-full mb-1 w-56 p-2 text-sm text-white bg-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  You can upload the course once it is approved by the admin.
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
export default TutorHeader;
