import AcademyNavbar from "@/components/academy/academy-nav/academy-nav.component";
import ManageMembership from "@/components/academy/manage-membership/manage-membership";
import FooterSection from "@/components/footer-section/footer-section.component";
import React from "react";

const MembershipPage = () => {
  return (
    <>
      <AcademyNavbar />
      <ManageMembership />
      <FooterSection />
    </>
  );
};

export default MembershipPage;
