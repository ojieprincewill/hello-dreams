import React from "react";
import NavBar from "../landing-header/nav-bar/nav-bar.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const WebMobileDevHeader = () => {
  return (
    <div className=" bg-[#7a2635] w-full h-[481px] md:h-[670.71px] lg:h-[1015px] pt-3 md:pt-0 ">
      <NavBar />
      <div className="mt-5 md:mt-0 p-5 flex flex-col justify-center items-center">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hidden md:block text-[#fff] text-[12px] text-center mt-20 mb-5"
        >
          Software Development
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="text-[#fff] text-[16px] md:text-[20px] lg:text-[24px] w-[259px] md:w-full text-center font-extrabold mb-5"
        >
          Mobile & Web Application Development
        </motion.p>

        <div className="relative mt-3 md:mt-0 w-[269.73px] h-[211px] md:w-[594.64px] md:h-[445.98px] lg:w-[826px] lg:h-[669.5px]">
          <motion.img
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750251213/Web%20dev%20page/20ba4270e4326bd6aa535fea66f3bbbbb7fcfdc5_ub92gh.png"
            alt="phone mock-up"
            className="w-full h-full object-cover"
          />
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.8 }}
            className="absolute left-[-15px] top-[10px] md:left-[80px] md:top-[80px] lg:md:-[60px] lg:top-[120px] text-[#fff] text-[12px] md:text-[13.91px] lg:text-[24px] font-medium"
          >
            iOS app development
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1 }}
            className="absolute left-[-15px] top-[80px] md:left-[60px] md:top-[180px]  lg:left-[20px] lg:top-[250px] text-[#fff] text-[12px] md:text-[13.91px] lg:text-[24px] font-medium"
          >
            App design
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.2 }}
            className="absolute right-[-20px] top-[190px] md:right-[-50px] md:top-[140px]  lg:right-[-150px] lg:top-[200px] text-[#fff] text-[12px] md:text-[13.91px] lg:text-[24px] font-medium"
          >
            E-commerce solutions
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.4 }}
            className="absolute right-[50px] top-[230px] md:right-[-80px] md:top-[230px]  lg:right-[-200px] lg:top-[340px] text-[#fff] text-[12px] md:text-[13.91px] lg:text-[24px] font-medium"
          >
            cutting-edge technologies
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default WebMobileDevHeader;
