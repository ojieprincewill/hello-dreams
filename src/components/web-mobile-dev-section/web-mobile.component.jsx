import React from "react";

const WebMobile = () => {
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
        <div className="mt-6 flex flex-col w-full space-y-4 md:inline md:space-x-4">
          <button className="bg-[#010413] text-[#fff] font-semibold border border-[#010413] text-[16px] px-6 py-4 rounded-lg hover:bg-[#6941c6] hover:text-white hover:border-[#6941c6] transition-colors duration-300 cursor-pointer">
            Launch your project
          </button>
          <button className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[16px] px-12 py-4 rounded-lg hover:bg-[#6941c6] hover:text-white hover:border-[#6941c6] transition-colors duration-300 cursor-pointer">
            View service
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full">
        <div className="w-[40%] h-[560px] overflow-hidden">
          <img
            src="https://i.ibb.co/TDBYBXPq/web-mobile-image-1.jpg"
            alt="woman using phone"
            className="w-full h-full object-cover rounded-tr-2xl will-change-transform scale-x-[-1]"
          />
        </div>
        <div className="w-[60%]">
          <img
            src="https://i.ibb.co/BHKSC8T7/web-mobile-image-2.png"
            alt="abstract glob"
            className="absoute w-full h-full object-cover"
          />
          <img
            src="https://i.ibb.co/k24bNNbP/web-mobile-image-3.png"
            alt="sign in image"
            className="absoute w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default WebMobile;
