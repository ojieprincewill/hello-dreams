import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../landing-header/nav-bar/nav-bar.component";

const GraphicsDesignHeader = () => {
  const HandleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative bg-[#ffc501] py-3 md:pl-15 lg:pl-30 md:py-15 h-[755px] md:h-[663.07px] lg:h-[1024px] overflow-hidden">
      <NavBar />
      <p
        className="text-[#101828] text-[28px] md:text-[32px] lg:text-[56px] text-center md:text-left font-bold w-[222.56px] pt-10 md:pt-0 mx-auto md:mx-0 md:w-[207px] lg:w-[353px] leading-[1.2] mb-3 md:mb-6 "
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        We are your creative Design
      </p>
      <div
        className="absolute top-[115px] left-[75%] md:top-[200px] md:left-[200px] lg:top-[270px] lg:left-[378px] bg-[#ff7f50] text-[#f7f7f7] text-[17.89px] md:text-[32px] lg:text-[56px] text-center rounded-[50px] w-[66.33px] md:w-[121.49px] lg:w-[207px] drop-shadow-[7px_11px_7px] drop-shadow-[#ff7f50ca] rotate-[-24.79deg]"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Studio
      </div>
      <p className="text-[#101828] text-[14px] lg:text-[24px] w-[90%] mx-auto md:mx-0 md:w-[357px] lg:w-[606px] text-center md:text-left leading-[1.2] mb-3 md:mb-6 ">
        We transform ambitions into reality. Whether you're an individual
        seeking growth or a business aiming for excellence, our tailored
        solutions are designed to elevate your journey.
      </p>
      <Link
        to="/services/graphics-consultation"
        onClick={HandleOrigins}
        className="pt-3 flex justify-center items-center md:justify-start"
      >
        <button
          className="bg-[#fff] text-[#010413] font-semibold border border-[#fff] text-[11.2px] md:text-[14px] lg:text-[24px] px-6 py-2 w-[195px] h-[35.92px] md:w-[242.09px] md:h-[44.6px] lg:w-[418px] lg:h-[77px] rounded-[50px] hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Get a free consultation
        </button>
      </Link>
      <div className="flex justify-center items-center mt-[60px] mx-auto md:mt-0 md:mx-0 md:absolute md:bottom-[-78px] md:right-[-90px] lg:bottom-[-150px] lg:right-[-80px] w-[347.88px] h-[425px] md:w-[500.15px] md:h-[626.36px] lg:w-[717px] lg:h-[1060px] z-10 ">
        <img
          src="https://i.ibb.co/zTdDmrmZ/6527a11476dcd5faaa261ff1fed9c452177868b4.png"
          alt="3d-man"
          className="w-full h-full object-cover"
        />
      </div>

      <img
        src="https://i.ibb.co/XxZGzTJF/graphic-doddles.png"
        alt="doodle"
        className="absolute bottom-0 left-0 w-[80px] md:w-[160.57px] lg:w-[260.57px] h-auto md:z-10"
      />
      <img
        src="https://i.ibb.co/1GPDhstT/graphics-doddles-2.png"
        alt="doodle"
        className="absolute top-[35%] left-[-30px] md:top-[60px] lg:top-[80px] md:left-[45%] w-[80px] md:w-[130.57px] lg:w-[230.57px] h-auto rotate-[-90deg] md:rotate-0"
      />
      <img
        src="https://i.ibb.co/FbmbkNYJ/graphics-doddles-3.png"
        alt="doodle"
        className="absolute bottom-[40%] right-[-35px] md:bottom-0 md:right-[40%] w-[100.57px] lg:w-[200.57px] h-auto rotate-[-90deg] md:rotate-0"
      />

      <div
        className="absolute bottom-[370px] left-[80px] md:bottom-[120px] md:left-[50px] lg:bottom-[190px] lg:left-[70px] bg-[#008080] text-[#f7f7f7] text-[13.11px] md:text-[32px] lg:text-[56px] text-center rounded-[50px] w-[65.32px] md:w-[160.8px] lg:w-[277px] drop-shadow-[7px_11px_7px] drop-shadow-[#ff7f50ca] rotate-[-46.03deg]"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Branding
      </div>
      <div
        className="absolute bottom-[360px] left-[120px] md:bottom-[100px] md:left-[150px] lg:bottom-[180px] lg:left-[255px] bg-[#1342ff] text-[#f7f7f7] text-[13.11px] md:text-[32px] lg:text-[56px] text-center rounded-[50px] w-[59.42px] md:w-[145.8px] lg:w-[251px] drop-shadow-[7px_11px_7px] drop-shadow-[#ff7f50ca] rotate-[-24.79deg]"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Printing
      </div>
      <div
        className="absolute bottom-[340px] left-[140px] md:bottom-[50px] md:left-[180px] lg:bottom-[90px] lg:left-[300px] bg-[#eef2fe] text-[#010413] text-[13.11px] md:text-[32px] lg:text-[56px] text-center rounded-[50px] w-[82.03px] md:w-[201.8px] lg:w-[348px] drop-shadow-[7px_11px_7px] drop-shadow-[#ff7f50ca] rotate-[-14.01deg]"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Logo Design
      </div>
    </div>
  );
};

export default GraphicsDesignHeader;
