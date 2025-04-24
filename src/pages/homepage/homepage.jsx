import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import LandingHeader from "../../components/landing-header/landing-header.component";
import UxDesignSection from "../../components/ux-design-section/ux-design-section.component";
import WebMobile from "../../components/web-mobile-dev-section/web-mobile.component";
import MarqueeSection from "../../components/marquee-section/marquee-section.component";
import SocialManagementSection from "../../components/social-management-section/social-management-section.component";
import PrintingSection from "../../components/printing-section/printing-section.component";
import WhyChooseUs from "../../components/why-choose-us/why-choose-us.component";

const HomePage = () => {
  return (
    <>
      <LandingHeader />
      <UxDesignSection />
      <WebMobile />
      <MarqueeSection />
      <SocialManagementSection />
      <PrintingSection />
      <WhyChooseUs />
    </>
  );
};

export default HomePage;
