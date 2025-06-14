import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import GraphicsConsultationForm from "../../hello-dreams-forms/graphics-consultation-form/graphics-consultation-form.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const GraphicsConsultationPage = () => {
  return (
    <>
      <NavBar />
      <GraphicsConsultationForm />
      <FooterSection />
    </>
  );
};

export default GraphicsConsultationPage;
