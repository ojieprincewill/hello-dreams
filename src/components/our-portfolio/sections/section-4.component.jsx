import React from "react";

const Section4 = () => {
  return (
    <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-6">
      <div className="relative bg-[#0b83d9] p-5 w-full h-[451px] md:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[16px] md:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Nigerian Girl in STEM Foundation
        </p>
        <p
          className="text-[20px] md:text-[32px] text-[#f7f7f7] mb-3"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Branding &<br />
          Graphics
        </p>
        <p
          className="text-[12px] md:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Graphics & Branding
        </p>
        <button className="bg-gradient-to-b from-[#f7f7f7] to-[#90c0e26b] min-w-[160px] text-[#041856] text-[16px] px-6 py-4 font-bold text-center rounded-4xl cursor-pointer  ">
          View Details
        </button>
        <div className="absolute bottom-[-110px] right-[-350px] w-[891px] h-[931px]">
          <img
            src="https://i.ibb.co/gFZWtW6t/b235a63b6c6f2e8da148e1f5c0fa374c065aff19.png"
            alt="branded shirt"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="relative bg-[#010413] p-5 w-full h-[451px] md:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[16px] md:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Roberta's Luxe
        </p>
        <p
          className="text-[20px] md:text-[32px] text-[#f7f7f7] mb-3"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Logo Design
        </p>
        <p
          className="text-[12px] md:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Graphics & Branding
        </p>
        <button className="bg-gradient-to-b from-[#f7f7f7] to-[#ffffff6c] min-w-[160px] text-[#041856] text-[16px] px-6 py-4 font-bold text-center rounded-4xl cursor-pointer ">
          View Details
        </button>
        <div className="absolute right-0 bottom-[-150px] w-[450.6px] h-[800px]">
          <img
            src="https://i.ibb.co/ds26zxvv/a3bd5d78364b1d07f2aaa1c8ff1156d1bf6ba7ba.png"
            alt="branded hoodie"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Section4;
