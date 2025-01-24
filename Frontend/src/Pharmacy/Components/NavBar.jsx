import React from "react";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Logo from "../../assets/images/logo2.jpg";
import { RiArrowDropDownLine } from "react-icons/ri";

const NavBar = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md w-[100vw] sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <img alt="Logo" className="h-10" height={150} src={Logo} width={50} />
        </div>
        {/* Navigation Bar */}
        <nav className="flex-grow flex justify-center space-x-6">
          <a className="text-gray-700 hover:text-teal-600" href="/">
            Home
          </a>
          <a className="text-gray-700 hover:text-teal-600" href="/about">
            About
          </a>
          <div className="relative">
            <div
              className="flex items-center cursor-pointer text-gray-700 hover:text-teal-600"
              onClick={toggleDropdown}
            >
              <a>Services</a>
              <RiArrowDropDownLine className="ml-1" />
            </div>

            {isOpen && (
              <div className="absolute mt-2 bg-white border rounded shadow-lg w-48 z-10">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-teal-100">
                    <a href="/appointment">Appointment</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-teal-100">
                    <a href="/pharmacy">Pharmacy</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-teal-100">
                    <a href="/chatbot">Chatbot</a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <a className="text-gray-700 hover:text-teal-600" href="/contact">
            Contact
          </a>
          <a className="text-gray-700 hover:text-teal-600" href="/pharmacy">
            Pharmacy
          </a>
        </nav>
        {/* Login/Register Section */}
        <div className="flex items-center space-x-4">
          <a className="text-gray-700 hover:text-teal-600" href="/login">
            Login
          </a>
          <a className="text-gray-700 hover:text-teal-600" href="/registration">
            SignUp
          </a>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
