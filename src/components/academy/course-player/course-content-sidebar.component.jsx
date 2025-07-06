import React from "react";
import LessonList from "./lesson-list.component";

const CourseContentSidebar = () => (
  <div className="bg-white rounded-lg shadow p-4 max-h-[80vh] overflow-y-auto">
    <h3 className="text-[16px] font-bold mb-4">Course Content</h3>
    <LessonList />
  </div>
);

export default CourseContentSidebar;