import React from "react";

const Section1 = () => {
  return (
    <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-6">
      <div className="relative bg-[#010413] p-5 w-full h-[451px] md:h-[400.29px] lg:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[13.46px] md:text-[11.74px] lg:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          CIBN Portal
        </p>
        <p className="text-[17.95px] md:text-[15px] lg:text-[32px] text-[#f7f7f7] w-[201px] lg:w-[401px] mb-3">
          Chartered Institute of bankers of Nigeria
        </p>
        <p
          className="text-[12px] md:text-[10px] lg:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          UI/UX Design
        </p>
        <button className="bg-gradient-to-b from-[#f7f7f7] to-[#ffffff6c] min-w-[89.74px] md:min-w-[78.26px] lg:min-w-[160px] text-[#041856] text-[13.46px] md:text-[11.74px] lg:text-[16px] px-6 py-3 lg:py-4 font-bold text-center rounded-4xl cursor-pointer ">
          View Website
        </button>
        <div className="absolute bottom-[-80px] right-[-100px] lg:bottom-[-102px] lg:right-[-220px] w-[321px] h-[305px] lg:w-[643px] lg:h-[611.84px] rounded-3xl overflow-hidden">
          <img
            src="https://i.ibb.co/QF8YLjPk/image1.png"
            alt="dashboard design"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="relative bg-[#ff7f50] p-5 w-full h-[451px] md:h-[400.29px] lg:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[13.46px] md:text-[11.74px] lg:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          UI DESIGNS
        </p>
        <p
          className="text-[17.95px] md:text-[15px] lg:text-[32px] text-[#f7f7f7] mb-3 w-[170px] md:w-full"
          style={{ fontFamily: "'Sofia Sans', sans-serif" }}
        >
          UI DESIGNS ACROSS DIFF INDUS
        </p>
        <p
          className="text-[12px] md:text-[10px] lg:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          UI/UX Design
        </p>

        <button className="bg-gradient-to-b from-[#f7f7f7] to-[#f49674d5] min-w-[89.74px] md:min-w-[78.26px] lg:min-w-[160px] text-[#041856] text-[13.46px] md:text-[11.74px] lg:text-[16px] px-6 py-3 lg:py-4 font-bold text-center rounded-4xl cursor-pointer  ">
          View Design
        </button>
        <div className="absolute bottom-[-80px] right-[-60px] lg:bottom-[-120px] lg:right-[-130px] w-[320px] h-[346px] lg:w-[640.92px] lg:h-[693px] rounded-3xl overflow-hidden">
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
