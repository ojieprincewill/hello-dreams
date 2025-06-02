import React from "react";
import { Link } from "react-router-dom";

const ProfileOptimizationSuccess = () => {
  return (
    <div className="flex flex-col justify-center items-center px-[5%] py-20">
      <p
        className="text-[20px] md:text-[32px] text-center lg:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Request Received!
      </p>
      <div className="w-full h-auto md:w-[401px] md:h-[267.33px]">
        <img
          src=""
          alt="success illustration"
          className="w-full h-full object-cover"
        />
      </div>
      <p
        className="text-[#667085] text-[14px] md:text-[16px] md:text-center lg:text-[24px] mb-10 lg:mb-20 md:w-[80%] lg:w-[757px] mx-auto leading-[1.5]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Thank you for requesting for our Optimisation services, we will contact
        you within 24 working hours.
      </p>
      <Link to="" className="flex justify-center items-center">
        <button className="bg-[#008080] w-full md:w-[369px] text-[#f7f7f7] text-center py-4 rounded-3xl hover:bg-[#008080de] transition-colors duration-300 cursor-pointer">
          Chat us on Whatsapp
        </button>
      </Link>
    </div>
  );
};

export default ProfileOptimizationSuccess;
