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
import { useAuth } from "@/hooks/useAuth";

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
  const {user, isAuthenticated} = useAuth();

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

  // Helper: map CATEGORY_OPTIONS value to DB category
  const mapCategoryValueToDb = (value) => {
    switch (value) {
      case "uiux":
        return "User Experience Design";
      case "20min":
        return "20min"; // If you have a DB category for 20min, otherwise handle below
      case "free":
        return "free"; // We'll handle free by price below
      default:
        return value;
    }
  };

  if (category === "courses" || category === "all") {
    // Show ALL published courses, even those with no category
    filteredCourses = transformedCourses.filter((item) => {
      if (item.type !== "course") return false;
      if (showSaved && !savedClasses.includes(item.id)) return false;
      // No category filter for 'all' or 'courses'
      // No length filter for 'courses' (keep as is for 'all' if you want)
      return true;
    });
    filteredClasses = filteredCourses; // For grid below
  } else {
    // Filter by category
    filteredClasses = transformedCourses.filter((item) => {
      if (item.type !== "course") return false;
      if (showSaved && !savedClasses.includes(item.id)) return false;
      // Category logic
      if (category === "uiux") {
        return item.category === "User Experience Design";
      }
      if (category === "20min") {
        // If you have a DB category for 20min, use it; otherwise, filter by duration
        const minutes = parseDurationToMinutes(item.totalTime);
        return minutes <= 20;
      }
      if (category === "free") {
        return item.price === 0;
      }
      // Fallback: match category exactly
      return item.category === mapCategoryValueToDb(category);
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
            className={`w-5 h-5 ${
              showSaved ? "text-[#ff7f50]" : "text-[#41414150]"
            }`}
          />
          Saved {category === "courses" ? "courses" : "classes"}
        </button>

        {/* Dropdown for length selection */}
        <div className=" relative">
          <button
            className="bg-[#f7f7f7] text-[#010413] text-[16px] px-4 py-3 rounded font-bold flex items-center justify-between md:w-auto md:text-[16px] md:px-4 md:py-2 md:justify-start cursor-pointer"
            onClick={() => setLengthDropdownOpen((open) => !open)}
          >
            {LENGTH_OPTIONS.find((opt) => opt.value === lengthFilter)?.label}
            <ChevronDownIcon className="w-4 h-4 ml-2" />
          </button>
          {lengthDropdownOpen && (
            <div className="absolute left-0 mt-2 w-auto md:w-48 bg-white border border-[#e5e7eb] rounded shadow z-10">
              {LENGTH_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`w-full text-left px-4 py-2 text-[#010413] hover:bg-[#f7f7f7] ${
                    lengthFilter === opt.value ? "font-bold" : ""
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

      {/* Grid of classes/courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((item) => {
          if (item.type === "course") {
            return <CourseCard key={item.id} course={item} user={user} isAuthenticated={isAuthenticated} />;
          } else if (item.type === "uiux") {
            return <UiuxClassCard key={item.id} class={item} />;
          } else if (item.type === "free") {
            return <FreeClassCard key={item.id} class={item} />;
          } else if (item.type === "min20") {
            return <Min20ClassCard key={item.id} class={item} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ClassesMain;