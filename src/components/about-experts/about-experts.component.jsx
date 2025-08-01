import React from "react";
import ExpertTeam from "../expert-team/expert-team.component";

const AboutExperts = () => {
  return (
    <div className="w-full px-[5%] py-10">
      <p className="text-[24px] xl:text-[48px] text-[#101828] text-center font-bold mb-2">
        Meet Our Team of Experts
      </p>
      <ExpertTeam />
    </div>
  );
};

export default AboutExperts;
