import React from "react";
import { Link } from "react-router-dom";

const DesignHeader = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col justify-center items-center py-15 px-2 space-y-6 md:space-y-10 w-full">
      <div className="relative flex justify-center items-center">
        <img
          src="https://i.ibb.co/Nd8kDz09/2aaf09dec80b069b0f6f76a9f44fffc43c81b19d.jpg"
          alt="image 1"
          className="w-[45.98px] h-[45.98px] rounded-full absolute left-[-158%] z-2 border-[1.53px] border-[#f7f7f7] object-cover"
        />
        <img
          src="https://i.ibb.co/r2jmhr4y/62b2de863e5c02d1c4d27a7ec3537a08183734bc.jpg"
          alt="image 2"
          className="w-[50.57px] h-[50.57px] rounded-full absolute left-[-113%] z-4 border-[1.53px] border-[#f7f7f7] object-cover"
        />
        <img
          src="https://i.ibb.co/gZz9M3tj/135106515afff8295a2734482a2d9bf7c1e90494.jpg"
          alt="image 3"
          className="w-[58.24px] h-[58.24px] rounded-full absolute left-[-63%] z-8 border-[1.53px] border-[#f7f7f7] object-cover"
        />

        <img
          src="https://i.ibb.co/Q34QQM6H/4b71756b2dfdef5d27bf29ac91dee569bdec2870.jpg"
          alt="center image"
          className="w-[67.43px] h-[67.43px] rounded-full relative z-10 border-[1.53px] border-[#f7f7f7] object-cover"
        />

        <img
          src="https://i.ibb.co/ZrsZ2Yt/ea0d1d301d8a4b419133d9a1a773a1c83f611d08.jpg"
          alt="image 5"
          className="w-[58.24px] h-[58.24px] rounded-full absolute right-[-63%] z-8 border-[1.53px] border-[#f7f7f7] object-cover"
        />
        <img
          src="https://i.ibb.co/r2jmhr4y/62b2de863e5c02d1c4d27a7ec3537a08183734bc.jpg"
          alt="image 4"
          className="w-[50.57px] h-[50.57px] rounded-full absolute right-[-113%] z-4 border-[1.53px] border-[#f7f7f7] object-cover"
        />
        <img
          src="https://i.ibb.co/Nd8kDz09/2aaf09dec80b069b0f6f76a9f44fffc43c81b19d.jpg"
          alt="image 7"
          className="w-[45.98px] h-[45.98px] rounded-full absolute right-[-158%] z-2 border-[1.53px] border-[#f7f7f7] object-cover"
        />
      </div>
      <div>
        <p className="text-[#000000] text-[24px] md:text-[33.36px] lg:text-[56px] text-center font-medium md:font-bold lg:w-[900px]">
          Digital Experiences With Expert UI/UX Design
        </p>
        <p className="text-[#07111d] text-[12px] lg:text-[18px] text-center lg:font-bold mt-5">
          Say goodbye to bad user experience reviews. Say hello to 5 star
          reviews.
        </p>
      </div>
      <Link to="/services/ui-design-consultation" onClick={handleOrigins}>
        <button className="bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
          Get a Free Consultation
        </button>
      </Link>
    </div>
  );
};

export default DesignHeader;
