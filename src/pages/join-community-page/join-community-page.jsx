import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import JoinCommunityForm from "../../hello-dreams-forms/join-community-form/join-community-form.component";
import FooterSection from "../../components/footer-section/footer-section.component";
import JoinCommunitySuccess from "../../hello-dreams-forms/join-community-form/join-community-success.component";

const JoinCommunityPage = () => {
  return (
    <>
      <NavBar />
      <JoinCommunityForm />
      <JoinCommunitySuccess />
      <FooterSection />
    </>
  );
};

export default JoinCommunityPage;
