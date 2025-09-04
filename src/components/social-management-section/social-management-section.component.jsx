import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const SocialManagementSection = () => {
  const handleOrigins = () => {};

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-3">
        <div className="bg-[#f5f5f7] w-full h-[420px] md:h-[590px] flex items-center justify-center">
          <motion.img
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330742/SOCIAL_MEDIA_ICONS_rjb9fo.png"
            alt="social management image"
            className="w-[261px] h-[261px] md:w-[492px] md:h-[492px] object-contain"
          />
        </div>
        <div className="bg-[#f5f5f7] w-full h-[420px] md:h-[590px] text-center flex flex-col justify-center items-center p-5 md:p-0">
          <motion.h1
            initial={{ opacity: 0, y: 30 }} // Starts faded and lower
            whileInView={{ opacity: 1, y: 0 }} // Moves up and fades in
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-[#010413] text-[24px] md:text-[64px] leading-[1.1] font-semibold md:font-bold"
          >
            Social Media
            <br />
            Management
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }} // Starts faded and lower
            whileInView={{ opacity: 1, y: 0 }} // Moves up and fades in
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-6 md:mt-12 flex flex-col w-full md:w-[431px] xl:w-full space-y-4 xl:inline xl:space-x-4"
          >
            <Link
              to="/services/social-consultation"
              onClick={handleOrigins}
              className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[18px] px-6 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              Manage your social media
            </Link>
            <Link
              to="/services/social-management"
              onClick={handleOrigins}
              className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[14px] md:text-[18px] px-12 py-4 rounded-lg hover:text-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              View service
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col-reverse xl:grid xl:grid-cols-2 w-full gap-3">
        <div className="bg-[#f5f5f7] w-full h-[420px] md:h-[590px] text-center flex flex-col justify-center items-center p-5 md:p-0">
          <motion.h1
            initial={{ opacity: 0, y: 30 }} // Starts faded and lower
            whileInView={{ opacity: 1, y: 0 }} // Moves up and fades in
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-[#010413] text-[24px] md:text-[64px] leading-[1.1] font-semibold md:font-bold"
          >
            Graphic Design &
            <br />
            Branding
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }} // Starts faded and lower
            whileInView={{ opacity: 1, y: 0 }} // Moves up and fades in
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-6 md:mt-12 flex flex-col w-full md:w-[431px] xl:w-full space-y-4 xl:inline xl:space-x-4"
          >
            <Link
              to="/services/graphics-consultation"
              onClick={handleOrigins}
              className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[18px] px-6 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              Design your brand
            </Link>
            <Link
              to="/services/graphics-design"
              onClick={handleOrigins}
              className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[14px] md:text-[18px] px-12 py-4 rounded-lg hover:text-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              View service
            </Link>
          </motion.div>
        </div>

        <div className="bg-[#f5f5f7] w-full h-[420px] md:h-[590px] flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330726/dd88d0d80e3a90b61f773f01e03e6be721b91599_l0osml.png"
            alt="graphic design image"
            className="w-[261px] h-[261px] md:w-[492px] md:h-[492px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialManagementSection;
