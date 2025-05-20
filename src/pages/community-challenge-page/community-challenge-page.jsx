import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import CommunityChallenge from "../../components/community-challenge/community-challenge.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const CommunityChallengePage = () => {
  return (
    <>
      <NavBar />
      <CommunityChallenge />
      <FooterSection />
    </>
  );
};

export default CommunityChallengePage;
