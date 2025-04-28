import React from "react";

const OurPortfolioSection = () => {
  return (
    <div className="py-20">
      <div className="w-full text-center flex flex-col justify-center items-center p-5 md:pb-10">
        <h1 className="text-[#010413] text-[24px] md:text-[48px] leading-[1.1] font-semibold md:font-bold">
          Our Team's Portfolio
        </h1>
        <p className="mt-4 md:mt-8 text-[16px] md:text-[20px] text-[#667085] md:font-bold leading-[1.4]">
          Explore Our Work: A Showcase of Projects,
          <br />
          Achievements and Creativity
        </p>
        <div className="mt-6 flex flex-col justify-center w-full space-y-4 md:flex-row md:space-x-4">
          <button className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-12 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
            View all
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative bg-[#1a212a] p-5 w-full h-[451px] md:h-[800px] rounded-2xl space-y-2 overflow-hidden">
          <p className="text-[16px] md:text-[24px] md:font-bold md:uppercase text-[#fff]">
            Sisenow
          </p>
          <p className="text-[20px] md:text-[32px] font-semibold md:font-extrabold md:uppercase text-[#fff]">
            Freelancer Website
          </p>
          <p className="text-[12px] md:text-[18px] md:font-bold text-[#fff] mb-3">
            UI/UX design
          </p>
          <button className="bg-[#fff] text-[#010413] font-semibold border border-[#fff] text-[14px] md:text-[18px] px-12 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
            View Website
          </button>
          <div className="absolute bottom-0 right-[-160px] md:bottom-[-10px] md:right-[-350px] w-[406px] h-[265.61px] md:w-[856px] md:h-[560px]">
            <img
              src="https://i.ibb.co/0VqZxNHd/f123697aa370f082191412d5dc38d04629b4621e.png"
              alt="website screenshot"
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
        </div>
        <div className="relative bg-[#ff7f50] p-5 w-full h-[451px] md:h-[800px] rounded-2xl space-y-2 overflow-hidden">
          <p className="text-[16px] md:text-[24px] md:font-bold md:uppercase text-[#fff]">
            UI Designs
          </p>
          <p className="text-[20px] md:text-[32px] font-semibold md:font-extrabold md:uppercase text-[#fff]">
            UI Designs across different
            <br />
            Industries
          </p>
          <p className="text-[12px] md:text-[18px] md:font-bold text-[#fff] mb-3">
            UI/UX design
          </p>
          <button className="bg-[#fff] text-[#010413] font-semibold border border-[#fff] text-[14px] md:text-[18px] px-12 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
            View designs
          </button>
          <div className="absolute bottom-0 right-[-40px] md:bottom-0 md:right-[-202px] w-[306px] h-[265.61px] md:w-[856px] md:h-[560px]">
            <img
              src="https://i.ibb.co/HprBW3pQ/0c6655088ed0e01f22e848c0759a18849ba1452f.png"
              alt="dashboard design"
              className="w-full h-full rounded-2xl md:object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPortfolioSection;
