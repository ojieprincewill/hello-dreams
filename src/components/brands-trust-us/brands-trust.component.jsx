import React from "react";
import Marquee from "react-fast-marquee";

const BrandsTrust = () => {
  return (
    <div className="w-full px-[5%] lg:px-[10%] pt-15 pb-5 overflow-hidden whitespace-nowrap">
      <p
        className="text-[24px] lg:text-[36px] text-[#000000] text-center mb-5 md:mb-10"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Brands trust us
      </p>
      <Marquee speed={80} direction="left">
        <div className="flex flex-row space-x-15 md:space-x-25 justify-center items-center">
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750066141/UI%20page/sisenow_logo_kwuiha.png"
            alt="sisenow logo"
            className="w-[184.5px] h-[45px] object-contain"
          />
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065857/UI%20page/195064eefbc2e4472c7737c46895d60e0d68338b_paoksb.png"
            alt="pamela designer logo"
            className="w-[98px] h-[72.11px] object-cover"
          />
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065859/UI%20page/BRANDS_TRUST_US_LOGO_fwubmr.png"
            alt="grouped logo"
            className="w-[111px] h-[74px] object-cover"
          />
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065857/UI%20page/9e9d7e07966478295a2a5a7f0f31f1999e89f376_e1tlyo.png"
            alt="NGISTEM logo"
            className="w-[68px] h-[69px] object-cover"
          />
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750065857/UI%20page/1b53fbcb5687c32ecb934ba8dfeb695f99789286_wakeer.png"
            alt="roberta luxe logo"
            className="w-[84px] h-[92px] object-cover"
          />
        </div>
      </Marquee>
    </div>
  );
};

export default BrandsTrust;
