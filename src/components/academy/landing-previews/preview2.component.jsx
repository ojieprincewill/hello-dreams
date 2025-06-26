import React from "react";

import {
  ArrowTopRightOnSquareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import { AcademyData } from "../../../data/academy-data/academy.data";
import { PlayIcon } from "@heroicons/react/24/solid";
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

const Preview2 = () => {
  return (
    <>
      <div
        className="flex justify-between items-center mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <p className="text-[#010413] text-[20px] md:text-[24px] lg:text-[40px] font-bold">
          Explore Tech Courses
        </p>
        <span className="hidden md:inline text-[#ff7f50] text-[14px] lg:text-[24px] font-bold underline hover:text-[#1342ff] transition-colors duration-300 cursor-pointer">
          View all
        </span>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-15">
        {AcademyData.map((data, index) => (
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            custom={index}
            key={data.id}
            className={`w-full h-max md:h-[500px] lg:h-[464.63px] p-4 border border-[#dfdfe2] rounded-2xl ${
              index === AcademyData.length - 1
                ? "md:col-span-2 lg:col-span-1"
                : ""
            }`}
          >
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-[181.55px] md:h-[221.16px] object-cover object-center rounded-xl mb-4"
            />
            <div className="flex flex-row justify-between text-[#010413] pb-2">
              <p className="text-[#010413] text-[20px] md:text-[24px] leading-[1.3] font-semibold">
                {data.title}
              </p>
              <div>
                <ArrowTopRightOnSquareIcon className="w-[23px] h-[23px] md:w-[28px] md:h-[28px]" />
              </div>
            </div>
            <p className="text-[16px] md:text-[23px] text-[#667085] font-bold pb-4 ">
              {data.name}
            </p>
            <p className="text-[14px] w-max md:text-[16px] text-[#787777] font-bold mb-2 pb-2 border-b-4 border-b-[#efece9] flex items-center ">
              <span className="mr-1">
                <PlayIcon className="w-[13.13px] h-[13.13px] md:w-4 md:h-4 text-[#010413]" />
              </span>{" "}
              {data.totalCourses} Courses . {data.totalTime}
            </p>
            <p className="text-[24px] md:text-[27.88px] text-[#010413] font-bold pt-2 ">
              NGN {data.price}
            </p>
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

export default Preview2;
