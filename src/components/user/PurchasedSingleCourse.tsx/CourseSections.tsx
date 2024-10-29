import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import tutorImage from '../../../assets/profile.png';
import CloseIcon from "@mui/icons-material/Close";
import VideoIcon from "@mui/icons-material/OndemandVideo";
import StarIcon from '@mui/icons-material/Star';
import ReviewRating from "../ReviewRating";

interface Lesson {
  title: string;
  video?: string;
  description: string;
}

interface Section {
  title: string;
  lessons: Lesson[];
}

interface CourseSectionsProps {
  course: {
    title: string;
    description: string;
    sections: Section[];
    rating?: number;
  };
  tutor: {
    _id: string;
    name: string;
    profilePicture?:string;
    email: string;
    phone: number;
  };
  openSection: number | null;
  toggleSection: (section: number) => void;
  handleVideoClick: (videoUrl: string) => void;
}

const CourseSections: React.FC<CourseSectionsProps> = ({
  course,
  tutor,
  openSection,
  toggleSection,
  handleVideoClick
}) => {
  console.log(tutor, "tutorfullData");

  return (
    <>
      <div className="md:w-4/12 bg-white shadow-lg rounded-lg p-6 mt-8">
        <h3 className="text-2xl font-semibold mb-4">Sections</h3>
        {course.sections.map((section, index) => (
          <div key={index} className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer p-4 bg-gray-100 rounded-md shadow-sm"
              onClick={() => toggleSection(index)}
            >
              <div className="text-lg font-medium">{section.title}</div>
              {openSection === index ? <CloseIcon /> : <ArrowDropDownIcon />}
            </div>

            {openSection === index && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                {section.lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="flex justify-between items-center mb-4">
                    <p className="text-lg">{lesson.title}</p>
                    <VideoIcon
                      className="cursor-pointer text-2xl text-blue-500"
                      onClick={() => handleVideoClick(lesson.video||'')}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Tutor Details Card */}
        <div className="tutorDetails mt-14 p-4 bg-white rounded-lg shadow-md flex items-center space-x-4">
          <img 
            src={tutor.profilePicture||tutorImage} 
            alt="tutorImage" 
            className="w-16 h-16 rounded-full border-2 border-blue-400" 
          />
          <div className="flex flex-col">
            <p className="text-xl font-semibold">{tutor.name}</p>
            <div className="rating flex items-center mt-1">
              {Array.from({ length: 5 }, (_, index) => (
                <StarIcon 
                  key={index} 
                  style={{ color: index < (course.rating || 0) ? 'gold' : 'gold' }} 
                />
              ))}
              <p className='ml-2 text-md'>{course.rating || 'N/A'}</p>
            </div>
          </div>
        </div>
        <ReviewRating/>
      </div>
    </>
  );
};

export default CourseSections;
