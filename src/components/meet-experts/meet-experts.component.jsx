import React from "react";
import { Link } from "react-router-dom";
import ExpertTeam from "../expert-team/expert-team.component";

const MeetExperts = () => {
  const HandleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full px-[5%] py-10">
      <p className="text-[24px] xl:text-[48px] text-[#101828] text-center font-bold mb-2">
        Meet Our Team of Experts
      </p>
      <p
        className="text-[12px] xl:text-[17.44px] text-[#667085] text-center font-bold mb-10"
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
        <button className="bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] text-[10.91px] xl:text-[16px] px-6 py-3 xl:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
          Optimize your Profile
        </button>
      </Link>
      <ExpertTeam />
    </div>
  );
};

export default MeetExperts;
