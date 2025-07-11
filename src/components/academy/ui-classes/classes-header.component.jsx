import React from "react";

const ClassesHeader = () => {
  return (
    <div
      className="flex flex-col items-center px-[5%] py-4 md:py-8"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="flex -space-x-4 mb-3">
        <img
          src="https://res.cloudinary.com/dganx8kmn/image/upload/v1750248864/About%20page/98dade6245a28e52ffa93ea0e025ee10943e1533_f7ntpx.png"
          alt="designer"
          className="w-[40px] h-[40px] md:w-[70px] md:h-[70px] rounded-full border-2 border-[#f2f0e9]"
        />
        <img
          src="https://res.cloudinary.com/dganx8kmn/image/upload/v1752135714/About%20page/195e24ada276f5d4353de7127400ffd4cb317097_tzztad.jpg"
          alt="designer"
          className="w-[40px] h-[40px] md:w-[70px] md:h-[70px] rounded-full border-2 border-[#f2f0e9]"
        />
        <img
          src="https://res.cloudinary.com/dganx8kmn/image/upload/v1750085449/cv%20optimization%20page/c478c8e8357e13a26f27fa69249a3d7983abb563_g4utcg.png"
          alt="designer"
          className="w-[40px] h-[40px] md:w-[70px] md:h-[70px] rounded-full border-2 border-[#f2f0e9]"
        />
        <img
          src="https://res.cloudinary.com/dganx8kmn/image/upload/v1750248833/About%20page/2b70ea993026a26eaa6d5079b08e32fdb3f6a127_oc1enj.png"
          alt="designer"
          className="w-[40px] h-[40px] md:w-[70px] md:h-[70px] rounded-full border-2 border-[#f2f0e9]"
        />
        <img
          src="https://res.cloudinary.com/dganx8kmn/image/upload/v1750248834/About%20page/4c2b0651e1c3b798c39e7e237744179ea80c645f_fpo44y.png"
          alt="designer"
          className="w-[40px] h-[40px] md:w-[70px] md:h-[70px] rounded-full border-2 border-[#f2f0e9]"
        />
      </div>
      <p className="text-[#101828] text-center text-[20px] md:text-[24px] font-medium mb-1">
        Trusted by 1000+ Designers
      </p>
      <p className="text-[#667085] text-center text-[14px] md:text-[16px] mb-5 md:w-[495px]">
        You can develop your UI/UX career & skills for less than $2/week —
        cancel anytime
      </p>
      <button className="bg-[#1342ff] text-[14px] md:text-[16px] text-[#fff] px-6 py-2 rounded-md font-medium hover:bg-[#1b13ff] transition-colors duration-300 cursor-pointer">
        Sign up
      </button>
    </div>
  );
};

export default ClassesHeader;
