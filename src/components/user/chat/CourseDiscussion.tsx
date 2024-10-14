import chatWallpaper from '../../../assets/chat2.jpeg';
import { FaPaperPlane } from 'react-icons/fa'; // Import send icon

const CourseDiscussion: React.FC = () => {
  return (
    <div className="flex flex-col w-3/4 bg-white shadow-lg  h-screen">
      {/* Chat Header */}
      <div className="flex justify-center items-center p-4 bg-gray-500 text-white ">
        <p className="text-2xl font-semibold">Complete Web Development for Beginners</p>
      </div>

      {/* Chat Area */}
      <div className="chat flex-grow relative">
        <img className="absolute inset-0 w-full h-full object-cover" src={chatWallpaper} alt="Chat Background" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          {/* <p className="text-white text-xl">Start the discussion here!</p> */}
        </div>
      </div>

      {/* Message Input Area */}
      <div className="flex items-center border-t border-gray-300 p-3 bg-gray-100">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
        />
        <button className="ml-3 bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 focus:outline-none">
          <FaPaperPlane className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CourseDiscussion;
