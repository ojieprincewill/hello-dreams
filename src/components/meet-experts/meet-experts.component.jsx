import React from "react";
import { MeetExpertsData } from "../../data/choose-us-data/choose-us.data";
import { Link } from "react-router-dom";

const MeetExperts = () => {
  const HandleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full px-[5%] py-10 md:py-20">
      <p className="text-[24px] lg:text-[48px] text-[#101828] text-center font-bold mb-2">
        Meet Our Team of Experts
      </p>
      <p
        className="text-[12px] lg:text-[17.44px] text-[#667085] text-center font-bold mb-10"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Professional web and mobile app development services tailored to your
        business needs
      </p>
      <Link
        to="/services/optimize-profile"
        className="flex justify-center items-center"
        onClick={HandleOrigins}
      >
        <button className="bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
          Optimize your Profile
        </button>
      </Link>
      <div className="w-full mt-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {MeetExpertsData.map((data) => (
          <div key={data.id} className="p-3 border border-[#dfdfe2] rounded-xl">
            <div className="w-full h-[221.35px] md:h-[286.65px] lg:h-[360px] mb-5">
              <img
                src={data.image}
                alt={data.name}
                className="w-full h-full object-cover rounded-lg "
              />
            </div>
            <p
              className="text-[#26262b] text-[12px] md:text-[14px] lg:text-[18px] font-medium mb-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {data.name}
            </p>
            <p
              className="text-[#7f8090] text-[11px] lg:text-[15.5px] leading-[1.5] mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {data.text}{" "}
              <span className="font-bold cursor-pointer">read more</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetExperts;
