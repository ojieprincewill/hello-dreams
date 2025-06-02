import React from "react";

import SocialManagementHeader from "../../components/social-management-header/social-management-header.component";
import OurSocialServices from "../../components/our-social-services/our-social-services.component";
import SocialSetApart from "../../components/social-set-apart/social-set-apart.component";
import SocialMediaCta from "../../components/social-media-cta/social-media-cta.component";
import NewsletterSection from "../../components/newsletter-section/newsletter-section.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const SocialManagementPage = () => {
  return (
    <>
      <SocialManagementHeader />
      <OurSocialServices />
      <SocialSetApart />
      <SocialMediaCta />
      <NewsletterSection />
      <FooterSection />
    </>
  );
};

export default SocialManagementPage;
