import AcademyNavbar from "@/components/academy/academy-nav/academy-nav.component";
import CoursePlayerLayout from "@/components/academy/course-player/course-player-layour.component";
import FooterSection from "@/components/footer-section/footer-section.component";
import React from "react";

const CoursePlayerPage = () => {
  return (
    <>
      <AcademyNavbar />
      <CoursePlayerLayout />
      <FooterSection />
    </>
  );
};

export default CoursePlayerPage;
