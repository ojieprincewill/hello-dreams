import React from "react";
import { Link } from "react-router-dom";

const DreamJobSection = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#f6f6f8] px-[5%] py-10">
      <div className="w-full text-center flex flex-col justify-center items-center p-5 md:pb-10">
        <h1 className="text-[#010413] text-[24px] md:text-[48px] leading-[1.1] font-semibold md:font-bold">
          Your Dream Job Starts Here
        </h1>
        <p className="mt-4 md:mt-8 text-[16px] md:w-[500px] md:mx-auto md:text-[20px] text-[#667085] md:font-semibold leading-[1.4]">
          Explore curated jobs, internships and freelance gigs that match your
          skills
        </p>
        <div className="mt-6 md:mt-12 flex flex-col w-full md:w-[431px] lg:w-full space-y-4 lg:inline lg:space-x-4">
          <Link
            to="/post-a-job"
            onClick={handleOrigins}
            className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-6 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            Post a job
          </Link>
          <Link
            to="/jobs"
            onClick={handleOrigins}
            className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-12 py-4 rounded-lg hover:text-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            Explore jobs
          </Link>
        </div>
      </div>
      <div className=" w-full h-[326px] md:h-[633px] lg:h-[712px] rounded-xl">
        <img
          src="https://i.ibb.co/yn27Y34z/2abccb476d3287825cf1236bfc3642ead9bb3741.png"
          alt="lady image"
          className="w-full h-full object-cover object-center rounded-2xl"
        />
      </div>
    </div>
  );
};

export default DreamJobSection;
