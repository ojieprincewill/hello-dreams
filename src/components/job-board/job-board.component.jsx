import React, { useState } from "react";
import { JobData } from "../../data/job-data/job.data";
import { XMarkIcon } from "@heroicons/react/24/solid";

const JobBoard = () => {
  const [activeJob, setActiveJob] = useState(null);

  const toggleModal = (jobId) => {
    setActiveJob(activeJob === jobId ? null : jobId);
  };

  return (
    <div className="px-[5%] lg:px-[10%] py-5 md:py-15 relative">
      <h1 className="text-center text-[#1b212c34] text-[24px] md:text-[48px] lg:text-[96px] font-bold flex items-center justify-center gap-2 mb-3">
        Jobs Available
        <span className="ml-1">
          <img
            src="https://i.ibb.co/dhxXhPY/arrow-block-down.png"
            alt="arrow-block"
            className="w-[36.67px] h-[36.67px] md:w-[64px] md:h-[64px] lg:w-[128px] lg:h-[128px] object-cover"
          />
        </span>
      </h1>
      <p className="text-[#667085] text-[12px] lg:text-[24px] font-medium lg:font-semibold text-center ">
        Instruction on how to apply for each job is on the description, click on
        see more.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6 lg:my-10">
        {JobData.map((data) => (
          <div
            key={data.id}
            className="w-full px-3 lg:px-6 py-4 lg:py-10 border border-[#eaecf0] rounded-md"
          >
            <p className="text-[#010413] text-[20px] lg:text-[32px] font-extrabold mb-3 lg:mb-5">
              {data.title}
            </p>
            <div className="flex flex-row items-center space-x-3 lg:space-x-5 pb-5 lg:pb-8 border-b-[0.8px] border-b-[#eaecf0]">
              <span className="bg-[#1342ff] w-[49.26px] lg:w-[80px] text-[#fff] text-[9.85px] lg:text-[16px] text-center font-medium py-2 rounded-3xl">
                {data.age}
              </span>
              <span className="text-[#667085] text-[10px] lg:text-[14px] ">
                {data.pay}
              </span>
              <span className="text-[#667085] text-[10px] lg:text-[14px] ">
                {data.time}
              </span>
            </div>
            <div className="flex flex-row items-center space-x-8 py-5 lg:py-8 border-b-[0.8px] border-b-[#eaecf0]">
              <div className="space-y-1 lg:space-y-2">
                <p className="text-[#000000] text-[12px] lg:text-[20px] font-semibold">
                  {data.experience}
                </p>
                <p className="text-[#667085] text-[10px] lg:text-[14px] font-medium">
                  Experience level
                </p>
              </div>
              <div className="space-y-1 lg:space-y-2">
                <p className="text-[#000000] text-[12px] lg:text-[20px] font-semibold">
                  {data.hours}
                </p>
                <p className="text-[#667085] text-[10px] lg:text-[14px] font-medium">
                  Hours needed
                </p>
              </div>
            </div>
            <p className="text-[#667085] text-[10px] lg:text-[14px] py-5">
              {data.text}
            </p>
            <div onClick={() => toggleModal(data.id)} className="mt-3 lg:mt-5">
              <button className="bg-[#010413] text-[#f7f7f7] font-semibold border-[#010413] text-[10.91px] lg:text-[16px] px-6 py-2 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
                See more
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeJob && (
        <div
          onClick={() => setActiveJob(null)}
          className="fixed inset-0 bg-[#20202069] z-60"
        >
          {JobData.filter((job) => job.id === activeJob).map((job) => (
            <div
              key={job.id}
              className="absolute right-0 bg-[#fff] w-[300px] lg:w-[508px] h-full p-5 rounded-xl overflow-auto"
            >
              <div className="flex justify-between items-center mb-5 text-[#1b212c]">
                <h2 className=" text-[18px] lg:text-[30px] font-extrabold  ">
                  {job.detailTitle}
                </h2>
                <XMarkIcon
                  onClick={() => setActiveJob(null)}
                  className="md:hidden w-6 h-6 cursor-pointer"
                />
              </div>
              <p className="text-[#667085] text-[10px] lg:text-[16px] leading-[1.5]">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobBoard;
