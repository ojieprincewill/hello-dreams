import React from 'react';
import CourseVideoSection from './course-video-section.component';
import CourseContentSidebar from './course-content-sidebar.component';

const CoursePlayerLayout = ({ course }) => {
  const { currentLesson, lessons } = course;

  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-[5%] py-10 flex flex-col xl:flex-row gap-8">
        {/* Main Section */}
        <div className="flex-1 min-w-0">
          <CourseVideoSection
            image={course.cover_image}
            title={course.title}
            playbackId={currentLesson?.playback_id}
            userId={course.userId}
            assetId={currentLesson?.asset_id}
            lessonTitle={currentLesson?.title}
            currentLesson={currentLesson}
            lessons={lessons}
            courseId={course.id}
            course={course}
          />
        </div>
        {/* Sidebar */}
        <aside className="w-full xl:w-[340px] flex-shrink-0">
          <CourseContentSidebar 
            course={course}
            currentLesson={currentLesson}
            lessons={lessons}
          />
        </aside>
      </div>
    </div>
  );
};

export default CoursePlayerLayout;
