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
      <div className="w-full h-auto md:w-[401px] md:h-[267.33px] mt-15 mb-10">
        <img
          src="https://i.ibb.co/fdJ3p6WJ/11668419-20943563-1.png"
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

      <a
        href="https://wa.me/2347016773420"
        target="_blank"
        rel="noopener noreferrer"
        className="block md:flex md:justify-center md:items-center"
      >
        <button className="bg-[#008080] w-full md:w-[369px] text-[#f7f7f7] text-[12px] md:text-[14px] lg:text-[16px] text-center px-6 py-3 md:py-4 rounded-3xl hover:bg-[#008080de] hover:text-[#fff] transition-colors duration-300 cursor-pointer">
          <img
            src="https://i.ibb.co/XZ7kX9r1/logos-whatsapp-icon.png"
            alt="whatsapp logo"
            className="inline mr-2 md:mr-3 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 object-contain"
          />
          Chat us on Whatsapp
        </button>
      </a>
    </div>
  );
};

export default ProfileOptimizationSuccess;
