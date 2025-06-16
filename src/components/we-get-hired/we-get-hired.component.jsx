import React from "react";
import { GetHiredData } from "../../data/our-process-data/our-process.data";
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

const WeGetHired = () => {
  return (
    <div className="w-full px-[5%] lg:px-[10%] py-10">
      <p className="text-[24px] lg:text-[48px] text-[#101828] text-center font-bold mb-2">
        We get hired to design
      </p>
      <p
        className="text-[12px] lg:text-[17.44px] text-[#667085] text-center lg:font-bold"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        The below
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 mt-10">
        {GetHiredData.map((data, index) => (
          <motion.div
            key={data.id}
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            custom={index}
            className="h-[380px] shadow-lg shadow-[#0000003c] rounded-xl overflow-hidden"
          >
            <div className="w-full h-[261px] bg-[#f7f7f8]">
              <img
                src={data.image}
                alt={data.text}
                className="w-full h-full object-center"
              />
            </div>
            <p
              className="text-[15.88px] pt-10 md:text-[21px] text-[#30364d] text-center capitalize font-bold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {data.text}
            </p>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="md:col-span-2 lg:col-span-1 h-[380px] shadow-lg shadow-[#0000003c] rounded-xl overflow-hidden"
        >
          <div className="w-full h-[261px] bg-[#f7f7f8] grid grid-cols-1 gap-1 p-2">
            <div className="bg-[#000000]/18 rounded-xl overflow-hidden">
              <img
                src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065866/UI%20page/cb55d20c2b1ec22f23ecf20d5f992a50b65c90fa_xzo0cp.png"
                alt="brand image 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="bg-[#000000]/18 rounded-xl overflow-hidden flex justify-center items-center">
                <img
                  src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065860/UI%20page/8209fa2379c593cb20cf205367e910a29969623a_x6he9n.png"
                  alt="brand image 2"
                  className="w-full h-full md:w-[40%] md:h-auto lg:w-full lg:h-full object-cover"
                />
              </div>
              <div className="bg-[#000000]/18 rounded-xl overflow-hidden flex justify-center items-center">
                <img
                  src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065867/UI%20page/ff635856f47537c2801f71756247c0b2ad520f67_erhg4o.png"
                  alt="brand image 3"
                  className="w-full h-full md:w-[40%] md:h-auto lg:w-full lg:h-full object-cover"
                />
              </div>
            </div>
          </div>
          <p
            className="text-[15.88px] pt-10 md:text-[21px] text-[#30364d] text-center capitalize font-bold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            branding
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WeGetHired;
