import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import SocialConsultationForm from "../../hello-dreams-forms/social-consultation-form/social-consultation-form.component";
import FooterSection from "../../components/footer-section/footer-section.component";
import SocialConsultationSuccess from "../../hello-dreams-forms/social-consultation-form/social-consultation-success.component";

const SocialConsultationPage = () => {
  return (
    <>
      <NavBar />
      <SocialConsultationForm />
      <SocialConsultationSuccess />
      <FooterSection />
    </>
  );
};

export default SocialConsultationPage;
