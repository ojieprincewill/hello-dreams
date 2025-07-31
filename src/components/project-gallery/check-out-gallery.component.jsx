import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const CheckOutGallery = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
      className="w-full px-[5%] xl:px-[10%] py-10"
    >
      <p
        className="text-[#000000] text-[16px] xl:text-[32px] xl:font-bold text-center mb-5"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Check out our project gallery
      </p>
      <p
        className="text-[#07111d] text-[11px] xl:text-[17px] xl:font-bold text-center mb-7"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Explore our figma designs, which are not under NDA
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} // ✅ Subtle scale effect
        whileInView={{ opacity: 1, scale: 1 }} // ✅ Grows into place
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
        className="flex flex-row justify-center items-center space-x-2 xl:space-x-4"
      >
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          className="bg-[#ffffff] border border-[#00000015] text-[#000000] text-[10px] xl:text-[14px] px-6 md:px-8 py-3 xl:font-bold text-center rounded-2xl shadow-[inset_0px_-2px_4px] shadow-[#ffe7de90]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065866/UI%20page/FIGMA_LOGO_lzou5u.png"
            alt="figma-logo"
            className="inline w-3 h-3 md:w-5 md:h-5 object-contain mr-2"
          />
          Product work
        </motion.button>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          className="bg-[#ffffff] border border-[#00000015] text-[#000000] text-[10px] xl:text-[14px] px-6 md:px-8 py-3 xl:font-bold text-center rounded-2xl shadow-[inset_0px_-2px_4px] shadow-[#ffe7de90]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065866/UI%20page/FIGMA_LOGO_lzou5u.png"
            alt="figma-logo"
            className="inline w-3 h-3 md:w-5 md:h-5 object-contain mr-2"
          />
          Branding work
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default CheckOutGallery;
