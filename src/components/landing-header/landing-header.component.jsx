import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import NavBar from "./nav-bar/nav-bar.component";
import { Link } from "react-router-dom";

const LandingHeader = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="relative pt-[15px] md:pt-0 w-full h-[435px] md:h-[875px] xl:h-[904px] bg-[url('https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330748/landing_image_hnrqnv.jpg')] bg-cover bg-center">
        <NavBar />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hidden absolute md:bottom-[130px] xl:bottom-[230px] left-[7%] md:flex flex-col items-start justify-start text-[#fff]"
        >
          <h1 className="md:text-[40px] xl:text-[52px] w-[630px] leading-[1.1] font-extrabold">
            Unlock your potential.
            <br />
            Build skills. Transform your future.
          </h1>
          <p className="mt-8 text-[20px] font-bold w-[556px] leading-[1.4]">
            Get access to expert-led training, career guidance, and tools to
            help you succeed. Join thousands taking their first step toward a
            better future!
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-10 space-x-4"
          >
            <Link
              to="/work-with-us"
              className="bg-white text-[#010413] font-semibold border border-[#010413] text-[20px] px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer"
              onClick={handleOrigins}
            >
              Book a free career call
            </Link>
            <Link
              to="/academy"
              className="bg-transparent text-white font-semibold border border-[#fff] text-[20px] px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer"
            >
              Explore our courses
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="px-5 py-10 md:hidden"
      >
        <h1 className="text-[20px] w-full leading-[1.1] font-extrabold">
          Unlock your potential. Build skills. Transform your future.
        </h1>
        <p className="mt-2 text-[12px] w-full leading-[tight]">
          Get access to expert-led training, career guidance, and tools to help
          you succeed. Join thousands taking their first step toward a better
          future!
        </p>
        <div className="mt-5 flex flex-col space-y-3">
          <Link
            to="/work-with-us"
            className="bg-[#010413] text-[#fff] text-center font-semibold border border-[#010413] text-[14px] px-4 py-4 rounded-lg transition-colors duration-300 cursor-pointer"
            onClick={handleOrigins}
          >
            Book a free career call
          </Link>
          <Link
            to="/academy"
            className="bg-transparent text-[#010413] text-center font-semibold border border-[#010413] text-[14px] px-4 py-4 rounded-lg transition-colors duration-300 cursor-pointer"
          >
            Explore our courses
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default LandingHeader;
