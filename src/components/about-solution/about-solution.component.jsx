import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const AboutSolution = () => {
  return (
    <div className="px-[5%] py-5 ">
      <p
        className="text-[#505050] text-[14px] uppercase mb-3"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        our solution
      </p>
      <p
        className="text-[#000000] text-[12px] md:text-[20px] lg:text-[32px] font-bold mb-3"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        Transform Your Journey: From Confusion to Clarity with Hello Dreams
      </p>
      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-[#667085] text-[10px] md:text-[13px] lg:text-[16px] leading-[2] lg:leading-[1.7] mb-7"
        >
          We'll start by transforming your digital presence: Whether you're a
          startup needing a user-friendly website or an engaging app, our UI/UX
          design services will help you create products that truly resonate with
          your audience.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-[#667085] text-[10px] md:text-[13px] lg:text-[16px] leading-[2] lg:leading-[1.7] mb-7"
        >
          We'll empower you with skills: Learn from my journey. Our courses are
          designed to equip you with the tools needed to succeed in the tech
          industry. Whether you're a beginner, intermediate, or advanced
          learner, we have something tailored for you.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-[#667085] text-[10px] md:text-[13px] lg:text-[16px] leading-[2] lg:leading-[1.7] mb-7"
        >
          We'll build your brand identity: Your logo is the face of your brand.
          We'll design logos that represent your business or personal values,
          along with print materials that leave a lasting impression.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-[#667085] text-[10px] md:text-[13px] lg:text-[16px] leading-[2] lg:leading-[1.7] mb-7"
        >
          We'll tell your story visually: From banners to marketing materials,
          our graphic design services will help you communicate your message
          clearly and effectively.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-[#667085] text-[10px] md:text-[13px] lg:text-[16px] leading-[2] lg:leading-[1.7] mb-7"
        >
          We'll make you stand out in your career: Don't let a poorly crafted CV
          or LinkedIn profile hold you back. We'll help you showcase your
          strengths, experiences, and skills to attract the right opportunities.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-[#667085] text-[10px] md:text-[13px] lg:text-[16px] leading-[2] lg:leading-[1.7] mb-7"
        >
          We'll be with you every step of the way, getting you started the right
          way: Avoid the confusion and hassle of legal paperwork. We'll guide
          you through the process of registering your business name or company,
          ensuring everything is set up correctly from the start.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full h-[193.34px] md:h-[350px] lg:h-[705px] rounded-2xl overflow-hidden mt-5"
      >
        <img
          src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750248910/About%20page/dbe4f881fd1e5cfb795007237d9f1d1b3141a3ec_auujvi.jpg"
          alt="happy tech man"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export default AboutSolution;
