
export interface Course {
  _id: string;
  title: string;
  thumbnail: string;
}

interface CourseListProps {
  setCourseId: (courseId: string) => void;
  courses:Course[]
}

const CourseList: React.FC<CourseListProps> = ({ setCourseId ,courses }) => {
  return (
    <div className="w-1/4 shadow-lg border flex flex-col h-full bg-white ">
      {/* Header */}
      <div className="courselis_heading p-4 bg-blue-600 text-white text-lg font-semibold ">
        Discussions
      </div>

      {/* Course List */}
      <div className="flex-grow overflow-y-auto">
        {/* Course Item */}
        {courses.map((course) => (
          <div
            key={course._id}
            onClick={() => setCourseId(course._id)} // Select course and pass courseId to parent
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
