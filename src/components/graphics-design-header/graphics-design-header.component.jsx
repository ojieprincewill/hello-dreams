import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../landing-header/nav-bar/nav-bar.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const GraphicsDesignHeader = () => {
  const HandleOrigins = () => {};

  return (
    <div className="relative bg-[#ffc501] py-3 md:pl-15 xl:pl-30 md:py-15 h-[755px] md:h-[663.07px] xl:h-[1024px] overflow-hidden">
      <NavBar />
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-[#101828] text-[28px] md:text-[32px] xl:text-[56px] text-center md:text-left font-bold w-[222.56px] pt-10 md:pt-0 mx-auto md:mx-0 md:w-[207px] xl:w-[353px] leading-[1.2] mb-3 md:mb-6 "
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        We are your creative Design
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="absolute top-[115px] left-[75%] md:top-[200px] md:left-[200px] xl:top-[270px] xl:left-[378px] bg-[#ff7f50] text-[#f7f7f7] text-[17.89px] md:text-[32px] xl:text-[56px] text-center rounded-[50px] w-[66.33px] md:w-[121.49px] xl:w-[207px] drop-shadow-[7px_11px_7px] drop-shadow-[#ff7f50ca] rotate-[-24.79deg]"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Studio
      </motion.div>
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-[#101828] text-[14px] xl:text-[24px] w-[90%] mx-auto md:mx-0 md:w-[357px] xl:w-[606px] text-center md:text-left leading-[1.2] mb-3 md:mb-6 "
      >
        We transform ambitions into reality. Whether you're an individual
        seeking growth or a business aiming for excellence, our tailored
        solutions are designed to elevate your journey.
      </motion.p>
      <Link
        to="/services/graphics-consultation"
        onClick={HandleOrigins}
        className="pt-3 flex justify-center items-center md:justify-start"
      >
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-[#fff] text-[#010413] font-semibold border border-[#fff] text-[11.2px] md:text-[14px] xl:text-[24px] px-6 py-2 w-[195px] h-[35.92px] md:w-[242.09px] md:h-[44.6px] xl:w-[418px] xl:h-[77px] rounded-[50px] hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Get a free consultation
        </motion.button>
      </Link>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex justify-center items-center mt-[60px] mx-auto md:mt-0 md:mx-0 md:absolute md:bottom-[-78px] md:right-[-90px] xl:bottom-[-150px] xl:right-[-80px] w-[347.88px] h-[425px] md:w-[500.15px] md:h-[626.36px] xl:w-[717px] xl:h-[1060px] z-10 "
      >
        <img
          src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750071713/Graphics%20page/6527a11476dcd5faaa261ff1fed9c452177868b4_1_cav2us.png"
          alt="3d-man"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <img
        src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750071812/Graphics%20page/graphic_doddles_db1pbh.png"
        alt="doodle"
        className="absolute bottom-0 left-0 w-[80px] md:w-[160.57px] xl:w-[260.57px] h-auto md:z-10"
      />
      <img
        src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750071813/Graphics%20page/graphics_doddles_2_gdgmhw.png"
        alt="doodle"
        className="absolute top-[35%] left-[-30px] md:top-[60px] xl:top-[80px] md:left-[45%] w-[80px] md:w-[130.57px] xl:w-[230.57px] h-auto rotate-[-90deg] md:rotate-0"
      />
      <img
        src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750071813/Graphics%20page/graphics_doddles_3_d0mjjw.png"
        alt="doodle"
        className="absolute bottom-[40%] right-[-35px] md:bottom-0 md:right-[40%] w-[100.57px] xl:w-[200.57px] h-auto rotate-[-90deg] md:rotate-0"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute bottom-[370px] left-[80px] md:bottom-[120px] md:left-[50px] xl:bottom-[190px] xl:left-[70px] bg-[#008080] text-[#f7f7f7] text-[13.11px] md:text-[32px] xl:text-[56px] text-center rounded-[50px] w-[65.32px] md:w-[160.8px] xl:w-[277px] drop-shadow-[7px_11px_7px] drop-shadow-[#ff7f50ca] rotate-[-46.03deg]"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Branding
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="absolute bottom-[360px] left-[120px] md:bottom-[100px] md:left-[150px] xl:bottom-[180px] xl:left-[255px] bg-[#1342ff] text-[#f7f7f7] text-[13.11px] md:text-[32px] xl:text-[56px] text-center rounded-[50px] w-[59.42px] md:w-[145.8px] xl:w-[251px] drop-shadow-[7px_11px_7px] drop-shadow-[#ff7f50ca] rotate-[-24.79deg]"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Printing
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        className="absolute bottom-[340px] left-[140px] md:bottom-[50px] md:left-[180px] xl:bottom-[90px] xl:left-[300px] bg-[#eef2fe] text-[#010413] text-[13.11px] md:text-[32px] xl:text-[56px] text-center rounded-[50px] w-[82.03px] md:w-[201.8px] xl:w-[348px] drop-shadow-[7px_11px_7px] drop-shadow-[#ff7f50ca] rotate-[-14.01deg]"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Logo Design
      </motion.div>
    </div>
  );
};

export default GraphicsDesignHeader;
