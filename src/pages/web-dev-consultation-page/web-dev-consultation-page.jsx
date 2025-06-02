import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import WebDevConsultationForm from "../../hello-dreams-forms/web-dev-consultation-form/web-dev-consultation-form.component";
import FooterSection from "../../components/footer-section/footer-section.component";
import DevConsultationSuccess from "../../hello-dreams-forms/web-dev-consultation-form/dev-consultation-success.component";

const WebDevConsultationPage = () => {
  return (
    <>
      <NavBar />
      <WebDevConsultationForm />
      <DevConsultationSuccess />
      <FooterSection />
    </>
  );
};

export default WebDevConsultationPage;
