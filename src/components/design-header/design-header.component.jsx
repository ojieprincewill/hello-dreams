import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import NavBar from "../landing-header/nav-bar/nav-bar.component";

const DesignHeader = () => {
  const handleOrigins = () => {};

  return (
    <div className="pt-3 md:pt-0">
      <NavBar />
      <div className="flex flex-col justify-center items-center py-15 px-2 space-y-6 md:space-y-10 w-full">
        <div className="relative flex justify-center items-center">
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065857/UI%20page/2aaf09dec80b069b0f6f76a9f44fffc43c81b19d_exojjf.jpg"
            alt="image 1"
            className="w-[45.98px] h-[45.98px] rounded-full absolute left-[-158%] z-2 border-[1.53px] border-[#f7f7f7] object-cover"
          />
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065857/UI%20page/62b2de863e5c02d1c4d27a7ec3537a08183734bc_ngoldo.jpg"
            alt="image 2"
            className="w-[50.57px] h-[50.57px] rounded-full absolute left-[-113%] z-4 border-[1.53px] border-[#f7f7f7] object-cover"
          />
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065859/UI%20page/135106515afff8295a2734482a2d9bf7c1e90494_lzv2rw.jpg"
            alt="image 3"
            className="w-[58.24px] h-[58.24px] rounded-full absolute left-[-63%] z-8 border-[1.53px] border-[#f7f7f7] object-cover"
          />

          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065857/UI%20page/4b71756b2dfdef5d27bf29ac91dee569bdec2870_hp70qm.jpg"
            alt="center image"
            className="w-[67.43px] h-[67.43px] rounded-full relative z-10 border-[1.53px] border-[#f7f7f7] object-cover"
          />

          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065860/UI%20page/ea0d1d301d8a4b419133d9a1a773a1c83f611d08_xtnsa7.jpg"
            alt="image 5"
            className="w-[58.24px] h-[58.24px] rounded-full absolute right-[-63%] z-8 border-[1.53px] border-[#f7f7f7] object-cover"
          />
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065857/UI%20page/62b2de863e5c02d1c4d27a7ec3537a08183734bc_ngoldo.jpg"
            alt="image 4"
            className="w-[50.57px] h-[50.57px] rounded-full absolute right-[-113%] z-4 border-[1.53px] border-[#f7f7f7] object-cover"
          />
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065857/UI%20page/2aaf09dec80b069b0f6f76a9f44fffc43c81b19d_exojjf.jpg"
            alt="image 7"
            className="w-[45.98px] h-[45.98px] rounded-full absolute right-[-158%] z-2 border-[1.53px] border-[#f7f7f7] object-cover"
          />
        </div>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[#000000] text-[24px] md:text-[33.36px] xl:text-[56px] text-center font-medium md:font-bold xl:w-[900px]"
          >
            Digital Experiences With Expert UI/UX Design
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-[#07111d] text-[12px] xl:text-[18px] text-center xl:font-bold mt-5"
          >
            Say goodbye to bad user experience reviews. Say hello to 5-star
            reviews.
          </motion.p>
        </div>
        <Link
          to="/services/ui-design-consultation"
          onClick={handleOrigins}
          className="flex justify-center items-center"
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] text-[10.91px] xl:text-[16px] px-6 py-3 xl:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            Get a Free Consultation
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default DesignHeader;
