import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const NewsletterSection = () => {
  return (
    <div className="hidden md:block bg-[#fff] p-20">
      <span className="text-[#041856] text-[30px] font-bold mb-3">
        Stay informed, nothing boring
      </span>
      <span className="text-[#010413] text-[20px] font-bold ml-3">
        Subscribe to our newsletter
      </span>
      <form className="flex flex-row justify-between items-center py-10">
        <input
          type="text"
          placeholder="yourname@email.com"
          className="border border-r-0 border-l-0 p-[18px] border-[#010413] focus:outline-0 w-full leading-normal"
        />
        <button
          type="submit"
          className="border border-r-0 border-l-0 px-18 py-[18px] border-[#010413] text-center w-max leading-normal"
        >
          <ArrowRightIcon className="w-6 h-6 text-[#1342ff]" />
        </button>
      </form>
    </div>
  );
};

export default NewsletterSection;
