import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../landing-header/nav-bar/nav-bar.component";

const GraphicsDesignHeader = () => {
  const HandleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative bg-[#ffc501] pl-30 py-15 h-[1024px] overflow-hidden">
      <NavBar />
      <p
        className="text-[#101828] text-[56px] font-bold w-[353px] leading-[1.2] mb-6 "
        // style={{ fontFamily: "Georgia, serif" }}
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        We are your creative Design
      </p>
      <div
        className="absolute top-[270px] left-[378px] bg-[#ff7f50] text-[#f7f7f7] text-[56px] text-center rounded-[50px] w-[207px] drop-shadow-[7px_11px_7px] drop-shadow-[#ff7f50ca] rotate-[-24.79deg]"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Studio
      </div>
      <p className="text-[#101828] text-[24px] w-[606px] leading-[1.2] mb-6 ">
        We transform ambitions into reality. Whether you're an individual
        seeking growth or a business aiming for excellence, our tailored
        solutions are designed to elevate your journey.
      </p>
      <Link
        to="/services/graphics-consultation"
        onClick={HandleOrigins}
        className="pt-3"
      >
        <button
          className="bg-[#fff] text-[#010413] font-semibold border border-[#fff] text-[10.91px] lg:text-[24px] px-6 py-2 w-[418px] h-[77px] rounded-[50px] hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Get a free consultation
        </button>
      </Link>
      <div className="absolute bottom-[-150px] right-[-80px] w-[717px] h-[1060px] ">
        <img
          src="https://i.ibb.co/zTdDmrmZ/6527a11476dcd5faaa261ff1fed9c452177868b4.png"
          alt="3d-man"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="absolute bottom-[170px] left-[70px] bg-[#008080] text-[#f7f7f7] text-[56px] text-center rounded-[50px] w-[277px] drop-shadow-[7px_11px_7px] drop-shadow-[#ff7f50ca] rotate-[-46.03deg]"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Branding
      </div>
      <div
        className="absolute bottom-[150px] left-[255px] bg-[#1342ff] text-[#f7f7f7] text-[56px] text-center rounded-[50px] w-[251px] drop-shadow-[7px_11px_7px] drop-shadow-[#ff7f50ca] rotate-[-24.79deg]"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Printing
      </div>
      <div
        className="absolute bottom-[70px] left-[300px] bg-[#eef2fe] text-[#010413] text-[56px] text-center rounded-[50px] w-[348px] drop-shadow-[7px_11px_7px] drop-shadow-[#ff7f50ca] rotate-[-14.01deg]"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Logo Design
      </div>
    </div>
  );
};

export default GraphicsDesignHeader;
