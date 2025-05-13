import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowRightIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  FolderIcon,
  ArrowPathIcon,
  CursorArrowRaysIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import Logo from "../../logo/logo.component";
import { ServicesData } from "../../../data/services-data/services.data";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
const SidebarNav = ({ closeSidebar }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="fixed top-0 right-0 w-full h-full bg-black/50 z-80">
      <motion.div
        key="content"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-[#fff] w-[90%] p-2 h-screen overflow-auto"
      >
        <div className="flex flex-row p-4 justify-between items-center w-full px-[2%] py-2">
          <Link
            to="/"
            onClick={handleOrigins}
            className="flex-shrink-0 w-[57.32px] h-[40px] cursor-pointer"
          >
            <Logo />
          </Link>
          <XMarkIcon
            onClick={closeSidebar}
            className="h-8 w-8 text-[#010413]"
          />
        </div>

        <div className="flex flex-col space-y-2 w-full">
          <div
            className="bg-transparent pr-4 text-[#010413] text-[16px] hover:bg-[#010413] hover:text-[#fff] transition-colors duration-300 flex justify-between items-center"
            to="/services"
            onClick={toggleDropdown}
          >
            <p className="flex flex-row p-4">
              <Cog6ToothIcon className="h-5 w-5 mr-2" /> Services
            </p>
            {dropDownOpen ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </div>
          <AnimatePresence>
            {dropDownOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col space-y-2 bg-[#1342ff] p-2 w-[90%] mx-auto rounded-md"
              >
                {ServicesData.map((data) => (
                  <Link
                    to={data.target}
                    key={data.id}
                    className="grid grid-cols-[10%_90%] gap-1 items-center hover:bg-[#ecf3f5] p-1 rounded-xl cursor-pointer"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                    onClick={handleOrigins}
                  >
                    <div className="w-[16px] h-[16px] ">
                      <img
                        src={data.icon}
                        alt={`svg icon ${data.id}`}
                        className="text-[#fff] w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="flex flex-row justify-between items-center text-[#fff] text-[12px] font-bold">
                        {data.title}
                        <ArrowRightIcon className="text-[#fff] font-bold w-[15px] h-auto" />
                      </p>
                      <p className="text-[#d3c8c8] text-[10px]">{data.text}</p>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <Link
            className="flex flex-row p-4 bg-transparent text-[#010413] text-[16px] hover:bg-[#010413] hover:text-[#fff] transition-colors duration-300"
            to="/portfolio"
            onClick={handleOrigins}
          >
            <CursorArrowRaysIcon className="h-5 w-5 mr-2" />
            Our Work
          </Link>
          <Link
            className="flex flex-row p-4 bg-transparent text-[#010413] text-[16px] hover:bg-[#010413] hover:text-[#fff] transition-colors duration-300"
            to="/academy"
            onClick={handleOrigins}
          >
            <AcademicCapIcon className="h-5 w-5 mr-2" />
            Academy
          </Link>
          <Link
            className="flex flex-row p-4 bg-transparent text-[#010413] text-[16px] hover:bg-[#010413] hover:text-[#fff] transition-colors duration-300"
            to="/portfolio"
            onClick={handleOrigins}
          >
            <FolderIcon className="h-5 w-5 mr-2" />
            Our Portfolio
          </Link>

          <Link
            className="flex flex-row p-4 bg-transparent text-[#010413] text-[16px] hover:bg-[#010413] hover:text-[#fff] transition-colors duration-300"
            to="/about"
            onClick={handleOrigins}
          >
            <UserGroupIcon className="h-5 w-5 mr-2" />
            About Us
          </Link>
          <button
            className="flex flex-row bg-[#010413] w-full text-[#fff] border border-[#010413] text-[16px] px-4 py-2 rounded-md transition-colors duration-300 hover:text-[#1342ff] hover:border-[#1342ff] cursor-pointer"
            onClick={handleOrigins}
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Refer & Earn
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SidebarNav;
