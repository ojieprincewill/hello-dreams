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
      <h2 className="text-[18px] md:text-[20px] text-[#667085] mb-3">
        {title}
      </h2>
      <p className="text-[14px] text-[#667085] mb-2">
        last updated {lastUpdated}
      </p>

      <div
        className="py-5 my-5 border-t-[1.5px] border-b-[1.5px] border-[#eaecf0] flex flex-wrap items-center gap-x-25 gap-y-5 text-[14px] md:text-[16px] text-gray-700 mb-2"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        <div className="space-y-2">
          <p className=" text-[#010413]">
            <span className="text-[#667085]">Languages:</span> {language}
          </p>
          <p className=" text-[#010413]">
            <span className="text-[#667085]">Captions:</span> {captions}
          </p>
        </div>
        <div className="space-y-2">
          <p className=" text-[#010413]">
            <span className="text-[#667085]">Lectures:</span> {lectures}
          </p>
          <p className=" text-[#010413]">
            <span className="text-[#667085]">Video:</span> {totalHours}
          </p>
        </div>
      </div>

      <div
        className="pt-5 pb-10 border-b-[1.5px] border-[#eaecf0] text-[14px] md:text-[16px] flex flex-col md:flex-row md:items-start gap-x-35 gap-y-3 mt-2"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        <p className="text-[#010413] font-semibold">Certificates</p>

        <div className="space-y-5 md:w-max">
          <p className="text-[#010413]">
            Get your certificate by completing entire course
          </p>
          <button className="border-[1.5px] border-[#eaecf0] w-full rounded-md px-3 py-2 text-[14px] text-center font-medium hover:bg-[#1342ff] hover:text-[#fff] transition-colors duration-300 cursor-pointer">
            {certificate}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
