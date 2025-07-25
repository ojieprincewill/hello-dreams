import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const Section1 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      // viewport={{ once: true }}
      className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-6"
    >
      <div className="relative bg-[#010413] p-5 w-full h-[451px] md:h-[400.29px] lg:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[13.46px] md:text-[11.74px] lg:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          CIBN Portal
        </p>
        <p className="text-[17.95px] md:text-[15px] lg:text-[32px] text-[#f7f7f7] w-[201px] lg:w-[401px] mb-3">
          Chartered Institute of bankers of Nigeria
        </p>
        <p
          className="text-[12px] md:text-[10px] lg:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          UI/UX Design
        </p>
        <a href="http://new.cibng.org" target="_blank">
          <button className="bg-gradient-to-b from-[#f7f7f7] to-[#ffffff6c] min-w-[89.74px] md:min-w-[78.26px] lg:min-w-[160px] text-[#041856] text-[13.46px] md:text-[11.74px] lg:text-[16px] px-6 py-3 lg:py-4 font-bold text-center rounded-4xl cursor-pointer ">
            View Website
          </button>
        </a>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-[-80px] right-[-100px] lg:bottom-[-102px] lg:right-[-220px] w-[321px] h-[305px] lg:w-[643px] lg:h-[611.84px] rounded-3xl overflow-hidden"
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750281921/Portfolio%20page/image1_pos3mb.png"
            alt="dashboard design"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
      <div className="relative bg-[#763d36] p-5 w-full h-[451px] md:h-[400.29px] lg:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[13.46px] md:text-[11.74px] lg:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Hello Dreams Academy
        </p>
        <p className="text-[17.95px] md:text-[15px] lg:text-[32px] text-[#f7f7f7] mb-3 w-[170px] md:w-full">
          EduTech
        </p>
        <p
          className="text-[12px] md:text-[10px] lg:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          UI/UX Design & development
        </p>
        <a href="" target="_blank">
          <button className="bg-gradient-to-b from-[#f7f7f7] to-[#9f6c65] min-w-[89.74px] md:min-w-[78.26px] lg:min-w-[160px] text-[#041856] text-[13.46px] md:text-[11.74px] lg:text-[16px] px-6 py-3 lg:py-4 font-bold text-center rounded-4xl cursor-pointer  ">
            View
          </button>
        </a>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-[-80px] right-[-60px] lg:bottom-[-160px] lg:right-[-130px] w-[320px] h-[346px] lg:w-[640.92px] lg:h-[693px] rounded-3xl overflow-hidden"
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1751979100/Portfolio%20page/ece9409e288426c04664694765f23a2f184fa3f1_mpbhfw.png"
            alt="dashboard design"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Section1;
