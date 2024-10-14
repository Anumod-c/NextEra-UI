import courseImage from '../../../assets/Nextera_Logo.jpg';

const CourseList: React.FC = () => {
  return (
    <div className="w-1/4 shadow-lg border flex flex-col h-full bg-white ">
      {/* Header */}
      <div className="courselis_heading p-4 bg-blue-600 text-white text-lg font-semibold ">
        Discussions
      </div>

      {/* Course List */}
      <div className="flex-grow overflow-y-auto">
        {/* Course Item */}
        {['Complete Web Development', 'Complete Javascript', 'Complete Nodejs', 'Advanced React', 'Fullstack Development','Complete Web Development', 'Complete Javascript', 'Complete Nodejs', ].map((course, index) => (
          <div
            key={index}
            className="flex items-center p-3 m-2 bg-gray-100 hover:bg-blue-100 rounded-lg cursor-pointer transition-colors"
          >
            <img className="w-10 h-10 rounded-full mr-4" src={courseImage} alt={course} />
            <p className="truncate">{course}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
