import { useEffect, useState } from "react";
import CourseDiscussion from "../../components/user/chat/CourseDiscussion";
import CourseList, { Course } from "../../components/user/chat/CourseList";
import UserNavbar from "../../components/user/UserNavbar";
import SocketService from "../../socket/SocketService";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { courseEndpoints } from "../../constraints/endpoints/courseEndpoints";
import userAxios from "../../constraints/axios/userAxios";

export interface Message{
  userId:string,
  content:string;
  userName:string;
  profilePicture:string;
}
const ChatLayout: React.FC = () => {
  const [message, setMessage] = useState('');
  const [courseMessages, setCourseMessages] = useState<{ [key: string]: { userId: string; text: string }[] }>({});
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); 

  const  [courses, setCourses] = useState<Course[]>([]);
  const currentUserId = useSelector((state: RootState) => state.user.id);

  // Fetch courses for course listing
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await userAxios.get(courseEndpoints.fetchCourseChatList, {
          params: { currentUserId },
        });
        if (response.data.success) {
          setCourses(response.data.courses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [currentUserId]);

  useEffect(() => {
    if (selectedCourse) {
      const courseId = selectedCourse._id;
      // Join the selected course's discussion room
      SocketService.joinRoom(courseId);

      SocketService.loadPreviousMessages('loadPreviousMessages', (previousMessages) => {
        console.log('previousMessageas',previousMessages)
        const mappedMessages = previousMessages.map((msg: Message) => (
          {
          userId: msg.userId,
          userName:msg.userName,
          text: msg.content,
          profilePicture:msg.profilePicture,
        }));

        setCourseMessages((prevMessages) => ({
          ...prevMessages,
          [courseId]: mappedMessages, // Set the mapped messages for the course
        }));
      });
    }

    return () => {
      if (selectedCourse) {
        SocketService.leaveRoom(selectedCourse._id);
      }
    };
  }, [selectedCourse]);

  useEffect(() => {
    const handleMessageReceive = (newMessage: { userId: string; text: string; courseId: string }) => {
      if (selectedCourse && newMessage.courseId === selectedCourse._id) {
        setCourseMessages((prevMessages) => ({
          ...prevMessages,
          [selectedCourse._id]: [...(prevMessages[selectedCourse._id] || []), newMessage],
        }));
      }
    };

    SocketService.onMessage(handleMessageReceive);

    return () => {
      SocketService.removeMessageListener(handleMessageReceive);
    };
  }, [selectedCourse]);

  const handleSendMessage = () => {
    if (message.trim() && selectedCourse) {
      const newMessage = { userId: currentUserId, text: message, courseId: selectedCourse._id };
      SocketService.sendMessage(selectedCourse._id, newMessage);

      setMessage('');
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="flex h-screen">
        <CourseList setSelectedCourse={setSelectedCourse} courses={courses} />
        <CourseDiscussion
          selectedCourse={selectedCourse}
          messages={selectedCourse ? courseMessages[selectedCourse._id] || [] : []}
          message={message}
          setMessage={setMessage}
          onSendMessage={handleSendMessage}
          currentUserId={currentUserId}
        />
      </div>
    </>
  );
};

export default ChatLayout;
