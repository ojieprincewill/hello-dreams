import React, { useState } from "react";
import LessonItem from "./lesson-item.component";

const lessons = [
  {
    number: 1,
    title: "Section & Div Block",
    duration: "4min",
    completed: false,
  },
  {
    number: 2,
    title: "Read-only version of chat app",
    duration: "4min",
    completed: false,
  },
  { number: 3, title: "Size Settings", duration: "4min", completed: false },
  {
    number: 4,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
    resources: true,
  },
  {
    number: 5,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
    resources: true,
  },
  {
    number: 6,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
    resources: true,
  },
  { number: 7, title: "Section Notes", duration: "4min", completed: false },
  { number: 8, title: "Web Typography", duration: "4min", completed: false },
  { number: 9, title: "Buttons and Links", duration: "4min", completed: false },
  {
    number: 10,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
  },
  { number: 11, title: "Section Notes", duration: "4min", completed: false },
  { number: 12, title: "CSS Classes", duration: "4min", completed: false },
  { number: 13, title: "Images", duration: "4min", completed: false },
  {
    number: 14,
    title: "Float, Column, Display",
    duration: "4min",
    completed: false,
  },
  { number: 15, title: "Flex Box", duration: "4min", completed: false },
  {
    number: 16,
    title: "Webflow vs figma Sizes",
    duration: "4min",
    completed: false,
  },
  { number: 17, title: "Flexbox Game", duration: "4min", completed: false },
  {
    number: 18,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
  },
  {
    number: 19,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
  },
  {
    number: 20,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
  },
  {
    number: 21,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
  },
  {
    number: 22,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
  },
  {
    number: 23,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
  },
  {
    number: 24,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
  },
  {
    number: 25,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
  },
  {
    number: 26,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
  },
  {
    number: 27,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
  },
  {
    number: 28,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
  },
  {
    number: 29,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
  },
  {
    number: 30,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
  },
  {
    number: 31,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
  },
  {
    number: 32,
    title: "Padding & margins",
    duration: "4min",
    completed: false,
  },
];

const LessonList = () => {
  const [active, setActive] = useState(1);
  const [openResourceLesson, setOpenResourceLesson] = useState(null);

  const handleResourceToggle = (lessonNumber) => {
    setOpenResourceLesson((prev) =>
      prev === lessonNumber ? null : lessonNumber
    );
  };

  return (
    <div className="flex flex-col gap-1">
      {lessons.map((lesson) => (
        <LessonItem
          key={lesson.number}
          {...lesson}
          isActive={active === lesson.number}
          onClick={() => setActive(lesson.number)}
          isResourceOpen={openResourceLesson === lesson.number}
          onResourceToggle={() => handleResourceToggle(lesson.number)}
        />
      ))}
    </div>
  );
};

export default LessonList;
