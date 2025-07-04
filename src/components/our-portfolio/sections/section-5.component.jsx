import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const Section5 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-6"
    >
      <div className="relative bg-[#ffadd9] p-5 w-full h-[451px] md:h-[400.29px] lg:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[13.46px] md:text-[11.74px] lg:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          SISENOW
        </p>
        <p
          className="text-[17.95px] md:text-[15px] lg:text-[32px] text-[#f7f7f7] mb-3"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Branding &<br />
          Graphics
        </p>
        <p
          className="text-[12px] md:text-[10px] lg:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Graphics & Branding
        </p>
        <button className="bg-gradient-to-b from-[#f7f7f7] to-[#f0b9d6] min-w-[89.74px] md:min-w-[78.26px] lg:min-w-[160px] text-[#041856] text-[13.46px] md:text-[11.74px] lg:text-[16px] px-6 py-3 lg:py-4 font-bold text-center rounded-4xl cursor-pointer">
          View Details
        </button>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-[-50px] right-[-190px] lg:bottom-[-110px] lg:right-[-350px] w-[445px] h-[550px] md:h-[465px] lg:w-[891px] lg:h-[931px]"
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750281917/Portfolio%20page/b235a63b6c6f2e8da148e1f5c0fa374c065aff19_xwhxwf.png"
            alt="branded shirt"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
      <div className="relative bg-[#7f7def] p-5 w-full h-[451px] md:h-[400.29px] lg:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[13.46px] md:text-[11.74px] lg:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          WOW LIFESTYLE
        </p>
        <p
          className="text-[17.95px] md:text-[15px] lg:text-[32px] text-[#f7f7f7] mb-3"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Branding &<br />
          Graphics
        </p>
        <p
          className="text-[12px] md:text-[10px] lg:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Graphics & Branding
        </p>
        <button className="bg-gradient-to-b from-[#f7f7f7] to-[#aaa9fcc9] min-w-[89.74px] md:min-w-[78.26px] lg:min-w-[160px] text-[#041856] text-[13.46px] md:text-[11.74px] lg:text-[16px] px-6 py-3 lg:py-4 font-bold text-center rounded-4xl cursor-pointer ">
          View Details
        </button>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-[-50px] right-[-190px] lg:bottom-[-110px] lg:right-[-350px] w-[445px] h-[550px] md:h-[465px] lg:w-[891px] lg:h-[931px]"
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750281917/Portfolio%20page/b235a63b6c6f2e8da148e1f5c0fa374c065aff19_xwhxwf.png"
            alt="branded shirt"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Section5;
