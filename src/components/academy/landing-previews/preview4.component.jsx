import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useAcademySectionData } from "@/hooks/useAcademy"; // Update this path
import FreeClassCard from "../class-cards/free-class-card.component"; // Use your existing FreeClassCard

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: index * 0.2,
    },
  }),
};

const Preview4 = ({ user, isAuthenticated }) => {
  const { categorizedData, isLoading, error } = useAcademySectionData();

  const handleOrigins = () => {};

  // Get free classes and limit to 3
  const freeClasses = categorizedData.free?.slice(0, 3) || [];

  // Loading state
  if (isLoading) {
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="flex justify-between items-center mb-5">
          <p className="text-[#010413] text-[20px] md:text-[24px] xl:text-[40px] font-bold">
            Free Classes
          </p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-15">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="w-full h-max md:h-[500px] xl:h-[464.63px] p-4 border border-[#dfdfe2] rounded-2xl animate-pulse"
            >
              <div className="w-full h-[181.55px] md:h-[221.16px] bg-gray-200 rounded-xl mb-4"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    console.error("Preview4 error:", error);
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="flex justify-between items-center mb-5">
          <p className="text-[#010413] text-[20px] md:text-[24px] xl:text-[40px] font-bold">
            Free Classes
          </p>
        </div>
        <div className="w-full text-center py-10">
          <p className="text-gray-500">
            Unable to load free classes at the moment. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Empty state
  if (freeClasses.length === 0) {
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="flex justify-between items-center mb-5">
          <p className="text-[#010413] text-[20px] md:text-[24px] xl:text-[40px] font-bold">
            Free Classes
          </p>
        </div>
        <div className="w-full text-center py-10">
          <p className="text-gray-500">
            No free classes available at the moment. Check back soon!
          </p>
        </div>
      </div>
    );
  }

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
        {freeClasses.map((course, index) => {
          const isLastOdd =
            index === freeClasses.length - 1 && freeClasses.length % 2 !== 0;

          const cardClass = isLastOdd ? "md:col-span-2 xl:col-span-1" : "";

          return (
            <motion.div
              key={course.id}
              className={cardClass}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              custom={index}
            >
              <FreeClassCard data={course} className={cardClass} />
            </motion.div>
          );
        })}
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
