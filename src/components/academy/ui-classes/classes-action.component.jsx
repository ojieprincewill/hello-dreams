import React from "react";
import { Link } from "react-router-dom";

const ClassesAction = () => {
  const handleOrigins = () => {
    window.scrollTo(0,0);
  }

  return (
    <div
      className="flex flex-col items-center px-[5%] py-10"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <p className="text-[#101828] text-center text-[20px] md:text-[24px] font-medium mb-1">
        Trusted by 1000+ Designers
      </p>
      <p className="text-[#667085] text-center text-[14px] md:text-[16px] mb-3 md:w-[495px]">
        You can develop your UI/UX career & skills for less than $2/week —
        cancel anytime
      </p>

      <div className="mt-5 md:mt-10 w-full md:w-[280.23px] ">
        <Link to="/signup" onClick={handleOrigins} className="block bg-black w-full text-[14px] md:text-[16px] text-white px-6 py-2 rounded-md font-medium hover:bg-[#1342ff] transition-colors duration-300 cursor-pointer mb-2">
          Sign up
        </Link>
        <div className="flex items-center w-full my-2">
          <hr className="flex-grow border-t border-[#e5e7eb]" />
          <span className="mx-3 text-[#101828] text-sm">or</span>
          <hr className="flex-grow border-t border-[#e5e7eb]" />
        </div>
        <Link to="/login" onClick={handleOrigins} className="block bg-transparent w-full text-[14px] md:text-[16px] border border-[#e5e7eb] text-[#101828] px-6 py-2 rounded-md font-medium hover:bg-[#eef2fe] transition-colors duration-300 cursor-pointer mt-2">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default ClassesAction;
