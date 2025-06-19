import React from "react";
import NavBar from "../landing-header/nav-bar/nav-bar.component";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const JobHeader = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="relative pt-[15px] w-full h-[435px] md:h-[640px] lg:h-[904px] bg-[url('https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330651/2abccb476d3287825cf1236bfc3642ead9bb3741_mhb65g.png')] bg-cover bg-center">
        <NavBar />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hidden absolute md:top-[200px] lg:top-[263px] left-[7%] md:flex flex-col items-start justify-start text-[#fff]"
        >
          <h1 className="md:text-[48px] lg:text-[64px] w-[630px] leading-[1.1] font-extrabold">
            Your Dream Job Starts Here
          </h1>
          <p className="mt-8 text-[20px] w-[556px] leading-[1.4]">
            Explore curated jobs, internships, and freelance gigs that match
            your skills. We connect passionate dreamers with companies that
            value growth, creativity, and impact
          </p>
          <div className="mt-10">
            <Link
              to="/post-a-job"
              className="bg-white text-[#010413] font-semibold border border-[#fff] text-[24px] px-4 py-2 rounded-lg hover:text-[#fff] hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
              onClick={handleOrigins}
            >
              Post a Job
            </Link>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full px-[5%] py-10 md:hidden"
      >
        <h1 className="text-[20px] md:text-[40px] w-full leading-[1.1] font-extrabold mb-3 md:mb-5">
          Your dream job starts here
        </h1>
        <p className="mt-2 text-[#667085] text-[12px] md:text-[24px] w-full leading-[1.7] mb-3 md:mb-5">
          Explore curated jobs, internships, and freelance gigs that match your
          skills. We connect passionate dreamers with companies that value
          growth, creativity, and impact
        </p>
        <Link to="/post-a-job">
          <button
            className="bg-[#010413] w-full md:w-[284px] mt-5 text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-4 py-3 rounded-lg transition-colors duration-300 cursor-pointer"
            onClick={handleOrigins}
          >
            Post a Job
          </button>
        </Link>
      </motion.div>
    </>
  );
};

export default JobHeader;
