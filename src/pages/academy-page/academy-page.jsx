import React from "react";

import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import AcademyComingSoon from "../../components/academy-coming-soon/academy-coming-soon.component";
import FooterSection from "../../components/footer-section/footer-section.component";
import AcademyNavbar from "../../components/academy/academy-nav/academy-nav.component";
import AcademyHeader from "../../components/academy/academy-header/academy-header.component";
import LandingPreviews from "../../components/academy/landing-previews/landing-previews.component";

const isDev = import.meta.env.DEV;
const isAcademyLive = isDev || import.meta.env.VITE_ACADEMY_LIVE === "true";

const AcademyPage = () => {
  return isAcademyLive ? (
    <>
      <AcademyNavbar />
      <AcademyHeader />
      <LandingPreviews />
      {/* <FooterSection /> */}
    </>
  ) : (
    <>
      <NavBar />
      <AcademyComingSoon />
      <FooterSection />
    </>
  );
};

export default AcademyPage;
