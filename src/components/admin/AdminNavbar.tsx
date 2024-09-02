import React from "react";
import { FaBars } from "react-icons/fa";

interface AdminNavbarProps {
  toggleSidebar: () => void;
}
const AdminNavbar: React.FC<AdminNavbarProps>= ({toggleSidebar}) => {

  return (
    <nav className="shadow-lg text-black flex justify-between items-center p-4 bg-white relative">
     
      {/* Logo */}
      <div className="flex-shrink-0">
        <a href="/" className="text-xl  p-4  ml-4 font-bold">
          Nextera
        </a>
      </div>
      {/* Hamburger Icon for Mobile View */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleSidebar} className="text-black">
          <FaBars size={24} />
        </button>
      </div>

      {/* Desktop Navigation Links */}
      {/* <div className="hidden md:flex md:space-x-6">
        <a href="#" className="hover:text-gray-400">
          Profile
        </a>
        <a href="#" className="hover:text-gray-400">
          Discussion
        </a>
      </div> */}

      {/* Mobile Menu (Dropdown) */}
      {/* Add mobile menu if needed here */}
    </nav>
  );
};

export default AdminNavbar;
