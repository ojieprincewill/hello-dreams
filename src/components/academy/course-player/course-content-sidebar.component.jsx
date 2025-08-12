import React from "react";
import LessonList from "./lesson-list.component";

const CourseContentSidebar = ({ course, currentLesson, lessons, isEnrolled }) => (
  <div className="border border-[#cccccc] p-1 shadow max-h-[700px] overflow-y-auto">
    <p className="bg-[#f0f3fb] p-4 text-[16px] xl:text-[20px] text-[#010413] mb-4">
      Course Content
    </p>
    <LessonList 
      lessons={lessons} 
      currentLesson={currentLesson} 
      courseId={course?.id}
      isEnrolled={isEnrolled}
    />
  </div>
);

export default CourseContentSidebar;
