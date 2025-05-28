import React from "react";
import { UiTestimonialData } from "../../data/testimonial-data/testimonial.data";
import { StarIcon } from "@heroicons/react/24/solid";

const UiTestimonial = () => {
  return (
    <div className="w-full px-[5%] py-10">
      <p
        className="text-[#041856] text-[20px] md:text-[27.32px] lg:text-[48px] text-center mb-5"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Testimonials
      </p>
      <p
        className="text-[#101010] text-[14px] md:text-[15.94px] lg:text-[28px] text-center font-medium capitalize mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Hear what our clients have to say
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-15">
        {UiTestimonialData.map((data) => (
          <div
            key={data.id}
            className="border border-[#cccccc] rounded-2xl p-3 md:p-5"
          >
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row space-x-3 items-center">
                <div className="w-[45.77px] h-[45.77px] md:w-[43.83px] md:h-[43.83px] lg:w-[77px] lg:h-[77px] bg-[#d9d9d9] flex justify-center items-center rounded-full overflow-hidden">
                  <img
                    src={data.logo}
                    alt={data.client}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <p className="text-[#101010] text-[16px] md:text-[14px] lg:text-[20px]">
                    {data.client}
                  </p>
                  <p
                    className="text-[#aeaeae] text-[12px] font-bold"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {data.service}
                  </p>
                </div>
              </div>
              <div className="w-[27.35px] h-[24.19px] lg:w-[46px] lg:h-[39.03px]">
                <img
                  src="https://i.ibb.co/fY5HPXYb/quote-icon.png"
                  alt="quote icon"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="my-5">
              <p
                className="text-[#101010] text-[12px] leading-[1.5]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {data.text}
              </p>
              <p
                className="text-[#101010] text-[12px] mt-5 leading-[1.5]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {data.text2}
              </p>
            </div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`w-5 h-5 md:w-7 md:h-7 ${
                    index < data.rating ? "text-[#ff9d2b]" : "text-[#aeaeae]"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UiTestimonial;
