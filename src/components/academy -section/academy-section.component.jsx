import React from "react";
import { AcademyData } from "../../data/academy-data/academy.data";
import { ArrowTopRightOnSquareIcon, PlayIcon } from "@heroicons/react/24/solid";

const AcademySection = () => {
  return (
    <div className="bg-[#f6f6f8] px-[5%] py-10 md:py-20">
      <div className="w-full  text-center flex flex-col justify-center items-center p-5 md:pb-10">
        <h1 className="text-[#010413] text-[24px] md:text-[48px] leading-[1.1] font-semibold md:font-bold">
          Acade<span className="text-[#1342ff]">m</span>y
        </h1>
        <p className="mt-4 md:mt-8 text-[16px] md:text-[24px] text-[#010413] md:font-bold leading-[1.4]">
          Empowering individuals to achieve their fullest potential
          <br />
          through skill aquisition and ethical growth
        </p>
        <div className="mt-6 flex flex-col w-full space-y-4 md:flex-row md:space-x-4 justify-center">
          <button className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-12 py-4 rounded-lg hover:bg-[#6941c6] hover:text-white hover:border-[#6941c6] transition-colors duration-300 cursor-pointer">
            Go to academy
          </button>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 pt-20">
        {AcademyData.map((data) => (
          <div
            key={data.id}
            className="w-full h-max md:h-[464.63px] p-4 border border-[#dfdfe2] rounded-2xl"
          >
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-[181.55px] md:h-[221.16px] object-cover object-center rounded-xl mb-4"
            />
            <div className="flex flex-row justify-between text-[#010413] pb-2">
              <p className="text-[#010413] text-[20px] md:text-[24px] leading-[1.3] font-semibold">
                {data.title}
              </p>
              <div>
                <ArrowTopRightOnSquareIcon className="w-[23px] h-[23px] md:w-[28px] md:h-[28px]" />
              </div>
            </div>
            <p className="text-[16px] md:text-[23px] text-[#667085] font-bold pb-4 ">
              {data.name}
            </p>
            <p className="text-[14px] w-max md:text-[16px] text-[#787777] font-bold mb-2 pb-2 border-b-4 border-b-[#efece9] flex items-center ">
              <span className="mr-1">
                <PlayIcon className="w-[13.13px] h-[13.13px] md:w-4 md:h-4 text-[#010413]" />
              </span>{" "}
              {data.totalCourses} Courses . {data.totalTime}
            </p>
            <p className="text-[24px] md:text-[27.88px] text-[#010413] font-bold pt-2 ">
              NGN {data.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademySection;
