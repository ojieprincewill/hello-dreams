import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const Section4 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-6"
    >
      <div className="relative bg-[#010413] p-5 w-full h-[451px] md:h-[450.29px] xl:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[13.46px] md:text-[11.74px] xl:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Roberta's Luxe
        </p>
        <p className="text-[17.95px] md:text-[15px] xl:text-[32px] text-[#f7f7f7] mb-3 font-semibold">
          Logo Design
        </p>
        <p
          className="text-[12px] md:text-[10px] xl:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Graphics & Branding
        </p>
        <div className="relative z-20">
          <a href="https://robertasluxe.com" target="_blank">
            <button className="bg-gradient-to-b from-[#f7f7f7] to-[#ffffff6c] min-w-[89.74px] md:min-w-[78.26px] xl:min-w-[160px] text-[#041856] text-[13.46px] md:text-[11.74px] xl:text-[16px] px-6 py-3 xl:py-4 font-bold text-center rounded-4xl cursor-pointer ">
              View Details
            </button>
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="absolute z-10 right-0 bottom-[-70px] xl:bottom-[-150px] w-[250px] h-[450px] xl:w-[450.6px] xl:h-[800px]"
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750281917/Portfolio%20page/a3bd5d78364b1d07f2aaa1c8ff1156d1bf6ba7ba_ytfpkz.png"
            alt="branded hoodie"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>

      <div className="relative bg-[#8b248a] p-5 w-full h-max md:h-[450.29px] xl:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[13.46px] md:text-[11.74px] xl:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Nigerian Girl in STEM Foundation
        </p>
        <p className="text-[17.95px] md:text-[15px] xl:text-[32px] text-[#f7f7f7] mb-3 md:font-semibold">
          Branding & Graphics
        </p>
        <p
          className="text-[12px] md:text-[10px] xl:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Graphics & Branding
        </p>
        <div className="relative z-20">
          <a
            href="https://ng.linkedin.com/company/nigeriangirlinstem"
            target="_blank"
          >
            <button className="bg-gradient-to-b from-[#f7f7f7] to-[#ae5aad] min-w-[89.74px] md:min-w-[78.26px] xl:min-w-[160px] text-[#041856] text-[13.46px] md:text-[11.74px] xl:text-[16px] px-6 py-3 xl:py-4 font-bold text-center rounded-4xl cursor-pointer  ">
              View Details
            </button>
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="max-w-[530px] h-auto z-10"
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1753562835/Portfolio%20page/92ecb0d247cbb0574abba59555678e91732a9ba5_qzpyti.png"
            alt="branded shirt"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Section4;
