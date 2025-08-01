import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const AboutProblem = () => {
  return (
    <div className="px-[5%] py-2 md:py-5 ">
      <p
        className="text-[#505050] text-[14px] uppercase mb-3"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        the problem
      </p>
      <p
        className="text-[#000000] text-[12px] md:text-[20px] xl:text-[32px] font-bold mb-3"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        No one deserves to fail severally, be confused and not succeed
      </p>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-[#667085] text-[10px] md:text-[13px] xl:text-[16px] leading-[2] xl:leading-[1.7] mb-3"
      >
        I've experienced failure countless times, often because I genuinely
        didn't know what I was doing wrong. I was putting in a lot of effort,
        but it was directed at the wrong things. After facing over 100
        rejections, I would pick myself up and continue with the same
        ineffective strategy. No matter how hard I worked, I was never going to
        see any success unless I paused and rethought my approach. Eventually, I
        had a swift change in mindset—I altered my strategy, began building my
        personal brand, and focused on learning new skills and acquiring
        knowledge. That's when I started to see even the slightest
        breakthroughs. No one really believed it could work out for me, except
        for my mum and siblings 😅... But I tested the waters, discovered what
        works, and experienced massive changes. That's exactly what Hello Dreams
        is here to do for you. Change you story, help yoy build your personal
        and business brand, i cater for everything that can help you achieve
        your set goals.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full h-[193.34px] md:h-[350px] xl:h-[705px] rounded-2xl overflow-hidden mt-5"
      >
        <img
          src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750248921/About%20page/882201a45f54dc02fe0ca6e02fe4fcc558afa801_tklxa6.jpg"
          alt="man working late"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export default AboutProblem;
