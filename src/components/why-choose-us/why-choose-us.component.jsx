import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { ChooseData } from "../../data/choose-us-data/choose-us.data";

const WhyChooseUs = () => {
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

  return (
    <div className="w-full px-[5%] py-10 lg:py-20">
      {/* Header Animation */}
      <h1 className="text-center text-[#1b212c34] text-[24px] md:text-[48px] lg:text-[96px] font-bold pb-10 md:pb-20 flex items-center justify-center gap-2">
        Why Choose Us
        <span className="ml-1">
          <img
            src="https://i.ibb.co/dhxXhPY/arrow-block-down.png"
            alt="arrow-block"
            className="w-[36.67px] h-[36.67px] md:w-[64px] md:h-[64px] lg:w-[128px] lg:h-[128px] object-cover"
          />
        </span>
      </h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {ChooseData.map((data, index) => (
          <motion.div
            key={data.id}
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            custom={index} // Pass index for staggered delay
            className={`p-3 border border-[#ccc] rounded-2xl ${
              index === ChooseData.length - 1
                ? "md:col-span-2 lg:col-span-1"
                : ""
            }`}
          >
            <div className="bg-[#f6f6f8] flex justify-center items-center p-3 rounded-xl">
              <img
                src={data.image}
                alt={data.title}
                className="w-[162.38px] h-[162.38px] md:w-[192px] md:h-[192px]"
              />
            </div>
            <p className="text-[#101010] text-[20px] md:text-[22px] font-bold my-3">
              {data.title}
            </p>
            <p className="text-[#667085] text-[14px] md:text-[16px] leading-[1.5] mb-3">
              {data.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
