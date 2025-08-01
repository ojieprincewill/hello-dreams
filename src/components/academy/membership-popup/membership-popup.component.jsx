import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "@/components/logo/logo.component";
import { Link } from "react-router-dom";

const MembershipPopup = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative md:w-[80%] mx-auto p-[5%] rounded-2xl shadow-2xl bg-[url('https://res.cloudinary.com/dganx8kmn/image/upload/v1752984140/Academy/sign%20up/3f66b694a8196a4df5f2b870dc9901b56806d575_pntsis.png')] bg-cover bg-center">
      <div className="flex justify-end items-center mb-3 md:mb-5">
        <XMarkIcon className="w-8 h-8 xl:w-10 xl:h-10 text-[#000000] cursor-pointer" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex-shrink-0 w-[67px] h-[46.75px] xl:w-[111.32px] xl:h-[77.67px] mt-3 mb-8 md:mt-5 md:mb-10 ">
          <Logo />
        </div>
      </div>

      <h1 className="text-[#101828] capitalize text-[20px] md:text-[24px] xl:text-[30px] font-semibold mb-5 text-center">
        Activate your membership or buy a course
      </h1>
      <p className="text-[#667085] text-[14px] md:text-[16px] xl:text-[18px] mb-8 text-center font-semibold md:w-[428px] md:mx-auto">
        Build your career and skills with Hello Dreams with less than N3500 a
        week - cancel anytime
      </p>

      <div className="flex justify-center items-center">
        <Link
          to="/membership"
          onClick={handleOrigins}
          className="block w-max py-3 px-4 rounded-lg bg-[#1342ff] text-white text-[14px] md:text-[16px] xl:text-[18px] font-semibold text-center hover:bg-[#2313ff] transition-colors duration-200 "
        >
          Manage membership
        </Link>
      </div>
    </div>
  );
};

export default MembershipPopup;
