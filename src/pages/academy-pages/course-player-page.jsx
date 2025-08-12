import AcademyNavbar from '@/components/academy/academy-nav/academy-nav.component';
import CoursePlayerLayout from '@/components/academy/course-player/course-player-layour.component';
import CoursePlayerSkeleton from '@/components/academy/course-player/course-player-skeleton.component';
import FooterSection from '@/components/footer-section/footer-section.component';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useCourse } from '@/hooks/useCourses';
import { useLessons } from '@/hooks/useLessons';
import { useCourseProgress } from '@/hooks/useCourseProgress';

const CoursePlayerPage = () => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get('lesson');
  
  const { data: course, isLoading, error } = useCourse(courseId);
  const { data: lessons = [], isLoading: lessonsLoading } = useLessons(courseId);
  const { enrollments = [] } = useCourseProgress();

  // Check if user is enrolled in this course
  const isEnrolled = React.useMemo(() => {
    if (!enrollments || !courseId) return false;
    return enrollments.some(e => e.course_id === courseId);
  }, [enrollments, courseId]);

  // Find the current lesson
  const currentLesson = React.useMemo(() => {
    if (!lessonId || !lessons.length) {
      return lessons[0] || null; // Default to first lesson if no lesson specified
    }
    return lessons.find(lesson => lesson.id === lessonId) || lessons[0] || null;
  }, [lessonId, lessons]);

  if (isLoading || lessonsLoading) {
    return (
      <>
        <AcademyNavbar />
        <CoursePlayerSkeleton />
        <FooterSection />
      </>
    );
  }

  if (error) return <div>Error loading course.</div>;
  if (!course) return <div>Course not found.</div>;

  // Prepare course data with current lesson
  const courseWithLesson = {
    ...course,
    currentLesson,
    lessons,
  };

  return (
    <>
      <AcademyNavbar />
      <CoursePlayerLayout course={courseWithLesson} isEnrolled={isEnrolled} />
      <FooterSection />
    </>
  );
};

export default CoursePlayerPage;
