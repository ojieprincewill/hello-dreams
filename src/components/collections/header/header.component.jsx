import React from "react";
import NavBar from "../../landing-header/nav-bar/nav-bar.component";

const CollectionsHeader = () => {
  return (
    <>
      <div className=" bg-[#eef2fe]">
        <NavBar />
        <div className="w-full h-max lg:h-[900px] flex flex-col-reverse lg:grid lg:grid-cols-2 lg:place-items-center">
          <div className="flex flex-col items-start justify-start text-[#010413] px-5">
            <h1
              className="text-[22px] md:text-[56px] lg:w-[509px] leading-[1.1] font-semibold md:font-extrabold "
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Hello Dreams Collections
            </h1>
            <p
              className="mt-8 text-[24px] lg:text-[16px] text-[#667085] lg:text-[#010413] lg:w-[530px] leading-[1.6]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Shop from our collection of quality T-shirts, hoodies, and custom
              two-piece sets. You can also find essentials like jotters, diaries
              etc.
            </p>
            <div className="mt-8 md:mt-15 w-[164px] md:w-[273px]">
              <div className="bg-[#010413] w-full text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[24px] text-center px-4 py-3 rounded-sm hover:bg-[#6941c6] hover:border-[#6941c6] transition-colors duration-300 cursor-pointer">
                Shop now
              </div>
            </div>
          </div>
          <div className="w-full h-[391px] md:h-full">
            <img
              src="https://i.ibb.co/8Shk6KK/ad625f059d4c14c3194e4dfc8466bf552e36e87f.png"
              alt="pamela ohaeri"
              className="w-full h-full object-contain md:object-contain lg:object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionsHeader;
