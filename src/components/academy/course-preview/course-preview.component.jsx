import React, { useState, useRef, useCallback } from 'react';
import { ChevronDown, Play, FileText, Lock, Award } from 'lucide-react';
import { BookmarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useCourse } from '@/hooks/useCourses';
import { useCourseSectionsData } from '@/hooks/useAcademy';

const PAGE_SIZE = 15;

const CoursePreview = ({ courseId }) => {
  const { data: course, isLoading, error } = useCourse(courseId);
  const {
    data: sections = [],
    isLoading: sectionsLoading,
    error: sectionsError,
  } = useCourseSectionsData(courseId);
  const [visibleSections, setVisibleSections] = useState(PAGE_SIZE);
  const loader = useRef();

  // Infinite scroll: load more sections when the loader is visible
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setVisibleSections((prev) =>
          Math.min(prev + PAGE_SIZE, sections.length),
        );
      }
    },
    [sections.length],
  );

  React.useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new window.IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  if (isLoading || sectionsLoading) return <div>Loading course...</div>;
  if (error || sectionsError) return <div>Error loading course.</div>;
  if (!course) return <div>Course not found.</div>;

  return (
    <div className="px-[5%] py-10">
      <div className="bg-[#efece9] h-[180px] lg:h-[338px] md:h-[240px] p-3 lg:p-5 flex justify-center items-center rounded-md overflow-hidden shadow-lg">
        <img
          src={course.cover_image}
          alt="Course preview"
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 ">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Title and Description */}
            <div className="space-y-3 lg:space-y-4 ">
              <p className="text-[#212121] text-[20px] md:w-[500px] lg:text-[36px] md:text-[28px] font-semibold">
                {course.title}
              </p>
              <p
                className="text-[#667085] text-[13px] md:text-[14px] leading-[1.5] max-w-full md:max-w-[422px]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {course.description}
              </p>
              <Link
                to={`/academy/courses/${course.id}/player`}
                onClick={handleOrigins}
                className="block w-max bg-transparent border-[1.5px] border-[#101828] text-[12px] md:text-[16px] text-center font-medium px-6 py-2  rounded-md hover:bg-[#1342ff] hover:text-white hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <Play className="w-4 h-4 inline" /> Start course
              </Link>
            </div>

            {/* Course Content */}
            <div className="space-y-3 md:space-y-4">
              <p className="text-[#212121] text-[15px] lg:text-[18px] font-semibold">
                Content
              </p>
              <div>
                {sections.slice(0, visibleSections).map((section) => (
                  <div
                    key={section.id}
                    className="bg-[#f7f7f7] lg:text-[14px] text-[12px] flex justify-between items-center overflow-hidden border border-[#eaecf0] rounded-sm p-3"
                  >
                    <div className="flex items-center space-x-2">
                      <Play className="w-4 h-4" />
                      <p className="text-[#212121] font-medium">
                        {section.title}
                      </p>
                      <span className="text-[#787777] text-[12px]">
                        {section.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="hidden md:block bg-[#78787850] border border-[#78787850] w-[56.87px] h-[4px] rounded-2xl"></div>
                      <BookmarkIcon className="w-4 h-4 lg:w-[16px] lg:h-[20.57px] text-[#333333]" />
                    </div>
                  </div>
                ))}
                <div ref={loader} />
                {visibleSections < sections.length && (
                  <button
                    className="w-full bg-transparent border-[1.5px] border-[#101828] text-[12px] md:text-[16px] text-center font-medium px-6 py-2 rounded-md hover:bg-[#1342ff] hover:text-white hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                    onClick={() =>
                      setVisibleSections((prev) =>
                        Math.min(prev + PAGE_SIZE, sections.length),
                      )
                    }
                  >
                    Load 15 More Sections
                  </button>
                )}
              </div>
            </div>

            {/* Requirements */}
            <div className="lg:space-y-4 space-y-3">
              <p className="text-[#212121] lg:text-[24px] md:text-[18px] sm:text-[17px] font-semibold">
                Requirements
              </p>
              <ul
                className="list-disc pl-6 space-y-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {course.requirements &&
                  course.requirements.split('\n').map((req, idx) => (
                    <li
                      key={idx}
                      className="text-[#2d2f31] lg:text-[14px] text-[13px] "
                    >
                      {req}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Description */}
            <div className="lg:space-y-4 space-y-3">
              <p className="text-[#212121] lg:text-[24px] md:text-[18px] sm:text-[17px] font-semibold">
                Description
              </p>
              <div
                className="text-[#2d2f31] lg:text-[14px] text-[13px] lg:space-y-4 space-y-3"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <p>{course.long_description || course.description}</p>
              </div>
            </div>

            {/* Certificate */}
            <div className="lg:space-y-4 space-y-3">
              <p className="text-[#212121] lg:text-[24px] md:text-[18px] sm:text-[17px] font-semibold">
                Certificate
              </p>
              <div className="relative h-[260px] lg:h-[574px] md:h-[350px] bg-[#eef2fe] p-3 lg:p-6 rounded-2xl overflow-hidden">
                <img
                  src={course.certificate_image}
                  alt="certificate"
                  className="w-full h-full object-cover rounded-2xl"
                  loading="lazy"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-[55%] lg:p-6 p-3 bg-[#f7f7f7]/50 backdrop-blur-sm border-t border-t-[#e5e7eb] overflow-hidden"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Lock className="lg:w-5 lg:h-5 w-4 h-4 md:mb-4 mb-2" />
                  <p className="text-[#212121] lg:text-[18px] text-[14px] font-semibold mb-1">
                    Certificate locked
                  </p>
                  <p className="text-[#414141] lg:text-[14px] text-[12px] mb-5">
                    Complete course to unlock your personalised certificate
                  </p>
                  <div className="bg-[#78787850] border border-[#78787850] w-full h-[4px] rounded-2xl"></div>
                </div>
              </div>
            </div>

            {/* Instructor */}
            <div className="lg:space-y-4 space-y-3">
              <p className="text-[#212121] lg:text-[24px] md:text-[18px] sm:text-[17px] font-semibold">
                Meet your teacher
              </p>
              <div className="flex flex-col items-start md:flex-row md:items-center lg:space-x-7 md:space-x-4 sm:space-x-0 ">
                <div className="w-full h-[180px] md:w-[162px] md:h-[198px] rounded-xl overflow-hidden flex-shrink-0 mb-0 sm:mb-2">
                  <img
                    src={course.instructor_image}
                    alt="instructor"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div
                  className="lg:space-y-7 space-y-4"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <div className="mt-2 md:mt-0 md:space-y-2 ">
                    <p className="text-[#212121] lg:text-[16px] text-[14px] font-semibold">
                      {course.instructor_name}
                    </p>
                    <p className="text-[#2d2f31] text-[12px]">
                      {course.instructor_title}
                    </p>
                  </div>
                  <p className="text-[#2d2f31] text-[13px] lg:text-[14px] leading-[1.5]">
                    {course.instructor_bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 ">
            {/* Course Info Card */}
            <div className="border-[1.5px] border-[#eaecf0] rounded-xl">
              <div className="p-4 border-b-[1.5px] border-b-[#eaecf0]">
                <p className="text-[#101828] lg:text-[20px] text-[15px] font-semibold">
                  {course.title}
                </p>
                <p className="text-[#667085] lg:text-[16px] text-[13px]">
                  {course.difficulty_level} . {course.total_duration}
                </p>
                <Link
                  to={`/academy/courses/${course.id}/player`}
                  onClick={handleOrigins}
                  className="block w-full bg-[#efece9] border-[0.7px] border-[#eaecf0] text-[#010413] text-[12px] md:text-[16px] text-center lg:font-medium mt-7 px-6 py-2 rounded-md hover:bg-[#1342ff] hover:text-white hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Start Course
                </Link>
              </div>

              <div className="p-4 my-2 border-b-[1.5px] border-b-[#eaecf0]">
                <p className="text-[#667085] lg:text-[18px] text-[13px] mb-2">
                  Course Certificate
                </p>
                <div className="relative h-[240px] bg-[#eef2fe] p-3 rounded-2xl overflow-hidden">
                  <img
                    src={course.certificate_image}
                    alt="certificate"
                    className="w-full h-full object-cover rounded-2xl"
                    loading="lazy"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[55%] p-3 bg-[#f7f7f7]/50 backdrop-blur-sm border-t border-t-[#e5e7eb] overflow-hidden"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <Lock className="w-4 h-4 md:mb-3 mb-1" />
                    <p className="text-[#212121] text-[12px] font-semibold mb-1">
                      Certificate locked
                    </p>
                    <p className="text-[#414141] text-[10px] mb-5">
                      Complete course to unlock your personalised certificate
                    </p>
                    <div className="bg-[#78787850] border border-[#78787850] w-full h-[4px] rounded-2xl"></div>
                  </div>
                </div>
              </div>
              {/* Skills Section */}
              <div className="p-4">
                <p className="text-[#667085] lg:text-[18px] text-[13px] mb-3">
                  Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {(course.skills_covered || []).map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center px-2 py-1 lg:px-3 lg:py-2 border-[1.5px] border-[#eaecf0] lg:text-[14px] text-[12px] rounded-sm"
                    >
                      <span className="mr-1 w-4 h-4 lg:w-[15px] lg:h-[16px] p-2 flex justify-center items-center bg-[#eaecf0] text-[#212121] text-[10px] rounded-md">
                        #
                      </span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Remove stray semicolon */}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
