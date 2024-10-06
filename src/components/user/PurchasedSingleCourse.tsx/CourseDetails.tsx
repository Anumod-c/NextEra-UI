// CourseDetails.tsx
import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import TranslateIcon from "@mui/icons-material/Translate";
import { RiCheckDoubleLine } from "react-icons/ri";

interface Lesson {
  title: string;
  video?: string;
  description: string;
}

interface Section {
  title: string;
  lessons: Lesson[];
}

interface CourseDetailsProps {
  course: {
    title: string;
    description: string;
    benefits: string[];
    prerequisites: string[];
    sections: Section[];
  };
  selectedVideo: string | null;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, selectedVideo }) => {
  return (
    <div className="md:w-8/12 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-4xl font-bold">{course.title}</h2>
      <div className="flex items-center space-x-8 mt-4">
        <div className="flex items-center space-x-2">
          <StarIcon className="text-amber-400" />
          <p>4.5 Rating</p>
        </div>
        <div className="flex items-center space-x-2">
          <SchoolIcon className="text-violet-800" />
          <p>12,345 Enrolled</p>
        </div>
        <div className="flex items-center space-x-2">
          <TranslateIcon className="text-pink-500" />
          <p>English</p>
        </div>
      </div>

      {/* Video Section */}
      <div className="relative w-full mt-6">
        {selectedVideo ? (
          <video className="w-full rounded-lg shadow-lg" controls src={selectedVideo}>
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>No video available</p>
        )}
      </div>

      {/* Course Description */}
      <div className="bg-gray-50 p-4 mt-6 rounded-lg">
        <h3 className="text-2xl font-semibold mb-2">Description</h3>
        <p>{course.description}</p>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 p-4 mt-6 rounded-lg">
        <h3 className="text-2xl font-semibold mb-2">Benefits</h3>
        <ul>
          {course.benefits.map((benefit, index) => (
            <li key={index} className="flex items-center">
              <RiCheckDoubleLine className="text-blue-500 mr-2" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Prerequisites */}
      <div className="bg-gray-50 p-4 mt-6 rounded-lg">
        <h3 className="text-2xl font-semibold mb-2">Prerequisites</h3>
        <ul>
          {course.prerequisites.map((prerequisite, index) => (
            <li key={index} className="flex items-center">
              <RiCheckDoubleLine className="text-blue-500 mr-2" />
              {prerequisite}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetails;
