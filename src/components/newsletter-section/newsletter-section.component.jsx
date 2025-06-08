import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const NewsletterSection = () => {
  return (
    <div className="bg-[#fff] p-5 md:p-10 lg:p-20">
      <span
        className="text-[#041856] text-[14px] md:text-[16px] lg:text-[30px] lg:font-bold mb-3"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Stay informed, nothing boring
      </span>
      <span
        className="text-[#010413] text-[10px] md:text-[12px] lg:text-[20px] lg:font-bold ml-1 md:ml-3"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Subscribe to our newsletter
      </span>
      <form className="flex flex-row justify-between items-center py-5 lg:py-10">
        <input
          type="text"
          placeholder="yourname@email.com"
          className="border border-r-0 border-l-0 p-[14px] md:p-[19px] lg:p-[27px] placeholder:text-[8px] text-[8px] md:placeholder:text-[12px] md:text-[12px] lg:placeholder:text-[16px] lg:text-16px border-[#010413] focus:outline-0 w-full leading-normal"
        />
        <button
          type="submit"
          className="border border-r-0 border-l-0 px-5 md:px-16 lg:px-18 py-[12px] md:py-[16px] lg:py-[18px] border-[#010413] text-center w-max leading-normal"
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330686/Button_SVG_mmlmot.png"
            alt="blue arrow"
            className="w-4 h-4 md:w-6 md:h-6 lg:w-9 lg:h-9 object-cover"
          />
        </button>
      </form>
    </div>
  );
};

export default NewsletterSection;
