import AcademyNavbar from "@/components/academy/academy-nav/academy-nav.component";
import ClassesAction from "@/components/academy/ui-classes/classes-action.component";
import ClassesHeader from "@/components/academy/ui-classes/classes-header.component";
import ClassesMain from "@/components/academy/ui-classes/classes-main.component";
import FooterSection from "@/components/footer-section/footer-section.component";
import React from "react";

const ClassesPage = () => {
  return (
    <>
      <AcademyNavbar />
      <div className="py-5">
        <ClassesHeader />
        <ClassesMain />
        <ClassesAction />
      </div>
      <FooterSection />
    </>
  );
};

export default ClassesPage;
