import React from "react";
import Preview1 from "./preview1.component";
import Preview2 from "./preview2.component";
import Preview3 from "./preview3.component";
import Preview4 from "./preview4.component";
import JoinCohort from "./join-cohort.component";

const LandingPreviews = () => {
  return (
    <div className="px-[5%] py-10">
      <Preview1 />
      <Preview2 />
      <Preview3 />
      <JoinCohort />
      <Preview4 />
    </div>
  );
};

export default LandingPreviews;
