import { IoSend } from 'react-icons/io5'
interface CourseDiscussionProps {
  messages: { userId: string; text: string; userName: string; profileImg: string }[]; // Including userName and profileImg
  message: string;
  setMessage: (msg: string) => void;
  onSendMessage: () => void;
  currentUserId: string; // Current logged-in userId
  selectedCourse:string |null;
}

const CourseDiscussion: React.FC<CourseDiscussionProps> = ({
  messages,
  message,
  setMessage,
  onSendMessage,
  currentUserId,
  selectedCourse,
}) => {
  return (
    <div className="w-3/4 flex flex-col h-full bg-gray-50">
      <div className="courselis_heading p-4 bg-blue-600 text-white text-lg font-semibold">
        Discussions
      </div>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.userId === currentUserId ? 'justify-end' : 'justify-start'}`}
          >
            {msg.userId !== currentUserId && (
              <div className="flex mb-6 items-start space-x-3">
                {/* Profile image for other users */}
                <img
                  src={msg.profileImg || 'https://dummyimage.com/50x50/000/fff'} // Dummy image for now
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col">
                  {/* Message box with username inside */}
                  <div className="p-3 m-2 max-w-xs bg-gray-200 rounded-lg">
                    {/* Username inside the message box */}
                    <span className="text-sm font-semibold block text-gray-600">
                      {msg.userName || 'User Name'}
                    </span>
                    {/* Message Text */}
                    <span className="text-sm block mt-1">{msg.text}</span>
                  </div>
                </div>
              </div>
            )}

            {msg.userId === currentUserId && (
              <div className="p-3 m-2 max-w-xs rounded-lg bg-blue-500 text-white">
                {msg.text}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Message Input */}
      {selectedCourse && (
      <div className="p-4 flex bg-white border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Type a message..."
        />
         <button
          onClick={onSendMessage}
          className="m-2 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
        >
          {/* Send icon from react-icons */}
          <IoSend className="h-6 w-6" />
        </button>
      </div>
      )}
    </div>
  );
};

export default CourseDiscussion;
