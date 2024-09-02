import React from 'react';
import { motion } from 'framer-motion';

const features = [
  { title: 'Courses', description: 'Vast range of subjects' },
  { title: 'Live Classes', description: 'Interactive sessions' },
  { title: 'Integrated IDE', description: 'Code and learn' },
  { title: 'Live Chat', description: 'Engage with peers' },
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center">
          <h2 className="text-4xl font-bold mb-8">Key Features</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
