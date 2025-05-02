import React from "react";
import Marquee from "react-fast-marquee";

const BrandsTrust = () => {
  return (
    <div className="w-full px-[5%] md:px-[10%] py-15 overflow-hidden whitespace-nowrap">
      <p
        className="text-[24px] lg:text-[36px] text-[#000000] text-center mb-10"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Brands trust us
      </p>
      <Marquee speed={80} direction="left">
        <div className="flex flex-row space-x-15 md:space-x-25 justify-center items-center">
          <img
            src="https://i.ibb.co/233rBSr2/e9d8039bf4560ccaac1f29af9f91e653e68b4743.png"
            alt="softwork logo"
            className="w-[184.5px] h-[45px] object-cover"
          />
          <img
            src="https://i.ibb.co/RpJ0800z/195064eefbc2e4472c7737c46895d60e0d68338b.png"
            alt="pamela designer logo"
            className="w-[98px] h-[72.11px] object-cover"
          />
          <img
            src=""
            alt="grouped logo"
            className="w-[111px] h-[74px] object-cover"
          />
          <img
            src="https://i.ibb.co/b52BfkgJ/9e9d7e07966478295a2a5a7f0f31f1999e89f376.png"
            alt="NGISTEM logo"
            className="w-[68px] h-[69px] object-cover"
          />
          <img
            src="https://i.ibb.co/NgT3d922/1b53fbcb5687c32ecb934ba8dfeb695f99789286.png"
            alt="roberta luxe logo"
            className="w-[84px] h-[92px] object-cover"
          />
        </div>
      </Marquee>
    </div>
  );
};

export default BrandsTrust;
