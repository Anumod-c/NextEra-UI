import { useEffect, useRef } from "react";
import { Course } from "./CourseList";
import { IoSend } from "react-icons/io5";

interface CourseDiscussionProps {
  messages: {
    userId: string;
    text: string;
    userName?: string;
    profilePicture?: string;
  }[];
  message: string;
  setMessage: (msg: string) => void;
  onSendMessage: () => void;
  currentUserId: string;
  selectedCourse: Course | null;
}

const CourseDiscussion: React.FC<CourseDiscussionProps> = ({
  messages,
  message,
  setMessage,
  onSendMessage,
  currentUserId,
  selectedCourse,
}) => {
  console.log('final  msg',messages)
  // Reference for the messages container to scroll to the bottom
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom whenever messages change
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-3/4 flex flex-col h-full bg-gray-50">
      <div className="courselis_heading p-2  bg-gray-900 text-white text-lg font-semibold">
        <div className="flex justify-start gap-4 items-center h-12">
          {selectedCourse ? (
            <>
              <img
                className="rounded-full w-14 h-14 object-fit "
                src={selectedCourse?.thumbnail}
                alt=""
              />
              <span>{selectedCourse.title}</span>
            </>
          ) : (
            <span> Discussions</span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.userId === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            {msg.userId !== currentUserId && (
              <div className="flex mb-6 items-start space-x-3">
                <img
                  src={msg.profilePicture || "https://dummyimage.com/50x50/000/fff"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="p-3 m-2 max-w-xs bg-gray-200 rounded-lg">
                    <span className="text-sm font-semibold block text-gray-600">
                      {msg.userName || "User Name"}
                    </span>
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
        <div ref={messagesEndRef} />
      </div>

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
            <IoSend className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseDiscussion;
