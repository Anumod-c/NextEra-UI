import React, { useState } from 'react';
import TutorNavbar from '../../components/tutor/TutorNavbar';
import TutorSidebar from '../../components/tutor/TutorSidebar';
import AddCourse from '../../components/tutor/AddCourse';
import AddCourse2 from '../../components/tutor/AddCourse2';
import CourseProgress from '../../components/tutor/CourseProgress';
import AddLesson from '../../components/tutor/AddLesson';
import CourseSummary from '../../components/tutor/CourseSummary';

// Define the type for a lesson

const Course: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const totalSteps = 4;


  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
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
          {step === 1 && (
            <AddCourse
              onNext={handleNext}
              onBack={() => {}}
            />
          )}
          {step === 2 && (
            <>
              <AddCourse2
                onNext={handleNext}
                onBack={handleBack} // Pass back handler
                
              />
            </>
          )}
          {step === 3 && (
            <>
              <AddLesson
                onNext={handleNext}
                onBack={handleBack} // Pass back handler
              />
            </>
          )}
          {step === 4 && (
            <CourseSummary
              onBack={handleBack}             
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;
