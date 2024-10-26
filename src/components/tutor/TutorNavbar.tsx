import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const TutorNavbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="shadow-lg bg-gradient-to-b  from-blue-200 to-purple-200 text-black">
      <div className="  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold">
              Nextera
            </a>
          </div>

          {/* Search Bar */}
          {/* <div className=" md:flex flex-grow mx-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 rounded-md shadow-lg text-black"
            />
          </div> */}

          {/* Desktop Menu */}
          <div className="hidden justify-center items-center p-4 m-4 md:flex space-x-4">
            {/* <a href="#" className="hover:text-gray-400">
              My Course
            </a>
            <a href="#" className="hover:text-gray-400">
              Discussion
            </a> */}
            {/* <button className=" px-3 py-2 rounded-md flex items-center">
              <img className="w-12 h-12 rounded-full" src={ProfilePicture||profileImage} alt="" />
            </button> */}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" className="block text-center py-2 hover:bg-gray-700">
            My Course
          </a>
          <a href="#" className="block text-center py-2 hover:bg-gray-700">
            Discussion
          </a>
          <a href="#" className="block text-center py-2 hover:bg-gray-700">
            Profile
          </a>
        </div>
      )}
    </nav>
  );
};

export default TutorNavbar;
