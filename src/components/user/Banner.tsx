import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Importing Link for navigation

const Banner: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-t from-white to-blue-600 p-8  ">
      {/* Left Side - Animation */}
      <div className="lottiplayer w-full md:w-1/2 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <Player
            autoplay
            loop
            src="https://lottie.host/5b087d75-ddb5-42cd-89a8-f1de45f89dd4/xwPlWyiQCa.json" style={{ height: "400px", width: "400px" }} // Adjusted size
          />
        </motion.div>
      </div>

      {/* Right Side - Content */}
      <div className="content w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
        <h1 className="text-4xl font-bold text-white mb-4">
          Elevate Your Learning Experience
        </h1>
        <p className="text-gray-200 mb-6">
          Join our community of learners and access a diverse range of courses
          tailored to enhance your skills. Engage with interactive content,
          collaborate with peers, and track your progress on your educational
          journey.
        </p>
        <Link 
          to="/allCourse" 
          className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
        >
          Explore Courses
        </Link>
      </div>
    </div>
  );
};

export default Banner;
