import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import LandingHeader from "../../components/landing-header/landing-header.component";
import UxDesignSection from "../../components/ux-design-section/ux-design-section.component";
import WebMobile from "../../components/web-mobile-dev-section/web-mobile.component";
import MarqueeSection from "../../components/marquee-section/marquee-section.component";
import SocialManagementSection from "../../components/social-management-section/social-management-section.component";
import PrintingSection from "../../components/printing-section/printing-section.component";
import WhyChooseUs from "../../components/why-choose-us/why-choose-us.component";
import AcademySection from "../../components/academy -section/academy-section.component";
import OurStorySection from "../../components/our-story-section/our-story-section.component";
import OurCommunity from "../../components/our-community-section/our-community.component";
import DreamJobSection from "../../components/dream-job-section/dream-job-section.component";
import Sustainability from "../../components/sustainability-section/sustainability.component";

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
      <AcademySection />
      <OurStorySection />
      <OurCommunity />
      <DreamJobSection />
      <Sustainability />
    </>
  );
};

export default HomePage;
