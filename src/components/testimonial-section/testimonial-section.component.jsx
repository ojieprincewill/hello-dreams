import React from "react";
import { TestimonialData } from "../../data/choose-us-data/choose-us.data";
import { StarIcon } from "@heroicons/react/24/solid";

const TestimonialSection = () => {
  return (
    <div className="w-full pt-40">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="space-y-4">
          <p className="text-[24px] md:text-[36px] text-[#101828] font-semibold ">
            Don't just take our word for it.
          </p>
          <p className="text-[16px] md:text-[20px] text-[#475467] md:font-bold leading-[1.5]">
            Hear from some of our amazing customers who are building faster.
          </p>
        </div>

        <div className="flex flex-col w-auto h-max space-y-4 mt-5 md:mt-0 md:flex-row md:space-y-0 md:space-x-2">
          <button className="bg-transparent text-[#344054] font-semibold border border-[#d0d5dd] text-[14px] md:text-[16px] px-4 py-4 rounded-lg cursor-pointer">
            Apply for mentorship
          </button>
          <button className="bg-[#1b212c] text-[#fff] font-semibold border border-[#1b212c] text-[14px] md:text-[16px] px-4 py-4 rounded-lg hover:bg-[#6941c6] hover:text-white hover:border-[#6941c6] transition-colors duration-300 cursor-pointer">
            Learn Design from us
          </button>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-7 pt-20">
        {TestimonialData.map((data) => (
          <div key={data.id} className="relative w-full h-[480px]">
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-full object-cover object-center rounded-xl"
            />
            <div className="absolute bottom-3 left-[2%] w-[96%] h-[246px] bg-white/30 backdrop-blur-sm p-4 border border-[#ffffff63] overflow-hidden">
              <div className="flex space-x-1 text-[#fff] pb-2">
                <StarIcon className="w-4 h-4" />
                <StarIcon className="w-4 h-4" />
                <StarIcon className="w-4 h-4" />
                <StarIcon className="w-4 h-4" />
                <StarIcon className="w-4 h-4" />
              </div>
              <p className="text-[24px] md:text-[30px] text-[#fff] font-semibold mb-2 ">
                {data.name}
              </p>
              <p className="text-[15px] md:text-[18px] text-[#fff] mb-2 ">
                {data.course}
              </p>
              <p className="text-[14px] md:text-[16px] text-[#fff] line-clamp-4 leading-[1.5] ">
                {data.text}
              </p>
              <span className="text-[14px] md:text-[16px] text-[#fff] font-semibold cursor-pointer">
                Read more
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
