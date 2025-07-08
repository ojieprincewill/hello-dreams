import React from "react";
import VideoPlayer from "./video-player.component";
import CourseTabs from "./course-tabs.component";
import CourseInfo from "./course-info.component";
import CourseDescription from "./course-description.component";

const CourseVideoSection = ({ image, title }) => {
  return (
    <div>
      <VideoPlayer
        videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
        poster={image}
        captions={null}
      />
      <CourseTabs />
      <CourseInfo title={title} />
      <CourseDescription />
    </div>
  );
};

export default CourseVideoSection;
