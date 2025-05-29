import React from "react";

const WebMobileDevHeader = () => {
  return (
    <div className=" bg-[#7a2635] w-full h-[441px] md:h-[518.71px] lg:h-[895px] p-5 flex flex-col justify-center items-center">
      <p className="hidden md:block text-[#fff] text-[12px] text-center mt-20 mb-5">
        Software Development
      </p>
      <p className="text-[#fff] text-[16px] md:text-[20px] lg:text-[24px] w-[259px] md:w-full text-center font-extrabold mb-5">
        Mobile & Web Application Development
      </p>

      <div className="relative mt-3 md:mt-0 w-[269.73px] h-[211px] md:w-[594.64px] md:h-[445.98px] lg:w-[826px] lg:h-[669.5px]">
        <img
          src="https://i.ibb.co/PvdF9Hs4/20ba4270e4326bd6aa535fea66f3bbbbb7fcfdc5.png"
          alt="phone mock-up"
          className="w-full h-full object-cover"
        />
        <p className="absolute left-[-15px] top-[10px] md:left-[80px] md:top-[80px] lg:md:-[60px] lg:top-[120px] text-[#fff] text-[12px] md:text-[13.91px] lg:text-[24px] font-medium">
          iOS app development
        </p>
        <p className="absolute left-[-15px] top-[80px] md:left-[60px] md:top-[180px]  lg:left-[20px] lg:top-[250px] text-[#fff] text-[12px] md:text-[13.91px] lg:text-[24px] font-medium">
          App design
        </p>
        <p className="absolute right-[-20px] top-[190px] md:right-[-50px] md:top-[140px]  lg:right-[-150px] lg:top-[200px] text-[#fff] text-[12px] md:text-[13.91px] lg:text-[24px] font-medium">
          E-commerce solutions
        </p>
        <p className="absolute right-[50px] top-[230px] md:right-[-80px] md:top-[230px]  lg:right-[-200px] lg:top-[340px] text-[#fff] text-[12px] md:text-[13.91px] lg:text-[24px] font-medium">
          cutting-edge technologies
        </p>
      </div>
    </div>
  );
};

export default WebMobileDevHeader;
