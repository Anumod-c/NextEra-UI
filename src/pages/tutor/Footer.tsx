import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,  } from 'react-icons/fa';

function Footer() {
  return (
    <footer className=" mt-8 bg-gradient-to-b from-blue-500 to-purple-600 text-white py-8">
      <div className="container mx-auto px-6">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Brand and Description */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">Nextera</h2>
            <p className="text-sm">
              Empowering you with innovative learning solutions for a brighter future.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a href="#" className="text-white hover:text-gray-200">
              <FaFacebookF className="text-xl" />
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              <FaTwitter className="text-xl" />
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              <FaInstagram className="text-xl" />
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              <FaLinkedinIn className="text-xl" />
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
            <a href="#" className="text-white hover:text-gray-200">About Us</a>
            <a href="#" className="text-white hover:text-gray-200">Contact</a>
            <a href="#" className="text-white hover:text-gray-200">Privacy Policy</a>
            <a href="#" className="text-white hover:text-gray-200">Terms of Service</a>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
          <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
          <form className="flex justify-center items-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-l-lg border-none outline-none"
              required
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black px-4 py-2 rounded-r-lg font-semibold hover:bg-yellow-300"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white pt-4 mt-6 text-center">
          <p className="text-sm">&copy; 2024 Nextera. All Rights Reserved.</p>
          <p className="text-sm mt-2">1234 Learning Lane, Knowledge City, Eduland</p>
          <p className="text-sm">Email: support@nextera.com | Phone: (123) 456-7890</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
