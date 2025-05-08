import React from "react";
import { Link } from "react-router-dom";

const PrintingCta = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#010413] text-[#fff] px-2 py-5 md:px-15">
      <div className="flex flex-col-reverse justify-center items-center md:grid md:grid-cols-2 md:gap-8">
        <div className="w-full h-[382.33px] md:h-[463.33px] lg:h-[800px] bg-[#ffc501] rounded-2xl overflow-hidden">
          <img
            src="https://i.ibb.co/60TNJtL3/ae3bfa13ccf709991e22a3b74450b625f5b8f7f0.png"
            alt="lady vector image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center mb-6 md:mb-0">
          <div className="bg-[#009379] w-[64px] h-[64px] md:w-[71.82px] md:h-[71.82px] lg:w-[124px] lg:h-[124px] mb-10 rounded-tr-[40%] rounded-bl-[40%] md:rounded-tr-[40%] md:rounded-bl-[40%] overflow-hidden"></div>
          <p
            className="text-[#fff] text-[25px] lg:text-[48px] text-center mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Ready to design and print?
          </p>
          <Link
            to="/services/printing-consultation"
            className="text-[#f7f7f7] text-[18.7px] lg:text-[36px] text-center underline cursor-pointer"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            onClick={handleOrigins}
          >
            Get a free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrintingCta;
