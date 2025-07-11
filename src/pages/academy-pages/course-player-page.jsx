import AcademyNavbar from '@/components/academy/academy-nav/academy-nav.component';
import CoursePlayerLayout from '@/components/academy/course-player/course-player-layour.component';
import FooterSection from '@/components/footer-section/footer-section.component';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useCourse } from '@/hooks/useCourses';

const CoursePlayerPage = () => {
  const { courseId } = useParams();
  const { data: course, isLoading, error } = useCourse(courseId);

  if (isLoading) return <div>Loading course...</div>;
  if (error) return <div>Error loading course.</div>;
  if (!course) return <div>Course not found.</div>;

  return (
    <>
      <AcademyNavbar />
      <CoursePlayerLayout course={course} />
      <FooterSection />
    </>
  );
};

export default CoursePlayerPage;
