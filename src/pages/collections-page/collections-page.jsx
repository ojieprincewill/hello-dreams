import React from "react";
import CollectionsHeader from "../../components/collections/header/header.component";
import CollectionsList from "../../components/collections/list/list.component";
import NewsletterSection from "../../components/newsletter-section/newsletter-section.component";
import FooterSection from "../../components/footer-section/footer-section.component";
const CollectionsPage = () => {
  return (
    <>
      <CollectionsHeader />
      <CollectionsList />
      <NewsletterSection />
      <FooterSection />
    </>
  );
};

export default CollectionsPage;
