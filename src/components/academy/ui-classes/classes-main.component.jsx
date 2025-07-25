import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { academyItems } from "@/data/academy-data/academy.data";
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

  // Filter logic
  let filteredClasses = [];
  let filteredCourses = [];

  if (category === "courses") {
    filteredCourses = academyItems.filter((item) => {
      if (item.type !== "course") return false;

      // 👇 This filters by saved status if toggled
      if (showSaved && !savedClasses.includes(item.id)) return false;

      return true;
    });
  } else {
    filteredClasses = academyItems.filter((item) => {
      if (item.type !== "class") return false;

      // Saved classes logic
      if (showSaved && !savedClasses.includes(item.id)) return false;

      // Category logic
      if (category !== "all" && item.category !== category) return false;

      // // Length filter logic
      // if (lengthFilter === "short" && item.totalTime > 10) return false;
      // if (lengthFilter === "medium" && item.totalTime > 20) return false;
      // if (lengthFilter === "long" && item.totalTime > 30) return false;
      // if (lengthFilter === "extended" && item.totalTime <= 30) return false;

      return true;
    });
  }

  // Heading
  const heading = category === "courses" ? "Courses" : "Classes";

  return (
    <div className="px-[5%] py-8">
      <h1
        className="text-[#010413] text-[20px] md:text-[30px] lg:text-[40px] font-bold mb-6"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 md:gap-y-10">
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
                      className="text-[20px] md:text-[30px] lg:text-[40px] font-bold mb-5 text-[#010413]"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {cat}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 md:gap-y-10">
                      {coursesInCat.map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Cohort card still renders at the bottom */}
              <div className="mt-10">
                <h2 className="text-[#010413] text-[20px] md:text-[24px] lg:text-[40px] font-bold mb-7">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 md:gap-y-10">
          {filteredClasses.length === 0 ? (
            <div className="col-span-full text-center text-[#667085] text-lg py-10">
              No classes found.
            </div>
          ) : (
            filteredClasses.map((cls) => {
              if (cls.category === "uiux") {
                return <UiuxClassCard key={cls.id} data={cls} />;
              }
              if (cls.category === "20min") {
                return <Min20ClassCard key={cls.id} data={cls} />;
              }
              if (cls.category === "free") {
                return <FreeClassCard key={cls.id} data={cls} />;
              }
              // Placeholder for other categories
              return null;
            })
          )}
        </div>
      )}
    </div>
  );
};

export default ClassesMain;
