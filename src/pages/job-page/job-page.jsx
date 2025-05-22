import React from "react";
import JobHeader from "../../components/job-header/job-header.component";
import JobBoard from "../../components/job-board/job-board.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const JobPage = () => {
  return (
    <>
      <JobHeader />
      <JobBoard />
      <FooterSection />
    </>
  );
};

export default JobPage;
