import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const WebMobile = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col-reverse md:flex-col">
      <div className="px-10 md:px-5 py-10 md:py-20 w-full text-center flex flex-col justify-center items-center">
        <h1 className="text-[24px] md:text-[52px] leading-[1.1] font-extrabold">
          Website & Mobile
          <br />
          App Development
        </h1>
        <p className="mt-4 md:mt-8 text-[16px] md:text-[36px] text-[#667085] font-semibold leading-[1.4]">
          No delays. No limitations.
          <br />→ <span className="text-[#1342ff]">Build fast.</span> Scale
          faster.
        </p>
        <div className="mt-6 md:mt-12 flex flex-col w-full md:w-[431px] xl:w-full space-y-4 xl:inline xl:space-x-4">
          <Link
            to="/services/app-dev-consultation"
            onClick={handleOrigins}
            className="bg-[#010413] text-[#fff] font-semibold border border-[#010413] text-[16px] px-6 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            Launch your project
          </Link>
          <Link
            to="/services/web-and-mobile-dev"
            onClick={handleOrigins}
            className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[16px] px-12 py-4 rounded-lg hover:text-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            View service
          </Link>
        </div>
      </div>
      <div className="flex flex-col xl:grid xl:grid-cols-[45%_55%] w-full">
        {/* First Image Block */}
        <div className="bg-[#0c0c0c] w-full h-[386px] md:h-[845px] p-6 md:p-0 xl:rounded-tl-2xl">
          <motion.img
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330699/c17037d015e250057e6b0767ef614397acdd7d02_eigwko.jpg"
            alt="woman using phone"
            className="w-full h-full object-cover rounded-2xl xl:rounded-tr-2xl md:rounded-bl-none md:rounded-none scale-x-[-1]"
          />
        </div>

        {/* Second Image Block */}
        <div className="relative w-full h-[549px] xl:h-[845px] p-6 md:p-0 overflow-hidden bg-[#0c0c0c] xl:rounded-tr-2xl">
          <motion.img
            initial={{ opacity: 0, y: 50 }} // Starts faded and lower
            whileInView={{ opacity: 1, y: 0 }} // Moves up and fades in
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330643/363baf51b8410db321c93037a944d36f9995f398_ktfyzq.png"
            alt="abstract glob"
            className="absolute w-[118.5px] h-[79px] md:w-[303px] md:h-[202px] object-contain"
          />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="absolute bottom-[150px] right-[-93px] md:bottom-[-120px] md:right-[-300px] w-[399px] h-[266px] md:w-[921px] md:h-[614px]"
          >
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330665/06110762eee01fd2a39e4804310aace2a6b4cd05_htyuyj.png"
              alt="sign in image"
              className="w-full h-full object-cover rounded-[12px]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WebMobile;
