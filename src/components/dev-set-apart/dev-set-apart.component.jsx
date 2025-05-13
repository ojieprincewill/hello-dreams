import React from "react";
import { DevSetApartData } from "../../data/set-apart-data/set-apart-data";
const DevSetApart = () => {
  return (
    <div className="w-full px-[5%] lg:px-[10%] py-10 md:py-20">
      <p className="text-[24px] lg:text-[48px] text-[#101828] text-center font-bold mb-2">
        What Sets Us Apart
      </p>
      <p
        className="text-[12px] lg:text-[17.44px] text-[#667085] text-center mb-15"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        innovative solutions, user-centric designs, and cutting-edge
        technologies
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-7">
        {DevSetApartData.map((data) => (
          <div key={data.id} className="p-3 border border-[#ccc] rounded-2xl">
            <div className="bg-[#efece9] flex justify-center items-center p-3 rounded-xl">
              <img
                src={data.image}
                alt={data.title}
                className="w-[162.38px] h-[162.38px] md:w-[188.58px] md:h-[126.88px]  lg:w-[192px] lg:h-[192px] "
              />
            </div>
            <p
              className="text-[#101010] text-[20px] md:text-[16px] lg:text-[22px] font-bold my-3"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {data.title}
            </p>
            <p
              className="text-[#667085] text-[14px] md:text-[12px] lg:text-[16px] leading-[1.5] mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {data.text}
            </p>
            <div className="mt-3">
              <button className="w-full bg-[#1342ff] lg:bg-[#010413] text-[#f7f7f7] font-semibold border border-[#1342ff] lg:border-[#010413] text-[10.91px] lg:text-[16px] px-6 py-2 rounded-lg lg:rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
                Learn more
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevSetApart;
