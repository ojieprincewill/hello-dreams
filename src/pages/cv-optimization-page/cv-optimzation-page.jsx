import React from "react";

import CvOptimizationHeader from "../../components/cv-optimization-header/cv-optimization-header.component";
import CvProcess from "../../components/cv-optimization-process/cv-optimization-process.component";
import WhatSetsUsApart from "../../components/what-sets-us-apart/what-sets-us-apart.component";
import MeetExperts from "../../components/meet-experts/meet-experts.component";
import Pricing from "../../components/pricing/pricing.component";
import CvOptimizationCta from "../../components/cv-optimization-cta/cv-optimization-cta.component";
import NewsletterSection from "../../components/newsletter-section/newsletter-section.component";
import FooterSection from "../../components/footer-section/footer-section.component";
import CvTestimonial from "../../components/cv-testimonial/cv-testimonial.component";

const CvOptimizationPage = () => {
  return (
    <>
      <CvOptimizationHeader />
      <CvProcess />
      <WhatSetsUsApart />
      <CvTestimonial />
      <MeetExperts />
      <Pricing />
      <CvOptimizationCta />
      <NewsletterSection />
      <FooterSection />
    </>
  );
};

export default CvOptimizationPage;
