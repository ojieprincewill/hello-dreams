import React from "react";

import DesignHeader from "../../components/design-header/design-header.component";
import DesignShowcase from "../../components/design-showcase/design-showcase.component";
import BrandsTrust from "../../components/brands-trust-us/brands-trust.component";
import OurProcess from "../../components/our-process/our-process.component";
import WeGetHired from "../../components/we-get-hired/we-get-hired.component";
import CheckOutGallery from "../../components/project-gallery/check-out-gallery.component";
import PeopleAndCompanies from "../../components/people-and-companies/people-and-companies.component";
import OurPackages from "../../components/our-packages/our-packages.component";
import FaqSection from "../../components/faq-section/faq-section.component";
import NewsletterSection from "../../components/newsletter-section/newsletter-section.component";
import ConsultationCall from "../../components/consultation-cta/consultation-cta.component";
import FooterSection from "../../components/footer-section/footer-section.component";
import UiTestimonial from "../../components/ui-testimonial/ui-testimonial.component";
const UiDesignPage = () => {
  return (
    <>
      <DesignHeader />
      <DesignShowcase />
      <BrandsTrust />
      <OurProcess />
      <WeGetHired />
      <CheckOutGallery />
      <PeopleAndCompanies />
      <OurPackages />
      <UiTestimonial />
      <div className="px-[2%]">
        <FaqSection />
      </div>
      <ConsultationCall />
      <NewsletterSection />
      <FooterSection />
    </>
  );
};

export default UiDesignPage;
