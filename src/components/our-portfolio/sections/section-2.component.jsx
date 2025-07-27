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
      <div className="relative bg-[#ff7f50] p-5 w-full h-[451px] md:h-[400.29px] lg:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[13.46px] md:text-[11.74px] lg:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          UI DESIGNS
        </p>
        <p className="text-[17.95px] md:text-[15px] lg:text-[32px] text-[#f7f7f7] mb-3 w-[170px] md:w-full md:font-semibold">
          UI DESIGNS ACROSS DIFF INDUS
        </p>
        <p
          className="text-[12px] md:text-[10px] lg:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          UI/UX Design
        </p>
        <div className="relative z-20">
          <a
            href="https://www.figma.com/proto/SMBy8E3g1PPMDfhhBDSTnE/Pamela-Ohaeri-s-Porfolio?page-id=1296%3A4449&node-id=1296-4523&viewport=260%2C-160%2C0.04&t=dIgKLO89EA16VBZs-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1296%3A4523"
            target="_blank"
          >
            <button className="bg-gradient-to-b from-[#f7f7f7] to-[#f49674d5] min-w-[89.74px] md:min-w-[78.26px] lg:min-w-[160px] text-[#041856] text-[13.46px] md:text-[11.74px] lg:text-[16px] px-6 py-3 lg:py-4 font-bold text-center rounded-4xl cursor-pointer  ">
              View Design
            </button>
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="absolute z-10 bottom-[-80px] right-[-60px] lg:bottom-[-120px] lg:right-[-130px] w-[320px] h-[346px] lg:w-[640.92px] lg:h-[693px] rounded-3xl overflow-hidden"
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750281917/Portfolio%20page/image_2_dofiuu.png"
            alt="dashboard design"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
      <div className="relative bg-[#0b83d9] p-5 w-full h-[451px] md:h-[400.29px] lg:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[13.46px] md:text-[11.74px] lg:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          SISENOW
        </p>
        <p className="text-[17.95px] md:text-[15px] lg:text-[32px] text-[#f7f7f7] w-[207px] lg:w-[307px] mb-3 md:font-semibold">
          JOB MARKETPLACE WEBSITE
        </p>
        <p
          className="text-[12px] md:text-[10px] lg:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          UI/UX Design
        </p>
        <div className="relative z-20">
          <a href="https://www.sisenow.co.uk" target="_blank">
            <button className="bg-gradient-to-b from-[#f7f7f7] to-[#90c0e26b] min-w-[89.74px] md:min-w-[78.26px] lg:min-w-[160px] text-[#041856] text-[13.46px] md:text-[11.74px] lg:text-[16px] px-6 py-3 lg:py-4 font-bold text-center rounded-4xl cursor-pointer ">
              View
            </button>
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="absolute z-10 bottom-[-10px] right-[-70px] lg:bottom-[-20px] lg:right-[-50px] w-[334.31px] h-[311.41px] lg:w-[448.31px] lg:h-[622.41px]"
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
