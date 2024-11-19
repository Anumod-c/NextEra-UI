import { useEffect, useState } from "react";
import CourseDiscussion from "../../components/user/chat/CourseDiscussion";
import CourseList, { Course } from "../../components/user/chat/CourseList";
import UserNavbar from "../../components/user/UserNavbar";
import SocketService from "../../socket/SocketService";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { courseEndpoints } from "../../constraints/endpoints/courseEndpoints";
import userAxios from "../../constraints/axios/userAxios";
import axios from "axios";

export interface Message {
  userId: string;
  content?: string;
  image?: string;
  userName: string;
  profilePicture: string;
}

const ChatLayout: React.FC = () => {
  const [message, setMessage] = useState("");
  const [courseMessages, setCourseMessages] = useState<{ [key: string]: { userId: string; text: string }[] }>({});
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const currentUserId = useSelector((state: RootState) => state.user.id);

  const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME;
  const region = import.meta.env.VITE_AWS_REGION;
  const randomFileName = () => `${Date.now()}-${Math.random().toString(36).substring(2)}`;

  const getPresignedUrlForUpload = async (fileName: string, fileType: string) => {
    try {
      const response = await userAxios.get("/get-presigned-url", {
        params: {
          fileName,
          fileType,
        },
      });
      return response.data.url;
    } catch (error) {
      console.error("Error fetching presigned URL:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await userAxios.get(courseEndpoints.fetchCourseChatList, { params: { currentUserId } });
        if (response.data.success) setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [currentUserId]);

  useEffect(() => {
    if (selectedCourse) {
      const courseId = selectedCourse._id;
      SocketService.joinRoom(courseId);
      SocketService.loadPreviousMessages("loadPreviousMessages", (previousMessages) => {
        const mappedMessages = previousMessages.map((msg: Message) => ({
          userId: msg.userId,
          userName: msg.userName,
          image: msg.image,
          text: msg.content,
          profilePicture: msg.profilePicture,
        }));
        setCourseMessages((prevMessages) => ({
          ...prevMessages,
          [courseId]: mappedMessages,
        }));
      });
    }
    return () => {
      if (selectedCourse) SocketService.leaveRoom(selectedCourse._id);
    };
  }, [selectedCourse]);

  useEffect(() => {
    const handleMessageReceive = (newMessage: { userId: string; image: string; text: string; courseId: string }) => {
      if (selectedCourse && newMessage.courseId === selectedCourse._id) {
        setCourseMessages((prevMessages) => ({
          ...prevMessages,
          [selectedCourse._id]: [...(prevMessages[selectedCourse._id] || []), newMessage],
        }));
      }
    };
    SocketService.onMessage(handleMessageReceive);
    return () => SocketService.removeMessageListener(handleMessageReceive);
  }, [selectedCourse]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setShowImagePreview(true);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedCourse) {
      const newMessage = { userId: currentUserId, text: message, courseId: selectedCourse._id };
      SocketService.sendMessage(selectedCourse._id, newMessage);
      setMessage("");
    }
  };

  const handleSendImage = async () => {
    if (selectedImage && selectedCourse) {
      const fileName = randomFileName();
      console.log(fileName, 'filename')
      const fileType = selectedImage.type;
      const uploadUrl = await getPresignedUrlForUpload(fileName, fileType);
      if (uploadUrl) {
        try {
          await axios.put(uploadUrl, selectedImage, {
            headers: { "Content-Type": fileType },
          });
          const finalUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
          const newMessage = { userId: currentUserId, image: finalUrl, courseId: selectedCourse._id };
          SocketService.sendImage(selectedCourse._id, newMessage);
          setShowImagePreview(false);
          setSelectedImage(null);
        } catch (error) {
          console.error("Failed to upload image to S3:", error);
        }
      }
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
          handleImageSelect={handleImageSelect}
        />
      </div>
      {showImagePreview && selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">Preview Image</h2>
            <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="w-full h-60 object-cover mb-4" />
            <div className="flex justify-end">
              <button onClick={() => setShowImagePreview(false)} className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-md">
                Cancel
              </button>
              <button onClick={handleSendImage} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatLayout;
