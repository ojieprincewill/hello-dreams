import React from "react";

const Section1 = () => {
  return (
    <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-6">
      <div className="relative bg-[#010413] p-5 w-full h-[451px] md:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[16px] md:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          CIBN Portal
        </p>
        <p className="text-[20px] md:text-[32px] text-[#f7f7f7] font-semibold mb-3 w-[401px]">
          Chartered Institute of bankers of Nigeria
        </p>
        <p
          className="text-[12px] md:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          UI/UX Design
        </p>
        <button className="bg-gradient-to-b from-[#f7f7f7] to-[#ffffff6c] min-w-[160px] text-[#041856] text-[16px] px-6 py-4 font-bold text-center rounded-4xl cursor-pointer ">
          View Website
        </button>
        <div className="absolute bottom-[-102px] right-[-220px] w-[643px] h-[611.84px] rounded-3xl overflow-hidden">
          <img
            src="https://i.ibb.co/QF8YLjPk/image1.png"
            alt="dashboard design"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="relative bg-[#ff7f50] p-5 w-full h-[451px] md:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[16px] md:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          UI DESIGNS
        </p>
        <p
          className="text-[20px] md:text-[24px] font-extrabold text-[#f7f7f7] mb-3"
          style={{ fontFamily: "'Sofia Sans', sans-serif" }}
        >
          UI DESIGNS ACROSS DIFF INDUS
        </p>
        <p
          className="text-[12px] md:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          UI/UX Design
        </p>

        <button className="bg-gradient-to-b from-[#f7f7f7] to-[#f49674d5] min-w-[160px] text-[#041856] text-[16px] px-6 py-4 font-bold text-center rounded-4xl cursor-pointer  ">
          View Design
        </button>
        <div className="absolute bottom-[-120px] right-[-130px] w-[640.92px] h-[693px] rounded-3xl overflow-hidden">
          <img
            src="https://i.ibb.co/Cs4CHHQv/image-2.png"
            alt="dashboard design"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Section1;
