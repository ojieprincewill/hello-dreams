import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const AboutStory = () => {
  return (
    <div className="w-full px-[5%] py-5 md:py-10">
      <p className="text-[24px] lg:text-[48px] text-[#101828] text-center font-bold mb-2">
        Our Story
      </p>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="hidden p-2 border border-[#dfdfdf] rounded-xl md:flex items-center space-x-5 mt-15"
      >
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="md:w-[375px] md:h-[180px] lg:w-[475px] lg:h-[280px] rounded-md overflow-hidden"
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750248830/About%20page/1db42bac4995832729ae334fa348520949dee99e_nwyp3t.png"
            alt="Founder's Photo"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="space-y-5"
        >
          <p className="text-[#010413] text-[18px] lg:text-[24px] font-bold md:w-[400px] lg:w-[468.81px]">
            😊 Hi, my name is Pamela and I'm the Founder & CEO of Hello Dreams
          </p>
          <p
            className="text-[#667085] text-[12px] lg:text-[15.88px] leading-[1.5] md:w-[400px] lg:w-[611px] "
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            I would love to tell you in few minutes, why Hello Dreams was
            started. It's been an awesome journey seeing our team, students, and
            community grow around the world.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutStory;
