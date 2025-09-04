import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../landing-header/nav-bar/nav-bar.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const PrintingHeader = () => {
  const HandleOrigins = () => {};

  return (
    <div className=" bg-[#eef2fe] pt-3 md:pt-0">
      <NavBar />
      <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-center w-full h-full md:h-[463.33px] xl:h-[800px]  ">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative px-3 py-6 md:px-10"
        >
          <p
            className="text-[#010413] text-[31.06px] md:text-[27.8px] xl:text-[56px] md:w-[306.96px] xl:w-[530px] mb-5 md:mb-7 font-medium"
            style={{ fontFamily: "'inter', sans-serif" }}
          >
            Printing
          </p>
          <p
            className="text-[#667085] text-[11px] xl:text-[16px] leading-[1.8] md:w-[306.96px] xl:w-[530px] mb-10 md:mb-15"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Our professional printing services is designed to bring your
            creative visions to life. Whether you need business cards, banners,
            flyers, brochures, or other marketing materials, we ensure
            high-quality prints that make a lasting impression. From concept to
            final print, we handle every step of the process, providing you with
            products that effectively represent your brand and communicate your
            message.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="absolute top-[270px] md:top-[10px] left-[270px] xl:top-[-30px] xl:left-[484px] w-[30.7px] h-[30.7px] xl:w-[54px] xl:h-[54px] "
          >
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/v1750082708/printing%20page/caf76bbf69e13f18aa187a597538509b2ec8680b_jvxuuj.png"
              alt="pink arrow"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <Link to="/services/printing-consultation" onClick={HandleOrigins}>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] text-[10.91px] xl:text-[16px] px-6 py-3 xl:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              Get a free consultation
            </motion.button>
          </Link>
        </motion.div>
        <div className="bg-[#ffadd9] w-full h-full">
          <motion.img
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330730/fb3b12a1f7966448ea8070205ed1cd33afc5c66c_oeg7ip.png"
            alt="products mock-up"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PrintingHeader;
