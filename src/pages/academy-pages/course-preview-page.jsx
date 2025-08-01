import AcademyNavbar from '@/components/academy/academy-nav/academy-nav.component';
import CoursePreview from '@/components/academy/course-preview/course-preview.component';
import FooterSection from '@/components/footer-section/footer-section.component';
import React from 'react';
import { useParams } from 'react-router-dom';

const CoursePreviewPage = () => {
  const { courseId } = useParams();
  return (
    <>
      <AcademyNavbar />
      <CoursePreview courseId={courseId} />
      <FooterSection />
    </>
  );
};

export default CoursePreviewPage;
