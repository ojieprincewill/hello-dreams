import React from "react";
import {
  ArrowTopRightOnSquareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import { PlayIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleSavedClass } from "../../../state-slices/saved-classes/savedClassesSlice";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

const UiuxClassCard = ({ data, className = "" }) => {
  const dispatch = useDispatch();
  const savedClasses = useSelector((state) => state.savedClasses);
  const isSaved = savedClasses.includes(data.id);
  const { isAuthenticated } = useAuth();

  const handleBookmark = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.info("Please sign in to save this item.");
      return;
    }

    dispatch(toggleSavedClass(data.id));
    toast.success("Item saved.");
  };

  const handleOrigins = () => {};

  return (
    <div
      className={`md:relative w-full h-max md:h-[450px] xl:h-[464.63px] p-4 border border-[#dfdfe2] rounded-2xl ${className}`}
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      <div className="flex justify-between items-center mb-1">
        <div className="w-[28px] h-[28px]">
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750850446/Academy/landing/11975bf71a2e836bc599fd4d86e13ab8427af5d3_ke040h.png"
            alt="figma icon"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="bg-[#efece9] w-[79.45px] h-[20px] rounded-sm flex justify-center items-center ">
          <span className="text-[#667085] text-[12px]">Not started</span>
        </div>
        <button
          onClick={handleBookmark}
          aria-label={isSaved ? "Unsave" : "Save"}
          title={isSaved ? "Remove from saved" : "Save this item"}
          className="cursor-pointer"
        >
          <BookmarkIcon
            className={`w-5 h-5 ${
              isSaved ? "text-[#ff7f50]" : "text-[#41414150]"
            }`}
          />
        </button>
      </div>

      <div className="w-full h-[221px] bg-[#efece9] rounded-xl mb-4">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-row justify-between text-[#010413] pb-2">
        <p className="text-[#010413] text-[20px] md:text-[24px] leading-[1.3] font-semibold">
          {data.title}
        </p>
        <Link to={`/academy/courses/${data.id}`} onClick={handleOrigins}>
          <ArrowTopRightOnSquareIcon className="w-[23px] h-[23px] md:w-[28px] md:h-[28px] cursor-pointer" />
        </Link>
      </div>

      <div
        className="md:absolute md:bottom-4 md:left-4 md:right-4 flex justify-between items-center mt-5"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        <p className="text-[10px] w-max text-[#667085] flex items-center ">
          <PlayIcon className="w-[13.13px] h-[13.13px] md:w-4 md:h-4 text-[#dfdfe2]" />{" "}
          {data.totalCourses}
        </p>
        <div className="bg-[#efece9] border border-[#efece9] text-[#fff] w-[177px] h-[6px] rounded-2xl"></div>
        <div className="border border-[#dfdfe2] w-[44.27px] h-[22px] flex justify-center items-center rounded-md">
          <p className="text-[12px] w-max text-[#667085]">{data.totalTime}</p>
        </div>
      </div>
    </div>
  );
};

export default UiuxClassCard;
