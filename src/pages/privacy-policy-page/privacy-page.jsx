import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import PrivacyPolicy from "../../components/privacy-policy/privacy-policy.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const PrivacyPage = () => {
  return (
    <>
      <NavBar />
      <PrivacyPolicy />
      <FooterSection />
    </>
  );
};

export default PrivacyPage;
