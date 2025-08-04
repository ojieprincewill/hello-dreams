import React from "react";

const CourseInfo = ({ course, lessons = [] }) => {
  // Calculate totals from lessons
  const totalLectures = lessons.length;
  const totalDuration = lessons.reduce((total, lesson) => {
    const duration = lesson.video_duration_formatted || lesson.duration || '0:00';
    const minutes = parseFloat(duration.split(':')[0]) * 60 + parseFloat(duration.split(':')[1] || 0);
    return total + minutes;
  }, 0);
  
  const totalHours = Math.floor(totalDuration / 60);
  const totalMinutes = totalDuration % 60;
  const formattedDuration = totalHours > 0 
    ? `${totalHours}h ${totalMinutes}m total` 
    : `${totalMinutes}m total`;

  // Format last updated date
  const lastUpdated = course?.last_updated 
    ? new Date(course.last_updated).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      })
    : 'Recently';

  return (
    <div className="mt-4 mb-6">
      <h2 className="text-[18px] md:text-[20px] text-[#667085] mb-3">
        {course?.title}
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
            <span className="text-[#667085]">Languages:</span> {course?.language || 'English'}
          </p>
          <p className=" text-[#010413]">
            <span className="text-[#667085]">Captions:</span> {course?.captions_available ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="space-y-2">
          <p className=" text-[#010413]">
            <span className="text-[#667085]">Lectures:</span> {totalLectures}
          </p>
          <p className=" text-[#010413]">
            <span className="text-[#667085]">Video:</span> {formattedDuration}
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
          <button className="border-[1.5px] border-[#eaecf0] w-full rounded-md px-3 py-2 text-[14px] text-center font-medium hover:bg-[#eef2fe] transition-colors duration-300 cursor-pointer">
            {course?.certificate_available ? 'Hello Dreams certificate' : 'Certificate not available'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
