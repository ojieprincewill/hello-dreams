import React from "react";
import { Link } from "react-router-dom";

const SocialManagementSection = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-3">
        <div className="bg-[#f5f5f7] w-full h-[420px] md:h-[590px] flex items-center justify-center">
          <img
            src="https://i.ibb.co/ZpwnD6HV/SOCIAL-MEDIA-ICONS.png"
            alt="social management image"
            className="w-[261px] h-[261px] md:w-[492px] md:h-[492px] object-contain"
          />
        </div>
        <div className="bg-[#f5f5f7] w-full h-[420px] md:h-[590px] text-center flex flex-col justify-center items-center p-5 md:p-0">
          <h1 className="text-[#010413] text-[24px] md:text-[64px] leading-[1.1] font-semibold md:font-bold">
            Social Media
            <br />
            Management
          </h1>
          <div className="mt-6 md:mt-12 flex flex-col w-full md:w-[431px] lg:w-full space-y-4 lg:inline lg:space-x-4">
            <Link
              to="/services/social-consultation"
              onClick={handleOrigins}
              className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[18px] px-6 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              Manage your social media
            </Link>
            <Link
              to="/services/social-management"
              onClick={handleOrigins}
              className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[14px] md:text-[18px] px-12 py-4 rounded-lg hover:text-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              View service
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 w-full gap-3">
        <div className="bg-[#f5f5f7] w-full h-[420px] md:h-[590px] text-center flex flex-col justify-center items-center p-5 md:p-0">
          <h1 className="text-[#010413] text-[24px] md:text-[64px] leading-[1.1] font-semibold md:font-bold">
            Graphic Design &
            <br />
            Branding
          </h1>
          <div className="mt-6 md:mt-12 flex flex-col w-full md:w-[431px] lg:w-full space-y-4 lg:inline lg:space-x-4">
            <Link
              to="/services/graphics-consultation"
              onClick={handleOrigins}
              className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[18px] px-6 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              Design your brand
            </Link>
            <Link
              to="/services/graphics-design"
              onClick={handleOrigins}
              className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[14px] md:text-[18px] px-12 py-4 rounded-lg hover:text-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              View service
            </Link>
          </div>
        </div>

        <div className="bg-[#f5f5f7] w-full h-[420px] md:h-[590px] flex justify-center items-center">
          <img
            src="https://i.ibb.co/KcK20R7z/dd88d0d80e3a90b61f773f01e03e6be721b91599.png"
            alt="graphic design image"
            className="w-[261px] h-[261px] md:w-[492px] md:h-[492px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialManagementSection;
