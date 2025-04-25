import React from "react";
import { ChooseData } from "../../data/choose-us-data/choose-us.data";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import TestimonialSection from "../testimonial-section/testimonial-section.component";
import OurPortfolioSection from "../portfolio-section/our-portfolio-section.component";

const WhyChooseUs = () => {
  return (
    <div className="w-full px-[5%] py-10 md:py-20">
      <h1 className="text-center text-[#10182827] text-[24px] md:text-[96px] font-bold pb-10 md:pb-20 flex items-center justify-center gap-2">
        Why Choose Us
        <ArrowDownIcon className="w-[36.67px] h-[36.67px] md:w-[126px] md:h-[128px] text-[#10182827]" />
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-7">
        {ChooseData.map((data) => (
          <div key={data.id} className="p-3 border border-[#ccc] rounded-2xl">
            <div className="bg-[#f6f6f8] flex justify-center items-center p-3 rounded-xl">
              <img
                src={data.image}
                alt={data.title}
                className="w-[162.38px] h-[162.38px]  md:w-[192px] md:h-[192px] "
              />
            </div>
            <p className="text-[#101010] text-[20px] md:text-[22px] font-bold my-3">
              {data.title}
            </p>
            <p className="text-[#667085] text-[14px] md:text-[16px] leading-[1.5] mb-3">
              {data.text}
            </p>
          </div>
        ))}
      </div>
      <TestimonialSection />
      <OurPortfolioSection />
    </div>
  );
};

export default WhyChooseUs;
