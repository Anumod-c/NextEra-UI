import React from "react";
import { FaBars } from "react-icons/fa";

interface AdminNavbarProps {
  toggleSidebar: () => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="shadow-lg text-black flex justify-evenly items-center p-4 bg-white relative">
      {/* Sidebar Toggle Button for Mobile */}
      <button onClick={toggleSidebar} className="md:hidden">
        <FaBars size={24} />
      </button>

      {/* Logo */}
      <div className="flex-shrink-0">
        <a href="/" className="text-xl font-bold">
          Nextera
        </a>
      </div>

      {/* Navbar Toggle Button for Mobile */}

      {/* Search Bar */}

      {/* Desktop Menu */}
      <div className=" md:flex justify-center items-center  space-x-4">
        <a href="#" className="hover:text-gray-400">
          My Course
        </a>
        <a href="#" className="hover:text-gray-400">
          Discussion
        </a>
      </div>

      {/* Mobile Menu (Dropdown) */}
    </nav>
  );
};

export default AdminNavbar;
