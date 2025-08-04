import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePublishedCourses } from "@/hooks/useCourses";
import {
  BookmarkIcon,
  PlusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import UiuxClassCard from "../class-cards/uiux-class-card.component";
import FreeClassCard from "../class-cards/free-class-card.component";
import Min20ClassCard from "../class-cards/min20-class-card.component";
import CourseCard from "../course-cards/CourseCard";
import { useSelector } from "react-redux";
import CohortCard from "../cohort-card/CohortCard";
import { CohortsData } from "@/data/academy-data/academy.data";

const CATEGORY_OPTIONS = [
  { label: "All classes", value: "all" },
  { label: "UI/UX classes", value: "uiux" },
  { label: "20 mins classes", value: "20min" },
  { label: "Free classes", value: "free" },
  { label: "Courses", value: "courses" },
];

const LENGTH_OPTIONS = [
  { label: "All lengths", value: "all" },
  { label: "≤ 10 mins", value: "short" },
  { label: "≤ 20 mins", value: "medium" },
  { label: "≤ 30 mins", value: "long" },
  { label: "> 30 mins", value: "extended" },
];

// Course categories for grouping
const COURSE_CATEGORIES = [
  "User Experience Design",
  "Data Analysis",
  "Digital Marketing",
  "Career Development",
  "Ethics & Conduct",
];

const ClassesMain = () => {
  const location = useLocation();
  const [category, setCategory] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const savedClasses = useSelector((state) => state.savedClasses);
  const [lengthFilter, setLengthFilter] = useState("all");
  const [lengthDropdownOpen, setLengthDropdownOpen] = useState(false);

  // Fetch courses from database
  const { data: courses = [], isLoading, error } = usePublishedCourses();

  // Read category from query param on mount and when location.search changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat && CATEGORY_OPTIONS.some((opt) => opt.value === cat)) {
      setCategory(cat);
    } else {
      setCategory("all");
    }
    setShowSaved(false); // Reset saved view when category changes
  }, [location.search]);

  // Transform database courses to match the expected format
  const transformedCourses = React.useMemo(() => {
    return courses.map(course => ({
      id: course.id,
      image: course.cover_image,
      title: course.title,
      instructor: course.instructor_name || "Instructor",
      totalCourses: course.total_lessons || 0,
      totalTime: course.total_duration || "0h 0m",
      price: course.price || 0,
      category: course.category,
      type: "course",
      rating: course.rating,
      numberOfRatings: course.number_of_ratings,
      enrollment_count: course.enrollment_count,
    }));
  }, [courses]);

  // Filter logic
  let filteredClasses = [];
  let filteredCourses = [];

  if (category === "courses") {
    filteredCourses = transformedCourses.filter((item) => {
      if (item.type !== "course") return false;

      // 👇 This filters by saved status if toggled
      if (showSaved && !savedClasses.includes(item.id)) return false;

      return true;
    });
  } else {
    filteredClasses = transformedCourses.filter((item) => {
      if (item.type !== "course") return false;

      // Saved classes logic
      if (showSaved && !savedClasses.includes(item.id)) return false;

      // Category logic - map database categories to UI categories
      if (category !== "all") {
        if (category === "uiux" && item.category !== "User Experience Design") return false;
        if (category === "20min" && item.category !== "User Experience Design") return false; // 20min classes are typically UI/UX related
        if (category === "free" && item.price !== 0) return false;
      }

      // Length filter logic - parse duration string
      if (lengthFilter !== "all") {
        const duration = item.totalTime;
        const minutes = parseDurationToMinutes(duration);
        
        if (lengthFilter === "short" && minutes > 10) return false;
        if (lengthFilter === "medium" && minutes > 20) return false;
        if (lengthFilter === "long" && minutes > 30) return false;
        if (lengthFilter === "extended" && minutes <= 30) return false;
      }

      return true;
    });
  }

  // Helper function to parse duration string to minutes
  const parseDurationToMinutes = (duration) => {
    if (!duration) return 0;
    
    const match = duration.match(/(\d+)h\s*(\d+)m/);
    if (match) {
      const hours = parseInt(match[1]) || 0;
      const minutes = parseInt(match[2]) || 0;
      return hours * 60 + minutes;
    }
    
    // Try to parse just minutes
    const minutesMatch = duration.match(/(\d+)m/);
    if (minutesMatch) {
      return parseInt(minutesMatch[1]) || 0;
    }
    
    return 0;
  };

  // Heading
  const heading = category === "courses" ? "Courses" : "Classes";

  if (isLoading) {
    return (
      <div className="px-[5%] py-8">
        <div className="text-center text-[#667085] py-10">
          Loading classes...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-[5%] py-8">
        <div className="text-center text-red-500 py-10">
          Error loading classes: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="px-[5%] py-8">
      <h1
        className="text-[#010413] text-[20px] md:text-[30px] xl:text-[40px] font-bold mb-6"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        {heading}
      </h1>

      {/* Filter Bar */}
      <div
        className="flex flex-col space-y-2 w-max md:flex-row md:gap-3 md:space-y-0 mb-8 relative"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        {/* Dropdown for category selection */}
        <div className=" relative">
          <button
            className="bg-[#f7f7f7] text-[#010413] text-[16px] px-4 py-3 rounded font-bold flex items-center justify-between md:w-auto md:text-[16px] md:px-4 md:py-2 md:justify-start cursor-pointer"
            onClick={() => setDropdownOpen((open) => !open)}
            disabled={showSaved}
          >
            {CATEGORY_OPTIONS.find((opt) => opt.value === category)?.label}
            <ChevronDownIcon className="w-4 h-4 ml-2" />
          </button>
          {dropdownOpen && !showSaved && (
            <div className="absolute left-0 mt-2 w-auto md:w-48 bg-white border border-[#e5e7eb] rounded shadow z-10">
              {CATEGORY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`w-full text-left px-4 py-2 text-[#010413] hover:bg-[#f7f7f7] ${
                    category === opt.value ? "font-bold" : ""
                  }`}
                  onClick={() => {
                    setCategory(opt.value);
                    setDropdownOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className={` bg-transparent text-[#010413] text-[16px] px-4 py-3 font-bold flex items-center justify-between md:w-auto md:text-[16px] md:px-4 md:py-2 md:justify-start border-b-2 md:border-b-2 transition-all duration-200 cursor-pointer ${
            showSaved ? "border-[#ff7f50]" : "border-transparent"
          }`}
          onClick={() => setShowSaved((prev) => !prev)}
        >
          <BookmarkIcon
            className={`w-5 h-5 mr-2 ${
              showSaved ? "text-[#ff7f50]" : "text-[#41414150]"
            }`}
          />
          Saved {category === "courses" ? "courses" : "classes"}
        </button>

        <div className="relative">
          <button
            className="bg-[#efece9] border border-[#eaecf0] text-[#010413] text-[16px] px-4 py-3 rounded font-bold flex items-center cursor-pointer"
            onClick={() => setLengthDropdownOpen((prev) => !prev)}
            disabled={showSaved}
          >
            + Length
            <ChevronDownIcon className="w-4 h-4 ml-2" />
          </button>
          {lengthDropdownOpen && (
            <div className="absolute mt-2 bg-white border border-[#e5e7eb] rounded shadow z-10">
              {LENGTH_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`block px-4 py-2 w-full text-left hover:bg-[#f7f7f7] ${
                    lengthFilter === opt.value
                      ? "font-bold text-[#ff7f50]"
                      : "text-[#010413]"
                  }`}
                  onClick={() => {
                    setLengthFilter(opt.value);
                    setLengthDropdownOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      {category === "courses" ? (
        <>
          {showSaved ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6 md:gap-y-10">
              {filteredCourses.length === 0 ? (
                <p className="text-center text-[#667085] py-6">
                  You haven't saved any courses yet. Try bookmarking one! 📚✨
                </p>
              ) : (
                filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))
              )}
            </div>
          ) : (
            <>
              {COURSE_CATEGORIES.map((cat) => {
                const coursesInCat = filteredCourses.filter(
                  (c) => c.category === cat
                );
                if (coursesInCat.length === 0) return null;
                return (
                  <div key={cat} className="mb-15">
                    <h2
                      className="text-[20px] md:text-[30px] xl:text-[40px] font-bold mb-5 text-[#010413]"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {cat}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6 md:gap-y-10">
                      {coursesInCat.map((course, index) => {
                        const isLastOdd =
                          index === coursesInCat.length - 1 &&
                          coursesInCat.length % 2 !== 0;

                        const cardClass = isLastOdd
                          ? "md:col-span-2 xl:col-span-1"
                          : "";

                        return (
                          <CourseCard
                            key={course.id}
                            course={course}
                            className={cardClass}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Cohort card still renders at the bottom */}
              <div className="mt-10">
                <h2 className="text-[#010413] text-[20px] md:text-[24px] xl:text-[40px] font-bold mb-7">
                  {CohortsData[0].category}
                </h2>
                <CohortCard
                  info={CohortsData[0].info}
                  price={CohortsData[0].price}
                  oldPrice={CohortsData[0].oldPrice}
                  currency={CohortsData[0].currency}
                />
              </div>
            </>
          )}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6 md:gap-y-10">
          {filteredClasses.length === 0 ? (
            <div className="col-span-full text-center text-[#667085] text-lg py-10">
              No classes found.
            </div>
          ) : (
            filteredClasses.map((cls, index) => {
              const isLastOdd =
                index === filteredClasses.length - 1 &&
                filteredClasses.length % 2 !== 0;

              const cardClass = isLastOdd ? "md:col-span-2 xl:col-span-1" : "";

              // For now, all courses are treated as UI/UX classes since they're all design-related
              // You can add more specific category mapping logic here
              if (cls.category === "User Experience Design" || category === "uiux") {
                return (
                  <UiuxClassCard
                    key={cls.id}
                    data={cls}
                    className={cardClass}
                  />
                );
              }
              if (category === "20min") {
                return (
                  <Min20ClassCard
                    key={cls.id}
                    data={cls}
                    className={cardClass}
                  />
                );
              }
              if (category === "free" || cls.price === 0) {
                return (
                  <FreeClassCard
                    key={cls.id}
                    data={cls}
                    className={cardClass}
                  />
                );
              }
              // Default to UI/UX card for other categories
              return (
                <UiuxClassCard
                  key={cls.id}
                  data={cls}
                  className={cardClass}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default ClassesMain;
