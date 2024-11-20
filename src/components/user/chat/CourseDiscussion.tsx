import { useEffect, useRef, useState } from "react";
import { Course } from "./CourseList";
import { IoSend } from "react-icons/io5";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { MdPermMedia } from "react-icons/md";
import chatBackground from "../../../assets/chat2.jpeg";
import { RiLiveFill } from "react-icons/ri";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface CourseDiscussionProps {
  messages: {
    userId: string;
    text?: string;
    image?: string;
    userName?: string;
    profilePicture?: string;
  }[];
  message: string;
  setMessage: (msg: string) => void;
  onSendMessage: () => void;
  currentUserId: string;
  selectedCourse: Course | null;
  handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CourseDiscussion: React.FC<CourseDiscussionProps> = ({
  messages,
  message,
  setMessage,
  onSendMessage,
  currentUserId,
  selectedCourse,
  handleImageSelect,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log("final  msg", messages);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const liveContainerRef = useRef<HTMLDivElement | null>(null); 
  const [isJoiningLive] = useState(false);
  const userName = useSelector((state: RootState) => state.user.name);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setMessage(message + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleJoinLive = async () => {
    if (!selectedCourse) return;

    if (!selectedCourse._id) {
      alert("Live stream not available for this course.");
      return;
    }

    const appId = Number(import.meta.env.VITE_APP_ID); 
    const serverSecret = import.meta.env.VITE_SERVER_SECRET; 
    const userID = currentUserId;
    console.log("selected coure for streaming", selectedCourse._id,appId,serverSecret);
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      selectedCourse._id || "",
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: liveContainerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role: ZegoUIKitPrebuilt.Audience, 
        },
      },

      showPreJoinView: false,
      showLeavingView: false,
      showAudioVideoSettingsButton: false,
      layout: "Grid",
      useFrontFacingCamera: false,
      turnOnMicrophoneWhenJoining: false,
      turnOnCameraWhenJoining: false,
      showMyMicrophoneToggleButton: false, 
      showMyCameraToggleButton: false, 
    });
  };

  return (
    <div className="w-3/4 flex flex-col h-full">
      <div className="courselis_heading p-[6px]  bg-gray-900 text-white text-lg font-semibold">
        <div className="flex justify-between gap-4 items-center h-12">
          {selectedCourse && (
            <>
              <div className="flex p-4 gap-4 items-center ">
                <img
                  className="rounded-full w-11 h-11 object-fit "
                  src={selectedCourse?.thumbnail}
                  alt={selectedCourse?.title}
                />
                <span>{selectedCourse.title}</span>
              </div>
              <button
                onClick={handleJoinLive}
                className="md:bg-green-500 text-white p-2 px-4 m-2 flex items-center gap-2 rounded-lg shadow-md transition-transform transform hover:scale-105 md:hover:bg-green-600"
              >
                <span className="hidden md:inline">Join Live</span>
                <RiLiveFill className=" text-2xl md:text-lg" />
              </button>
            </>
          )}
        </div>
      </div>
      {/* Live streaming container */}
      {isJoiningLive && (
        <div
          className="live-stream-container w-full h-96 bg-gray-900 mt-4 rounded-lg"
          ref={liveContainerRef}
        ></div>
      )}

      {/* Messages */}
      <div
        className="flex-grow p-4 overflow-y-auto bg-cover bg-center"
        style={{
          backgroundImage: `url(${chatBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.userId === currentUserId ? "justify-end" : "justify-start"
              }`}
          >
            {msg.userId !== currentUserId && (
              <div className="flex mb-6 items-start space-x-3">
                <img
                  src={
                    msg.profilePicture || "https://dummyimage.com/50x50/000/fff"
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="p-2   max-w-xs  rounded-lg">
                    <span className="text-sm font-semibold block text-gray-600">
                      {msg.userName || "User Name"}
                    </span>
                    {msg.image ? (
                      <img
                        src={msg.image}
                        alt="Shared content"
                        className="h-auto rounded-lg"
                      />
                    ) : (
                      // Text message display as before
                      <div className="p-2 min-w-16  rounded-lg  bg-gray-200 text-black">
                        {msg.text}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {msg.userId === currentUserId && (
              <div className="p-2  max-w-xs rounded-lg  text-white">
                {msg.image ? (
                  <img
                    src={msg.image}
                    alt="Shared content"
                    className=" h-auto rounded-lg"
                  />
                ) : (
                  // Text message display as before
                  <div className="p-2 min-w-16    rounded-lg bg-blue-500 text-white">
                    {msg.text}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {selectedCourse && (
        <div className="p-4 flex bg-white border-t">
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-20">
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}

          {/* Emoji Button */}
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="m-2 bg-gray-200 text-black px-2 py-2 rounded-lg"
          >
            😀
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="m-2">
            <MdPermMedia className="h-6 w-6 text-gray-600" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            style={{ display: "none" }}
            accept="image/*"
          />
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
