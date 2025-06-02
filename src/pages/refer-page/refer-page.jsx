import React from "react";

import ReferHeader from "../../components/refer-earn-header/refer-earn-header.component";
import ReferForm from "../../hello-dreams-forms/refer-form/refer-form.component";
import NewsletterSection from "../../components/newsletter-section/newsletter-section.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const ReferPage = () => {
  return (
    <>
      <ReferHeader />
      <ReferForm />
      <NewsletterSection />
      <FooterSection />
    </>
  );
};

export default ReferPage;
