import React from "react";
import { AboutExpertsData } from "../../data/choose-us-data/choose-us.data";

const AboutExperts = () => {
  return (
    <div className="w-full px-[5%] py-10">
      <p className="text-[24px] lg:text-[48px] text-[#101828] text-center font-bold mb-2">
        Meet Our Team of Experts
      </p>

      <div className="w-full mt-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {AboutExpertsData.map((data) => (
          <div key={data.id} className="p-3 border border-[#dfdfe2] rounded-xl">
            <div className="w-full h-[221.35px] md:h-[286.65px] lg:h-[360px] mb-5">
              <img
                src={data.image}
                alt={data.name}
                className="w-full h-full object-cover rounded-lg "
              />
            </div>
            <p className="text-[#101828] text-[12px] md:text-[14px] lg:text-[18px] font-semibold mb-2">
              {data.name}
            </p>
            <p
              className="text-[#667085] text-[11px] lg:text-[15.5px] leading-[1.5] mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {data.text}{" "}
              <span className="font-bold cursor-pointer">read more</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutExperts;
