import React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { blogData } from "../../data/sustainability-data/sustainability.data";
import { Link } from "react-router-dom";

const SustainabilityContent = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full px-[5%] py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
      {blogData.map((data, index) => (
        <div
          key={data.id}
          className={`relative w-full h-[448px] p-1 ${
            index === blogData.length - 1 ? "lg:col-span-3" : ""
          }`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <div className="w-full h-[240px] rounded-2xl overflow-hidden">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-[#ff7f50] text-[16px] font-semibold my-3">
            Hello Dreams
          </p>
          <Link
            to={`/sustainability/${data.id}`}
            onClick={handleOrigins}
            className="text-[#010413] font-semibold flex justify-between mb-5 hover:text-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            <p className="text-[24px]">{data.title}</p>
            <ArrowUpRightIcon className="w-6 h-6" />
          </Link>
          <div className="absolute bottom-0 flex items-center space-x-2 mt-3">
            <div className="w-[40px] h-[40px] bg-[#cfcbdc] rounded-full overflow-hidden">
              <img
                src={data.authorImage}
                alt={data.author}
                className="w-full h-full object-contain "
              />
            </div>
            <div>
              <p className="text-[#010413] text-[14px] font-semibold">
                {data.author}
              </p>
              <p className="text-[#667085] text-[14px]">{data.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SustainabilityContent;
