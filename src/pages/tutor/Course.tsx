import React, { useState } from 'react';
import TutorNavbar from '../../components/tutor/TutorNavbar';
import TutorSidebar from '../../components/tutor/TutorSidebar';
import AddCourse from '../../components/tutor/AddCourse';
import AddCourse2 from '../../components/tutor/AddCourse2';
import CourseProgress from '../../components/tutor/CourseProgress';
import AddLesson from '../../components/tutor/AddLesson';
import CourseSummary from '../../components/tutor/CourseSummary';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

// Define the type for a lesson
interface Lesson {
  title: string;
  video: File | null; // Video can be null
  description: string;
}

const Course: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [lessons, setLessons] = useState<Lesson[]>([]); // Ensure this type is consistent

  const totalSteps = 4;
  const { addCourse, addCourse2 } = useSelector((state: RootState) => state.course);
  // Handle lesson data and proceed to next step
  const handleLessonData = (data: Lesson[]) => {
    setLessons(data.filter(lesson => lesson.video !== null)); // Filter out lessons without videos
    handleNext();
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  return (
    <div>
      <TutorNavbar />
      <div className="flex mt-4 pt-4">
        <TutorSidebar />
        <div className="w-full flex-col">
          <div className="mb-4">
            <CourseProgress currentStep={step} totalSteps={totalSteps} />
          </div>
          {step === 1 && <AddCourse onNext={handleNext} />}
          {step === 2 && <AddCourse2 onNext={handleNext} />}
          {step === 3 && <AddLesson onNext={handleLessonData} />}
          {step === 4 && (
            <CourseSummary
              courseName={addCourse.courseTitle}
              coursePrice={addCourse.coursePrice} 
              courseDiscountPrice={addCourse.courseDiscountPrice} 
              courseDescription={addCourse.courseDesc}
              courseCategory={addCourse.courseCategory}
              courseLevel={addCourse.courseLevel}
              demoUrl={addCourse.demoURL}
              benefits={addCourse2.benefits}
              prerequisites={addCourse2.prerequisites}
              lessons={lessons.map(lesson => ({
                title: lesson.title,
                video: lesson.video ? URL.createObjectURL(lesson.video) : null,
                description: lesson.description,
              }))}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;
