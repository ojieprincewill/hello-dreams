import React, { useState } from "react";

import { Link } from "react-router-dom";
import { CourseOptions } from "../../../data/academy-courses-data/course-options.data";
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import {
  Home,
  BookOpen,
  LayoutDashboard,
  Tags,
  LogIn,
  CreditCard,
} from "lucide-react";
import Logo from "../../logo/logo.component";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";

const AcademySidebar = ({ closeSidebar }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropDownOpen(!dropDownOpen);
  };

  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={closeSidebar}
      className="fixed top-0 right-0 w-full h-full bg-black/50 z-80"
    >
      <motion.div
        key="content"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-[#fff] w-[90%] md:w-[350px] p-2 h-screen overflow-auto"
      >
        <div className="flex flex-row p-4 justify-between items-center w-full px-[2%] py-2">
          <div className="flex flex-col">
            <div className="flex-shrink-0 w-[37.32px] h-[20px]">
              <Logo />
            </div>
            <Link
              className="text-[#010413] font-bold text-[14px] md:text-[16px] lg:text-[20px] hover:text-[#1342ff] transition-colors duration-300"
              to="/academy"
              onClick={handleOrigins}
            >
              Acade<span className="text-[#1342ff]">m</span>y
            </Link>
          </div>
          <XMarkIcon
            onClick={closeSidebar}
            className="h-8 w-8 text-[#010413]"
          />
        </div>

        <div className="flex flex-col space-y-2 w-full">
          <Link
            className="flex flex-row items-center p-4 bg-transparent text-[#010413] text-[16px] hover:bg-[#010413] hover:text-[#fff] transition-colors duration-300"
            to="/"
            onClick={handleOrigins}
          >
            <Home size={16} strokeWidth={2} className="mr-2" /> Home
          </Link>
          <Link
            className="flex flex-row items-center p-4 bg-transparent text-[#010413] text-[16px] hover:bg-[#010413] hover:text-[#fff] transition-colors duration-300"
            to="/academy/classes"
            onClick={handleOrigins}
          >
            <LayoutDashboard size={16} strokeWidth={2} className="mr-2" /> UI/UX
            Classes
          </Link>
          <div
            className="bg-transparent pr-4 text-[#010413] text-[16px] hover:bg-[#010413] hover:text-[#fff] transition-colors duration-300 flex justify-between items-center"
            onClick={(event) => toggleDropdown(event)}
          >
            <p className="flex flex-row items-center p-4">
              <BookOpen size={16} strokeWidth={2} className="mr-2" /> Courses
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
                {CourseOptions.map((data) => (
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
            className="flex flex-row items-center p-4 bg-transparent text-[#010413] text-[16px] hover:bg-[#010413] hover:text-[#fff] transition-colors duration-300"
            to="/academy/pricing"
            onClick={handleOrigins}
          >
            <Tags size={16} strokeWidth={2} className="mr-2" /> Pricing
          </Link>

          {/* There should be a conditional.
          When user is signed in display membership button else display sign in button */}
          <Link
            to="/signin"
            className="flex flex-row items-center bg-[#010413] w-full text-[#fff] border border-[#010413] text-[16px] px-4 py-2 rounded-md transition-colors duration-300 hover:text-[#1342ff] hover:border-[#1342ff] cursor-pointer"
            onClick={handleOrigins}
          >
            <LogIn size={16} strokeWidth={2} className="mr-2" /> Sign in
          </Link>
          {/* <Link
            to="/membership"
            className="flex flex-row items-center bg-[#010413] w-full text-[#fff] border border-[#010413] text-[16px] px-4 py-2 rounded-md transition-colors duration-300 hover:text-[#1342ff] hover:border-[#1342ff] cursor-pointer"
            onClick={handleOrigins}
          >
            <CreditCard size={16} strokeWidth={2} className="mr-2" /> Manage
            membership
          </Link> */}
        </div>
      </motion.div>
    </div>
  );
};

export default AcademySidebar;
