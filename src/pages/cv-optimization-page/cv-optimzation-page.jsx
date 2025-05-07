import React from "react";

import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import CvOptimizationHeader from "../../components/cv-optimization-header/cv-optimization-header.component";
import CvProcess from "../../components/cv-optimization-process/cv-optimization-process.component";
import WhatSetsUsApart from "../../components/what-sets-us-apart/what-sets-us-apart.component";
import TestimonialSection from "../../components/testimonial-section/testimonial-section.component";
import MeetExperts from "../../components/meet-experts/meet-experts.component";
import Pricing from "../../components/pricing/pricing.component";
import CvOptimizationCta from "../../components/cv-optimization-cta/cv-optimization-cta.component";
import NewsletterSection from "../../components/newsletter-section/newsletter-section.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const CvOptimizationPage = () => {
  return (
    <>
      <NavBar />
      <CvOptimizationHeader />
      <CvProcess />
      <WhatSetsUsApart />
      <TestimonialSection />
      <MeetExperts />
      <Pricing />
      <CvOptimizationCta />
      <NewsletterSection />
      <FooterSection />
    </>
  );
};

export default CvOptimizationPage;
