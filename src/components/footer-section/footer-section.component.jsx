import React from "react";
import Logo2 from "../logo-2/logo-2.component";
import { Link } from "react-router-dom";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#010413] text-[#fff] px-5 pt-5 md:px-10 md:pt-20 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-[30%_70%] md:border-t-1 border-[#ffffff20]">
        <div className="relative md:border-r-1 border-[#ffffff20] py-5 md:py-15">
          <Link
            to="/"
            onClick={handleOrigins}
            className="absolute top-0 md:top-15 w-[32.99px] h-[24.23px] md:w-[67px] md:h-[46.75px] lg:w-[111.32px] lg:h-[77.67px] "
          >
            <Logo2 />
          </Link>
          <p className="text-[10px] md:text-[10px] lg:text-[14px] text-[#ffffff91] lg:font-bold md:mt-15 pt-5 md:pt-10">
            Hello Dreams is a multidisciplinary company dedicated to empowering
            individuals and businesses through a comprehensive suite of
            professional services. Our core focus is on delivering exceptional
            design, social media management, educational...{" "}
            <Link
              to="/about"
              onClick={handleOrigins}
              className="font-bold lg:font-extrabold hover:text-[#d4d4d491] transition-colors duration-300 cursor-pointer"
            >
              read more
            </Link>
          </p>
          <Link
            to="/"
            onClick={handleOrigins}
            className="absolute bottom-0 hidden md:block md:w-[67px] md:h-[46.75px] lg:w-[111.32px] lg:h-[77.67px] "
          >
            <Logo2 />
          </Link>
        </div>
        <div className="flex flex-row md:flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="border-l border-r md:border-0 border-[#ffffff20] pl-3 pr-[39px] md:pr-10 lg:pr-32 py-5 md:py-15">
              <h1 className="text-[12px] md:text-[9px] lg:text-[14px] text-[#ffffff91] uppercase font-bold mb-4 md:mb-7">
                company
              </h1>
              <div className="text-[11px] md:text-[10px] lg:text-[16px] text-[#fff] md:font-bold flex flex-col space-y-2 md:space-y-4">
                <Link
                  to="academy"
                  onClick={handleOrigins}
                  className="hover:text-[#99c8ff] transition-colors duration-300 cursor-pointer"
                >
                  Academy
                </Link>
                <div className="hover:text-[#99c8ff] transition-colors duration-300 cursor-pointer">
                  Services
                </div>
                <Link
                  to="/portfolio"
                  onClick={handleOrigins}
                  className="hover:text-[#99c8ff] transition-colors duration-300 cursor-pointer"
                >
                  Portfolio
                </Link>
                <Link
                  to="/about"
                  onClick={handleOrigins}
                  className="hover:text-[#99c8ff] transition-colors duration-300 cursor-pointer"
                >
                  About us
                </Link>
              </div>
            </div>
            <div className="border-r-1 border-l-1 border-[#ffffff20] flex flex-col pl-3 pr-3 md:pr-10 lg:pr-32 py-5 md:py-15">
              <div className="mb-7 md:mb-15">
                <h1 className="text-[12px] md:text-[9px] lg:text-[14px] text-[#ffffff91] uppercase font-bold mb-4 md:mb-7">
                  Follow
                </h1>
                <div className="text-[11px] md:text-[10px] lg:text-[16px] text-[#fff] md:font-bold flex flex-col space-y-2 md:space-y-4">
                  <Link
                    to=""
                    className="hover:text-[#99c8ff] transition-colors duration-300 cursor-pointer"
                  >
                    Youtube
                  </Link>
                  <Link
                    to=""
                    className="hover:text-[#99c8ff] transition-colors duration-300 cursor-pointer"
                  >
                    Instagram
                  </Link>
                  <Link
                    to=""
                    className="hover:text-[#99c8ff] transition-colors duration-300 cursor-pointer"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>
              <div>
                <h1 className="text-[12px] md:text-[9px] lg:text-[14px] text-[#ffffff91] uppercase font-bold mb-4 md:mb-7">
                  Legal
                </h1>
                <div className="text-[11px] md:text-[10px] lg:text-[16px] text-[#fff] md:font-bold flex flex-col space-y-2 md:space-y-4">
                  <Link
                    to=""
                    onClick={handleOrigins}
                    className="hover:text-[#99c8ff] transition-colors duration-300 cursor-pointer"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to=""
                    onClick={handleOrigins}
                    className="hover:text-[#99c8ff] transition-colors duration-300 cursor-pointer"
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="py-5 md:py-15">
                <h1 className="text-[12px] md:text-[9px] lg:text-[14px] text-[#ffffff91] uppercase font-bold mb-4 md:mb-7">
                  contact us
                </h1>
                <div className="text-[11px] md:text-[10px] lg:text-[16px] text-[#fff] md:font-bold flex flex-col space-y-2 md:space-y-4">
                  <span className="w-[100px] md:w-full">
                    Email:{" "}
                    <a
                      href="mailto:support@myhellodreams.com"
                      className="hover:text-[#99c8ff] transition-colors duration-300"
                    >
                      support@myhellodreams.com
                    </a>
                  </span>
                  <span>Phone: 07016773420</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-max grid grid-cols-2 text-[#fff] text-[11px] md:text-[12px] lg:text-[20px] font-bold border-t border-b border-[#ffffff20]">
            <p className="flex justify-center items-center px-1 py-3 md:px-10 lg:px-20 md:py-10 border-b border-[#ffffff20] w-full h-full hover:text-[#99c8ff] transition-colors duration-300 cursor-pointer">
              <span className="mr-0.5 md:mr-2">
                <img
                  src="https://i.ibb.co/fYPXmXPX/SVG.png"
                  alt="svg"
                  className="w-[8.1px] h-[8.1px] md:w-[13.56px] md:h-[13.56px] lg:w-[23.42px] lg:h-[23.42px] object-cover"
                />
              </span>
              Twitter
            </p>
            <p className="flex justify-center items-center px-1 py-3 md:px-10 lg:px-20 md:py-10 border-b border-l border-[#ffffff20] w-full h-full hover:text-[#ffb3ce] transition-colors duration-300 cursor-pointer">
              <span className="mr-0.5 md:mr-2">
                <img
                  src="https://i.ibb.co/27nrzGhc/SVG-2.png"
                  alt="svg 2"
                  className="w-[7px] h-[7px] md:w-[11.12px] md:h-[11.12px] lg:w-[24px] lg:h-[24px] object-cover"
                />
              </span>
              Instagram
            </p>
            <p className="flex justify-center items-center px-1 py-3 md:px-10 lg:px-20 md:py-10 border-[#ffffff20] w-full h-full hover:text-[#8c77ec] transition-colors duration-300 cursor-pointer">
              <span className="mr-0.5 md:mr-2">
                <img
                  src="https://i.ibb.co/xKdJ3Tgx/Vector.png"
                  alt="vector"
                  className="w-[5.56px] h-[3.35px] md:w-[12.36px] md:h-[7.46px] lg:w-[21.33px] lg:h-[12.88px] object-cover"
                />
              </span>
              Facebook
            </p>
            <p className="flex justify-center items-center px-1 py-3 md:px-10 lg:px-20 md:py-10 border-l border-[#ffffff20] w-full h-full hover:text-[#ff884d] transition-colors duration-300 cursor-pointer">
              <span className="mr-0.5 md:mr-2">
                <img
                  src="https://i.ibb.co/KxBB6mx2/Background-Border.png"
                  alt="background border"
                  className="w-[5.21px] h-[5.21px] md:w-[11.58px] md:h-[11.58px] lg:w-[20px] lg:h-[20px] object-cover"
                />
              </span>
              LinkedIn
            </p>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-[#ffffff71] font-bold text-center pt-12">
        © All Rights Reserved. {currentYear}, myhellodreams.com
      </p>
    </div>
  );
};

export default FooterSection;
