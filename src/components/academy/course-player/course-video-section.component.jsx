import React from "react";
import VideoPlayer from "./video-player.component";
import CourseTabs from "./course-tabs.component";
import CourseInfo from "./course-info.component";
import CourseDescription from "./course-description.component";

const CourseVideoSection = () => {
  return (
    <div>
      <VideoPlayer
        videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
        poster="https://via.placeholder.com/800x450.png?text=Course+Video"
        captions={null}
      />
      <CourseTabs />
      <CourseInfo />
      <CourseDescription />
    </div>
  );
};

export default CourseVideoSection;
