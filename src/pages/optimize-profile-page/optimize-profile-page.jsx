import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import FooterSection from "../../components/footer-section/footer-section.component";
import ProfileOptimizationForm from "../../hello-dreams-forms/profile-optimization-form/profile-optimization-form.component";

const OptimizeProfilePage = () => {
  return (
    <>
      <NavBar />
      <ProfileOptimizationForm />
      <FooterSection />
    </>
  );
};

export default OptimizeProfilePage;
