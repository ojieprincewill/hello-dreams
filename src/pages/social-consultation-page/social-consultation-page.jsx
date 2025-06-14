import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import SocialConsultationForm from "../../hello-dreams-forms/social-consultation-form/social-consultation-form.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const SocialConsultationPage = () => {
  return (
    <>
      <NavBar />
      <SocialConsultationForm />
      <FooterSection />
    </>
  );
};

export default SocialConsultationPage;
