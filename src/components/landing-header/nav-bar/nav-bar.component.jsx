import React from "react";

import Logo from "../../logo/logo.component";

import { Link } from "react-router-dom";

import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/24/solid";

const NavBar = () => {
  return (
    <nav className="bg-white relative w-[90%] mx-auto rounded-2xl px-[3%] py-3 md:fixed md:top-0 md:left-0 md:w-full md:rounded-none md:mt-0 md:px-[7%] md:py-8 flex justify-between items-center z-50">
      {/* Logo Section */}
      <div className="flex-shrink-0 cursor-pointer">
        <Logo />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-10">
        <Link
          className="text-[#010413] font-bold text-[18px] hover:text-[#1342ff] transition-colors duration-300 flex items-center space-x-1"
          to="/services"
        >
          <span>Services</span>
          <ChevronDownIcon className="h-4 w-4 text-[#010413] hover:text-[#1342ff] transition-colors duration-300 stroke-[3]" />
        </Link>
        <Link
          className="text-[#010413] font-bold text-[18px] hover:text-[#1342ff] transition-colors duration-300"
          to="/portfolio"
        >
          Portfolio
        </Link>
        <Link
          className="text-[#010413] font-bold text-[18px] hover:text-[#1342ff] transition-colors duration-300"
          to="/academy"
        >
          Acade<span className="text-[#1342ff]">m</span>y
        </Link>
        <Link
          className="text-[#010413] font-bold text-[18px] hover:text-[#1342ff] transition-colors duration-300"
          to="/about"
        >
          About Us
        </Link>
      </div>

      <div className="space-x-5">
        {/* First Button */}
        <button className="hidden md:inline bg-white text-[#010413] border border-[#010413] font-semibold text-[20px] px-4 py-2 rounded-lg transition-colors duration-300 hover:text-[#1342ff] hover:border-[#1342ff] cursor-pointer">
          Refer & Earn
        </button>

        {/* Second Button */}
        <button className="bg-[#010413] text-white border border-[#6941c6] font-semibold text-[12px] md:text-[20px] px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1342ff] hover:text-white cursor-pointer">
          Work with Us
        </button>
        <button className="h-8 w-8 text-[#010413] md:hidden cursor-pointer align-middle">
          <Bars3Icon />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
