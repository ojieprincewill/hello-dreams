import React from "react";

const CourseInfo = ({
  title = "3 in 1 Course: Learn to design website with figma, build with webflow, and make a living freelancing .",
  lastUpdated = "August 2024",
  language = "English",
  captions = "yes",
  lectures = 202,
  totalHours = "21 total hours",
  certificate = "Hello Dreams certificate",
}) => {
  return (
    <div className="mt-4 mb-6">
      <h2 className="text-[18px] md:text-[22px] font-semibold mb-1">{title}</h2>
      <div className="text-[13px] text-gray-500 mb-2">
        last updated {lastUpdated}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-gray-700 mb-2">
        <span>
          <b>languages:</b> {language}
        </span>
        <span>
          <b>Captions:</b> {captions}
        </span>
        <span>
          <b>Lectures:</b> {lectures}
        </span>
        <span>
          <b>Video:</b> {totalHours}
        </span>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2">
        <span className="text-[13px] text-gray-700">
          <b>Certificates</b>
        </span>
        <span className="text-[13px] text-gray-700">
          Get your certificate by completing entire course
        </span>
        <button className="border border-gray-300 rounded px-3 py-1 text-[13px] font-medium bg-white hover:bg-gray-100 transition">
          {certificate}
        </button>
      </div>
    </div>
  );
};

export default CourseInfo;
