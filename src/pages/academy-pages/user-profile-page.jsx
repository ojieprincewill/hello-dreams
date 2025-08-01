import React from "react";
import AcademyNavbar from "../../components/academy/academy-nav/academy-nav.component";
import UserProfileMain from "../../components/academy/user-profile/UserProfileMain";
import FooterSection from "../../components/footer-section/footer-section.component";

const UserProfilePage = () => {
  return (
    <>
      <AcademyNavbar />
      <UserProfileMain />
      <FooterSection />
    </>
  );
};

export default UserProfilePage;
