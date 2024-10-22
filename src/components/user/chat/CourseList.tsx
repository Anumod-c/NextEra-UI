
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
    <div className="w-1/4 shadow-lg border flex flex-col h-full bg-white">
      {/* Header */}
      <div className="courselis_heading p-4 bg-gray-900 text-white text-lg font-semibold">
        Discussions
      </div>

      {/* Course List */}
      <div className="flex-grow overflow-y-auto">
        {/* Course Item */}
        {courses.map((course) => (
          <div
            key={course._id}
            onClick={() => setSelectedCourse(course)} // Pass the full course object
            className="flex items-center p-3 m-2 bg-gray-100 hover:bg-blue-100 rounded-lg cursor-pointer transition-colors"
          >
            <img className="w-10 h-10 object-fit rounded-full mr-4" src={course.thumbnail} alt={course.title} />
            <p className="truncate">{course.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
