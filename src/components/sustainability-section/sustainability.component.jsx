import React from "react";
import FaqSection from "../faq-section/faq-section.component";

const Sustainability = () => {
  return (
    <div className="bg-[#f6f6f8] px-[5%] py-10 md:py-20">
      <div className="w-full  text-center flex flex-col justify-center datas-center p-5 md:pb-10">
        <h1 className="text-[#010413] text-[24px] md:text-[48px] leading-[1.1] font-semibold md:font-bold">
          Sustainability
        </h1>
        <p className="mt-4 md:mt-8 text-[16px] md:text-[20px] text-[#667085] md:font-semibold leading-[1.4]">
          Let's thrive today without destroying tomorrow
        </p>
        <div className="mt-6 flex flex-col w-full space-y-4 md:inline md:space-x-4">
          <button className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-6 py-4 rounded-lg hover:bg-[#6941c6] hover:text-white hover:border-[#6941c6] transition-colors duration-300 cursor-pointer">
            Read our articles
          </button>
        </div>
      </div>
      <div className=" w-full h-[326px] md:h-[712px] rounded-2xl">
        <img
          src="https://i.ibb.co/R4spbscs/c319512efcbe5bfb4e9ea0ef67c0e607ea8d5f7b.jpg"
          alt="ladies holding up sign"
          className="w-full h-full object-cover object-center rounded-2xl"
        />
      </div>
      <FaqSection />
    </div>
  );
};

export default Sustainability;
