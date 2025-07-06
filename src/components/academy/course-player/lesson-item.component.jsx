import React from "react";

const LessonItem = ({
  number,
  title,
  duration,
  completed,
  onClick,
  resources,
  isActive,
}) => (
  <div
    className={`flex items-center justify-between py-2 px-2 rounded cursor-pointer transition ${
      isActive ? "bg-[#eef2fe]" : "hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={completed}
        readOnly
        className="accent-[#1342ff]"
      />
      <span className="text-[14px] font-medium text-gray-800">{number}.</span>
      <span className="text-[14px] text-gray-800">{title}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-[13px] text-gray-500">{duration}</span>
      {resources && (
        <button className="text-[12px] px-2 py-1 border border-gray-300 rounded text-[#1342ff] hover:bg-[#eef2fe] transition">
          Resources
        </button>
      )}
    </div>
  </div>
);

export default LessonItem;
