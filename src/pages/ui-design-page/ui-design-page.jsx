import React from "react";

import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import DesignHeader from "../../components/design-header/design-header.component";
import DesignShowcase from "../../components/design-showcase/design-showcase.component";
import BrandsTrust from "../../components/brands-trust-us/brands-trust.component";
const UiDesignPage = () => {
  return (
    <>
      <NavBar />
      <DesignHeader />
      <DesignShowcase />
      <BrandsTrust />
    </>
  );
};

export default UiDesignPage;
