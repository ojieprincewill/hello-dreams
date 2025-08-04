import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LessonItem from "./lesson-item.component";

const LessonList = ({ lessons = [], currentLesson, courseId }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openResourceLesson, setOpenResourceLesson] = useState(null);

  const handleLessonClick = (lessonId) => {
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
          onClick={() => handleLessonClick(lesson.id)}
          isResourceOpen={openResourceLesson === lesson.id}
          onResourceToggle={() => handleResourceToggle(lesson.id)}
        />
      ))}
    </div>
  );
};

export default LessonList;
