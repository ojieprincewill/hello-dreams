import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const SectionOne = () => {
  const HandleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative bg-[#eef2fe] h-max md:h-[626.66px] xl:h-[1082px] px-[5%] py-5">
      <p className="text-[#101828] text-[20px] md:text-[25.57px] xl:text-[48px] font-bold text-center py-4 xl:py-7">
        Graphics & Branding
      </p>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 w-full h-max md:h-[426.11px] xl:h-[800px] bg-[#fff] overflow-hidden rounded-2xl md:mt-4 xl:mt-8"
      >
        <div className="relative bg-[#efece9] w-full h-[332px] md:w-full md:h-full rounded-2xl overflow-hidden">
          <span
            className="absolute top-[-15px] left-[-16px] w-[58.07px] h-[54.62px] md:w-[107.35px] md:h-[107.35px] flex justify-center items-center rounded-full bg-[#eef2fe] text-[#1342ff] text-[21.85px] md:text-[28.49px]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            1
          </span>
          <motion.img
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750071713/Graphics%20page/humaaan-11_pyox5q.png"
            alt="outline-svg-1"
            className="justify-self-center md:absolute md:top-[15px] md:right-0 w-[175.14px] h-full md:w-[250.23px] md:h-[410.26px] xl:hidden object-contain md:object-cover"
          />
        </div>
        <div className="px-3 py-10 rounded-tr-2xl rounded-br-2xl ">
          <p className="text-[#101828] text-[12px] xl:text-[22.31px] mb-5">
            Logo Designs
          </p>
          <p className="text-[#101828] text-[18px] md:text-[25.57px] xl:text-[48px] mb-5 font-semibold md:font-normal">
            Create a memorable logo that captures the essence of your brand.
          </p>
          <p className="text-[#101828] text-[16px] md:text-[8.84px] xl:text-[16.59px] leading-[1.5] mb-5">
            Let us find you that perfect colour, perfect font, and style for
            your brand
          </p>
          <p className="hidden md:block text-[#101828] md:text-[8px] xl:text-[9px] pb-5 border-b border-b-[#d9d9d9]">
            We cater for both multi-million companies, small businesses,
            professionals, individual brands, just name it.
          </p>

          <div className="hidden md:flex justify-between items-center md:mt-10 md:mb-8 xl:mt-25 xl:mb-15">
            <p className="text-[#101828] md:text-[8.91px] xl:text-[16.73px]">
              Receive multiple logo concepts to choose from
            </p>
            <p className="text-[#101828] md:text-[8.84px] xl:text-[16.59px]">
              Multiple revisions(Based on package)
            </p>
            <p className="text-[#101828] md:text-[9.06px] xl:text-[17.02px]">
              Complete satisfaction.
            </p>
          </div>

          <Link to="/services/graphics-consultation" onClick={HandleOrigins}>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-[#010413] text-[#fff] text-[14px] md:text-[10px] xl:text-[16px] text-center border border-[#010413] mt-3 md:mt-0 rounded-md px-6 py-2 xl:py-3 hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              Get free consultation
            </motion.button>
          </Link>
        </div>
      </motion.div>
      <motion.img
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750071713/Graphics%20page/humaaan-11_pyox5q.png"
        alt="outline-svg-1"
        className="hidden xl:block absolute bottom-0 left-[120px] xl:w-[560.23px] xl:h-[921.22px] object-cover"
      />
    </div>
  );
};

export default SectionOne;
