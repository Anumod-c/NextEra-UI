import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-16  pl-14 bg-blue-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 p-6">
          <h2 className="text-4xl font-bold mb-4">Why Nextera?</h2>
          <p className="text-lg mb-6">At Nextera, we're committed to providing the best e-learning experience. Whether you're a beginner or an expert, our platform is designed to help you grow and succeed in your learning journey.</p>
        </motion.div>
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
              src="https://lottie.host/03dfb004-9cb2-4f76-b5e2-dd2d1107b826/9aZjt8WoSb.json" style={{ height: "400px", width: "400px" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 mt-16 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Card 1: Best Tutors */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <Player
            autoplay
            loop
            src="https://lottie.host/023ddfcc-4d1b-4ec9-9187-f3f89445f1c8/1IJhzgfX2H.json

" style={{ height: "200px", width: "200px" }} 
          />
          <h3 className="text-xl font-bold mb-2">Best Tutors</h3>
          <p className="text-gray-600 mb-4">
            Our experienced tutors are dedicated to providing personalized guidance and support to help you succeed.
          </p>

        </motion.div>

        {/* Card 2: Comprehensive Courses */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-lg shadow-lg p-6"
        > <Player
            autoplay
            loop
            src="https://lottie.host/9a539936-d84b-4f3f-93b1-fdfed0c0ed9b/s60POyzqfF.json" style={{ height: "200px", width: "200px" }} 
          />
          <h3 className="text-xl font-bold mb-2">Comprehensive Courses</h3>
          <p className="text-gray-600 mb-4">
            Explore a wide range of courses designed to enhance your skills, from beginner to advanced levels.
          </p>

        </motion.div>

        {/* Card 3: Chat Support */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-lg shadow-lg p-6"
        > <Player
            autoplay
            loop
            src="https://lottie.host/ad7ae2db-2747-4d02-b3d6-5d2c62a53ecc/kDviWNztZu.json
" style={{ height: "200px", width: "200px" }} 
          />
          <h3 className="text-xl font-bold mb-2">Chat Support</h3>
          <p className="text-gray-600 mb-4">
            Get instant assistance through our dedicated chat support for a seamless learning experience.
          </p>

        </motion.div>

        {/* Card 4: Live Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-lg shadow-lg p-6"
        ><Player
            autoplay
            loop
            src="https://lottie.host/4b56b8a4-d29f-498a-9486-6c29e215f78b/UtfAg6QG0M.json" style={{ height: "200px", width: "200px" }} 
          />
          <h3 className="text-xl font-bold mb-2">Live Sessions</h3>
          <p className="text-gray-600 mb-4">
            Engage in real-time classes with our expert tutors, fostering interactive learning.
          </p>

        </motion.div>

        {/* Card 5: Community Focus */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-lg shadow-lg p-6"
        ><Player
            autoplay
            loop
            src="https://lottie.host/1db86676-c045-413d-9c92-bcf81bf87b86/rM9NqoD6kL.json" style={{ height: "200px", width: "200px" }}
          />
          <h3 className="text-xl font-bold mb-2">Community Focus</h3>
          <p className="text-gray-600 mb-4">
            We believe in fostering a collaborative learning community where students can connect and support one another.
          </p>

        </motion.div>
        {/* Card: Integrated IDE */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <Player
            autoplay
            loop
            src="https://lottie.host/d9a716a9-4309-47fc-afb6-1363aed1344e/LvgsdnqA4T.json" 
            style={{ height: "200px", width: "200px" }} 
          />
          <h3 className="text-xl font-bold mb-2">Integrated IDE</h3>
          <p className="text-gray-600 mb-4">
            Practice coding directly within the platform using our built-in IDE. Write, test, and debug your code in real-time while you learn.
          </p>
        </motion.div>

        {/* Card 7: Affordable Prices */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <Player
            autoplay
            loop
            src="https://lottie.host/873a20c3-69bd-42e4-8be1-a8a901bc4d4a/TjxN4zY6qb.json" 
            style={{ height: "200px", width: "200px" }} 
          />
          <h3 className="text-xl font-bold mb-2">Affordable Prices</h3>
          <p className="text-gray-600 mb-4">
            We offer top-quality courses at the most competitive prices, making premium education accessible to everyone.
          </p>
        </motion.div>


        {/* Card 6: Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-lg shadow-lg p-6"
        > <Player
            autoplay
            loop
            src="https://lottie.host/38b96969-a717-487f-8e25-a85b2e228336/9W8e7aJcnL.json" style={{ height: "200px", width: "200px" }} 
          />
          <h3 className="text-xl font-bold mb-2">Success Stories</h3>
          <p className="text-gray-600 mb-4">
            Join our community of learners who have transformed their lives through our courses.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
