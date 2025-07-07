import React from "react";
import { ChevronDown } from "lucide-react";

const LessonItem = ({
  number,
  title,
  duration,
  completed,
  onClick,
  resources,
  isActive,
  isResourceOpen,
  onResourceToggle,
}) => (
  <div
    className={`flex flex-col py-2 px-3 rounded-lg cursor-pointer transition-colors duration-200 select-none ${
      isActive ? "bg-[#eef2fe]" : "hover:bg-gray-100"
    }`}
    style={{ fontFamily: "DM Sans, sans-serif" }}
    onClick={onClick}
  >
    <div className="flex items-start justify-between w-full">
      <div className="flex items-start gap-2 min-w-0">
        <input
          type="checkbox"
          checked={completed}
          readOnly
          className="accent-[#1342ff] w-4 h-4"
        />

        <div className="space-y-1 text-[#101828]">
          <div className="flex items-start gap-1 min-w-0">
            <span className="text-[14px] font-medium">{number}.</span>
            <span className="text-[14px]">{title}</span>
          </div>
          <span className="text-[13px] text-[#667085] min-w-[32px] text-right">
            {duration}
          </span>
        </div>
      </div>

      <div className="flex-shrink-0 relative" onClick={e => e.stopPropagation()}>
        {resources && (
          <>
            <button
              className="flex items-center gap-1 text-[12px] px-2 py-1 border border-gray-300 rounded-md text-[#1342ff] bg-white hover:bg-[#eef2fe] transition-colors"
              onClick={onResourceToggle}
              type="button"
            >
              Resources
              <ChevronDown size={16} className={`ml-1 transition-transform ${isResourceOpen ? "rotate-180" : "rotate-0"}`} />
            </button>
            {isResourceOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-3 text-[13px] text-gray-800">
                <div className="font-semibold mb-2">Lesson Resources</div>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="text-[#1342ff] hover:underline">PDF: Lesson Notes</a>
                  </li>
                  <li>
                    <a href="#" className="text-[#1342ff] hover:underline">Figma File</a>
                  </li>
                  <li>
                    <a href="#" className="text-[#1342ff] hover:underline">Download Assets</a>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  </div>
);

export default LessonItem;
