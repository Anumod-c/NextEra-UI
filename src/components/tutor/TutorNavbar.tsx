import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { clearTutorDetails } from "../../redux/tutorSlice";

const TutorNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("tutorToken");
    Cookies.remove("tutorRefreshToken");
    Cookies.remove("tutorId");

    dispatch(clearTutorDetails()); 
    navigate("/tutor");
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false); 
  };

  return (
    <nav className="shadow-lg bg-gradient-to-b from-blue-200 to-purple-200 text-black">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => handleNavigation("/")}>
              <span className="text-xl font-bold">Nextera</span>
            </button>
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
          <button
            onClick={() => handleNavigation("/tutor/dashboard")}
            className="block text-center py-2 hover:bg-gray-700"
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNavigation("/tutor/courselist")}
            className="block text-center py-2 hover:bg-gray-700"
          >
            My Course
          </button>
          <button
            onClick={() => handleNavigation("/tutor/payouts")}
            className="block text-center py-2 hover:bg-gray-700"
          >
            Payouts
          </button>
          <button
            onClick={() => handleNavigation("/tutor/profile")}
            className="block text-center py-2 hover:bg-gray-700"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="block text-center py-2 hover:bg-gray-700"
          >
            Signout
          </button>
        </div>
      )}
    </nav>
  );
};

export default TutorNavbar;
