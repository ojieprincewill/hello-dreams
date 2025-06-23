import React from "react";

import AcademyComingSoon from "../../components/academy-coming-soon/academy-coming-soon.component";
import FooterSection from "../../components/footer-section/footer-section.component";
import AcademyNavbar from "../../components/academy/academy-nav/academy-nav.component";
import AcademyHeader from "../../components/academy/academy-header/academy-header.component";

const isDev = import.meta.env.DEV;
const isAcademyLive = isDev || import.meta.env.VITE_ACADEMY_LIVE === "true";

const AcademyPage = () => {
  return isAcademyLive ? (
    <>
      <AcademyNavbar />
      <AcademyHeader />
      {/* <FooterSection /> */}
    </>
  ) : (
    <AcademyComingSoon />
  );
};

export default AcademyPage;
