import React from "react";

import {
  ArrowTopRightOnSquareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import { PreviewData1 } from "../../../data/academy-data/academy.data";
import { PlayIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: index * 0.2, // Stagger effect per card
    },
  }),
};

const Preview1 = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div
        className="flex justify-between items-center mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <p className="text-[#010413] text-[20px] md:text-[24px] lg:text-[40px] font-bold">
          Explore UI/UX Design Classes
        </p>
        <span className="hidden md:inline text-[#ff7f50] text-[14px] lg:text-[24px] font-bold underline hover:text-[#1342ff] transition-colors duration-300 cursor-pointer">
          View all
        </span>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-15">
        {PreviewData1.map((data, index) => (
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            custom={index}
            key={data.id}
            className={`md:relative w-full h-max md:h-[450px] lg:h-[464.63px] p-4 border border-[#dfdfe2] rounded-2xl ${
              index === PreviewData1.length - 1
                ? "md:col-span-2 lg:col-span-1"
                : ""
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <div className="w-[28px] h-[28px]">
                <img
                  src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750850446/Academy/landing/11975bf71a2e836bc599fd4d86e13ab8427af5d3_ke040h.png"
                  alt="figma icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="bg-[#efece9] w-[79.45px] h-[20px] rounded-sm flex justify-center items-center ">
                <span
                  className="text-[#667085] text-[12px] "
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Not started
                </span>
              </div>
              <BookmarkIcon className="w-[16px] h-[20.57px] text-[#41414150] " />
            </div>

            <div className="w-full h-[221px] bg-[#efece9] rounded-xl mb-4">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-row justify-between text-[#010413] pb-2">
              <p className="text-[#010413] text-[20px] md:text-[24px] leading-[1.3] font-semibold">
                {data.title}
              </p>
              <Link
                to={`/academy/coursepreview/${data.id}`}
                onClick={handleOrigins}
              >
                <ArrowTopRightOnSquareIcon className="w-[23px] h-[23px] md:w-[28px] md:h-[28px] cursor-pointer" />
              </Link>
            </div>

            <div
              className="md:absolute md:bottom-4 md:left-4 md:right-4 flex justify-between items-center mt-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <p className="text-[10px] w-max text-[#667085] flex items-center ">
                <PlayIcon className="w-[13.13px] h-[13.13px] md:w-4 md:h-4 text-[#dfdfe2]" />{" "}
                {data.totalCourses}
              </p>
              <div className="bg-[#efece9] border border-[#efece9] text-[#fff] w-[177px] h-[6px] rounded-2xl"></div>
              <div className="border border-[#dfdfe2] w-[44.27px] h-[22px] flex justify-center items-center rounded-md">
                <p className="text-[12px] w-max text-[#667085]">
                  {data.totalTime}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="md:hidden flex justify-end">
          <span className=" text-[#ff7f50] text-[14px] font-bold underline hover:text-[#1342ff] transition-colors duration-300 cursor-pointer">
            View all
          </span>
        </div>
      </div>
    </>
  );
};

export default Preview1;
