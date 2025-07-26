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
      <div className="relative bg-[#499cb8] p-5 w-full h-[451px] lg:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[13.46px] md:text-[11.74px] lg:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Ledge Flow
        </p>
        <p
          className="text-[17.95px] md:text-[15px] lg:text-[32px] text-[#f7f7f7] mb-3 md:font-semibold"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Logo Design & Branding
        </p>
        <p
          className="text-[12px] md:text-[10px] lg:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Graphics & Branding
        </p>
        <a
          href="https://www.canva.com/design/DAGpp6T8lI8/nZq1S0FoVTNiMHN8q0GV1A/edit?utm_content=DAGpp6T8lI8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
          target="_blank"
        >
          <button className="bg-gradient-to-b from-[#f7f7f7] to-[#7ac4dd] min-w-[89.74px] md:min-w-[78.26px] lg:min-w-[160px] text-[#041856] text-[13.46px] md:text-[11.74px] lg:text-[16px] px-6 py-3 lg:py-4 font-bold text-center rounded-4xl cursor-pointer">
            View Details
          </button>
        </a>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-[-50px] left-[-100px] lg:bottom-[-110px] lg:left-[-270px] w-[445px] h-[400px] lg:w-[991px] lg:h-[700px]"
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1751979098/Portfolio%20page/2feaefa67adbbbf51925484058bf69b98fc9b9f1_ly1n5o.png"
            alt="phone mock-up"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
      <div className="relative bg-[#008080] p-5 w-full h-[451px] lg:h-[800px] rounded-2xl space-y-2 overflow-hidden">
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
          Logo Design
        </p>
        <p
          className="text-[12px] md:text-[10px] lg:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Logo & Branding
        </p>
        <a
          href="https://www.canva.com/design/DAGH7nX4n8s/EIId7mce4oCtuNPsEOjFtQ/edit?utm_content=DAGH7nX4n8s&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
          target="_blank"
        >
          <button className="bg-gradient-to-b from-[#f7f7f7] to-[#299393] min-w-[89.74px] md:min-w-[78.26px] lg:min-w-[160px] text-[#041856] text-[13.46px] md:text-[11.74px] lg:text-[16px] px-6 py-3 lg:py-4 font-bold text-center rounded-4xl cursor-pointer ">
            View Details
          </button>
        </a>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-[-30px] right-[-120px] lg:bottom-[-50px] lg:right-[-230px] w-[445px] h-[350px] lg:w-[891px] lg:h-[650px]"
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1751979098/Portfolio%20page/e42c05349b71ad097708e86dc5e55a22d1273f0d_g4uzbt.png"
            alt="phone mock-up"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Section5;
