import React from "react";
import { MeetExpertsData } from "../../data/choose-us-data/choose-us.data";

const ExpertTeam = () => {
  return (
    <div className="w-full mt-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {MeetExpertsData.map((data, index) => (
        <div
          key={data.id}
          className={`p-3 border border-[#dfdfe2] rounded-xl ${
            index >= MeetExpertsData.length - 2 ? "lg:col-span-2" : ""
          }`}
        >
          <div className="w-full h-[221.35px] md:h-[286.65px] lg:h-[360px] mb-5">
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-full object-cover rounded-lg "
            />
          </div>
          <p
            className="text-[#26262b] text-[12px] md:text-[14px] lg:text-[18px] font-medium mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {data.name}
          </p>
          <p
            className="text-[#7f8090] text-[11px] lg:text-[15.5px] leading-[1.5] mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {data.text}{" "}
            <span className="font-bold cursor-pointer">read more</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ExpertTeam;
