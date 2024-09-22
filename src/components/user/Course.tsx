import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';

import { courseEndpoints } from '../../constraints/endpoints/courseEndpoints';
import { useNavigate } from 'react-router-dom';
import SkeltonCourse from './skelton/SkeltonCourse';

interface Course {
  _id: string;
  title: string;
  price: number;
  discountPrice: number;
  thumbnail: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
const navigate = useNavigate();


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(courseEndpoints.fetchAllCourse);
        console.log('response from fetching courses', response.data.courses);

        //  response.data.courses is an array of courses
        const coursesData: Course[] = response.data.courses.map((course: Course) => ({
          _id: course._id,
          title: course.title,
          price: course.price,
          discountPrice: course.discountPrice,
          thumbnail: course.thumbnail,
        }));

        setCourses(coursesData);
        setTimeout(() => {
          setLoading(false);

        }, 500);
      } catch (err) {
        console.error('Failed to fetch courses', err);
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick =(coruseId:string)=>{
    navigate(`/courses/${coruseId}`);
  }



  if (loading) return <SkeltonCourse/>;
  if (error) return <p>{error}</p>;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold py-2">Featured Courses</h2>
          <h4 className="text-xl text-gray-500">Explore the top picks</h4>
        </motion.div>
        <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between h-full cursor-pointer"
              onClick={()=>handleCourseClick(course._id)}
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full  md:h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
              <h6 className="text-sm text-gray-500 mb-4">Instructor: Malavika K</h6>
              <div className="flex items-center mb-4">
                <p className="text-xl font-semibold text-yellow-500 mr-2">4.8</p>
                <div className="flex">
                  <StarIcon style={{ color: 'gold' }} />
                  <StarIcon style={{ color: 'gold' }} />
                  <StarIcon style={{ color: 'gold' }} />
                  <StarIcon style={{ color: 'gold' }} />
                  <StarIcon style={{ color: 'gold' }} />
                </div>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <p className="text-xl font-bold text-gray-900">${course.discountPrice}</p>
                <p className="text-sm text-red-600 line-through">${course.price}</p>
              </div>
            </motion.div>
          ))}
         
         
          
          
          
        </div>
      </div>
    </section>
    
  );
};

export default Courses;
