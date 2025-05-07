import React from "react";

import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import UiConsultationForm from "../../hello-dreams-forms/ui-ux-consultation-form/ui-consultation-form.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const UiConsultationPage = () => {
  return (
    <>
      <NavBar />
      <UiConsultationForm />
      <FooterSection />
    </>
  );
};

export default UiConsultationPage;
