import React from "react";
import { Link } from "react-router-dom";

const UxDesignSection = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col-reverse md:flex-col">
      <div className="px-10 md:px-5 py-10 md:py-20 w-full text-center flex flex-col justify-center items-center">
        <h1 className="text-[24px] md:text-[52px] leading-[1.1] font-extrabold">
          UI/UX Design
        </h1>
        <p className="mt-4 md:mt-8 text-[16px] md:text-[36px] text-[#667085] font-semibold leading-[1.4]">
          No clutter. No confusion.
          <br />→ Just <span className="text-[#1342ff]">seamless</span>{" "}
          experiences.
        </p>
        <div className="mt-6 md:mt-12 flex flex-col w-full md:w-[431px] lg:w-full space-y-4 lg:inline lg:space-x-4">
          <Link
            to="/services/ui-design-consultation"
            onClick={handleOrigins}
            className="bg-[#010413] text-[#fff] font-semibold border border-[#010413] text-[16px] px-6 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            Design your idea
          </Link>
          <Link
            to="/services/ui-design"
            onClick={handleOrigins}
            className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[16px] px-12 py-4 rounded-lg hover:text-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            View service
          </Link>
        </div>
      </div>
      <div className="relative overflow-hidden bg-gradient-to-b from-[#1e276c] via-[#7081c7] to-[#ffffff] text-[#fff] w-full h-[373px] md:h-[875px] lg:h-[845px] pl-6 md:pl-10 lg:pl-20 py-5 md:py-15 lg:py-25">
        <div className="w-[220px] md:w-[540px]">
          <p className="text-[16px] md:text-[40px] leading-[1.1] font-extrabold">
            Effortless Design.
            <br />
            Impactful Experiences.
          </p>
          <p className="mt-4 text-[12px] md:text-[24px] leading-[normal]">
            We craft digital experiences that are not just beautiful, but
            functional. From research to pixel-perfect designs, we ensure your
            users stay engaged and satisfied.
          </p>
        </div>
        <div className=" absolute w-[290px] h-auto md:w-[640px] lg:w-[955px] lg:h-[600px] bottom-0 right-[-100px] md:right-[-105px]">
          <img
            src="https://i.ibb.co/SXypMCYw/be2fcc5390cdc081ed0b94431ff02178db711b6e.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default UxDesignSection;
