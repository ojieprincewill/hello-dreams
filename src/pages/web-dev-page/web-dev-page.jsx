import React from "react";

import WebMobileDevHeader from "../../components/web-and-mobile-dev-header/web-and-mobile-dev-header.component";
import WebDevBanner from "../../components/web-dev-banner/web-dev-banner.component";
import Development from "../../components/development-section/development.component";
import DevSetApart from "../../components/dev-set-apart/dev-set-apart.component";
import MobileWebDev from "../../components/mobile-web-dev-section/mobile-web-dev.component";
import WebDevProcess from "../../components/web-dev-process/web-dev-process.component";
import WebDevCta from "../../components/web-dev-cta/web-dev-cta.component";
import NewsletterSection from "../../components/newsletter-section/newsletter-section.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const WebDevPage = () => {
  return (
    <>
      <WebMobileDevHeader />
      <WebDevBanner />
      <Development />
      <DevSetApart />
      <MobileWebDev />
      <WebDevProcess />
      <WebDevCta />
      <NewsletterSection />
      <FooterSection />
    </>
  );
};

export default WebDevPage;
