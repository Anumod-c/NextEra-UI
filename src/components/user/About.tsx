import React from 'react';
import { motion } from 'framer-motion';
// import Lottie from 'lottie-react';
// import growthAnimation from '../animations/growth.json';

const About = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 p-6">
          <h2 className="text-4xl font-bold mb-4">Why Nextera?</h2>
          <p className="text-lg mb-6">At Nextera, we're committed to providing the best e-learning experience. Whether you're a beginner or an expert, our platform is designed to help you grow and succeed in your learning journey.</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 p-6">
            {/* <Lottie animationData={growthAnimation} className="w-full" /> */}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
