import React from "react";
import { SocialProcessData } from "../../data/our-process-data/our-process.data";

const OurSocialServices = () => {
  return (
    <div className="w-full px-[5%] py-15">
      <p className="text-[24px] lg:text-[48px] text-[#101828] text-center font-bold mb-2">
        Our Services
      </p>
      <p
        className="text-[12px] lg:text-[17.44px] text-[#667085] text-center capitalize"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Social Media Management
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 mt-10 md:mt-20 ">
        {SocialProcessData.map((data) => (
          <div
            key={data.id}
            className="bg-[#fafafa] h-[386px] flex flex-col justify-center p-2 lg:p-5 items-center shadow-lg shadow-[#d2d2f5b0] rounded-xl md:mb-20"
          >
            <div className="w-[54.64px] md:w-[60px] h-[54.64px] md:h-[60px] bg-[#1342ff] rounded-lg">
              {/* <img
                      src=""
                      alt="svg icon"
                      className="w-[35px] h-[35px] object-contain"
                    /> */}
            </div>
            <p className="text-[19px] md:text-[20px] text-[#30364d] font-bold text-center my-4 ">
              {data.title}
            </p>
            <p className="text-[15px] md:text-[14px] text-[#30364d] text-center leading-[1.7] ">
              {data.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurSocialServices;
