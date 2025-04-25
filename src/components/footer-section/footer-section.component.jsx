import React from "react";
import Logo from "../logo/logo.component";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#010413] text-[#fff] px-10 pt-20 pb-4">
      <div className="grid grid-cols-[30%_70%] border-t-1 border-[#ffffff34]">
        <div className="border-r-1 border-[#ffffff34] py-15">
          <Logo />
          <p className="text-[10px] md:text-[16px] text-[#ffffff91] md:font-bold pt-10 pb-32">
            Hello Dreams is a multidisciplinary company dedicated to empowering
            individuals and businesses through a comprehensive suite of
            professional services. Our core focus is on delivering exceptional
            design, social media management, educational... read more
          </p>
          <Logo />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-start">
            <div className=" border-[#ffffff34] pl-3 pr-32 py-15">
              <h1 className="text-[12px] md:text-[14px] text-[#ffffff91] uppercase font-bold mb-7">
                company
              </h1>
              <div className="text-[11px] md:text-[16px] text-[#fff] md:font-bold flex flex-col space-y-4">
                <span>Academy</span>
                <span>Our work</span>
                <span>Services</span>
                <span>Portfolio</span>
                <span>About us</span>
              </div>
            </div>
            <div className="border-r-1 border-l-1 border-[#ffffff34] flex flex-col space-y-8 pl-3 pr-32 py-15">
              <div>
                <h1 className="text-[12px] md:text-[14px] text-[#ffffff91] uppercase font-bold mb-7">
                  Follow
                </h1>
                <div className="text-[11px] md:text-[16px] text-[#fff] md:font-bold flex flex-col space-y-4">
                  <span>Youtube</span>
                  <span>Instagram</span>
                  <span>LinkedIn</span>
                </div>
              </div>
              <div>
                <h1 className="text-[12px] md:text-[14px] text-[#ffffff91] uppercase font-bold mb-7">
                  Legal
                </h1>
                <div className="text-[11px] md:text-[16px] text-[#fff] md:font-bold flex flex-col space-y-4">
                  <span>Privacy Policy</span>
                  <span>Terms of Service</span>
                </div>
              </div>
            </div>
            <div>
              <div className="py-15">
                <h1 className="text-[12px] md:text-[14px] text-[#ffffff91] uppercase font-bold mb-7">
                  contact us
                </h1>
                <div className="text-[11px] md:text-[16px] text-[#fff] md:font-bold flex flex-col space-y-4">
                  <span>Email:support@myhellodreams.com</span>
                  <span>Phone:07016773420</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 text-[#fff] text-[11px] md:text-[20px] font-bold place-items-center border-t-1 border-b-1 border-[#ffffff34]">
            <p className="px-20 py-10 border-b-1 border-[#ffffff34]">Twitter</p>
            <p className="px-20 py-10 border-b-1 border-l-1 border-[#ffffff34]">
              Instagram
            </p>
            <p className="px-20 py-10">Facebook</p>
            <p className="px-20 py-10 border-l-1 border-[#ffffff34]">
              LinkedIn
            </p>
          </div>
        </div>
      </div>
      <p className="text-[12px] text-[#ffffff71] font-bold text-center pt-12">
        © All Rights Reserved. {currentYear}, myhellodreams.com
      </p>
    </div>
  );
};

export default FooterSection;
