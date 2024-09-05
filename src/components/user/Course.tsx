import React from 'react';
import { motion } from 'framer-motion';

const courses = [
  { title: 'Web Development', description: 'Learn HTML, CSS, and JavaScript' },
  { title: 'Data Science', description: 'Master Python and machine learning' },
  { title: 'UI/UX Design', description: 'Design beautiful and usable interfaces' },
];

const Courses = () => {
  return (
    <section className="py-16 bg-white ">
      <div className="container mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8">
          <h2 className="text-4xl font-bold">Explore Our Courses</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
          {courses.map((course, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="p-6 bg-gray-100 rounded-lg shadow-lg h-72">
              <h3 className="text-xl font-semibold mb-4">{course.title}</h3>
              <p>{course.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
