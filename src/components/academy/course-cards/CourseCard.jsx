import React from "react";
import {
  ArrowTopRightOnSquareIcon,
  PlayIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { toggleSavedClass } from "@/state-slices/saved-classes/savedClassesSlice";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const dispatch = useDispatch();
  const savedClasses = useSelector((state) => state.savedClasses);
  const isSaved = savedClasses.includes(course.id);

  const handleBookmark = (e) => {
    e.stopPropagation();
    dispatch(toggleSavedClass(course.id));
  };

  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full h-max md:h-[500px] xl:h-[464.63px] p-4 border border-[#dfdfe2] rounded-2xl flex flex-col">
      <div className="relative w-full h-[181.55px] md:h-[221.16px] overflow-hidden rounded-xl mb-4">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover object-center"
        />
        <button
          onClick={handleBookmark}
          aria-label={isSaved ? "Unsave" : "Save"}
          className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 p-2 rounded-full shadow-md transition duration-200 cursor-pointer"
        >
          <BookmarkIcon
            className={`w-5 h-5 ${
              isSaved ? "text-[#ff7f50]" : "text-[#dfdfdf]"
            }`}
          />
        </button>
      </div>
      <div className="flex flex-row justify-between text-[#010413] pb-2">
        <p className="text-[#010413] text-[20px] md:text-[24px] leading-[1.3] font-semibold">
          {course.title}
        </p>
        <Link
          to={`/academy/courses/${course.id}`}
          onClick={handleOrigins}
          title="View course"
        >
          <ArrowTopRightOnSquareIcon className="w-[23px] h-[23px] md:w-[28px] md:h-[28px] cursor-pointer" />
        </Link>
      </div>
      <p className="text-[16px] md:text-[23px] text-[#667085] font-bold pb-4 ">
        {course.instructor}
      </p>
      <p className="text-[14px] w-max md:text-[16px] text-[#787777] font-bold mb-2 pb-2 border-b-4 border-b-[#efece9] flex items-center ">
        <span className="mr-1">
          <PlayIcon className="w-[13.13px] h-[13.13px] md:w-4 md:h-4 text-[#010413]" />
        </span>
        {course.totalCourses} Courses . {course.totalTime}
      </p>
      <p className="text-[24px] md:text-[27.88px] text-[#010413] font-bold pt-2 ">
        NGN {course.price.toLocaleString()}
      </p>
    </div>
  );
};

export default CourseCard;
