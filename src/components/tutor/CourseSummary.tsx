import React from 'react';

interface Lesson {
  title: string;
  video: string | null;
  description: string;
}

interface CourseSummaryProps {
  courseName: string;
  coursePrice: string;
  courseDescription: string;
  courseCategory: string;
  courseLevel: string;
  demoUrl: string;
  benefits: string[];
  prerequisites: string[];
  lessons: Lesson[];
}

const CourseSummary: React.FC<CourseSummaryProps> = ({
  courseName,
  coursePrice,
  courseDescription,
  courseCategory,
  courseLevel,
  demoUrl,
  benefits,
  prerequisites,
  lessons,
}) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Video/Media Section */}
          <div className="lg:w-1/2">
            <div className="w-full h-64 bg-gray-200">
              <video className="w-full h-full object-cover" controls>
                <source src={lessons[0]?.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Course Details Section */}
          <div className="lg:w-1/2 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{courseName}</h2>
            <p className="text-lg text-gray-600 mb-4">Category: {courseCategory}</p>
            <p className="text-lg text-gray-600 mb-4">Level: {courseLevel}</p>
            <p className="text-lg font-semibold text-gray-800 mb-4">Price: {coursePrice}</p>
            <p className="text-gray-700 mb-4">{courseDescription}</p>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Benefits</h3>
              <ul className="list-disc list-inside pl-5">
                {benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-700">** {benefit}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Prerequisites</h3>
              <ul className="list-disc list-inside pl-5">
                {prerequisites.map((prerequisite, index) => (
                  <li key={index} className="text-gray-700">** {prerequisite}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Lessons Section */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Lessons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                {lesson.video ? (
                  <video className="w-full h-32 object-cover mb-2" controls>
                    <source src={lesson.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-32 bg-gray-200 mb-2"></div>
                )}
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{lesson.title}</h4>
                <p className="text-gray-700">{lesson.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Example dummy data
const dummyData = {
  courseName: "Advanced React Development",
  coursePrice: "$199",
  courseDescription: "This course provides an in-depth understanding of advanced React concepts.",
  courseCategory: "React",
  courseLevel: "Intermediate",
  demoUrl: "https://example.com/demo",
  benefits: [
    "Learn advanced React techniques",
    "Understand state management with Redux",
    "Build complex React applications"
  ],
  prerequisites: [
    "Basic understanding of JavaScript",
    "Experience with React fundamentals"
  ],
  lessons: [
    {
      title: "Introduction to Advanced React",
      video: "intro-to-advanced-react.mp4",
      description: "Overview of advanced React concepts and practices."
    },
    {
      title: "State Management with Redux",
      video: "state-management-with-redux.mp4",
      description: "Learn how to manage application state using Redux."
    },
    {
      title: "Building Complex Applications",
      video: "building-complex-applications.mp4",
      description: "Practical examples of building large-scale React applications."
    }
  ]
};

const App: React.FC = () => {
  return (
    <CourseSummary {...dummyData} />
  );
};

export default App;