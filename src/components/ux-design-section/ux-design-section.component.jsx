import React from "react";

const UxDesignSection = () => {
  return (
    <div className="flex flex-col-reverse md:flex-col">
      <div className="px-10 md:px-5 py-10 md:py-20 w-full text-center flex flex-col justify-center items-center">
        <h1 className="text-[24px] md:text-[52px] leading-[1.1] font-extrabold">
          UI/UX Design
        </h1>
        <p className="mt-4 md:mt-8 text-[16px] md:text-[36px] text-[#667085] font-semibold leading-[1.4]">
          No clutter. No confusion.
          <br />→ Just <span className="text-[#1342ff]">seamless</span>{" "}
          experiences.
        </p>
        <div className="mt-6 flex flex-col w-full space-y-4 md:inline md:space-x-4">
          <button className="bg-[#010413] text-[#fff] font-semibold border border-[#010413] text-[16px] px-6 py-4 rounded-lg hover:bg-[#6941c6] hover:text-white hover:border-[#6941c6] transition-colors duration-300 cursor-pointer">
            Design your idea
          </button>
          <button className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[16px] px-12 py-4 rounded-lg hover:bg-[#6941c6] hover:text-white hover:border-[#6941c6] transition-colors duration-300 cursor-pointer">
            View service
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#1e276c] via-[#7081c7] to-[#ffffff] w-full text-[#fff] h-[845px] pl-6 md:pl-20 py-5 md:py-25">
        <div className="w-[220px] md:w-[540px]">
          <p className="text-[16px] md:text-[40px] leading-[1.1] font-extrabold">
            Effortless Design.
            <br />
            Impactful Experiences.
          </p>
          <p className="mt-4 text-[12px] md:text-[24px] leading-[normal]">
            We craft digital experiences that are not just beautiful, but
            functional. From research to pixel-perfect designs, we ensure your
            users stay engaged and satisfied.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UxDesignSection;
