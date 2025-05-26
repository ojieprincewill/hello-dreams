import React, { useState } from "react";

import Logo from "../../logo/logo.component";

import { Link } from "react-router-dom";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  Bars3BottomLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { ServicesData } from "../../../data/services-data/services.data";
import SidebarNav from "./sidebar-nav.component";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";

const NavBar = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
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
      {servicesOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-70"
          onClick={() => setServicesOpen(false)}
        ></div>
      )}
      <nav className="bg-white w-[90%] mx-auto rounded-2xl px-[3%] py-3 md:fixed md:top-0 md:left-0 md:w-full md:h-[120px] md:rounded-none md:mt-0 md:px-[7%] md:py-8 flex justify-between items-center z-60 md:drop-shadow-2xl md:drop-shadow-[#0c4af630]">
        {/* Logo Section */}
        <Link
          to="/"
          onClick={handleOrigins}
          className="flex-shrink-0 w-[38.17px] h-[28.44px] md:w-[67px] md:h-[46.75px] lg:w-[78.68px] lg:h-[54.89px] cursor-pointer"
        >
          <Logo />
        </Link>

        {/* Navigation Links */}
        <div className=" hidden md:flex space-x-10">
          <div
            className="relative text-[#010413] font-bold text-[18px] hover:text-[#1342ff] transition-colors duration-300 flex items-center space-x-1 cursor-pointer"
            onClick={() => setServicesOpen(true)}
          >
            Services
            {servicesOpen ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </div>

          <Link
            className="text-[#010413] font-bold text-[18px] hover:text-[#1342ff] transition-colors duration-300"
            to="/portfolio"
            onClick={handleOrigins}
          >
            Portfolio
          </Link>
          <Link
            className="text-[#010413] font-bold text-[18px] hover:text-[#1342ff] transition-colors duration-300"
            to="/academy"
            onClick={handleOrigins}
          >
            Acade<span className="text-[#1342ff]">m</span>y
          </Link>
          <Link
            className="text-[#010413] font-bold text-[18px] hover:text-[#1342ff] transition-colors duration-300"
            to="/about"
            onClick={handleOrigins}
          >
            About Us
          </Link>
        </div>

        <div className="space-x-5">
          <Link
            to="/refer-and-earn"
            className="hidden md:inline bg-white text-[#010413] border border-[#010413] font-semibold text-[20px] px-4 py-2 rounded-lg transition-colors duration-300 hover:text-[#1342ff] cursor-pointer"
            onClick={handleOrigins}
          >
            Refer & Earn
          </Link>

          <Link
            to="/workwithus"
            className="bg-[#010413] text-white border border-[#6941c6] font-semibold text-[12px] md:text-[20px] px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1342ff] hover:border-[#1342ff] hover:text-white cursor-pointer"
            onClick={handleOrigins}
          >
            Work with Us
          </Link>
          <button
            onClick={openSideBar}
            className="h-8 w-8 text-[#010413] md:hidden cursor-pointer align-middle"
          >
            <Bars3BottomLeftIcon />
          </button>
        </div>
      </nav>
      <div className="hidden md:block md:h-[120px]"></div>
      <AnimatePresence>
        {servicesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-[100px] left-[235px] bg-[#fff] p-5 w-[662px] h-[457px] grid grid-cols-2 gap-y-4 gap-x-14 z-80 rounded-xl"
          >
            {ServicesData.map((data) => (
              <Link
                to={data.target}
                key={data.id}
                className="grid grid-cols-[10%_90%] gap-1 items-center hover:bg-[#ecf3f5] p-2 rounded-xl cursor-pointer"
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
                  <div className="flex flex-row justify-between items-center">
                    <p className=" text-[#353535] max-w-[200px] text-[18px] font-bold mb-1">
                      {data.title}
                    </p>
                    <span>
                      <img
                        src="https://i.ibb.co/B2tvMj9t/Button-SVG.png"
                        alt="blue arrow"
                        className="w-[17.87px] h-[13.8px] object-cover"
                      />
                    </span>
                  </div>
                  <p className="text-[#353535] max-w-[200px] text-[14px] font-bold">
                    {data.text}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {sideBarOpen ? <SidebarNav closeSidebar={closeSideBar} /> : null}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
