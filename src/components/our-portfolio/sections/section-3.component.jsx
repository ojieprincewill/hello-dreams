import React from "react";

const Section3 = () => {
  return (
    <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-6">
      <div className="relative bg-[#ff7f50] p-5 w-full h-[451px] md:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[16px] md:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Nehpets Consulting LTD
        </p>
        <p
          className="text-[20px] md:text-[32px] text-[#f7f7f7] mb-3"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Logo Design &<br />
          Branding
        </p>
        <p
          className="text-[12px] md:text-[18px] text-[#f7f7f7] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Graphics & Branding
        </p>
        <button className="bg-gradient-to-b from-[#f7f7f7] to-[#f49674d5] min-w-[160px] text-[#041856] text-[16px] px-6 py-4 font-bold text-center rounded-4xl cursor-pointer  ">
          View Details
        </button>
        <div className="absolute bottom-[-110px] right-[-180px] w-[680px] h-[680px]">
          <img
            src="https://i.ibb.co/4wTSvFLF/cb55d20c2b1ec22f23ecf20d5f992a50b65c90fa.png"
            alt="branded hoodie"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="relative bg-[#008080] p-5 w-full h-[451px] md:h-[800px] rounded-2xl space-y-2 overflow-hidden">
        <p
          className="text-[16px] md:text-[24px] text-[#f7f7f7]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Transafe Logistics LLC
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
        <button className="bg-gradient-to-b from-[#f7f7f7] to-[#299393] min-w-[160px] text-[#041856] text-[16px] px-6 py-4 font-bold text-center rounded-4xl cursor-pointer ">
          View Details
        </button>
        <div className="absolute bottom-[-180px] right-[-270px] w-[970px] h-[765px]">
          <img
            src="https://i.ibb.co/MDrT4VnF/45cc8d67dfd4b9caf6b41181e3fd7bbc0d33dea7.png"
            alt="logo design"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Section3;
