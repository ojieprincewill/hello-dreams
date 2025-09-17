import React, { useMemo } from "react";
import CohortCard from "../cohort-card/CohortCard";
import { CohortsData } from "../../../data/academy-data/academy.data";
import { Link } from "react-router-dom";
import { useClosestCohort } from "@/hooks/useCohorts";

const JoinCohort = () => {
  const { data: closestCohort } = useClosestCohort();
  
  // For landing, show the first cohort (UI/UX) with dynamic date
  const cohort = useMemo(() => {
    const baseCohort = CohortsData[0];
    
    // If we have a closest cohort with a start date, update the date text
    if (closestCohort?.start_date) {
      const formattedDate = new Date(closestCohort.start_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      return {
        ...baseCohort,
        info: baseCohort.info.map((item, index) => {
          // Update the first item (index 0) which contains the date
          if (index === 0) {
            return {
              ...item,
              text: formattedDate
            };
          }
          return item;
        })
      };
    }
    
    return baseCohort;
  }, [closestCohort]);

  const handleOrigins = () => {};

  return (
    <div className="mt-10 mb-25">
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
      <div className="md:hidden flex justify-end">
        <Link
          to="/academy/cohorts"
          onClick={handleOrigins}
          className=" text-[#ff7f50] text-[14px] font-bold underline hover:text-[#1342ff] transition-colors duration-300 cursor-pointer"
        >
          View all
        </Link>
      </div>
    </div>
  );
};

export default JoinCohort;
