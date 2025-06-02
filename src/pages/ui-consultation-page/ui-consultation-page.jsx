import React from "react";

import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import UiConsultationForm from "../../hello-dreams-forms/ui-ux-consultation-form/ui-consultation-form.component";
import FooterSection from "../../components/footer-section/footer-section.component";
import UiConsultationSuccess from "../../hello-dreams-forms/ui-ux-consultation-form/ui-consultation-success.component";

const UiConsultationPage = () => {
  return (
    <>
      <NavBar />
      <UiConsultationForm />
      <UiConsultationSuccess />
      <FooterSection />
    </>
  );
};

export default UiConsultationPage;
