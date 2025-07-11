import React from "react";
import { CohortsData } from "@/data/academy-data/academy.data";
import CohortCard from "@/components/academy/cohort-card/CohortCard";
import AcademyNavbar from "@/components/academy/academy-nav/academy-nav.component";
import FooterSection from "@/components/footer-section/footer-section.component";

const CohortsPage = () => {
  return (
    <>
    <AcademyNavbar />
    <div className="min-h-screen w-full bg-[#f6f6f8] space-y-10 px-[5%] py-10">
      {CohortsData.map((cohort) => (
        <section key={cohort.id}>
          <h2 className="text-[#010413] text-[20px] md:text-[24px] lg:text-[40px] font-bold mb-7" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {cohort.category}
          </h2>
          <CohortCard
            info={cohort.info}
            price={cohort.price}
            oldPrice={cohort.oldPrice}
            currency={cohort.currency}
          />
        </section>
      ))}
    </div>
    <FooterSection />
    </>
  );
};

export default CohortsPage; 