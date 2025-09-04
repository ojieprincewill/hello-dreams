import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const PeopleAndCompanies = () => {
  return (
    <div className="w-full px-[5%] py-10">
      <p
        className="text-[#010413] text-[26px] xl:text-[48px] text-center mb-4"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        People & Companies We Work With
      </p>
      <p
        className="text-[#010413] text-[11px] xl:text-[20px] xl:font-bold text-center mb-3 "
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Explore Our Work: A Showcase of Projects, Achievements, and Creativity
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-5 md:mt-10 ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-[#efece9] px-4 py-4 xl:py-6 rounded-xl overflow-hidden h-[429.3px] xl:h-[800px] relative"
        >
          <div className="bg-[#009379] w-[66.54px] h-[66.54px] xl:w-[124px] xl:h-[124px] mb-4 rounded-tr-[40%] rounded-bl-[40%] overflow-hidden"></div>
          <p
            className="text-[#333333] text-[26px] xl:text-[48px] mb-3"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Startups
          </p>
          <p
            className="text-[#010413] text-[8.6px] xl:text-[16px] xl:font-bold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            We thrive on collaborating with startups to bring new and exciting
            products to life. Whether you need to develop your MVP, refine your
            POC, or enhance an existing product, we're here to help. Our app
            designs consistently break launch records and receive stellar
            ratings. Partner with us for exceptional results.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} // ✅ Image pops in
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-[90%] xl:w-[94%] h-[194.79px] xl:h-[363px] bg-[#f7f7f8] rounded-xl overflow-hidden absolute bottom-4 xl:bottom-6"
          >
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750066141/UI%20page/STARTUPS_CARD_IMAGE_hng6bf.png"
              alt="startup image"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-[#f7f7f7] px-4 py-4 xl:py-6 rounded-xl overflow-hidden h-[450px] md:h-[429.3px] xl:h-[800px] relative"
        >
          <div className="bg-[#ff6250] w-[66.54px] h-[66.54px] xl:w-[124px] xl:h-[124px] mb-4 rounded-tr-[100%] overflow-hidden"></div>
          <p
            className="text-[#333333] text-[26px] xl:text-[48px] mb-3"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Established Enterprises
          </p>
          <p
            className="text-[#010413] text-[8.6px] xl:text-[16px] xl:font-bold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Large corporations looking to outsource UI/UX design projects.
            Companies with existing products that need polishing or redesigning.
            CEO and design agencies seeking collaborative partnerships for web
            development projects using Webflow, Framer, and WordPress.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} // ✅ Image pops in
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-[90%] xl:w-[94%] h-[194.79px] xl:h-[363px] bg-[#efece9] rounded-[20px] overflow-hidden absolute bottom-4 xl:bottom-6"
          >
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065860/UI%20page/Established_Enterprises_CARD_IMAGE_h4l7ga.png"
              alt="established image"
              className="w-full h-full object-center"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PeopleAndCompanies;
