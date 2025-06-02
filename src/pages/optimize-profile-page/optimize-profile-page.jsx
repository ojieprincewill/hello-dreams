import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import FooterSection from "../../components/footer-section/footer-section.component";
import ProfileOptimizationForm from "../../hello-dreams-forms/profile-optimization-form/profile-optimization-form.component";
import ProfileOptimizationSuccess from "../../hello-dreams-forms/profile-optimization-form/profile-optimization-success.component";

const OptimizeProfilePage = () => {
  return (
    <>
      <NavBar />
      <ProfileOptimizationForm />
      <ProfileOptimizationSuccess />
      <FooterSection />
    </>
  );
};

export default OptimizeProfilePage;
