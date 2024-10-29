// NoCoursesFallback.tsx
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion'; // Import motion

const NoCoursesFallback: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
          className="flex-1 bg-[#ecf5fb] flex justify-center items-center"
          initial={{ x: -100, opacity: 0 }} // Start position
          animate={{ x: 0, opacity: 1 }} // End position
          exit={{ x: -100, opacity: 0 }} // Exit animation
          transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }} // Smooth easing
        >
          <Player
            autoplay
            loop
            src="https://lottie.host/7100dd4f-826b-421f-801b-752477ccd826/vBS1LriaZx.json"
            style={{ height: "80%", width: "80%" }}
          />
        </motion.div>
        <h2 className="text-xl font-semibold mt-4">No Courses Found</h2>
      <p className="text-gray-500 mt-2">It looks like we couldn’t find any courses that match your criteria. Try searching again or check back later!</p>
      
    </div>
  );
};

export default NoCoursesFallback;
