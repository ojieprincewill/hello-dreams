import React from "react";
import { Link } from "react-router-dom";

const SignUpSuccess = ({ formData }) => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen w-full p-[5%] flex items-center justify-center">
      <div className="w-full md:w-[635px] flex flex-col items-center justify-center bg-white rounded-3xl shadow-lg p-4">
        <span
          className="text-[18px] md:text-[20px] font-bold mb-2 mt-4"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Acade<span className="text-[#1342ff]">m</span>y
        </span>
        <img
          src="https://res.cloudinary.com/dganx8kmn/image/upload/v1752671335/Academy/sign%20up/57748ea748da9204ec419470544d09d5567918bb_dvjl7o.png"
          alt="Confetti box"
          className="md:w-[233.72px] md:h-[236.3px] mx-auto my-6"
        />
        <h1 className="text-[#101828] capitalize text-[20px] md:text-[30px] lg:text-[48px] font-bold mb-2 text-center">
          congratulations {formData.firstName || "!"}
        </h1>
        <p className="text-[#667085] text-[14px] md:text-[16px] lg:text-[18px] mb-8 text-center max-w-lg">
          You have successfully created your Hello Dreams{" "}
          <span className="font-bold text-[#101828]">
            Acade<span className="text-[#1342ff]">m</span>y's
          </span>{" "}
          account.
        </p>

        <Link
          to="/signin"
          onClick={handleOrigins}
          className="block w-full py-3 rounded-lg bg-[#1342ff] text-white text-[16px] md:text-[18px] font-bold text-center hover:bg-[#2313ff] transition-colors duration-200 "
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUpSuccess;
