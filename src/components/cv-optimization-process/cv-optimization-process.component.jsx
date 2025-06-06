import React from "react";
import { CvProcessData } from "../../data/our-process-data/our-process.data";

const CvProcess = () => {
  return (
    <div className="w-full px-[5%] lg:px-[10%] py-10">
      <p className="text-[24px] lg:text-[48px] text-[#101828] text-center font-bold mb-2">
        Our Process
      </p>
      <p
        className="text-[12px] lg:text-[17.44px] text-[#667085] text-center font-bold capitalize"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        CV Writing & LinkedIn Optimisation
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 mt-10 md:mt-15 lg:mt-20">
        {CvProcessData.map((data, index) => (
          <div
            key={data.id}
            className={`bg-[#fafafa] h-[386px] flex flex-col justify-center p-2 lg:p-5 items-center shadow-lg shadow-[#d2d2f5b0] rounded-xl ${
              index === CvProcessData.length - 1 &&
              CvProcessData.length % 2 !== 0
                ? "md:col-span-2 lg:col-span-1"
                : ""
            }`}
          >
            <div className="w-[54.64px] md:w-[60px] h-[54.64px] md:h-[60px] bg-[#1342ff] rounded-lg">
              <img
                src="https://i.ibb.co/bq876B9/OUR-PROCESS-ICON.png"
                alt="svg icon"
                className="w-full h-full object-contain"
              />
            </div>
            <p
              className="text-[19px] md:text-[20px] text-[#30364d] text-center my-4 "
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {data.title}
            </p>
            <p className="text-[15px] md:text-[16px] text-[#000000] text-center leading-[1.5] ">
              {data.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CvProcess;
