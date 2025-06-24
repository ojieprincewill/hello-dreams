import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const Section2 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-6"
    >
      <div className="relative bg-[#008080] p-5 w-full h-[451px] md:h-[400.29px] lg:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[13.46px] md:text-[11.74px] lg:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          ARMONE WEB
        </p>
        <p className="text-[17.95px] md:text-[15px] lg:text-[32px] text-[#f7f7f7] w-[201px] lg:w-[401px] mb-3">
          Investment Website
        </p>
        <p
          className="text-[12px] md:text-[10px] lg:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          UI/UX Design
        </p>
        <button className="bg-gradient-to-b from-[#f7f7f7] to-[#299393] min-w-[89.74px] md:min-w-[78.26px] lg:min-w-[160px] text-[#041856] text-[13.46px] md:text-[11.74px] lg:text-[16px] px-6 py-3 lg:py-4 font-bold text-center rounded-4xl cursor-pointer ">
          View
        </button>
        {/* <motion.div initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }} className="absolute bottom-[-150px] right-[-292px] w-[1000px] h-[765px]">
          <img
            src=""
            alt="dashboard design"
            className="w-full h-full object-contain"
          />
        </motion.div> */}
      </div>
      <div className="relative bg-[#0b83d9] p-5 w-full h-[451px] md:h-[400.29px] lg:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[13.46px] md:text-[11.74px] lg:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          SISENOW
        </p>
        <p className="text-[17.95px] md:text-[15px] lg:text-[32px] text-[#f7f7f7] w-[207px] lg:w-[307px] mb-3">
          JOB MARKETPLACE WEBSITE
        </p>
        <p
          className="text-[12px] md:text-[10px] lg:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          UI/UX Design
        </p>

        <button className="bg-gradient-to-b from-[#f7f7f7] to-[#90c0e26b] min-w-[89.74px] md:min-w-[78.26px] lg:min-w-[160px] text-[#041856] text-[13.46px] md:text-[11.74px] lg:text-[16px] px-6 py-3 lg:py-4 font-bold text-center rounded-4xl cursor-pointer ">
          View
        </button>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-[-10px] right-[-70px] lg:bottom-[-20px] lg:right-[-50px] w-[334.31px] h-[311.41px] lg:w-[448.31px] lg:h-[622.41px]"
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750281918/Portfolio%20page/sisenow_image_jnyj0t.png"
            alt="mock up design"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Section2;
