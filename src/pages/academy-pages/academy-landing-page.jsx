import React from "react";

import FooterSection from "../../components/footer-section/footer-section.component";
import AcademyNavbar from "../../components/academy/academy-nav/academy-nav.component";
import AcademyHeader from "../../components/academy/academy-header/academy-header.component";
import LandingPreviews from "../../components/academy/landing-previews/landing-previews.component";

const AcademyLandingPage = () => {
  return (
    <>
      <AcademyNavbar />
      <AcademyHeader />
      <LandingPreviews />
      <FooterSection />
    </>
  );
};

export default AcademyLandingPage;
