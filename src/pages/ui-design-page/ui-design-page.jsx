import React from "react";

import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import DesignHeader from "../../components/design-header/design-header.component";
import DesignShowcase from "../../components/design-showcase/design-showcase.component";
import BrandsTrust from "../../components/brands-trust-us/brands-trust.component";
import OurProcess from "../../components/our-process/our-process.component";
import WeGetHired from "../../components/we-get-hired/we-get-hired.component";
import CheckOutGallery from "../../components/project-gallery/check-out-gallery.component";
import PeopleAndCompanies from "../../components/people-and-companies/people-and-companies.component";
const UiDesignPage = () => {
  return (
    <>
      <NavBar />
      <DesignHeader />
      <DesignShowcase />
      <BrandsTrust />
      <OurProcess />
      <WeGetHired />
      <CheckOutGallery />
      <PeopleAndCompanies />
    </>
  );
};

export default UiDesignPage;
