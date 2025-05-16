import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import OurPortfolio from "../../components/our-portfolio/our-portfolio.component";
import NewsletterSection from "../../components/newsletter-section/newsletter-section.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const PortfolioPage = () => {
  return (
    <>
      <NavBar />
      <OurPortfolio />
      <NewsletterSection />
      <FooterSection />
    </>
  );
};

export default PortfolioPage;
