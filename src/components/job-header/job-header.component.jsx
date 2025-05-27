import React from "react";
import NavBar from "../landing-header/nav-bar/nav-bar.component";
import { Link } from "react-router-dom";

const JobHeader = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="relative pt-[15px] w-full h-[435px] md:h-[904px] bg-[url('https://i.ibb.co/yn27Y34z/2abccb476d3287825cf1236bfc3642ead9bb3741.png')] bg-cover bg-center">
        <NavBar />
        <div className="hidden absolute top-[263px] left-[7%] md:flex flex-col items-start justify-start text-[#fff]">
          <h1 className="text-[64px] w-[630px] leading-[1.1] font-extrabold">
            Your Dream Job Starts Here
          </h1>
          <p className="mt-8 text-[20px] w-[556px] leading-[1.4]">
            Explore curated jobs, internships, and freelance gigs that match
            your skills. We connect passionate dreamers with companies that
            value growth, creativity, and impact
          </p>
          <div className="mt-10">
            <Link
              to="/post-a-job"
              className="bg-white text-[#010413] font-semibold border border-[#fff] text-[24px] px-4 py-2 rounded-lg hover:text-[#fff] hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
              onClick={handleOrigins}
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full px-[5%] py-5 md:hidden">
        <h1 className="text-[20px] w-full leading-[1.1] font-extrabold">
          Your dream job starts here
        </h1>
        <p className="mt-2 text-[#667085] text-[12px] w-full leading-[tight]">
          Explore curated jobs, internships, and freelance gigs that match your
          skills. We connect passionate dreamers with companies that value
          growth, creativity, and impact
        </p>
        <Link to="/post-a-job">
          <button
            className="bg-[#010413] w-full mt-5 text-[#fff] font-semibold border border-[#010413] text-[14px] px-4 py-3 rounded-lg transition-colors duration-300 cursor-pointer"
            onClick={handleOrigins}
          >
            Post a Job
          </button>
        </Link>
      </div>
    </>
  );
};

export default JobHeader;
