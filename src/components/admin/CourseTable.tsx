import React, { useEffect, useState } from 'react'
import adminAxios from '../../constraints/axios/adminAxios';
import { adminEndpoints } from '../../constraints/endpoints/adminEndpoints';


interface Course {
  _id: string;
  thumbnail: string;
  title: string;
  category: string;
  level: string;
  price: string;
    tutorDetails: {
      name: string;
    }
}
const CourseTable: React.FC = () => {


  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        console.log('hyyyy');

        const response = await adminAxios.get(adminEndpoints.courseTable);
        console.log('data reached frontend', response.data);
        if (response.data)
          setCourses(response.data.coursesWithTutor)
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }
  return (
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
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {courses.map(courses => (
            <tr key={courses._id} className="border-b">
              <td className="p-3">
                <img src={courses.thumbnail} alt={courses.title} className="w-24 h-16 object-cover" />
              </td>


              <td className="p-2">{courses.title}</td>
              <td className="p-2">{courses.category}</td>
              <td className="p-2">{courses.level}</td>
              <td className="p-2">{courses.price}</td>
              <td className="p-2">{courses.tutorDetails.name}</td>
              <td className="p-2">
                {/* <button onClick={()=>handleDetailView(courses._id)} className='bg-blue-500 text-white p-2 rounded-md'>View</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CourseTable
