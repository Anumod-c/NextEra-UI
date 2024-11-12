import React, { useEffect, useState } from "react";
import adminAxios from "../../constraints/axios/adminAxios";
import { adminEndpoints } from "../../constraints/endpoints/adminEndpoints";
import { Pagination } from "@mui/material";

interface Course {
  _id: string;
  thumbnail: string;
  title: string;
  category: string;
  level: string;
  status: boolean;
  price: string;
  tutorDetails: {
    name: string;
  };
}
const CourseTable: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCourse = async (page = 1) => {
      setLoading(true);
      try {
        console.log("hyyyy");

        const response = await adminAxios.get(adminEndpoints.courseTable,{params: {  page, limit: 6 },
          withCredentials: true,
        });
        console.log("data reached frontend", response.data);
        if (response.data) {
          setCourses(response.data.coursesWithTutor);
          setTotalPages(response.data.totalPages);

        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse(currentPage);
  }, [currentPage]);
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  const handleCourseList = async (courseId: string, currentStatus: boolean) => {
    try {
      await adminAxios.patch(adminEndpoints.changeCourseStatus(courseId), {
        status: !currentStatus,
      });
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId
            ? { ...course, status: !currentStatus }
            : course
        )
      );
    } catch (error) {
      console.log("Error in Listing/Unlisting the course", error);
    }
  };
  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }
  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Course List</h2>
        <table className="w-full bg-white shadow-lg rounded-lg table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Course Image</th>
              <th className="p-2 text-left">Course Name</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Level</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Tutor Name</th>
              <th className="p-2 text-left">Status</th>

              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {courses.map((courses) => (
              <tr key={courses._id} className="border-b">
                <td className="p-3">
                  <img
                    src={courses.thumbnail}
                    alt={courses.title}
                    className="w-24 h-16 object-cover"
                  />
                </td>

                <td className="p-2">{courses.title}</td>
                <td className="p-2">{courses.category}</td>
                <td className="p-2">{courses.level}</td>
                <td className="p-2">{courses.price}</td>
                <td className="p-2">{courses.tutorDetails.name}</td>
                <td className="p-2">
                  <button
                    className={` p-2 min-w-14 text-white rounded ${
                      courses.status
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() =>
                      handleCourseList(courses._id, courses.status)
                    }
                  >
                    {courses.status ? "Unlist" : "List"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
      <div className="w-full flex justify-center items-center p-2 m-2 ">
      <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          size="large"
          color="primary"
        />      </div>
    </>
  );
};

export default CourseTable;
