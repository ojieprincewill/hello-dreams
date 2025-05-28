import React from "react";
import { Link } from "react-router-dom";

const SectionTwo = () => {
  const HandleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative bg-[#008080]/12 h-[982px] px-[5%] py-5">
      <div className="grid grid-cols-2 w-full h-[800px] bg-[#fff] overflow-hidden rounded-2xl mt-8">
        <div className="px-3 py-10 rounded-tr-2xl rounded-br-2xl ">
          <p className="text-[#101828] text-[22.31px] mb-5">
            Branding Packages
          </p>
          <p
            className="text-[#101828] text-[48px] mb-5 "
            style={{ fontFamily: "Georgia, serif" }}
          >
            Develop a cohesive brand identity with our complete branding
            solutions.
          </p>
          <p className="text-[#101828] text-[16.59px] mb-5">
            Let us find you that perfect brand identity
          </p>
          <p className="text-[#101828] text-[9px] pb-5 border-b border-b-[#d9d9d9]">
            We cater for both multi-million companies, small businesses,
            professionals, individual brands, just name it.
          </p>

          <div className="flex justify-between items-center mt-25 mb-15">
            <p className="text-[#101828] text-[16.73px]">
              Get a brand style guide
            </p>
            <p className="text-[#101828] text-[16.59px]">
              Get color palettes, typography
            </p>
            <p className="text-[#101828] text-[17.02px]">
              Guidelines to maintain brand consistency.
            </p>
          </div>

          <Link to="/services/graphics-consultation" onClick={HandleOrigins}>
            <button className="bg-[#010413] text-[#fff] text-center border border-[#010413] rounded-md px-6 py-3 hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
              Get free consultation
            </button>
          </Link>
        </div>
        <div className="relative bg-[#efece9] rounded-2xl overflow-hidden">
          <span className="absolute top-[-15px] right-[-16px] w-[107.35px] h-[107.35px] flex justify-center items-center rounded-full bg-[#eef2fe] text-[#1342ff] text-[28.49px]">
            2
          </span>
        </div>
      </div>
      <img
        src="https://i.ibb.co/fV5QQRsJ/sitting-1.png"
        alt="outline-svg-2"
        className="absolute bottom-0 right-[80px] w-[747.31px] h-[890px] object-cover"
      />
    </div>
  );
};

export default SectionTwo;
