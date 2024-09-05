import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// import Lottie from 'lottie-react';
// import learningAnimation from '../animations/learning.json';

const Hero = () => {
    const navigate= useNavigate();
    const handleClick=()=>{
        navigate('/UserTutorSelection')
    }
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
      <motion.div 
        className="text-center text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}>
          <h1 className='text-5xl'>NEXTERA</h1>
        <h1 className="text-5xl font-bold">Empower Your Learning Journey with Nextera</h1>
        <p className="mt-4 text-lg">Courses, Live Classes, Chat, and an Integrated IDE — All in One Platform</p>
        <motion.button onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-8 px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg">
          Get Started
        </motion.button>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}>
        {/* <Lottie animationData={learningAnimation} className="w-1/2 mx-auto mt-12" /> */}
      </motion.div>
    </section>
  );
};

export default Hero;
