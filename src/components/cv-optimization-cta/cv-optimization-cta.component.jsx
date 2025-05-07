import React from "react";
import { Link } from "react-router-dom";

const CvOptimizationCta = () => {
  const HandleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#010413] text-[#fff] px-2 py-5 md:px-10">
      <div className="flex flex-col-reverse justify-center items-center md:grid md:grid-cols-2 md:gap-8">
        <div className="w-full h-[382.33px] md:h-[463.33px] lg:h-[800px] bg-[#ffc501] rounded-2xl overflow-hidden">
          <img
            src="https://i.ibb.co/60TNJtL3/ae3bfa13ccf709991e22a3b74450b625f5b8f7f0.png"
            alt="lady vector image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center mb-6 md:mb-0">
          <div className="bg-[#ff6250] w-[66.54px] h-[66.54px] lg:w-[124px] lg:h-[124px] mb-4 rounded-tr-[100%] overflow-hidden"></div>
          <p
            className="text-[#fff] text-[25px] lg:text-[40px] text-center mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Ready to elevate your professional career?
          </p>
          <Link
            to="/services/optimize-profile"
            className="text-[#f7f7f7] text-[18.7px] lg:text-[36px] text-center underline cursor-pointer"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            onClick={HandleOrigins}
          >
            Optimize your profile now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CvOptimizationCta;
