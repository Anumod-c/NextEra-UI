import { useEffect, useState } from "react";
import ContentSection from "../../../components/user/singleCourse/ContentSection";
import { PaymentSection } from "../../../components/user/singleCourse/PayementSection";
import UserNavbar from "../../../components/user/UserNavbar";
import { useParams } from "react-router-dom";
import { courseEndpoints } from "../../../constraints/endpoints/courseEndpoints";
import SkeltonSingleCourse from "../../../components/user/skelton/SkeltonSingleCourse";
import userAxios from "../../../constraints/axios/userAxios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import PurchasedSingleCourse from "./PurchasedSingleCourse";
import Footer from "../../tutor/Footer";
import ReviewCard from "../../../components/user/ReviewCard";

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Quiz {
  question: string;
  options: Option[];
}
interface Lesson {
  title: string;
  video?: string;
  description: string;
  quizzes: Quiz[];
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
  enrolledUsers?: string[];
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

function SingleCoursePage() {
  const userId = useSelector((state: RootState) => state.user.id);
  const { courseId } = useParams<{ courseId: string }>();

  const [course, setCourse] = useState<Course | null>(null);
  const [tutor, setTutor] = useState<Tutor | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasPurchased, setHasPurchased] = useState<boolean>(false);
  console.log(hasPurchased, "kkkkkkkkkkkkk");
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await userAxios.get(
          `${courseEndpoints.fetchAllCourse}/${courseId}?userId=${userId}`
        );
        console.log("singlecoursedetailswithtuor", response.data);
        if (response.data.success) {
          setCourse(response.data.course);
          setTutor(response.data.tutor); 
          console.log(response.data.hasPurchased, "ppppppppppp");
          setHasPurchased(response.data.hasPurchased);
        } else {
          setError("Failed to fetch course details");
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch course details", error);
        setError("Failed to fetch course details");
        setLoading(false);
      }
    };
    if (courseId) {
      fetchCourse();
    }
  }, [courseId, userId]);

  useEffect(() => {
    if (course) {
      console.log("Course data updated:", course);
    }
  }, [course]);
  if (loading) return <SkeltonSingleCourse />;
  if (error) return <p>{error}</p>;
  if (!course) return <p>No course found.</p>;
  if (!hasPurchased)
    return (
      <>
        <UserNavbar />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
          {/* Content Section takes 3/4 of the space on medium and larger screens */}
          <div className="md:col-span-3">
            <ContentSection course={course} />
          </div>
          <div className="col-span-1 md:col-span-1  mt-4 p-6">
            <div className="md:sticky md:top-4">
              <PaymentSection course={course} tutor={tutor} />
            </div>
          </div>
          <div className="col-span-full">
            <ReviewCard courseId={courseId || ""} />
          </div>
        </div>
        <Footer />
      </>
    );
  return (
    <>
      <UserNavbar />
      <PurchasedSingleCourse course={course} tutor={tutor} />
      <Footer />
    </>
  );
}

export default SingleCoursePage;
