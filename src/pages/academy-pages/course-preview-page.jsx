import AcademyNavbar from "@/components/academy/academy-nav/academy-nav.component";
import CoursePreview from "@/components/academy/course-preview/course-preview.component";
import FooterSection from "@/components/footer-section/footer-section.component";
import React from "react";

const CoursePreviewPage = () => {
  return (
    <>
      <AcademyNavbar />
      <CoursePreview />
      <FooterSection />
    </>
  );
};

export default CoursePreviewPage;
