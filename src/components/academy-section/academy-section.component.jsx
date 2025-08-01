import React from "react";
import { ArrowTopRightOnSquareIcon, PlayIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useAcademySectionData } from "../../hooks/useAcademy";

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

const AcademySection = () => {
  const { data: academyData, isLoading, error } = useAcademySectionData();

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-[#f6f6f8] px-[5%] py-10">
        <div className="w-full text-center flex flex-col justify-center items-center p-5 md:pb-10">
          <h1 className="text-[#010413] text-[24px] md:text-[48px] leading-[1.1] font-semibold md:font-bold">
            Acade<span className="text-[#1342ff]">m</span>y
          </h1>
          <p className="mt-4 md:mt-8 text-[16px] md:text-[24px] text-[#010413] md:font-bold leading-[1.4] md:w-[680px] md:mx-auto">
            Empowering individuals to achieve their fullest potential through
            skill aquisition and ethical growth
          </p>
          <div className="mt-6 flex flex-col w-full md:w-[431px] lg:w-full space-y-4 lg:flex-row lg:space-x-4 justify-center">
            <Link
              to="/academy"
              className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-12 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              Go to academy
            </Link>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="w-full h-max md:h-[500px] lg:h-[464.63px] p-4 border border-[#dfdfe2] rounded-2xl animate-pulse"
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

  // Show error state
  if (error) {
    console.error("Academy section error:", error);
    return (
      <div className="bg-[#f6f6f8] px-[5%] py-10">
        <div className="w-full text-center flex flex-col justify-center items-center p-5 md:pb-10">
          <h1 className="text-[#010413] text-[24px] md:text-[48px] leading-[1.1] font-semibold md:font-bold">
            Acade<span className="text-[#1342ff]">m</span>y
          </h1>
          <p className="mt-4 md:mt-8 text-[16px] md:text-[24px] text-[#010413] md:font-bold leading-[1.4] md:w-[680px] md:mx-auto">
            Empowering individuals to achieve their fullest potential through
            skill aquisition and ethical growth
          </p>
          <div className="mt-6 flex flex-col w-full md:w-[431px] lg:w-full space-y-4 lg:flex-row lg:space-x-4 justify-center">
            <Link
              to="/academy"
              className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-12 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              Go to academy
            </Link>
          </div>
        </div>
        <div className="w-full text-center py-10">
          <p className="text-gray-500">
            Unable to load courses at the moment. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f6f8] px-[5%] py-10">
      <div className="w-full  text-center flex flex-col justify-center items-center p-5 md:pb-10">
        <h1 className="text-[#010413] text-[24px] md:text-[48px] leading-[1.1] font-semibold md:font-bold">
          Acade<span className="text-[#1342ff]">m</span>y
        </h1>
        <p className="mt-4 md:mt-8 text-[16px] md:text-[24px] text-[#010413] md:font-bold leading-[1.4] md:w-[680px] md:mx-auto">
          Empowering individuals to achieve their fullest potential through
          skill aquisition and ethical growth
        </p>
        <div className="mt-6 flex flex-col w-full md:w-[431px] xl:w-full space-y-4 xl:flex-row xl:space-x-4 justify-center">
          <Link
            to="/academy"
            className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-12 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            Go to academy
          </Link>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pt-10">
        {previewCourses.map((course, index) => {
          const isLastOdd =
            index === previewCourses.length - 1 &&
            previewCourses.length % 2 !== 0;

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
              <CourseCard course={course} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AcademySection;
