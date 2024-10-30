import React from 'react';

export interface Course {
  _id: string;
  title: string;
  thumbnail: string;
}

interface CourseListProps {
  setSelectedCourse: (course: Course) => void;
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ setSelectedCourse, courses }) => {
  return (
    <div className="w-1/4 shadow-md border border-gray-200 flex flex-col h-full bg-white rounded-lg overflow-hidden">
      {/* Header */}
      <div className="courselist_heading p-4 bg-gray-900 text-white text-lg font-semibold text-center shadow-sm">
        Discussions
      </div>

      {/* Course List */}
      <div className="flex-grow overflow-y-auto">
        {courses.map((course) => (
          <div
            key={course._id}
            onClick={() => setSelectedCourse(course)}
            className="flex items-center p-4 m-2 bg-gray-50 hover:bg-blue-100 rounded-md cursor-pointer transition-transform transform hover:scale-105 shadow-sm"
          >
            <img
              className="w-12 h-12 object-cover rounded-full mr-4 border border-gray-300"
              src={course.thumbnail}
              alt={course.title}
            />
            <p className="truncate font-medium text-gray-700">{course.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
