import React from "react";

const PrintingSection = () => {
  return (
    <div className="flex flex-col-reverse md:flex-col py-10 md:py-22">
      <div className="w-full  text-center flex flex-col justify-center items-center p-5 md:pb-10">
        <h1 className="text-[#010413] text-[24px] md:text-[48px] leading-[1.1] font-semibold md:font-bold">
          Printing
        </h1>
        <p className="mt-4 md:mt-8 text-[16px] md:text-[20px] text-[#667085] font-bold leading-[1.4]">
          Professional & clean
        </p>
        <div className="mt-6 flex flex-col w-full space-y-4 md:inline md:space-x-4">
          <button className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-6 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
            Start Printing
          </button>
          <button className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-12 py-4 rounded-lg hover:text-[#1342ff] transition-colors duration-300 cursor-pointer">
            View service
          </button>
        </div>
      </div>
      <div className="bg-[#ffadd9] w-full h-[420px] md:h-[761px] rounded-xl">
        <img
          src="https://i.ibb.co/5g545Bcy/fb3b12a1f7966448ea8070205ed1cd33afc5c66c.png"
          alt="products mock-up"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default PrintingSection;
