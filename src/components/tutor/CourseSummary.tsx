import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface CourseSummaryProps {
  onBack: () => void;
}

const CourseSummary: React.FC<CourseSummaryProps> = ({ onBack }) => {
  // Access the state using useSelector
  const {
    courseTitle,
    courseDesc,
    coursePrice,
    courseDiscountPrice,
    courseCategory,
    courseLevel,
    demoURL,
    prerequisites,
    benefits,
    sections
  } = useSelector((state: RootState) => state.course.courseDetails);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Course Summary</h2>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
        <h3 className="text-xl font-bold mb-2">{courseTitle}</h3>
        <p className="text-gray-700 mb-2"><strong>Price:</strong> ${coursePrice}</p>
        <p className="text-gray-700 mb-2"><strong>Discount Price:</strong> ${courseDiscountPrice}</p>
        <p className="text-gray-700 mb-2"><strong>Description:</strong> {courseDesc}</p>
        <p className="text-gray-700 mb-2"><strong>Category:</strong> {courseCategory}</p>
        <p className="text-gray-700 mb-2"><strong>Level:</strong> {courseLevel}</p>
        <p className="text-gray-700 mb-2"><strong>Demo URL:</strong> <a href={demoURL} target="_blank" rel="noopener noreferrer">{demoURL}</a></p>
        <p className="text-gray-700 mb-2"><strong>Benefits:</strong></p>
        <ul className="list-disc pl-5 mb-4">
          {benefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
        </ul>
        <p className="text-gray-700 mb-2"><strong>Prerequisites:</strong></p>
        <ul className="list-disc pl-5">
          {prerequisites.map((prerequisite, index) => <li key={index}>{prerequisite}</li>)}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold mb-2">Sections and Lessons</h3>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4">
            <h4 className="text-lg font-semibold mb-2">{section.title}</h4>
            {section.lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex} className="mb-4">
                <h5 className="text-md font-medium">{lesson.title}</h5>
                <p className="text-gray-700 mb-2">{lesson.description}</p>
                {lesson.video && <p className="text-gray-700 mb-2">{lesson.video}</p>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={onBack}
        className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mt-6"
      >
        Back
      </button>
    </div>
  );
};

export default CourseSummary;
