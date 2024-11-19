import { motion } from 'framer-motion';
import { Player } from "@lottiefiles/react-lottie-player";

const features = [
  {
    title: 'Courses',
    description: 'Vast range of subjects',
    src: "https://lottie.host/9a539936-d84b-4f3f-93b1-fdfed0c0ed9b/s60POyzqfF.json"
  },
  {
    title: 'Live Classes',
    description: 'Interactive sessions',
    src: "https://lottie.host/4b56b8a4-d29f-498a-9486-6c29e215f78b/UtfAg6QG0M.json"
  },
  {
    title: 'Integrated IDE',
    description: 'Code and learn',
    src: "https://lottie.host/d9a716a9-4309-47fc-afb6-1363aed1344e/LvgsdnqA4T.json"
  },
  {
    title: 'Live Chat',
    description: 'Engage with peers',
    src: "https://lottie.host/1db86676-c045-413d-9c92-bcf81bf87b86/rM9NqoD6kL.json"
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center">
          <h2 className="text-4xl font-bold mb-12">Key Features</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="p-6 bg-white to-white  rounded-lg  shadow-lg text-center">
              <div className="w-28 h-28 mx-auto  mb-6">
                <Player
                  autoplay
                  loop
                  src={feature.src}
                  style={{ width: '150px', height: '150px' }} // Ensures animation scales properly
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
