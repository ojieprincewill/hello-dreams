import React, { useState } from "react";

import { Link } from "react-router-dom";

import Logo from "../../logo/logo.component";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

import { CourseOptions } from "../../../data/academy-courses-data/course-options.data";
import AcademySidebar from "./academy-sidebar.component";

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";

const AcademyNavbar = () => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const openSideBar = () => {
    setSideBarOpen(true);
  };

  const closeSideBar = () => {
    setSideBarOpen(false);
  };

  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {optionsOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-70"
          onClick={() => setOptionsOpen(false)}
        ></div>
      )}

      <nav
        className="bg-white w-[90%] mx-auto rounded-2xl px-[3%] py-3 md:fixed md:top-0 md:left-0 md:w-full md:h-[80px] lg:h-[100px] md:rounded-none md:mt-0 md:px-[5%] md:py-8 flex justify-between items-center z-60 md:drop-shadow-2xl md:drop-shadow-[#0c4af630] "
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Logo Section */}
        <Link
          to="/"
          onClick={handleOrigins}
          className="lg:hidden flex-shrink-0 w-[38.17px] h-[28.44px] md:w-[67px] md:h-[46.75px] lg:w-[78.68px] lg:h-[54.89px] cursor-pointer"
        >
          <Logo />
        </Link>

        {/* Navigation Links */}
        <div className=" hidden lg:flex space-x-6 items-center">
          <Link
            className="text-[#010413] font-bold text-[20px] hover:text-[#1342ff] transition-colors duration-300"
            to="/academy"
            onClick={handleOrigins}
          >
            Acade<span className="text-[#1342ff]">m</span>y
          </Link>
          <Link
            className="text-[#010413] font-medium text-[18px] hover:text-[#1342ff] transition-colors duration-300"
            to="/"
            onClick={handleOrigins}
          >
            Home
          </Link>
          <Link
            className="text-[#010413] font-medium text-[18px] hover:text-[#1342ff] transition-colors duration-300"
            to="/academy/classes"
            onClick={handleOrigins}
          >
            UI/UX Classes
          </Link>
          <div
            className="relative text-[#010413] font-medium text-[18px] hover:text-[#1342ff] transition-colors duration-300 flex items-center space-x-1 cursor-pointer"
            onClick={() => setOptionsOpen(true)}
          >
            Courses
            {optionsOpen ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </div>
          <div className="w-[312px] h-[44px]">
            <input
              type="text"
              className="w-full h-full border-[0.5px] border-[#101828] rounded-sm outline-none p-2"
            />
          </div>
          <div>
            <ShoppingCartIcon className="w-4 h-4 md:h-6 md:w-6 " />
          </div>
          <Link
            className="text-[#010413] font-medium text-[18px] hover:text-[#1342ff] transition-colors duration-300"
            to="/academy/pricing"
            onClick={handleOrigins}
          >
            Pricing
          </Link>
        </div>

        <div className="space-x-3">
          <Link
            to="/signin"
            className="hidden lg:inline bg-white text-[#010413] border border-[#010413] font-medium text-[18px] px-3 py-2 rounded-md transition-colors duration-300 hover:text-[#1342ff] cursor-pointer"
            onClick={handleOrigins}
          >
            Sign in
          </Link>

          <Link
            to="/signup"
            className="bg-[#1342ff] text-white border border-[#1342ff] font-medium text-[12px] md:text-[16px] lg:text-[18px] px-3 py-2 rounded-md hover:bg-[#1b13ff] hover:border-[#1b13ff] cursor-pointer transition-colors duration-300"
            onClick={handleOrigins}
          >
            Sign up $10/m
          </Link>
          <button
            onClick={openSideBar}
            className="h-8 w-8 text-[#010413] lg:hidden cursor-pointer align-middle"
          >
            <Bars3BottomLeftIcon />
          </button>
        </div>
      </nav>

      <div className="hidden md:block md:h-[80px] lg:h-[100px]"></div>

      <AnimatePresence>
        {optionsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-[80px] left-[235px]  z-80 "
          >
            <div className="bg-[#fff] p-5 w-[717px] h-[388px] grid grid-cols-2 gap-y-4 gap-x-12 rounded-xl">
              {CourseOptions.map((data) => (
                <Link
                  to={data.target}
                  key={data.id}
                  className="grid grid-cols-[10%_90%] gap-5 items-center hover:bg-[#ecf3f5] p-2 rounded-xl cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  onClick={handleOrigins}
                >
                  <div className="w-[37px] h-[37px] ">
                    <img
                      src={data.icon}
                      alt={`svg icon ${data.id}`}
                      className="text-[#1d68f4] w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="relative flex flex-row justify-between items-center">
                      <p className=" text-[#353535] max-w-[200px] text-[18px] font-bold mb-1">
                        {data.title}
                      </p>
                      <div className=" absolute right-[15px] w-[17.87px] h-[13.8px]">
                        <img
                          src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330686/Button_SVG_mmlmot.png"
                          alt="blue arrow"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <p className="text-[#353535] max-w-[200px] text-[14px] font-medium">
                      {data.text}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {sideBarOpen ? <AcademySidebar closeSidebar={closeSideBar} /> : null}
      </AnimatePresence>
    </>
  );
};

export default AcademyNavbar;
