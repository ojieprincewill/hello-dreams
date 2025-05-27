import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import MentorshipForm from "../../hello-dreams-forms/mentorship-form/mentorship-form.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const MentorshipApplicationPage = () => {
  return (
    <>
      <NavBar />
      <MentorshipForm />
      <FooterSection />
    </>
  );
};

export default MentorshipApplicationPage;
