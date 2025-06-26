import React from "react";

import { JoinCohortData } from "../../../data/academy-data/academy.data";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
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

const JoinCohort = () => {
  return (
    <>
      <div
        className="flex justify-between items-center mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <p className="text-[#010413] text-[40px] font-bold">
          Live UI/UX Classes
        </p>
        <span className="text-[#ff7f50] text-[24px] font-bold underline hover:text-[#1342ff] transition-colors duration-300 cursor-pointer">
          View all
        </span>
      </div>
      <div className="w-full bg-[#eef2fe] rounded-2xl overflow-hidden px-[5%] py-5 mb-15 ">
        <p className="text-[#000000] text-[40px] text-center font-bold my-3">
          Join our next cohort
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10">
          {JoinCohortData.map((data, index) => (
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              custom={index}
              key={data.id}
              className="flex flex-col justify-center items-center"
            >
              <div className="bg-[#fff] w-[147px] h-[126px] rounded-xl overflow-hidden">
                <img
                  src={data.image}
                  alt={data.text}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[#000000] text-[20px] font-bold mt-2 ">
                {data.text}
              </p>
            </motion.div>
          ))}
        </div>
        <div
          className="bg-[#010413] w-full h-[98px] flex justify-center items-center space-x-2 rounded-xl overflow-hidden my-5 "
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <span className="text-[#f7f7f7] text-[18px] font-medium px-5 py-2 bg-transparent rounded-md hover:bg-[#ff7f50] transition-colors duration-300 cursor-pointer ">
            Course details
          </span>
          <span className="text-[#f7f7f7] text-[18px] font-medium px-5 py-2 bg-transparent rounded-md hover:bg-[#ff7f50] transition-colors duration-300 cursor-pointer ">
            Requirements
          </span>
          <span className="text-[#f7f7f7] text-[18px] font-medium px-5 py-2 bg-transparent rounded-md hover:bg-[#ff7f50] transition-colors duration-300 cursor-pointer ">
            Curriculum
          </span>
          <span className="text-[#f7f7f7] text-[18px] font-medium px-5 py-2 bg-transparent rounded-md hover:bg-[#ff7f50] transition-colors duration-300 cursor-pointer ">
            Course benefits
          </span>
        </div>
        <div
          className="bg-[#fff] w-[60%] p-5 mx-auto flex flex-col justify-center items-center space-y-5 rounded-2xl overflow-hidden "
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <div className="flex items-center space-x-2">
            <span className="text-[#010413] text-[18px] font-medium ">
              Course fee
            </span>
            <p className="border border-[#eaecf0] text-[#000000] text-[8px] rounded-sm h-[26px] px-2 flex justify-center items-center ">
              NGN <ChevronDownIcon className="inline w-3 h-3 ml-1" />
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[#010413] text-[20px] font-bold ">
              NGN 300,000
            </span>
            <span className="text-[#ed405c] text-[20px] font-bold line-through">
              NGN 350,000
            </span>
          </div>
          <button className="bg-[#1342ff] w-[176px] text-[#fff] text-[20px] font-bold rounded-md px-6 py-2 overflow-hidden hover:bg-[#1b13ff] cursor-pointer transition-colors duration-300">
            Pay now
          </button>
        </div>
      </div>
    </>
  );
};

export default JoinCohort;
