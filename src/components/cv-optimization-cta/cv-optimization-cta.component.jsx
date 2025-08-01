import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const CvOptimizationCta = () => {
  const HandleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#010413] text-[#fff] px-2 py-5 md:px-10">
      <div className="flex flex-col-reverse justify-center items-center md:grid md:grid-cols-2 md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }} // Starts faded and lower
          whileInView={{ opacity: 1, y: 0 }} // Moves up and fades in
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full h-[382.33px] md:h-[463.33px] xl:h-[800px] bg-[#ffc501] rounded-2xl overflow-hidden"
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330672/ae3bfa13ccf709991e22a3b74450b625f5b8f7f0_ilrurg.png"
            alt="lady vector image"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="flex flex-col justify-center items-center mb-6 md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-[#ff6250] w-[66.54px] h-[66.54px] xl:w-[124px] xl:h-[124px] mb-4 rounded-tr-[100%] overflow-hidden"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[#fff] text-[25px] xl:text-[40px] text-center mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Ready to elevate your professional career?
          </motion.p>
          <Link
            to="/services/optimize-profile"
            className="text-[#f7f7f7] text-[18.7px] xl:text-[36px] text-center underline cursor-pointer"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            onClick={HandleOrigins}
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true }}
            >
              Optimize your profile now
            </motion.p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CvOptimizationCta;
