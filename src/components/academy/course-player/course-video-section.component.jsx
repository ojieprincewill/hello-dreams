import React from "react";
import VideoPlayer from "./video-player.component";
import CourseTabs from "./course-tabs.component";
import CourseInfo from "./course-info.component";
import CourseDescription from "./course-description.component";

const CourseVideoSection = ({ 
  image, 
  title, 
  playbackId, 
  userId, 
  assetId, 
  lessonTitle,
  currentLesson,
  lessons,
  courseId,
  course
}) => {
  return (
    <div>
      <VideoPlayer
        playbackId={playbackId}
        userId={userId}
        assetId={assetId}
        lessonTitle={lessonTitle}
        videoUrl={currentLesson?.video_url}
        poster={image}
        captions={null}
        currentLesson={currentLesson}
      />
      <CourseTabs course={course} lessons={lessons} />
      <CourseInfo course={course} lessons={lessons} />
      <CourseDescription course={course} />
    </div>
  );
};

export default CourseVideoSection;
