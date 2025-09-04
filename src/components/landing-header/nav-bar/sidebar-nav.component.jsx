import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import Logo from "../../logo/logo.component";
import { ServicesData } from "../../../data/services-data/services.data";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
const SidebarNav = ({ closeSidebar }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropDownOpen(!dropDownOpen);
  };

  const handleOrigins = () => {};

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
            onClick={(event) => toggleDropdown(event)}
          >
            <p className="flex flex-row p-4">
              <img
                src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330737/icons8_services_dfex20.png"
                alt="service icon"
                className="h-5 w-5 mr-2 object-contain"
              />
              Services
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
            to="/academy"
            onClick={handleOrigins}
          >
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330740/material-symbols-light_mouse-1_jv3xtk.png"
              alt="academy icon"
              className="h-5 w-5 mr-2 object-contain"
            />
            Academy
          </Link>
          <Link
            className="flex flex-row p-4 bg-transparent text-[#010413] text-[16px] hover:bg-[#010413] hover:text-[#fff] transition-colors duration-300"
            to="/portfolio"
            onClick={handleOrigins}
          >
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330724/dashicons_portfolio_xxoxid.png"
              alt="portfolio icon"
              className="h-5 w-5 mr-2 object-contain"
            />
            Our Portfolio
          </Link>

          <Link
            className="flex flex-row p-4 bg-transparent text-[#010413] text-[16px] hover:bg-[#010413] hover:text-[#fff] transition-colors duration-300"
            to="/about"
            onClick={handleOrigins}
          >
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330733/gridicons_multiple-users_keqkx5.png"
              alt="about icon"
              className="h-5 w-5 mr-2 object-contain"
            />
            About Us
          </Link>
          <Link
            to="/refer-and-earn"
            className="flex flex-row bg-[#010413] w-full text-[#fff] border border-[#010413] text-[16px] px-4 py-2 rounded-md transition-colors duration-300 hover:text-[#1342ff] hover:border-[#1342ff] cursor-pointer"
            onClick={handleOrigins}
          >
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330726/exchange_541340_1_jsqiaj.png"
              alt="exchange icon"
              className="h-5 w-5 mr-2 object-contain"
            />
            Refer & Earn
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SidebarNav;
