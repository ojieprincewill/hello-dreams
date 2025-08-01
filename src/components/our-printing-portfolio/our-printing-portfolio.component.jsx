import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const OurPrintingPortfolio = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full px-[5%] py-10">
      <div className="w-full text-center flex flex-col justify-center items-center p-5 md:pb-10">
        <h1
          className="text-[#010413] text-[24px] md:text-[48px]"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Our Portfolio
        </h1>
        <p
          className="mt-4 md:mt-8 text-[16px] md:text-[20px] text-[#010413] leading-[1.4]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Explore Our Work: A Showcase of Projects, Achievements and Creativity
        </p>
        <div className="mt-6 flex flex-col justify-center w-full md:flex-row">
          <Link
            to="/portfolio"
            onClick={handleOrigins}
            className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-12 py-3 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            View all
          </Link>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-6"
      >
        <div className="relative bg-[#ff7f50] p-5 w-full h-[451px] md:h-[400.29px] xl:h-[800px] rounded-2xl space-y-2 overflow-hidden">
          <p
            className="text-[13.46px] md:text-[11.74px] xl:text-[24px] text-[#f7f7f7]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Nehpets Consulting LTD
          </p>
          <p
            className="text-[17.95px] md:text-[15px] xl:text-[32px] text-[#f7f7f7] mb-3"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Logo Design &<br />
            Branding
          </p>
          <p
            className="text-[12px] md:text-[10px] xl:text-[18px] text-[#f7f7f7] mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Graphics & Branding
          </p>
          <button className="bg-gradient-to-b from-[#f7f7f7] to-[#f49674d5] min-w-[89.74px] md:min-w-[78.26px] xl:min-w-[160px] text-[#041856] text-[13.46px] md:text-[11.74px] xl:text-[16px] px-6 py-3 xl:py-4 font-bold text-center rounded-4xl cursor-pointer  ">
            View Details
          </button>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="absolute bottom-[-150px] md:bottom-[-60px] xl:bottom-[-110px] right-[-180px] w-[434.7px] h-[434.7px] md:w-[379.06px] md:h-[379.06px] xl:w-[680px] xl:h-[680px]"
          >
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065866/UI%20page/cb55d20c2b1ec22f23ecf20d5f992a50b65c90fa_xzo0cp.png"
              alt="branded hoodie"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        <div className="relative bg-[#008080] p-5 w-full h-[451px] md:h-[400.29px] xl:h-[800px] rounded-2xl space-y-2 overflow-hidden">
          <p
            className="text-[13.46px] md:text-[11.74px] xl:text-[24px] text-[#f7f7f7]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Transafe Logistics LLC
          </p>
          <p
            className="text-[17.95px] md:text-[15px] xl:text-[32px] text-[#f7f7f7] mb-3"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Logo Design
          </p>
          <p
            className="text-[12px] md:text-[10px] xl:text-[18px] text-[#f7f7f7] mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Graphics & Branding
          </p>
          <button className="bg-gradient-to-b from-[#f7f7f7] to-[#299393] min-w-[89.74px] md:min-w-[78.26px] xl:min-w-[160px] text-[#041856] text-[13.46px] md:text-[11.74px] xl:text-[16px] px-6 py-3 xl:py-4 font-bold text-center rounded-4xl cursor-pointer ">
            View Details
          </button>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="absolute bottom-[-60px] right-[-80px] md:bottom-[-160px] md:right-[-120px] xl:bottom-[-180px] xl:right-[-270px] w-[458px] h-[3i8px] md:w-[558px] md:h-[418px] xl:w-[970px] xl:h-[765px]"
          >
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750082698/printing%20page/45cc8d67dfd4b9caf6b41181e3fd7bbc0d33dea7_i5lrii.png"
              alt="logo design"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default OurPrintingPortfolio;
