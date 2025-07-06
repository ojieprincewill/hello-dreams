import React, { useState } from "react";
import LessonItem from "./lesson-item.component";

// Dummy data for now
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
  // ...add more as needed
];

const LessonList = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="flex flex-col gap-1">
      {lessons.map((lesson) => (
        <LessonItem
          key={lesson.number}
          {...lesson}
          isActive={active === lesson.number}
          onClick={() => setActive(lesson.number)}
        />
      ))}
    </div>
  );
};

export default LessonList;
