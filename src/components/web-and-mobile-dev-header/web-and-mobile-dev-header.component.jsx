import React from "react";

const WebMobileDevHeader = () => {
  return (
    <div className="relative bg-[#7a2635] w-full h-[895px] p-5 flex flex-col justify-center items-center">
      <p className="text-[#fff] text-[12px] text-center mt-20 mb-5">
        Software Development
      </p>
      <p className="text-[#fff] text-[24px] text-center font-extrabold mb-5">
        Mobile & Web Application Development
      </p>

      <div className="w-[826px] h-[669.5px]">
        <img
          src="https://i.ibb.co/PvdF9Hs4/20ba4270e4326bd6aa535fea66f3bbbbb7fcfdc5.png"
          alt="phone mock-up"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="absolute left-[240px] top-[315px] text-[#fff] text-[24px] font-medium">
        iOS app development
      </p>
      <p className="absolute left-[190px] top-[445px] text-[#fff] text-[24px] font-medium">
        App design
      </p>
      <p className="absolute right-[70px] top-[390px] text-[#fff] text-[24px] font-medium">
        E-commerce solutions
      </p>
      <p className="absolute right-[20px] top-[510px] text-[#fff] text-[24px] font-medium">
        cutting-edge technologies
      </p>
    </div>
  );
};

export default WebMobileDevHeader;
