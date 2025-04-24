import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import LandingHeader from "../../components/landing-header/landing-header.component";
import UxDesignSection from "../../components/ux-design-section/ux-design-section.component";
import WebMobile from "../../components/web-mobile-dev-section/web-mobile.component";

const HomePage = () => {
  return (
    <>
      <LandingHeader />
      <UxDesignSection />
      <WebMobile />
    </>
  );
};

export default HomePage;
