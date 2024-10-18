import { useEffect, useState } from "react";
import CourseDiscussion from "../../components/user/chat/CourseDiscussion";
import CourseList from "../../components/user/chat/CourseList";
import UserNavbar from "../../components/user/UserNavbar";
import SocketService from "../../socket/SocketService";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { courseEndpoints } from "../../constraints/endpoints/courseEndpoints";
import userAxios from "../../constraints/axios/userAxios";

const ChatLayout: React.FC = () => {
  const [message, setMessage] = useState('');
  const [courseMessages, setCourseMessages] = useState<{ [key: string]: { userId: string; text: string }[] }>({});
  const [courseId, setCourseId] = useState<string | null>(null);
  const  [courses,setCourses]= useState([]);

  const currentUserId = useSelector((state: RootState) => state.user.id);

  //fetch courses for course listing
  useEffect(()=>{
    const fetchCourses = async()=>{
      try {
        const response = await  userAxios.get(courseEndpoints.fetchCourseChatList,{
          params: { currentUserId }});
        if(response.data.success){
          setCourses(response.data.courses)
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses()
  },[currentUserId])
  useEffect(() => {
    if (courseId) {
      // Join the selected course's discussion room
      SocketService.joinRoom(courseId);

      SocketService.loadPreviousMessages('loadPreviousMessages', (previousMessages) => {
        const mappedMessages = previousMessages.result.map((msg: any) => ({
          userId: msg.userId,
          text: msg.content,  
          
        }));
      
        setCourseMessages((prevMessages) => ({
          ...prevMessages,
          [courseId]: mappedMessages,  // Set the mapped messages for the course
        }));
      });
    }

    return () => {
      if (courseId) {
        SocketService.leaveRoom(courseId);
      }
    };
  },[courseId]);

  useEffect(() => {
    const handleMessageReceive = (newMessage: { userId: string; text: string; courseId: string }) => {
      if (courseId && newMessage.courseId === courseId) {
        setCourseMessages((prevMessages) => ({
          ...prevMessages,
          [courseId]: [...(prevMessages[courseId] || []), newMessage],
        }));
      }
    };

    SocketService.onMessage(handleMessageReceive);

    return () => {
      SocketService.removeMessageListener(handleMessageReceive);
    };
  }, [courseId]);

  const handleSendMessage = () => {
    if (message.trim() && courseId) {
      const newMessage = { userId: currentUserId, text: message, courseId }; 
      SocketService.sendMessage(courseId, newMessage);

      setMessage('');
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="flex h-screen">
        <CourseList setCourseId={setCourseId} courses={courses} />
        <CourseDiscussion
        // courses={courses}
        selectedCourse={courseId}
          messages={courseId ? courseMessages[courseId] || [] : []} // Show messages for the selected course
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
