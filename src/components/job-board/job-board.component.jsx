import React, { useState, useRef, useCallback } from "react";
import { usePublicJobs } from "../../hooks/useJobs";
import { XMarkIcon } from "@heroicons/react/24/solid";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import {
  Loader2,
  Calendar,
  Clock,
  DollarSign,
  Building,
  Award,
  Mail,
} from "lucide-react";

const jobVariants = {
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

const JobBoard = () => {
  const [activeJob, setActiveJob] = useState(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = usePublicJobs(6);

  const observer = useRef();
  const lastJobElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  console.log("data", data);

  const toggleModal = (jobId) => {
    setActiveJob(activeJob === jobId ? null : jobId);
  };

  // Flatten all pages data
  const allJobs = data?.pages?.flatMap((page) => page.data) || [];

  // Helper function to format time ago
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const jobDate = new Date(dateString);
    const diffInHours = Math.floor((now - jobDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4)
      return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;

    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  };

  if (isLoading) {
    return (
      <div className="px-[5%] xl:px-[10%] py-5 md:py-15 relative">
        <h1 className="text-center text-[#1b212c34] text-[24px] md:text-[48px] xl:text-[96px] font-bold flex items-center justify-center gap-2 mb-3">
          Jobs Available
          <span className="ml-1">
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330672/arrow-block-down_vsasxf.png"
              alt="arrow-block"
              className="w-[36.67px] h-[36.67px] md:w-[64px] md:h-[64px] xl:w-[128px] xl:h-[128px] object-cover"
            />
          </span>
        </h1>
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-[5%] xl:px-[10%] py-5 md:py-15 relative">
        <h1 className="text-center text-[#1b212c34] text-[24px] md:text-[48px] xl:text-[96px] font-bold flex items-center justify-center gap-2 mb-3">
          Jobs Available
          <span className="ml-1">
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330672/arrow-block-down_vsasxf.png"
              alt="arrow-block"
              className="w-[36.67px] h-[36.67px] md:w-[64px] md:h-[64px] xl:w-[128px] xl:h-[128px] object-cover"
            />
          </span>
        </h1>
        <div className="text-center py-20">
          <p className="text-red-600 text-lg">
            Error loading jobs: {error?.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-[5%] xl:px-[10%] py-5 md:py-15 relative">
      <h1 className="text-center text-[#1b212c34] text-[24px] md:text-[48px] xl:text-[96px] font-bold flex items-center justify-center gap-2 mb-3">
        Jobs Available
        <span className="ml-1">
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330672/arrow-block-down_vsasxf.png"
            alt="arrow-block"
            className="w-[36.67px] h-[36.67px] md:w-[64px] md:h-[64px] xl:w-[128px] xl:h-[128px] object-cover"
          />
        </span>
      </h1>
      <p className="text-[#667085] text-[12px] xl:text-[24px] font-medium xl:font-semibold text-center ">
        Instruction on how to apply for each job is on the description, click on
        see more.
      </p>

      {allJobs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">
            No jobs available at the moment.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Check back later for new opportunities!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 xl:my-10">
          {allJobs.map((job, index) => (
            <motion.div
              key={job.id}
              ref={index === allJobs.length - 1 ? lastJobElementRef : null}
              initial="hidden"
              whileInView="visible"
              variants={jobVariants}
              custom={index}
              className="w-full px-3 xl:px-6 py-4 xl:py-10 border border-[#eaecf0] rounded-md"
            >
              <p className="text-[#010413] text-[20px] xl:text-[32px] font-extrabold mb-3 xl:mb-5">
                {job.title}
              </p>
              <div className="flex flex-row items-center space-x-3 xl:space-x-5 pb-5 xl:pb-8 border-b-[0.8px] border-b-[#eaecf0]">
                <span className="bg-[#1342ff] w-[49.26px] xl:w-[80px] text-[#fff] text-[9.85px] xl:text-[16px] text-center font-medium py-2 rounded-3xl">
                  New
                </span>
                <span className="text-[#667085] text-[10px] xl:text-[14px] ">
                  Pay: {job.pay_type}
                </span>
                <span className="text-[#667085] text-[10px] xl:text-[14px] ">
                  Posted: {getTimeAgo(job.created_at)}
                </span>
              </div>
              <div className="flex flex-row items-center space-x-8 py-5 xl:py-8 border-b-[0.8px] border-b-[#eaecf0]">
                <div className="space-y-1 xl:space-y-2">
                  <p className="text-[#000000] text-[12px] xl:text-[20px] font-semibold">
                    {job.experience_level}
                  </p>
                  <p className="text-[#667085] text-[10px] xl:text-[14px] font-medium">
                    Experience level
                  </p>
                </div>
                <div className="space-y-1 xl:space-y-2">
                  <p className="text-[#000000] text-[12px] xl:text-[20px] font-semibold">
                    {job.pay_type === "contract"
                      ? "Contract"
                      : `${job.work_hours || "N/A"} hrs/week`}
                  </p>
                  <p className="text-[#667085] text-[10px] xl:text-[14px] font-medium">
                    {job.pay_type === "contract" ? "Work type" : "Hours needed"}
                  </p>
                </div>
                <div className="space-y-1 xl:space-y-2">
                  <p className="text-[#000000] text-[12px] xl:text-[20px] font-semibold">
                    <span>₦</span>
                    {job.pay_amount}
                  </p>
                  <p className="text-[#667085] text-[10px] xl:text-[14px] font-medium">
                    Salary
                  </p>
                </div>
              </div>
              <p className="text-[#667085] text-[10px] xl:text-[14px] py-5">
                {job.description?.substring(0, 150)}...
              </p>
              <div onClick={() => toggleModal(job.id)} className="mt-3 xl:mt-5">
                <button className="bg-[#010413] text-[#f7f7f7] font-semibold border-[#010413] text-[10.91px] xl:text-[16px] px-6 py-2 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
                  See more
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Loading indicator for next page */}
      {isFetchingNextPage && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading more jobs...</span>
        </div>
      )}

      {/* No more jobs indicator */}
      {!hasNextPage && allJobs.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">No more jobs to load.</p>
        </div>
      )}

      <AnimatePresence>
        {activeJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setActiveJob(null)}
            className="fixed inset-0 bg-[#20202069] z-60"
          >
            {allJobs
              .filter((job) => job.id === activeJob)
              .map((job) => (
                <motion.div
                  initial={{ opacity: 0.8, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onClick={(e) => e.stopPropagation()}
                  key={job.id}
                  className="absolute right-0 bg-[#fff] w-[300px] xl:w-[508px] h-full p-5 rounded-xl overflow-auto scrollbar-hide"
                >
                  <div className="flex justify-between items-center mb-5 text-[#1b212c]">
                    <h2 className="text-[18px] xl:text-[30px] font-extrabold">
                      {job.title}
                    </h2>
                    <XMarkIcon
                      onClick={() => setActiveJob(null)}
                      className="md:hidden w-6 h-6 cursor-pointer"
                    />
                  </div>

                  {/* Job details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building size={16} />
                      <span>{job.company_name || "Company not specified"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award size={16} />
                      <span>Experience: {job.experience_level}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>
                        {job.pay_type === "contract"
                          ? "Contract position"
                          : `${job.work_hours || "N/A"} hours/week`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign size={16} />
                      <span>Pay type: {job.pay_type}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} />
                      <span>
                        Posted: {new Date(job.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {job.company_email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={16} />
                        <span>{job.company_email}</span>
                      </div>
                    )}
                  </div>

                  {/* Job description */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-3">
                      Job Description
                    </h3>
                    <p className="text-[#667085] text-[10px] xl:text-[16px] leading-[1.5] whitespace-pre-wrap">
                      {job.description}
                    </p>
                  </div>

                  {/* Application instructions */}
                  {job.application_instructions && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-3">
                        How to Apply
                      </h3>
                      <p className="text-[#667085] text-[10px] xl:text-[16px] leading-[1.5] whitespace-pre-wrap">
                        {job.application_instructions}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobBoard;
