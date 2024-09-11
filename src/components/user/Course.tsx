import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { courseEndpoints } from '../../constraints/endpoints/courseEndpoints';

interface Course {
  _id: string;
  title: string;
  price:number;
  discountPrice: number;
  thumbnail: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(courseEndpoints.fetchAllCourse);
        console.log('response from fetching courses', response.data.courses);

        // Assuming response.data.courses is an array of courses
        const coursesData: Course[] = response.data.courses.map((course: Course) => ({
          _id: course._id,
          title: course.title,
          price:course.price,
          discountPrice: course.discountPrice,
          thumbnail: course.thumbnail, // Ensure imgUrl is correctly mapped
        }));
        
        setCourses(coursesData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch courses', err);
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="py-16 bg-white ">
      <div className="container mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8">
          <h2 className="text-4xl font-bold">Explore Our Courses</h2>
        </motion.div>
        <div className="grid  grid-cols-1 md:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div 
              key={course._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="p-4 bg-gray-100 rounded-lg shadow-lg ">
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                className=" object-cover mb-4 rounded"
              />
              <h3 className="text-xl  font-semibold mb-4">{course.title}</h3>
              <div className='flex '>
              <p className='text-red-600  font-sans line-through px-4'>${course.price}</p>

              <p className='font-semibold'>${course.discountPrice}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
