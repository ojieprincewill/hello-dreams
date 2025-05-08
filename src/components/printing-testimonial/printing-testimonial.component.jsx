import React from "react";
import { PrintingTestimonialData } from "../../data/testimonial-data/testimonial.data";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

const PrintingTestimonial = () => {
  return (
    <div className="w-full px-[6%] py-15">
      <p
        className="text-[#041856] text-[48px] text-center mb-5"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Testimonials
      </p>
      <p
        className="text-[#101010] text-[28px] text-center font-medium capitalize mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Hear what our clients have to say
      </p>
      <div className="grid grid-cols-2 gap-5 mt-15">
        {PrintingTestimonialData.map((data) => (
          <div
            key={data.id}
            className="border border-[#cccccc] rounded-2xl p-5"
          >
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row space-x-3 items-center">
                <div className="w-[77px] h-[77px] bg-[#d9d9d9] flex justify-center items-center rounded-full overflow-hidden">
                  <img
                    src={data.logo}
                    alt={data.client}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-[#101010] text-[20px]">{data.client}</p>
                  <p
                    className="text-[#aeaeae] text-[12px] font-bold"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {data.service}
                  </p>
                </div>
              </div>
              <ChatBubbleLeftRightIcon className="w-[46px] h-[39.03px] text-[#aeaeae]/20" />
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
                  className={`w-7 h-7 ${
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

export default PrintingTestimonial;
