






//***************************  section and lesson not completed fully ******* */






import  { useEffect, useState } from 'react';
import ContentSection from '../../../components/user/singleCourse/ContentSection';
import { PaymentSection } from '../../../components/user/singleCourse/PayementSection';
import UserNavbar from '../../../components/user/UserNavbar';
import { useParams } from 'react-router-dom';
import { courseEndpoints } from '../../../constraints/endpoints/courseEndpoints';
import axios from 'axios';

function SingleCoursePage() {


  interface Course {
    _id?: string;
    title: string;
    description: string;
    price: number;
    discountPrice: number;
    thumbnail: string;
    instructor?: string;
    rating?: number;
    demoURL?: string;
    benefits?: string[];
    prerequisites?: string[];
    sections?: { title: string; description: string }[];
  }

  const {courseId} =  useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


useEffect(()=>{
  const fetchCourse= async ()=>{
    try {
      const response = await axios.get(`${courseEndpoints.fetchAllCourse}/${courseId}`);
      if (response.data.success) {
        setCourse(response.data.course);
      } else {
        setError('Failed to fetch course details');
      }
      setLoading(false); // Set loading to false after fetching
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

if (loading) return <p>Loading...</p>;
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

        {/* Payment Section: Fixed position on larger screens, full width on small screens */}
        <div className='col-span-1 md:col-span-1  mt-4 p-6'>
          <PaymentSection course={course} />
        </div>
      </div>
    </>
  );
}

export default SingleCoursePage;
