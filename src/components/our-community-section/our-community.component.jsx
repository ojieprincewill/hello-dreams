import React from "react";
import { CommunityData } from "../../data/community-data/community.data";

const OurCommunity = () => {
  const dataClasses = {
    small: "w-[30%]",
    large: "w-[40%]",
  };

  return (
    <div className="bg-[#f6f6f8] px-[5%] py-10 md:py-20">
      <div className="w-full  text-center flex flex-col justify-center datas-center p-5 md:pb-10">
        <h1 className="text-[#010413] text-[24px] md:text-[48px] leading-[1.1] font-semibold md:font-bold">
          Our Community
        </h1>
        <p className="mt-4 md:mt-8 text-[16px] md:text-[20px] text-[#667085] md:font-semibold leading-[1.4]">
          Join over <span className="text-[#010413]">2000+</span> beautiful
          people in
          <br />
          Hello Dreams Community
        </p>
        <div className="mt-6 flex flex-col w-full space-y-4 md:inline md:space-x-4">
          <button className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-6 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
            UI/UX Design Challenge
          </button>
          <button className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-12 py-4 rounded-lg hover:text-[#1342ff] transition-colors duration-300 cursor-pointer">
            Join Community
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {CommunityData.map((data) => (
          <div
            key={data.id}
            className={`w-full h-[59.21px] md:h-[203.18px] ${
              dataClasses[data.size]
            }`}
          >
            <img
              src={data.image}
              alt={`Bento Grid Image ${data.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurCommunity;
