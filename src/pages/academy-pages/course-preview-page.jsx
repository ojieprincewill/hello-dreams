import AcademyNavbar from '@/components/academy/academy-nav/academy-nav.component';
import CoursePreview from '@/components/academy/course-preview/course-preview.component';
import CoursePreviewSkeleton from '@/components/academy/course-preview/course-preview-skeleton.component';
import FooterSection from '@/components/footer-section/footer-section.component';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useCourse } from '@/hooks/useCourses';
import { useLessons } from '@/hooks/useLessons';

const CoursePreviewPage = () => {
  const { courseId } = useParams();
  const { data: course, isLoading: courseLoading, error: courseError } = useCourse(courseId);
  const { data: lessons = [], isLoading: lessonsLoading, error: lessonsError } = useLessons(courseId);

  if (courseLoading || lessonsLoading) {
    return (
      <>
        <AcademyNavbar />
        <CoursePreviewSkeleton />
        <FooterSection />
      </>
    );
  }

  if (courseError || lessonsError) return <div>Error loading course.</div>;
  if (!course) return <div>Course not found.</div>;

  return (
    <>
      <AcademyNavbar />
      <CoursePreview courseId={courseId} />
      <FooterSection />
    </>
  );
};

export default CoursePreviewPage;
