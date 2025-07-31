import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const OurPortfolioSection = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full px-[5%] py-10">
      <div className="w-full text-center flex flex-col justify-center items-center p-5 md:pb-10">
        <h1 className="text-[#010413] text-[24px] md:text-[48px] leading-[1.1] font-semibold md:font-bold">
          Our Team's Portfolio
        </h1>
        <p className="mt-4 md:mt-8 text-[16px] md:text-[20px] text-[#667085] md:font-bold leading-[1.4]">
          Explore Our Work: A Showcase of Projects,
          <br />
          Achievements and Creativity
        </p>
        <div className="mt-6 flex flex-col justify-center w-full md:w-[431px] xl:w-full space-y-4 xl:flex-row xl:space-x-4">
          <Link
            to="/portfolio"
            onClick={handleOrigins}
            className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-12 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
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
        className="grid grid-cols-1 xl:grid-cols-2 gap-6"
      >
        <div className="relative bg-[#1a212a] p-5 w-full h-[478px] md:h-[800px] rounded-2xl space-y-2 overflow-hidden">
          <p className="text-[16px] md:text-[24px] md:font-bold md:uppercase text-[#fff]">
            Sisenow
          </p>
          <p className="text-[20px] md:text-[32px] font-semibold md:font-extrabold md:uppercase text-[#fff]">
            Freelancer Website
          </p>
          <p className="text-[12px] md:text-[18px] md:font-bold text-[#fff] mb-3">
            UI/UX design
          </p>
          <button className="bg-[#fff] text-[#010413] font-semibold border border-[#fff] text-[14px] md:text-[18px] px-12 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
            View Website
          </button>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="absolute bottom-0 right-[-160px] md:bottom-[-10px] md:right-[-300px] xl:right-[-350px] w-[406px] h-[265.61px] md:w-[856px] md:h-[560px]"
          >
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330729/f123697aa370f082191412d5dc38d04629b4621e_jth7jv.png"
              alt="website screenshot"
              className="w-full h-full rounded-2xl object-cover"
            />
          </motion.div>
        </div>
        <div className="relative bg-[#ff7f50] p-5 w-full h-[478px] md:h-[800px] rounded-2xl space-y-2 overflow-hidden">
          <p className="text-[16px] md:text-[24px] md:font-bold md:uppercase text-[#fff]">
            UI Designs
          </p>
          <p className="text-[20px] md:text-[32px] font-semibold md:font-extrabold md:uppercase text-[#fff]">
            UI Designs across different
            <br />
            Industries
          </p>
          <p className="text-[12px] md:text-[18px] md:font-bold text-[#fff] mb-3">
            UI/UX design
          </p>
          <button className="bg-[#fff] text-[#010413] font-semibold border border-[#fff] text-[14px] md:text-[18px] px-12 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
            View designs
          </button>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="absolute bottom-0 right-[-40px] md:bottom-0 md:right-[-202px] w-[306px] h-[265.61px] md:w-[856px] md:h-[560px]"
          >
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330639/0c6655088ed0e01f22e848c0759a18849ba1452f_iqzwgy.png"
              alt="dashboard design"
              className="w-full h-full rounded-2xl md:object-contain"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default OurPortfolioSection;
