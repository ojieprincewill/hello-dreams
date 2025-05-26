import React from "react";
import { ProcessData } from "../../data/our-process-data/our-process.data";
import { Link } from "react-router-dom";

const OurProcess = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full px-[5%] lg:px-[10%] py-15">
      <p className="text-[24px] lg:text-[48px] text-[#101828] text-center font-bold mb-2">
        Our Process
      </p>
      <p
        className="text-[12px] lg:text-[17.44px] text-[#667085] text-center font-bold capitalize"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        User experience design services
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-5 mt-10 md:mt-20">
        {ProcessData.map((data) => (
          <div
            key={data.id}
            className="bg-[#fafafa] h-[386px] flex flex-col justify-center p-2 lg:p-5 items-center shadow-lg shadow-[#d2d2f5b0] rounded-xl"
          >
            <div className="w-[54.64px] md:w-[60px] h-[54.64px] md:h-[60px] bg-[#1342ff] rounded-lg">
              {/* <img
                src=""
                alt="svg icon"
                className="w-[35px] h-[35px] object-contain"
              /> */}
            </div>
            <p
              className="text-[19px] md:text-[20px] text-[#30364d] text-center my-4 "
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {data.title}
            </p>
            <p className="text-[15px] md:text-[16px] text-[#000000] lg:font-bold text-center leading-[1.5] ">
              {data.text}
            </p>
          </div>
        ))}
      </div>
      <Link
        to="/services/ui-design-consultation"
        className="flex justify-center items-center mt-15"
        onClick={handleOrigins}
      >
        <button className="bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
          Get a Free Consultation
        </button>
      </Link>
    </div>
  );
};

export default OurProcess;
