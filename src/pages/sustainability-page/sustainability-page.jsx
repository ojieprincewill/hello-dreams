import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import SustainabilityHeader from "../../components/sustainability-header/sustainability-header.component";
import SustainabilityContent from "../../components/sustainability-content/sustainability-content.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const SustainabilityPage = () => {
  return (
    <>
      <NavBar />
      <SustainabilityHeader />
      <SustainabilityContent />
      <FooterSection />
    </>
  );
};

export default SustainabilityPage;
