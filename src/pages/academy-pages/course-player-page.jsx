import AcademyNavbar from "@/components/academy/academy-nav/academy-nav.component";
import CoursePlayerLayout from "@/components/academy/course-player/course-player-layour.component";
import FooterSection from "@/components/footer-section/footer-section.component";
import React from "react";
import { useParams } from "react-router-dom";
import { academyItems } from "@/data/academy-data/academy.data";

const CoursePlayerPage = () => {
  const { courseId } = useParams();
  const course = academyItems.find((item) => item.id === Number(courseId));

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <>
      <AcademyNavbar />
      <CoursePlayerLayout course={course} />
      <FooterSection />
    </>
  );
};

export default CoursePlayerPage;
