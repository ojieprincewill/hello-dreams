import React from "react";
import VideoPlayer from "./video-player.component";
import CourseTabs from "./course-tabs.component";
import CourseInfo from "./course-info.component";
import CourseDescription from "./course-description.component";

const CourseVideoSection = ({ image, title, playbackId, userId, assetId, lessonTitle }) => {
  return (
    <div>
      <VideoPlayer
        playbackId={playbackId}
        userId={userId}
        assetId={assetId}
        lessonTitle={lessonTitle}
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
