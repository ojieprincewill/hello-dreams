import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const SectionThree = () => {
  const HandleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative bg-[#ff7f50]/12 h-max md:h-[526.66px] xl:h-[982px] px-[5%] py-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col-reverse md:grid md:grid-cols-2 w-full h-max md:h-[426.11px] xl:h-[800px] bg-[#fff] overflow-hidden rounded-2xl md:mt-4 xl:mt-8"
      >
        <div className="px-3 py-10 rounded-tr-2xl rounded-br-2xl ">
          <p className="text-[#101828] text-[12px] xl:text-[22.31px] mb-5">
            Marketing Collateral Design
          </p>
          <p className="text-[#101828] text-[18px] md:text-[25.57px] xl:text-[48px] mb-5 font-semibold md:font-normal">
            Enhance your marketing efforts with professionally designed
            brochures, flyers, and more
          </p>
          <p className="text-[#101828] text-[16px] md:text-[8.84px] xl:text-[16.59px] leading-[1.5] mb-5">
            Let us find you that perfect colour, perfect style, and rhythm
          </p>
          <p className="hidden md:block text-[#101828] md:text-[8px] xl:text-[9px] pb-5 border-b border-b-[#d9d9d9]">
            We cater for both multi-million companies, small businesses,
            professionals, individual brands, just name it.
          </p>

          <div className="hidden md:flex justify-between items-center md:mt-3 md:mb-4 xl:mt-25 xl:mb-15">
            <p className="text-[#101828] md:text-[8.91px] xl:text-[16.73px]">
              Find opportunities for every stage of your freelance career
            </p>
            <p className="text-[#101828] md:text-[8.84px] xl:text-[16.59px]">
              Control when, where and how you work
            </p>
            <p className="text-[#101828] md:text-[9.06px] xl:text-[17.02px]">
              Explore different ways to earn
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
        <div className="relative bg-[#efece9] rounded-2xl overflow-hidden">
          <span
            className="absolute top-[-15px] right-[-16px] w-[58.07px] h-[54.62px] md:w-[107.35px] md:h-[107.35px] flex justify-center items-center rounded-full bg-[#eef2fe] text-[#1342ff] text-[21.85px] md:text-[28.49px]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            3
          </span>
          <motion.img
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750071815/Graphics%20page/sitting-11_q8ghbu.png"
            alt="outline-svg-2"
            className="justify-self-center md:absolute md:bottom-[30px] md:right-[20px] w-[175.14px] h-full md:w-[300.23px] md:h-auto xl:hidden object-contain md:object-cover"
          />
        </div>
      </motion.div>
      <motion.img
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750071815/Graphics%20page/sitting-11_q8ghbu.png"
        alt="outline-svg-2"
        className="hidden xl:block absolute bottom-0 right-[70px] xl:w-[700.31px] xl:h-auto object-cover"
      />
    </div>
  );
};

export default SectionThree;
