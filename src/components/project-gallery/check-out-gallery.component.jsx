import React from "react";

const CheckOutGallery = () => {
  return (
    <div className="w-full px-[5%] lg:px-[10%] py-15">
      <p
        className="text-[#000000] text-[16px] lg:text-[32px] lg:font-bold text-center mb-5 "
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Check out our project gallery
      </p>
      <p
        className="text-[#07111d] text-[11px] lg:text-[17px] lg:font-bold text-center mb-7"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Explore our figma designs, which are not under NDA
      </p>
      <div className="flex flex-row justify-center items-center space-x-2 lg:space-x-4">
        <button
          className="bg-[#ffffff] border border-[#00000015] text-[#000000] text-[10px] lg:text-[14px] px-8 py-3 lg:font-bold text-center rounded-2xl shadow-[inset_0px_-2px_4px] shadow-[#ffe7de90] "
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Product work
        </button>
        <button
          className="bg-[#ffffff] border border-[#00000015] text-[#000000] text-[10px] lg:text-[14px] px-8 py-3 lg:font-bold text-center rounded-2xl shadow-[inset_0px_-2px_4px] shadow-[#ffe7de90] "
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Branding work
        </button>
      </div>
    </div>
  );
};

export default CheckOutGallery;
