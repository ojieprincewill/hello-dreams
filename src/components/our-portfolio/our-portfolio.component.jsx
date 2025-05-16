import React from "react";
import Section1 from "./sections/section-1.component";
import Section2 from "./sections/section-2.component";
import Section3 from "./sections/section-3.component";
import Section4 from "./sections/section-4.component";
import Section5 from "./sections/section-5.component";

const OurPortfolio = () => {
  return (
    <div className="px-[5%] py-15">
      <h1 className="text-[#010413] text-[24px] text-center md:text-[48px] leading-[1.1] font-semibold md:font-bold">
        Our Team's Portfolio
      </h1>
      <p className="mt-4 md:mt-8 text-[16px] text-center md:text-[20px] text-[#010413] leading-[1.4]">
        Explore Our Work: A Showcase of Projects, Achievements and Creativity
      </p>

      <div className="mt-15 space-y-10">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </div>
    </div>
  );
};

export default OurPortfolio;
