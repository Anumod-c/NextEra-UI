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
    _id: string;
    title: string;
    description: string;
    benefits: string[];
    prerequisites: string[];
    sections: Section[];
    enrolledUsers?: string[];
    averageRating?: number;
  };
  tutor?: {
    _id: string;
    name: string;
    email: string;
    profilePicture?: string;
    phone: number;
  };
}

const PurchasedSingleCourse: React.FC<CourseProps> = ({ course, tutor }) => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const firstVideo =
    course.sections.length > 0 && course.sections[0].lessons.length > 0
      ? course.sections[0].lessons[0].video
      : null;
  const [selectedVideo, setSelectedVideo] = useState<string | null>(
    firstVideo || null
  ); 

  const toggleSection = (section: number) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2">
      {/* Left Component: Course Details */}
      <CourseDetails course={course} selectedVideo={selectedVideo} />

      {/* Right Component: Course Sections */}
      <CourseSections
        course={course}
        tutor={
          tutor ?? { _id: "", name: "Unknown Tutor", email: "N/A", phone: 0 }
        } 
        openSection={openSection}
        toggleSection={toggleSection}
        handleVideoClick={handleVideoClick}
      />
    </div>
  );
};

export default PurchasedSingleCourse;
