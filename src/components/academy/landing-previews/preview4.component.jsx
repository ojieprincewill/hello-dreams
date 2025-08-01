import React from "react";

import {
  ArrowTopRightOnSquareIcon,
  BookmarkIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

import { academyItems } from "../../../data/academy-data/academy.data";
import { PlayIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import FreeClassCard from "../class-cards/free-class-card.component";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: index * 0.2, // Stagger effect per card
    },
  }),
};

const Preview4 = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };
  // Filter for free classes
  const freeClasses = academyItems
    .filter((item) => item.type === "class" && item.category === "free")
    .slice(0, 3);

  return (
    <>
      <div
        className="flex justify-between items-center mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <p className="text-[#010413] text-[20px] md:text-[24px] xl:text-[40px] font-bold">
          Free Classes
        </p>
        <Link
          to="/academy/classes?category=free"
          onClick={handleOrigins}
          className="hidden md:inline text-[#ff7f50] text-[14px] xl:text-[24px] font-bold underline hover:text-[#1342ff] transition-colors duration-300 cursor-pointer"
        >
          View all
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-15">
        {freeClasses.map((data) => (
          <FreeClassCard key={data.id} data={data} />
        ))}
        <div className="md:hidden flex justify-end">
          <Link
            to="/academy/classes?category=free"
            onClick={handleOrigins}
            className=" text-[#ff7f50] text-[14px] font-bold underline hover:text-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            View all
          </Link>
        </div>
      </div>
    </>
  );
};

export default Preview4;
