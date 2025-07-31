import React from "react";
import CohortCard from "../cohort-card/CohortCard";
import { CohortsData } from "../../../data/academy-data/academy.data";
import { Link } from "react-router-dom";

const JoinCohort = () => {
  // For landing, show the first cohort (UI/UX)
  const cohort = CohortsData[0];

  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="my-10">
      <div
        className="flex justify-between items-center mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <p className="text-[#010413] text-[20px] md:text-[30px] xl:text-[40px] font-bold">
          {cohort.category}
        </p>
        <Link
          to="/academy/cohorts"
          onClick={handleOrigins}
          className="hidden md:inline text-[#ff7f50] text-[14px] xl:text-[24px] font-bold underline hover:text-[#1342ff] transition-colors duration-300 cursor-pointer"
        >
          View all
        </Link>
      </div>
      <CohortCard
        info={cohort.info}
        price={cohort.price}
        oldPrice={cohort.oldPrice}
        currency={cohort.currency}
      />
    </div>
  );
};

export default JoinCohort;
