import React from "react";
import NavBar from "./nav-bar/nav-bar.component";
import { Link } from "react-router-dom";

const LandingHeader = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="relative pt-[15px] w-full h-[435px] md:h-[904px] bg-[url('https://i.ibb.co/HfKwMMQv/landing-image.jpg')] bg-cover bg-center">
        <NavBar />
        <div className="hidden absolute top-[263px] left-[7%] md:flex flex-col items-start justify-start text-[#fff]">
          <h1 className="text-[52px] w-[630px] leading-[1.1] font-extrabold">
            Unlock your potential.
            <br />
            Build skills. Transform your future.
          </h1>
          <p className="mt-8 text-[20px] font-bold w-[556px] leading-[1.4]">
            Get access to expert-led training, career guidance, and tools to
            help you succeed. Join thousands taking their first step toward a
            better future!
          </p>
          <div className="mt-10 space-x-4">
            <Link
              to="/workwithus"
              className="bg-white text-[#010413] font-semibold border border-[#010413] text-[20px] px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer"
              onClick={handleOrigins}
            >
              Book a free career call
            </Link>
            <button className="bg-transparent text-white font-semibold border border-[#fff] text-[20px] px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer">
              Explore our courses
            </button>
          </div>
        </div>
      </div>
      <div className="px-5 py-10 md:hidden">
        <h1 className="text-[20px] w-full leading-[1.1] font-extrabold">
          Unlock your potential. Build skills. Transform your future.
        </h1>
        <p className="mt-2 text-[12px] w-full leading-[tight]">
          Get access to expert-led training, career guidance, and tools to help
          you succeed. Join thousands taking their first step toward a better
          future!
        </p>
        <div className="mt-5 flex flex-col space-y-3">
          <Link
            to="/workwithus"
            className="bg-[#010413] text-[#fff] font-semibold border border-[#010413] text-[14px] px-4 py-4 rounded-lg transition-colors duration-300 cursor-pointer"
            onClick={handleOrigins}
          >
            Book a free career call
          </Link>
          <button className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[14px] px-4 py-4 rounded-lg transition-colors duration-300 cursor-pointer">
            Explore our courses
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingHeader;
