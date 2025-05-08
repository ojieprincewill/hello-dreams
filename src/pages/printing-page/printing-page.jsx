import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import PrintingHeader from "../../components/printing-header/printing-header.component";
import PrintingServicesWeOffer from "../../components/printing-services-we-offer/printing-services-we-offer.component";
import PrintingProcess from "../../components/printing-process/printing-process.component";
import OurPrintingPortfolio from "../../components/our-printing-portfolio/our-printing-portfolio.component";
import BrandingPackage from "../../components/branding-package/branding-package.component";
import PrintingTestimonial from "../../components/printing-testimonial/printing-testimonial.component";
import PrintingCta from "../../components/printing-cta/printing-cta.component";
import FaqSection from "../../components/faq-section/faq-section.component";
import NewsletterSection from "../../components/newsletter-section/newsletter-section.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const PrintingPage = () => {
  return (
    <>
      <NavBar />
      <PrintingHeader />
      <PrintingServicesWeOffer />
      <PrintingProcess />
      <OurPrintingPortfolio />
      <BrandingPackage />
      <PrintingTestimonial />
      <PrintingCta />
      <div className="px-[5%]">
        <FaqSection />
      </div>
      <NewsletterSection />
      <FooterSection />
    </>
  );
};

export default PrintingPage;
