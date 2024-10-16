import React, { useEffect, useState } from 'react'
import { tutorEndpoints } from '../../constraints/endpoints/tutorEndpoints';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import tutorAxios from '../../constraints/axios/tutorAxios';


 interface CourseList{
    _id:string;
    thumbnail:string;
    title:string;
    category:string;
    level:string;
    price:string;
 }
const CourseList:React.FC=()=> {
  const navigate = useNavigate(); 
  const handleDetailView = async(courseId: string) => {
  
    navigate(`/tutor/courses-details/${courseId}`);
  };

  const tutorId = useSelector((state:RootState)=>state.tutor.id)
    const [courses,setCourses] =useState<CourseList[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        const fetchCourse= async()=>{
          setLoading(true);
            try{
              console.log('hyyyy');
              
                const response = await tutorAxios.get(tutorEndpoints.courseList,{params:{tutorId}});
                console.log('data reached frontend',response.data.courses);
                if(response.data)
                setCourses(response.data.courses)
              } catch (error) {
                console.error('Error fetching users:', error);
              } finally {
                setLoading(false);
              }
        }
        fetchCourse();
    },[]);
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
            <th className="p-2 text-left">View</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {courses.map(courses => (
            <tr key={courses._id} className="border-b">
              <td className="p-2">
                <img src={courses.thumbnail}className="w-16 h-16 object-cover"  alt="course image" />
              </td>
              <td className="p-2">{courses.title}</td>
              <td className="p-2">{courses.category}</td>
              <td className="p-2">{courses.level}</td>
              <td className="p-2">{courses.price}</td>

              <td className="p-2">
                <button onClick={()=>handleDetailView(courses._id)} className='bg-blue-500 text-white p-2 rounded-md'>Detail View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CourseList
