import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';
import SkeltonCourse from './skelton/SkeltonCourse';
import userAxios from '../../constraints/axios/userAxios';
import { Rating } from '@mui/material';


interface TutorDetails {
  tutorDetails: {
    name: string;
  }
}

interface Course {
  _id: string;
  title: string;
  price: number;
  discountPrice: number;
  thumbnail: string;
  tutorDetails: TutorDetails;
  averageRating?: number
}

interface CourseProps {
  fetchUrl: string;
  title: string;
  subTitle?: string;
  purchasedCourses: string[];
}

const MyCourses: React.FC<CourseProps> = ({ fetchUrl, title, subTitle, purchasedCourses }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await userAxios.post(fetchUrl, purchasedCourses);
        console.log('response from fetching courses', response.data);
        const coursesData: Course[] = response.data.courses.map((course: Course) => ({
          _id: course._id,
          title: course.title,
          price: course.price,
          discountPrice: course.discountPrice,
          thumbnail: course.thumbnail,
          tutorDetails: course.tutorDetails,
          averageRating: course.averageRating,
        }));

        setCourses(coursesData);
        setTimeout(() => {
          setLoading(false);
        }, 400);
      } catch (err) {
        console.error('Failed to fetch courses', err);
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [fetchUrl, purchasedCourses]);

  const handleCourseClick = (coruseId: string) => {
    navigate(`/courses/${coruseId}`);
  }

  if (loading) return <SkeltonCourse />;
  if (error) return <p>{error}</p>;

  return (
    <section className=" m-4 p-4 bg-white">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold py-2">{title}</h2>
          <h4 className="text-xl text-gray-500">{subTitle}</h4>
        </motion.div>
        <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handleCourseClick(course._id)}
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Instructor: {course.tutorDetails.tutorDetails.name}
              </p>
              {course.averageRating && course.averageRating > 0.5 && (
                <div className="flex items-center m-2 p-2">
                  <p className="text-md font-semibold text-yellow-500 mr-2">
                    {course.averageRating.toFixed(2)}
                  </p>
                  <Rating
                    name="course-rating"
                    value={parseFloat(course.averageRating.toFixed(2))}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </div>
              )}
              <div className="flex justify-between items-center mt-auto">
                <p className="text-xl font-bold text-gray-900 p-2 m-2">
                  ${course.discountPrice}
                </p>
                <p className="text-sm text-red-600 line-through p-2 m-2">
                  ${course.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default MyCourses;
