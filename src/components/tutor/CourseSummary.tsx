import React from 'react';

interface Lesson {
  title: string;
  video: string | null;
  description: string;
}

interface CourseSummaryProps {
  courseName: string;
  coursePrice: number;
  courseDiscountPrice: number;
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
  courseDiscountPrice,
  courseDescription,
  courseCategory,
  courseLevel,
  demoUrl,
  benefits,
  prerequisites,
  lessons,
}) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Video/Media Section */}
          <div className="lg:w-1/2 bg-black">
            <div className="w-full h-64 lg:h-full">
              <video className="w-full h-full object-cover rounded-t-lg lg:rounded-none lg:rounded-l-lg" controls>
                <source src={lessons[0]?.video || demoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Course Details Section */}
          <div className="lg:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{courseName}</h2>
            <p className="text-lg text-gray-600 mb-2"><strong>Category:</strong> {courseCategory}</p>
            <p className="text-lg text-gray-600 mb-2"><strong>Level:</strong> {courseLevel}</p>
            <p className="text-xl font-semibold text-green-600 mb-2"><strong>Price:</strong> ${coursePrice}</p>
            <p className="text-xl font-semibold text-red-600 mb-4"><strong>Discount Price:</strong> ${courseDiscountPrice}</p>

            <p className="text-gray-700 leading-relaxed mb-6">{courseDescription}</p>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Benefits</h3>
              <ul className="list-disc list-inside pl-5 text-gray-700">
                {benefits.map((benefit, index) => (
                  <li key={index} className="mb-2">✨ {benefit}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Prerequisites</h3>
              <ul className="list-disc list-inside pl-5 text-gray-700">
                {prerequisites.map((prerequisite, index) => (
                  <li key={index} className="mb-2">📘 {prerequisite}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Lessons Section */}
        <div className="p-8 bg-gray-50">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Lessons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                {lesson.video ? (
                  <video className="w-full h-40 object-cover rounded-lg mb-4" controls>
                    <source src={lesson.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
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

export default CourseSummary;
