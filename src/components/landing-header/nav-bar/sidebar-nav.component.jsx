import React from "react";
import { Link } from "react-router-dom";

import { XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "../../logo/logo.component";

const SidebarNav = () => {
  return (
    <div>
      <div>
        <Logo />
        <XMarkIcon className="h-8 w-8 text-[#010413]" />
      </div>
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
      <button className="bg-white text-[#010413] border border-[#010413] font-semibold text-[20px] px-4 py-2 rounded-md transition-colors duration-300 hover:text-[#1342ff] hover:border-[#1342ff] cursor-pointer">
        Refer & Earn
      </button>
    </div>
  );
};

export default SidebarNav;
