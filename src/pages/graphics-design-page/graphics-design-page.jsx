import React from "react";

import GraphicsDesignHeader from "../../components/graphics-design-header/graphics-design-header.component";
import GraphicsAndBranding from "../../components/graphics-and-branding/graphics-and-branding.component";
import OurPrintingPortfolio from "../../components/our-printing-portfolio/our-printing-portfolio.component";
import PrintingTestimonial from "../../components/printing-testimonial/printing-testimonial.component.jsx";
import BrandingPackageSme from "../../components/SME-branding-package/branding-package-sme.component.jsx";
import GraphicsDesignCta from "../../components/graphics-design-cta/graphics-design-cta.component.jsx";
import NewsletterSection from "../../components/newsletter-section/newsletter-section.component.jsx";
import FooterSection from "../../components/footer-section/footer-section.component.jsx";

const GraphicsDesignPage = () => {
  return (
    <>
      <GraphicsDesignHeader />
      <GraphicsAndBranding />
      <OurPrintingPortfolio />
      <PrintingTestimonial />
      <BrandingPackageSme />
      <GraphicsDesignCta />
      <NewsletterSection />
      <FooterSection />
    </>
  );
};

export default GraphicsDesignPage;
