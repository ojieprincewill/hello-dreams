import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import MentorshipForm from "../../hello-dreams-forms/mentorship-form/mentorship-form.component";
import FooterSection from "../../components/footer-section/footer-section.component";
import MentorshipSuccess from "../../hello-dreams-forms/mentorship-form/mentorship-success.component";

const MentorshipApplicationPage = () => {
  return (
    <>
      <NavBar />
      <MentorshipForm />
      <MentorshipSuccess />
      <FooterSection />
    </>
  );
};

export default MentorshipApplicationPage;
