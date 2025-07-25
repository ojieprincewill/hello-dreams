import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion } from "motion/react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: index * 0.2,
    },
  }),
};

const CohortCard = ({ info, price, oldPrice, currency, children }) => {
  const [activeTab, setActiveTab] = useState("course-fee");

  const tabs = [
    { id: "course-details", label: "Course details" },
    { id: "requirements", label: "Requirements" },
    { id: "curriculum", label: "Curriculum" },
    { id: "course-fee", label: "Course fee" },
  ];

  return (
    <div className="w-full bg-[#eef2fe] rounded-2xl overflow-hidden px-[5%] py-5 mb-15 ">
      <p className="text-[#000000] text-[20px] md:text-[24px] lg:text-[40px] text-center font-bold my-3">
        Join our next cohort
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 my-10 gap-y-10">
        {info.map((data, index) => (
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            custom={index}
            key={data.id}
            className="flex flex-col justify-center items-center"
          >
            <div className="bg-[#fff] w-[74.85px] h-[64.16px] md:w-[147px] md:h-[126px] rounded-xl overflow-hidden">
              <img
                src={data.image}
                alt={data.text}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-[#000000] text-[12px] md:text-[16px] lg:text-[20px] font-bold mt-2 ">
              {data.text}
            </p>
          </motion.div>
        ))}
      </div>
      {/* Tabs or children */}
      {children ? (
        <div className="mt-2">{children}</div>
      ) : (
        <div
          className="flex flex-row gap-2 overflow-x-auto whitespace-nowrap md:justify-center bg-[#010413] w-full h-[38px] md:h-[58px] lg:h-[98px] items-center rounded-xl overflow-hidden my-5 "
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {tabs.map((tab) => (
            <span
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer px-2 md:px-5 py-2 text-[10px] md:text-[14px] lg:text-[18px] font-medium rounded-md transition-colors duration-300
        ${
          activeTab === tab.id
            ? "bg-[#ff7f50] text-white"
            : "text-[#f7f7f7] hover:bg-[#ff7f50]"
        }`}
            >
              {tab.label}
            </span>
          ))}
        </div>
      )}

      {activeTab === "course-fee" && (
        <div
          className="bg-[#fff] w-[70%] md:w-[60%] p-5 mx-auto flex flex-col justify-center items-center space-y-5 rounded-2xl overflow-hidden "
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <div className="flex items-center space-x-2">
            <span className="text-[#010413] text-[8px] md:text-[14px] lg:text-[18px] font-medium ">
              Course fee
            </span>
            <p className="border border-[#eaecf0] text-[#000000] text-[6px] md:text-[8px] rounded-sm h-[16px] md:h-[26px] px-1 md:px-2 flex justify-center items-center ">
              {currency}{" "}
              <ChevronDownIcon className="inline w-2 h-2 md:w-3 md:h-3 ml-1 " />
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[#010413] text-[9px] md:text-[16px] lg:text-[20px] font-bold ">
              {currency} {price.toLocaleString()}
            </span>
            <span className="text-[#ed405c] text-[9px] md:text-[16px] lg:text-[20px] font-bold line-through">
              {currency} {oldPrice.toLocaleString()}
            </span>
          </div>
          <button className="bg-[#1342ff] w-[100px] md:w-[176px] text-[#fff] text-[9px] md:text-[16px] lg:text-[20px] font-bold rounded-md px-6 py-2 overflow-hidden hover:bg-[#1b13ff] cursor-pointer transition-colors duration-300">
            Pay now
          </button>
        </div>
      )}

      {activeTab !== "course-fee" && (
        <div className="w-full text-center mt-5 text-[#010413] text-[14px] md:text-[16px] lg:text-[18px]">
          Placeholder content for {activeTab.replace("-", " ")}
        </div>
      )}
    </div>
  );
};

export default CohortCard;
