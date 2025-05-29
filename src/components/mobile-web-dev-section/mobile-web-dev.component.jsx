import React from "react";
import { MobileWebData } from "../../data/mobile-web-data/mobile-web.data";

const MobileWebDev = () => {
  return (
    <div className="space-y-5">
      {MobileWebData.map((data) => (
        <div key={data.id} className="px-[5%] py-10">
          <p className="text-[#101828] text-[24px] lg:text-[48px] text-center font-bold mb-5 ">
            {data.header}
          </p>
          <p
            className="text-[#667085] text-[12px] lg:text-[17.44px] text-center mb-5 "
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {data.subHeader}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {data.options.map((option) => (
              <div key={option.id} className="p-1">
                <p
                  className="text-[#336aea]/80 text-[15px] md:[14px] lg:text-[12px] font-semibold uppercase mb-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {option.title}
                </p>
                <p
                  className="text-[#424242] text-[12px] md:text-[17px] mb-5 leading-[1.5]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {option.text}
                </p>
                <div className="w-full h-[168px] ">
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileWebDev;
