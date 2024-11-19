import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";

const UserTutorSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-4 ">
      {/* User Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg m-4 w-full md:w-1/2 lg:w-1/3 text-center"
      >
        <Player
          autoplay
          loop
          src="https://lottie.host/7100dd4f-826b-421f-801b-752477ccd826/vBS1LriaZx.json"
          style={{ height: "70%", width: "70%" }}
        />

        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 text-white p-4 m-10 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Enroll as Student
        </button>
        <p className="text-gray-600 m-4">
          Join as a student to unlock a world of learning opportunities. Access
          a diverse range of courses, engage with interactive content,
          collaborate with peers, and track your progress as you embark on your
          educational journey.
        </p>
      </motion.div>

      {/* Tutor Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg m-4 w-full md:w-1/2 lg:w-1/3 text-center"
      >
        <Player
          autoplay
          loop
          src="https://lottie.host/6f809a7f-7e0f-424e-bcb4-32ef6eb4d2ff/Jq3Qrwg0G2.json"
          style={{ height: "80%", width: "80%" }}
        />
        <button
          onClick={() => navigate("/tutor")}
          className="bg-green-500 text-white p-4 m-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          Enroll as Instructor
        </button>
        <p className="text-gray-600 m-4">
          Become a part of our vibrant teaching community by enrolling as a teacher. Share your expertise, create engaging courses, interact with students, and make a meaningful impact on learners' lives. Empower the next generation of learners with your knowledge and passion."
        </p>
      </motion.div>
    </div>
  );
};

export default UserTutorSelection;
