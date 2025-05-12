import React from "react";
import { Link } from "react-router-dom";

const SectionFour = () => {
  const HandleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative bg-[#eef2fe] h-[1082px] px-[5%] py-5">
      <div className="grid grid-cols-2 w-full h-[800px] bg-[#fff] overflow-hidden rounded-2xl mt-8">
        <div className="relative bg-[#efece9] rounded-2xl overflow-hidden">
          <span className="absolute top-[-15px] left-[-16px] w-[107.35px] h-[107.35px] flex justify-center items-center rounded-full bg-[#eef2fe] text-[#1342ff] text-[28.49px]">
            4
          </span>
        </div>
        <div className="px-3 py-10 rounded-tr-2xl rounded-br-2xl ">
          <p className="text-[#101828] text-[22.31px] mb-5">Packaging Design</p>
          <p
            className="text-[#101828] text-[48px] mb-5 "
            style={{ fontFamily: "Georgia, serif" }}
          >
            Make your products stand out on the shelves with our eye-catching
            packaging designs
          </p>
          <p className="text-[#101828] text-[16.59px] mb-5">
            Let us find you that perfect colour, perfect style, and rhythm
          </p>
          <p className="text-[#101828] text-[9px] pb-5 border-b border-b-[#d9d9d9]">
            We cater for both multi-million companies, small businesses,
            professionals, individual brands, just name it.
          </p>

          <div className="flex justify-between items-center mt-25 mb-15">
            <p className="text-[#101828] text-[16.73px]">
              Mock-up presentations
            </p>
            <p className="text-[#101828] text-[16.59px]">
              Visualize your packaging in a real-world context
            </p>
            <p className="text-[#101828] text-[17.02px]">100% satisfaction</p>
          </div>

          <Link to="/services/graphics-consultation" onClick={HandleOrigins}>
            <button className="bg-[#0c4bf6] text-[#fff] text-center border border-[#0c4bf6] rounded-3xl px-6 py-2 hover:bg-[#1342ff] transition-colors duration-300 cursor-pointer">
              Get free consultation
            </button>
          </Link>
        </div>
      </div>
      <img src="" alt="outline-svg-1" className="absolute" />
    </div>
  );
};

export default SectionFour;
