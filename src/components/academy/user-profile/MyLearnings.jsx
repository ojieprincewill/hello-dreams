import React, { useState } from "react";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { useAuth } from "@/hooks/useAuth";
import { Play, Clock, Star, BookOpen, CheckCircle, Bookmark, RefreshCw } from "lucide-react";

const MyLearnings = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAuth();
  const { 
    enrollments, 
    lessonProgress, 
    progressSummary, 
    isLoading, 
    isFetching,
    isError 
  } = useCourseProgress();

  const tabs = [
    { key: "all", label: "All courses" },
    { key: "progress", label: "In progress" },
    { key: "completed", label: "Completed" },
    { key: "bookmarked", label: "Bookmarked" },
  ];

  // Filter enrollments based on tab
  const getFilteredEnrollments = () => {
    if (!enrollments) return [];
    
    switch (activeTab) {
      case "progress":
        return enrollments.filter(enrollment => 
          enrollment.progress_percentage > 0 && enrollment.progress_percentage < 100
        );
      case "completed":
        return enrollments.filter(enrollment => 
          enrollment.completed_at || enrollment.progress_percentage === 100
        );
      case "bookmarked":
        // Filter lessons that are bookmarked and get their courses
        const bookmarkedLessonIds = lessonProgress
          .filter(lesson => lesson.bookmarked)
          .map(lesson => lesson.lessons?.course_id);
        return enrollments.filter(enrollment => 
          bookmarkedLessonIds.includes(enrollment.course_id)
        );
      default:
        return enrollments;
    }
  };

  const filteredEnrollments = getFilteredEnrollments();

  // Get course progress for a specific course
  const getCourseProgress = (courseId) => {
    const courseLessons = lessonProgress.filter(
      lesson => lesson.lessons?.course_id === courseId
    );
    
    if (courseLessons.length === 0) return 0;
    
    const completedLessons = courseLessons.filter(lesson => lesson.completed).length;
    return Math.round((completedLessons / courseLessons.length) * 100);
  };

  // Get last watched lesson for a course
  const getLastWatchedLesson = (courseId) => {
    const courseLessons = lessonProgress
      .filter(lesson => lesson.lessons?.course_id === courseId)
      .sort((a, b) => new Date(b.last_watched_at) - new Date(a.last_watched_at));
    
    return courseLessons[0];
  };

  // Show error state only if there's no cached data
  if (isError && enrollments.length === 0) {
    return (
      <div className="w-full px-[5%] py-10">
        <div className="text-center text-red-600">
          Error loading your learning data. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="bg-[#1342ff] pt-6 md:pt-10 pl-4 md:pl-10 pr-4 md:pr-10 mb-6 text-[#fff] relative overflow-hidden">
        {/* Rotated image in header - hidden on mobile */}
        <div className="absolute top-[-370px] right-[-560px] w-[736px] h-auto hidden xl:block">
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/v1752984140/Academy/sign%20up/3f66b694a8196a4df5f2b870dc9901b56806d575_pntsis.png"
            alt="Decorative"
            className="w-full h-full object-cover"
            style={{ transform: "rotate(90.48deg)" }}
          />
        </div>

        <div className="flex items-center justify-between mb-3 md:mb-5">
          <h1 className="text-[20px] md:text-[30px] xl:text-[48px] font-bold relative z-10">
          My Learning
        </h1>
          {/* Background sync indicator */}
          {isFetching && (
            <div className="flex items-center gap-2 text-white/80 text-sm relative z-10">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Syncing...</span>
            </div>
          )}
        </div>
        
        {progressSummary && (
        <div
          className="text-[14px] md:text-[16px] xl:text-[20px] mb-3 md:mb-5 relative z-10"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
            {progressSummary.totalWatchTime.hours}hr {progressSummary.totalWatchTime.minutes}min{" "}
          <span className="text-[#f7f7f7]/60 text-[12px] md:text-[14px] xl:text-[16px]">
            watched
          </span>
        </div>
        )}

        {/* Responsive tabs */}
        <div className="relative z-10 mt-10 md:mt-20 xl:mt-30">
          <div className="flex gap-3 md:gap-8 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`pb-2 transition-colors duration-200 text-xs sm:text-sm md:text-base xl:text-lg cursor-pointer whitespace-nowrap flex-shrink-0 min-w-fit
                   ${
                     activeTab === tab.key
                       ? "border-b-2 sm:border-b-4 md:border-b-6 border-[#d9d9d9] font-semibold text-white"
                       : "text-white/80 border-b-2 sm:border-b-4 md:border-b-6 border-transparent"
                   }
                  `}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {/* Show loading state only if no data exists */}
        {isLoading && enrollments.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1342ff]"></div>
          </div>
        ) : filteredEnrollments.length === 0 ? (
              <div className="text-[#667085] text-center py-8">
            {activeTab === "all" && "No courses enrolled yet."}
            {activeTab === "progress" && "No courses in progress yet."}
            {activeTab === "completed" && "No completed courses yet."}
            {activeTab === "bookmarked" && "No bookmarked lessons yet."}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredEnrollments.map((enrollment) => {
              const course = enrollment.courses;
              const progress = getCourseProgress(course.id);
              const lastWatched = getLastWatchedLesson(course.id);
              
                  return (
                <div
                  key={enrollment.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  {/* Course Image */}
                  <div className="relative h-48 bg-gray-200">
                    {course.cover_image ? (
                      <img
                        src={course.cover_image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                        <BookOpen className="w-12 h-12 text-blue-400" />
              </div>
            )}
                    
                    {/* Progress Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>{progress}% Complete</span>
                        <span>{course.total_duration || "N/A"}</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                        <div
                          className="bg-white h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
          </div>

                  {/* Course Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-[#101828] mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <p className="text-[#667085] text-sm mb-3 line-clamp-2">
                      {course.description || "No description available"}
                    </p>

                    {/* Course Meta */}
                    <div className="flex items-center justify-between text-sm text-[#667085] mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.total_lessons || 0} lessons</span>
              </div>
                      {course.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{course.rating.toFixed(1)}</span>
              </div>
            )}
                    </div>

                    {/* Instructor */}
                    {course.instructor_name && (
                      <div className="text-sm text-[#667085] mb-3">
                        by {course.instructor_name}
          </div>
        )}

                    {/* Last Watched */}
                    {lastWatched && (
                      <div className="text-xs text-[#667085] mb-3">
                        Last watched: {lastWatched.lessons?.title}
              </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-[#1342ff] text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-[#2313ff] transition-colors duration-200 flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" />
                        Continue
                      </button>
                      
                      {enrollment.progress_percentage === 100 && (
                        <div className="flex items-center gap-1 text-green-600 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Completed
              </div>
            )}
          </div>
                  </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearnings;
