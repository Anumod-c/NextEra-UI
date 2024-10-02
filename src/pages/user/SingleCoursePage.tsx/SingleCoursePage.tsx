




import { useEffect, useState } from 'react';
import ContentSection from '../../../components/user/singleCourse/ContentSection';
import { PaymentSection } from '../../../components/user/singleCourse/PayementSection';
import UserNavbar from '../../../components/user/UserNavbar';
import { useParams } from 'react-router-dom';
import { courseEndpoints } from '../../../constraints/endpoints/courseEndpoints';
import axios from 'axios';
import SkeltonSingleCourse from '../../../components/user/skelton/SkeltonSingleCourse';

function SingleCoursePage() {

  interface Lesson {
    title: string;
    video: string;
    description: string;
  }
  interface Section {
    title: string;
    lessons: Lesson[];
  }

  interface Course {
    _id: string;
    tutorId: string;
    title: string;
    category: string;
    description: string;
    price: number;
    discountPrice: number;
    thumbnail: string;
    level: string;
    instructor?: string;
    rating?: number;
    demoURL: string;
    benefits: string[];
    prerequisites: string[];
    sections: Section[];
  }

  interface Tutor {
    _id: string;
    name: string;
    email: string;
    phone: number;
  }

  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${courseEndpoints.fetchAllCourse}/${courseId}`);
        console.log('singlecoursedetailswithtuor', response.data)
        if (response.data.success) {
          setCourse(response.data.course);
          setTutor(response.data.tutor);  // Set the tutor data here
        } else {
          setError('Failed to fetch course details');
        }
        setTimeout(() => {
          setLoading(false); // Set loading to false after fetching

        }, 500);
      } catch (error) {
        console.error('Failed to fetch course details', error);
        setError('Failed to fetch course details');
        setLoading(false);
      }
    };
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  useEffect(() => {
    // Log course data whenever it changes
    if (course) {
      console.log('Course data updated:', course);
    }
  }, [course]);

  if (loading) return <SkeltonSingleCourse />;
  if (error) return <p>{error}</p>;
  if (!course) return <p>No course found.</p>;

  return (
    <>
      <UserNavbar />
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-4'>
        {/* Content Section takes 3/4 of the space on medium and larger screens */}
        <div className='md:col-span-3'>
          <ContentSection course={course} />
        </div>

        <div className='col-span-1 md:col-span-1  mt-4 p-6'>
          <div className='md:sticky md:top-4'>
            <PaymentSection course={course} tutor={tutor} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleCoursePage;
