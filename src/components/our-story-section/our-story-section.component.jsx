import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const OurStorySection = () => {
  return (
    <div className="bg-[#f6f6f8] px-[5%] py-10">
      <h1 className="text-center text-[#1b212c34] text-[24px] md:text-[48px] xl:text-[96px] font-bold pb-10 flex items-center justify-center gap-2">
        Our Story
        <span className="ml-1">
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330672/arrow-block-down_vsasxf.png"
            alt="arrow-block"
            className="w-[36.67px] h-[36.67px] md:w-[64px] md:h-[64px] xl:w-[128px] xl:h-[128px] object-cover"
          />
        </span>
      </h1>
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Starts faded and lower
        whileInView={{ opacity: 1, y: 0 }} // Moves up and fades in
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full h-[221px] md:h-[462.2px] xl:h-[800px] rounded-2xl bg-[#008080]"
      >
        <video
          className="w-full h-full object-cover rounded-2xl shadow-lg"
          controls
          poster="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330684/ba1eb8a6e990e81f5fc28bf52459d03f55f76d4a_zqvm39.png"
        >
          <source
            src="https://res.cloudinary.com/dganx8kmn/video/upload/q_auto,f_mp4/v1753636272/videos/Story_of_Hello_Dreams_epiphg.mov"
            type="video/mp4"
          />
        </video>
      </motion.div>
    </div>
  );
};

export default OurStorySection;
