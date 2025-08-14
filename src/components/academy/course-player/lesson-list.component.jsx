import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LessonItem from "./lesson-item.component";

const LessonList = ({ lessons = [], currentLesson, courseId, isEnrolled }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openResourceLesson, setOpenResourceLesson] = useState(null);
  console.log(currentLesson);
  console.log(lessons)

  const handleLessonClick = (lessonId, index) => {
    // If not enrolled and lesson is 3rd or later, redirect to membership page
    if (!isEnrolled && index >= 2) {
      navigate(`/membership?active=course&courseId=${courseId}`);
      return;
    }
    setSearchParams({ lesson: lessonId });
  };

  const handleResourceToggle = (lessonId) => {
    setOpenResourceLesson((prev) =>
      prev === lessonId ? null : lessonId
    );
  };

  if (!lessons.length) {
    return (
      <div className="flex flex-col gap-1">
        <div className="p-4 text-center text-gray-500">
          No lessons available for this course.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {lessons.map((lesson, index) => (
        <LessonItem
          key={lesson.id}
          number={lesson.lesson_number || index + 1}
          title={lesson.title}
          duration={lesson.video_duration_formatted || lesson.duration || '0:00'}
          completed={lesson.completed || false}
          resources={lesson.resources_available}
          isActive={currentLesson?.id === lesson.id}
          onClick={() => handleLessonClick(lesson.id, index)}
          isResourceOpen={openResourceLesson === lesson.id}
          onResourceToggle={() => handleResourceToggle(lesson.id)}
          isLocked={!isEnrolled && index >= 2 && lesson.price !== 0}
        />
      ))}
    </div>
  );
};

export default LessonList;
