import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../landing-header/nav-bar/nav-bar.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const SocialManagementHeader = () => {
  const HandleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#ff7f50] md:bg-[#eef2fe] pt-3 md:pt-0">
      <NavBar />
      <div className="xl:grid flex flex-col-reverse xl:grid-cols-2 w-full h-full xl:h-[800px] xl:place-items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-[#eef2fe] md:bg-none px-3 py-6 md:px-10"
        >
          <p
            className="text-[#010413] text-[31.06px] md:text-[27.8px] xl:text-[56px] xl:w-[530px] mb-5 md:mb-7 font-medium"
            style={{ fontFamily: "'inter', sans-serif" }}
          >
            Social Media Management
          </p>
          <p
            className="text-[#667085] text-[11px] xl:text-[16px] leading-[1.8] xl:w-[530px] mb-10"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Our social media Management service are designed to elevate your
            online presence. We handle everything from creating engaging content
            and scheduling posts to analyziing performance and interacting with
            your audience
          </p>

          <Link to="/services/social-consultation" onClick={HandleOrigins}>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] text-[10.91px] xl:text-[16px] px-6 py-3 md:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              Get a free consultation
            </motion.button>
          </Link>
        </motion.div>

        <div className="relative bg-[#ff7f50] w-full h-[350px] md:h-[500px] xl:h-full flex items-center justify-center">
          <motion.img
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330742/SOCIAL_MEDIA_ICONS_rjb9fo.png"
            alt="social management image"
            className="w-full h-full md:w-[550px] md:h-[550px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialManagementHeader;
