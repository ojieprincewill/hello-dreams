import React from "react";
import { Link } from "react-router-dom";

const WebMobile = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col-reverse md:flex-col">
      <div className="px-10 md:px-5 py-10 md:py-20 w-full text-center flex flex-col justify-center items-center">
        <h1 className="text-[24px] md:text-[52px] leading-[1.1] font-extrabold">
          Website & Mobile
          <br />
          App Development
        </h1>
        <p className="mt-4 md:mt-8 text-[16px] md:text-[36px] text-[#667085] font-semibold leading-[1.4]">
          No delays. No limitations.
          <br />→ <span className="text-[#1342ff]">Build fast.</span> Scale
          faster.
        </p>
        <div className="mt-6 md:mt-12 flex flex-col w-full md:w-[431px] lg:w-full space-y-4 lg:inline lg:space-x-4">
          <Link
            to="/services/app-dev-consultation"
            onClick={handleOrigins}
            className="bg-[#010413] text-[#fff] font-semibold border border-[#010413] text-[16px] px-6 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            Launch your project
          </Link>
          <Link
            to="/services/web-and-mobile-dev"
            onClick={handleOrigins}
            className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[16px] px-12 py-4 rounded-lg hover:text-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            View service
          </Link>
        </div>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-[45%_55%] w-full">
        <div className="bg-[#0c0c0c] w-full h-[386px] md:h-[845px] p-6 md:p-0 lg:rounded-tl-2xl">
          <img
            src="https://i.ibb.co/TDBYBXPq/web-mobile-image-1.jpg"
            alt="woman using phone"
            className="w-full h-full object-cover rounded-2xl lg:rounded-tr-2xl md:rounded-bl-none md:rounded-none scale-x-[-1]"
          />
        </div>
        <div className="relative w-full h-[549px] lg:h-[845px] p-6 md:p-0 overflow-hidden bg-[#0c0c0c] lg:rounded-tr-2xl">
          <img
            src="https://i.ibb.co/BHKSC8T7/web-mobile-image-2.png"
            alt="abstract glob"
            className="absolute w-[118.5px] h-[79px] md:w-[303px] md:h-[202px] object-contain"
          />
          <div className="absolute bottom-[150px] right-[-93px] md:bottom-[-120px] md:right-[-300px] w-[399px] h-[266px] md:w-[921px] md:h-[614px]">
            <img
              src="https://i.ibb.co/k24bNNbP/web-mobile-image-3.png"
              alt="sign in image"
              className="w-full h-full object-cover rounded-[12px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebMobile;
