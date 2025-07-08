import React from "react";
import CourseVideoSection from "./course-video-section.component";
import CourseContentSidebar from "./course-content-sidebar.component";

const CoursePlayerLayout = ({ course }) => {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-[5%] py-10 flex flex-col lg:flex-row gap-8">
        {/* Main Section */}
        <div className="flex-1 min-w-0">
          <CourseVideoSection image={course.image} title={course.title} />
        </div>
        {/* Sidebar */}
        <aside className="w-full lg:w-[340px] flex-shrink-0">
          <CourseContentSidebar />
        </aside>
      </div>
    </div>
  );
};

export default CoursePlayerLayout;
