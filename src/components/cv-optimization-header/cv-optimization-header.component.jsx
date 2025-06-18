import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../landing-header/nav-bar/nav-bar.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const CvOptimizationHeader = () => {
  const HandleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="relative bg-[#7f7def] w-full pt-3 md:pt-0 h-[640.67px] lg:h-[1019px] overflow-hidden">
        <NavBar />
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[#fff] text-[16px] md:text-[24.02px] mt-20 md:mt-10 lg:hidden text-center"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          GET A PROFESSIONAL CV & LinkedIn Profile
        </motion.p>
        <motion.img
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750085445/cv%20optimization%20page/937e905233fae1c3c4a37e6340a64f6090c50528_rvgag4.png"
          alt="purple clay"
          className="absolute bottom-[-15px] md:left-[60px] md:bottom-0 lg:bottom-[-90px] w-[483.18px] h-[332.73px] md:w-[646px] md:h-[444.84px] lg:w-[1291px] lg:h-[889px] object-cover "
        />
        <motion.img
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750085446/cv%20optimization%20page/37cbac07abf90336ca0bd30d8f9fe90dc3c0def2_la3tzs.png"
          alt="cv image"
          className="absolute left-[35px] bottom-[10px] md:left-[175px] md:bottom-[65px] lg:left-[225px] lg:bottom-[35px] w-[394.11px] h-[277.17px] md:w-[526.91px] md:h-[370.56px] lg:w-[1053px] lg:h-[740.55px] object-contain"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%] w-full h-full md:h-[463.33px] lg:h-[800px] md:place-items-center bg-[#eef2fe]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="px-3 py-6 md:pl-15"
        >
          <p
            className="text-[#010413] text-[31.06px] md:text-[27.8px] lg:text-[48px] md:w-[306.96px] lg:w-[530px] mb-5 md:mb-7"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Expert CV Writing and LinkedIn Optimization Services
          </p>
          <p
            className="text-[#667085] text-[11px] lg:text-[16px] leading-[1.8] md:w-[306.96px] lg:w-[530px] mb-10 md:mb-15"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            At Hello Dreams, we specialize in crafting impactful CVs and
            optimizing LinkedIn profiles to help professionals and businesses
            stand out and achieve their career goals. With years of experience
            and a deep understanding of industry standards, we are committed to
            delivering top-notch services that open doors to new opportunities
          </p>
          <Link to="/services/optimize-profile" onClick={HandleOrigins}>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              Optimize your Profile
            </motion.button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-[418.23px] md:h-full"
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330669/092847268a3ed20155bd2feaccbb06e912a5c3ec_paq3rf.png"
            alt="cv writing girl"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </>
  );
};

export default CvOptimizationHeader;
