import React from "react";
import { Link } from "react-router-dom"; // if you're using React Router
import youtube from "../img/logo.jpg";

export default function Header() {
  return (
    <div className="bg-blue-600">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto p-4">
        
        {/* Logo Section */}
        <div>
          <img src={youtube} alt="Logo" className="h-10" />
        </div>
        
        {/* Navigation Links */}
        <ul className="flex flex-col md:flex-row gap-2 md:gap-4 mt-2 md:mt-0">
          {/* Home Link */}
          <li>
            <Link to="/" className="text-white hover:text-gray-400">
              Home
            </Link>
          </li>
          
          {/* About Link */}
          <li>
            <Link to="/about" className="text-white hover:text-gray-400">
              About
            </Link>
          </li>
          
          {/* Services Link */}
          <li>
            <Link to="/services" className="text-white hover:text-gray-400">
              Services
            </Link>
          </li>
          
          {/* Contact Link */}
          <li>
            <Link to="/contact" className="text-white hover:text-gray-400">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

