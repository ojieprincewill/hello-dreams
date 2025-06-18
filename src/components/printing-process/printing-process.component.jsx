import React from "react";
import { PrintingProcessData } from "../../data/our-process-data/our-process.data";
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
      delay: index * 0.2,
    },
  }),
};

const PrintingProcess = () => {
  return (
    <div className="w-full px-[5%] py-15">
      <p className="text-[24px] lg:text-[48px] text-[#101828] text-center font-bold mb-2">
        Our Printing Process
      </p>
      <p
        className="text-[12px] lg:text-[17.44px] text-[#667085] text-center font-bold capitalize"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        CV Writing & LinkedIn Optimisation
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 mt-10 md:mt-20">
        {PrintingProcessData.map((data, index) => (
          <motion.div
            key={data.id}
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            custom={index}
            className={`bg-[#fafafa] h-[386px] flex flex-col justify-center p-2 lg:p-5 items-center shadow-lg shadow-[#d2d2f5b0] rounded-xl ${
              index === PrintingProcessData.length - 1 &&
              PrintingProcessData.length % 2 !== 0
                ? "md:col-span-2 lg:col-span-1"
                : ""
            }`}
          >
            <div className="w-[54.64px] md:w-[60px] h-[54.64px] md:h-[60px] bg-[#1342ff] rounded-lg">
              <img
                src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750066141/UI%20page/OUR_PROCESS_ICON_frlbpu.png"
                alt="svg icon"
                className="w-full h-full object-contain"
              />
            </div>
            <p
              className="text-[19px] md:text-[20px] text-[#30364d] text-center my-4 "
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {data.title}
            </p>
            <p className="text-[15px] md:text-[16px] text-[#000000] text-center leading-[1.7] ">
              {data.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PrintingProcess;
