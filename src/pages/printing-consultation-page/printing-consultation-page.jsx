import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import PrintingConsultationForm from "../../hello-dreams-forms/printing-consultation-form/printing-consultation-form.component";
import FooterSection from "../../components/footer-section/footer-section.component";
import PrintingConsultationSuccess from "../../hello-dreams-forms/printing-consultation-form/printing-consultation-success.component";

const PrintingConsultationPage = () => {
  return (
    <>
      <NavBar />
      <PrintingConsultationForm />
      <FooterSection />
    </>
  );
};

export default PrintingConsultationPage;
