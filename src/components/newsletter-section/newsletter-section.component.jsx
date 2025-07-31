import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const NewsletterSection = () => {
  return (
    <div className="bg-[#fff] p-5 md:p-10 xl:p-20">
      <span
        className="text-[#041856] text-[14px] md:text-[16px] xl:text-[30px] xl:font-bold mb-3"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Stay informed, nothing boring
      </span>
      <span
        className="text-[#010413] text-[10px] md:text-[12px] xl:text-[20px] xl:font-bold ml-1 md:ml-3"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Subscribe to our newsletter
      </span>
      <form className="flex flex-row justify-between items-center py-5 xl:py-10">
        <input
          type="text"
          placeholder="yourname@email.com"
          className="border border-r-0 border-l-0 p-[14px] md:p-[19px] xl:p-[27px] placeholder:text-[8px] text-[8px] md:placeholder:text-[12px] md:text-[12px] xl:placeholder:text-[16px] xl:text-16px border-[#010413] focus:outline-0 w-full leading-normal"
        />
        <button
          type="submit"
          className="border border-r-0 border-l-0 px-5 md:px-16 xl:px-18 py-[12px] md:py-[16px] xl:py-[18px] border-[#010413] text-center w-max leading-normal hover:bg-[#99c8ff] transition-colors duration-300 cursor-pointer"
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330686/Button_SVG_mmlmot.png"
            alt="blue arrow"
            className="w-4 h-4 md:w-6 md:h-6 xl:w-9 xl:h-9 object-cover"
          />
        </button>
      </form>
    </div>
  );
};

export default NewsletterSection;
