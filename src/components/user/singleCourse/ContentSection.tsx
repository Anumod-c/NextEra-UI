import React, { useState } from "react";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import TranslateIcon from "@mui/icons-material/Translate";
import { RiCheckDoubleLine } from "react-icons/ri";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import {MdOndemandVideo} from 'react-icons/md'
interface Lesson {
  title: string;
  video?: string;
  description: string;
}

interface Section {
  title: string;
  lessons: Lesson[];
}

interface CourseProps {
  course: {
    title: string;
    
    description: string;
    demoURL: string;
    benefits: string[];
    prerequisites: string[];
    sections: Section[];
    // rating?: number;
    // enrolled?: number;
    // language?: string;
  };
}

const ContentSection: React.FC<CourseProps> = ({ course }) => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (section: number) => {
    setOpenSection(openSection === section ? null : section);
  };

  const extractVideoId = (url: string): string => {
    const regExp = /^.*(youtu\.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=|m\.youtube\.com\/watch\?v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  };
  return (
    <div className="content col-span-2 flex flex-col shadow-xl bg-white rounded-lg">
      <div className="p-6 space-y-4">
        {/* Course Name and Rating */}
        <div className="space-y-2">
          <h2 className="text-4xl font-bold">{course.title}</h2>
          <div className="flex items-center space-x-16">
            <div className="flex items-center  p-4 space-x-2">
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
        </div>

        {/* Video Section */}
        <div className="relative w-full">
          <iframe
            className="w-full rounded-lg shadow-lg"
            height="400"
            src={`https://www.youtube.com/embed/${extractVideoId(
              course.demoURL
            )}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Course Description */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-2xl font-semibold mb-2">Description</h3>
          <p>{course.description}</p>
        </div>
        {/* Course Benefits */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-2xl font-semibold mb-2">Benefits</h3>
          <div className="space-y-2">
            {course.benefits.map((benefit: string, index: number) => (
              <div className="flex items-center" key={index}>
                <RiCheckDoubleLine className="text-blue-500 mr-2" />
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Prerequisites */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-2xl font-semibold mb-2">Prerequisites</h3>
          <div className="space-y-2">
            {course.prerequisites.map((prerequisite: string, index: number) => (
              <div className="flex items-center" key={index}>
                <RiCheckDoubleLine className="text-blue-500 mr-2" />
                <p>{prerequisite}</p>
              </div>
            ))}
          </div>
        </div>

       {/* Course Sections */}
<div className="bg-gray-50 p-4 rounded-lg">
  <h3 className="text-2xl font-semibold mb-4">Sections</h3>
  {course.sections.map((section, index) => (
    <div className="section-card mb-4" key={index}>
      <div
        className="flex justify-between items-center cursor-pointer p-4 bg-white shadow-md rounded-md"
        onClick={() => toggleSection(index)}
      >
        <div className="text-lg font-medium">{section.title}</div>
        {openSection === index ? <CloseIcon /> : <ArrowDropDownIcon />}
      </div>
      {openSection === index && (
        <div className="p-4 bg-white mt-2 shadow-md rounded-md">
        {section.lessons.map((lesson, lessonIndex) => (
          <div
            className="lesson-card mb-4 p-4 border-b w-full border-gray-200"
            key={lessonIndex}
          >
            {/* For small devices: Video first, then title, then description */}
            <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4">
              
              {/* Video Section with Icon Overlaid on Thumbnail */}
              <div className="w-full md:w-1/3 mb-4 md:mb-0 relative">
                {/* Placeholder video thumbnail */}
                <div className="relative w-full h-40 bg-gray-200 rounded-md overflow-hidden shadow-md">
                  <MdOndemandVideo className="absolute inset-0 m-auto text-6xl text-gray-600 opacity-70" />
                </div>
              </div>
      
              {/* Title and Description Section */}
              <div className="w-full md:w-2/3 text-center md:text-left">
                <h4 className="text-xl font-semibold mt-2 md:mt-0">{lesson.title}</h4>
                <p className="mt-2 text-gray-600">{lesson.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      )}
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default ContentSection;
