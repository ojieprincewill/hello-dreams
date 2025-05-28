import React from "react";
import { Link } from "react-router-dom";

const SectionOne = () => {
  const HandleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative bg-[#eef2fe] h-[1082px] px-[5%] py-5">
      <p className="text-[#101828] text-[48px] font-bold text-center py-7">
        Graphics & Branding
      </p>
      <div className="grid grid-cols-2 w-full h-[800px] bg-[#fff] overflow-hidden rounded-2xl mt-8">
        <div className="relative bg-[#efece9] rounded-2xl overflow-hidden">
          <span className="absolute top-[-15px] left-[-16px] w-[107.35px] h-[107.35px] flex justify-center items-center rounded-full bg-[#eef2fe] text-[#1342ff] text-[28.49px]">
            1
          </span>
        </div>
        <div className="px-3 py-10 rounded-tr-2xl rounded-br-2xl ">
          <p className="text-[#101828] text-[22.31px] mb-5">Logo Designs</p>
          <p
            className="text-[#101828] text-[48px] mb-5 "
            style={{ fontFamily: "Georgia, serif" }}
          >
            Create a memorable logo that captures the essence of your brand.
          </p>
          <p className="text-[#101828] text-[16.59px] mb-5">
            Let us find you that perfect colour, perfect font, and style for
            your brand
          </p>
          <p className="text-[#101828] text-[9px] pb-5 border-b border-b-[#d9d9d9]">
            We cater for both multi-million companies, small businesses,
            professionals, individual brands, just name it.
          </p>

          <div className="flex justify-between items-center mt-25 mb-15">
            <p className="text-[#101828] text-[16.73px]">
              Receive multiple logo concepts to choose from
            </p>
            <p className="text-[#101828] text-[16.59px]">
              Multiple revisions(Based on package)
            </p>
            <p className="text-[#101828] text-[17.02px]">
              Complete satisfaction.
            </p>
          </div>

          <Link to="/services/graphics-consultation" onClick={HandleOrigins}>
            <button className="bg-[#010413] text-[#fff] text-center border border-[#010413] rounded-md px-6 py-3 hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
              Get free consultation
            </button>
          </Link>
        </div>
      </div>
      <img
        src="https://i.ibb.co/YTdTfzvW/humaaan-11.png"
        alt="outline-svg-1"
        className="absolute bottom-0 left-[170px] w-[560.23px] h-[921.22px] object-cover"
      />
    </div>
  );
};

export default SectionOne;
