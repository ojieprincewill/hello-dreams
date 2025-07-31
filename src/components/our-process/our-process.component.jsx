import React from "react";
import { ProcessData } from "../../data/our-process-data/our-process.data";
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
      delay: index * 0.2,
    },
  }),
};
const OurProcess = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full px-[5%] xl:px-[10%] py-10">
      <p className="text-[24px] xl:text-[48px] text-[#101828] text-center font-bold mb-2">
        Our Process
      </p>
      <p
        className="text-[12px] xl:text-[17.44px] text-[#667085] text-center font-bold capitalize"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        User experience design services
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-5 md:mt-10 xl:mt-20">
        {ProcessData.map((data, index) => (
          <motion.div
            key={data.id}
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            custom={index}
            className={`bg-[#fafafa] h-[386px] flex flex-col justify-center p-2 xl:p-5 items-center shadow-lg shadow-[#d2d2f5b0] rounded-xl ${
              index === ProcessData.length - 1 && ProcessData.length % 2 !== 0
                ? "md:col-span-2 xl:col-span-1"
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
            <p className="text-[15px] md:text-[16px] text-[#000000] text-center leading-[1.5] ">
              {data.text}
            </p>
          </motion.div>
        ))}
      </div>
      <Link
        to="/services/ui-design-consultation"
        className="flex justify-center items-center mt-15"
        onClick={handleOrigins}
      >
        <button className="bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] text-[10.91px] xl:text-[16px] px-6 py-3 xl:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
          Get a Free Consultation
        </button>
      </Link>
    </div>
  );
};

export default OurProcess;
