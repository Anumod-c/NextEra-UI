// PurchasedSingleCourse.tsx
import React, { useState } from "react";
import CourseSections from "../../../components/user/PurchasedSingleCourse.tsx/CourseSections";
import CourseDetails from "../../../components/user/PurchasedSingleCourse.tsx/CourseDetails";

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
      benefits: string[];
      prerequisites: string[];
      sections: Section[];
      rating?:number;
    };
    tutor?: {  // Make tutor optional
        _id: string;
        name: string;
        email: string;
        phone: number;
      };
  }

const PurchasedSingleCourse: React.FC<CourseProps> = ({ course,tutor }) => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  // Show the first video of the first section initially
  const firstVideo = course.sections.length > 0 && course.sections[0].lessons.length > 0 
    ? course.sections[0].lessons[0].video 
    : null;
  const [selectedVideo, setSelectedVideo] = useState<string | null>(firstVideo||null); // Initially showing the first video

  const toggleSection = (section: number) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left Component: Course Details */}
      <CourseDetails course={course} selectedVideo={selectedVideo} />

      {/* Right Component: Course Sections */}
      <CourseSections
        course={course}
        tutor={tutor ?? { _id: '', name: 'Unknown Tutor', email: 'N/A', phone: 0 }}  // Use fallback if tutor is undefined
        openSection={openSection}
        toggleSection={toggleSection}
        handleVideoClick={handleVideoClick}
       
      />
    </div>
  );
};

export default PurchasedSingleCourse;
