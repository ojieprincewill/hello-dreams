import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import AboutHeader from "../../components/about-header/about-header.component";
import AboutMission from "../../components/about-mission/about-mission.component";
import AboutExperts from "../../components/about-experts/about-experts.component";
import AboutStory from "../../components/about-story/about-story.component";
import AboutProblem from "../../components/about-problem/about-problem.component";
import AboutSolution from "../../components/about-solution/about-solution.component";
import AboutAccomplishments from "../../components/about-accomplishments/about-accomplishments.component";
import AboutCta from "../../components/about-cta/about-cta.component";
import NewsletterSection from "../../components/newsletter-section/newsletter-section.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const AboutPage = () => {
  return (
    <>
      <NavBar />
      <AboutHeader />
      <AboutMission />
      <AboutExperts />
      <AboutStory />
      <AboutProblem />
      <AboutSolution />
      <AboutAccomplishments />
      <AboutCta />
      <NewsletterSection />
      <FooterSection />
    </>
  );
};

export default AboutPage;
