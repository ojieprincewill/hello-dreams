import React from "react";

const Section2 = () => {
  return (
    <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-6">
      <div className="relative bg-[#008080] p-5 w-full h-[451px] md:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[16px] md:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          ARMONE WEB
        </p>
        <p className="text-[20px] md:text-[32px] text-[#f7f7f7] font-semibold mb-3 w-[401px]">
          Investment Website
        </p>
        <p
          className="text-[12px] md:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          UI/UX Design
        </p>
        <button className="bg-gradient-to-b from-[#f7f7f7] to-[#299393] min-w-[160px] text-[#041856] text-[16px] px-6 py-4 font-bold text-center rounded-4xl cursor-pointer ">
          View
        </button>
        {/* <div className="absolute bottom-[-150px] right-[-292px] w-[1000px] h-[765px]">
          <img
            src=""
            alt="dashboard design"
            className="w-full h-full object-contain"
          />
        </div> */}
      </div>
      <div className="relative bg-[#0b83d9] p-5 w-full h-[451px] md:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[16px] md:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          SISENOW
        </p>
        <p className="text-[20px] md:text-[24px] font-semibold text-[#f7f7f7] mb-3 w-[307px]">
          JOB MARKETPLACE WEBSITE
        </p>
        <p
          className="text-[12px] md:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          UI/UX Design
        </p>

        <button className="bg-gradient-to-b from-[#f7f7f7] to-[#90c0e26b] min-w-[160px] text-[#041856] text-[16px] px-6 py-4 font-bold text-center rounded-4xl cursor-pointer ">
          View
        </button>
        <div className="absolute bottom-[-20px] right-[-50px] w-[448.31px] h-[622.41px]">
          <img
            src="https://i.ibb.co/DfmLvmch/sisenow-image.png"
            alt="mock up design"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Section2;
