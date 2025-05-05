import React from "react";
import Logo from "../logo/logo.component";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#010413] text-[#fff] px-5 pt-5 md:px-10 md:pt-20 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-[30%_70%] md:border-t-1 border-[#ffffff10]">
        <div className="md:border-r-1 border-[#ffffff10] py-5 md:py-15">
          <Logo />
          <p className="text-[10px] md:text-[10px] lg:text-[14px] text-[#ffffff91] lg:font-bold pt-5 md:pt-10 md:pb-32">
            Hello Dreams is a multidisciplinary company dedicated to empowering
            individuals and businesses through a comprehensive suite of
            professional services. Our core focus is on delivering exceptional
            design, social media management, educational...{" "}
            <span className="font-bold lg:font-extrabold">read more</span>
          </p>
          <div className="hidden md:block">
            <Logo />
          </div>
        </div>
        <div className="flex flex-row md:flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="border-l border-r md:border-0 border-[#ffffff10] pl-3 pr-[39px] md:pr-10 lg:pr-32 py-5 md:py-15">
              <h1 className="text-[12px] md:text-[9px] lg:text-[14px] text-[#ffffff91] uppercase font-bold mb-4 md:mb-7">
                company
              </h1>
              <div className="text-[11px] md:text-[10px] lg:text-[16px] text-[#fff] md:font-bold flex flex-col space-y-2 md:space-y-4">
                <span>Academy</span>
                <span>Our work</span>
                <span>Services</span>
                <span>Portfolio</span>
                <span>About us</span>
              </div>
            </div>
            <div className="border-r-1 border-l-1 border-[#ffffff10] flex flex-col pl-3 pr-3 md:pr-10 lg:pr-32 py-5 md:py-15">
              <div className="mb-7 md:mb-15">
                <h1 className="text-[12px] md:text-[9px] lg:text-[14px] text-[#ffffff91] uppercase font-bold mb-4 md:mb-7">
                  Follow
                </h1>
                <div className="text-[11px] md:text-[10px] lg:text-[16px] text-[#fff] md:font-bold flex flex-col space-y-2 md:space-y-4">
                  <span>Youtube</span>
                  <span>Instagram</span>
                  <span>LinkedIn</span>
                </div>
              </div>
              <div>
                <h1 className="text-[12px] md:text-[9px] lg:text-[14px] text-[#ffffff91] uppercase font-bold mb-4 md:mb-7">
                  Legal
                </h1>
                <div className="text-[11px] md:text-[10px] lg:text-[16px] text-[#fff] md:font-bold flex flex-col space-y-2 md:space-y-4">
                  <span>Privacy Policy</span>
                  <span>Terms of Service</span>
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
                    Email:support@myhellodreams.com
                  </span>
                  <span>Phone:07016773420</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-max grid grid-cols-2 text-[#fff] text-[11px] md:text-[12px] lg:text-[20px] font-bold border-t border-b border-[#ffffff10]">
            <p className="flex justify-center items-center px-10 py-5 md:px-20 md:py-10 border-b border-[#ffffff10] w-full h-full">
              Twitter
            </p>
            <p className="flex justify-center items-center px-10 py-5 md:px-20 md:py-10 border-b border-l border-[#ffffff10] w-full h-full">
              Instagram
            </p>
            <p className="flex justify-center items-center px-10 py-5 md:px-20 md:py-10 border-[#ffffff10] w-full h-full">
              Facebook
            </p>
            <p className="flex justify-center items-center px-10 py-5 md:px-20 md:py-10 border-l border-[#ffffff10] w-full h-full">
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
