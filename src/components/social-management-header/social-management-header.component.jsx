import React from "react";
import { Link } from "react-router-dom";

const SocialManagementHeader = () => {
  const HandleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="lg:grid flex flex-col-reverse lg:grid-cols-2 w-full h-full lg:h-[800px] lg:place-items-center bg-[#eef2fe]">
      <div className="px-3 py-6 md:px-10">
        <p
          className="text-[#010413] text-[31.06px] md:text-[27.8px] lg:text-[56px] lg:w-[530px] mb-5 md:mb-7 font-medium"
          style={{ fontFamily: "'inter', sans-serif" }}
        >
          Social Media Management
        </p>
        <p
          className="text-[#667085] text-[11px] lg:text-[16px] leading-[1.8] lg:w-[530px] mb-10"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Our social media Management service are designed to elevate your
          online presence. We handle everything from creating engaging content
          and scheduling posts to analyziing performance and interacting with
          your audience
        </p>

        <Link to="/services/social-consultation" onClick={HandleOrigins}>
          <button className="bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] text-[10.91px] lg:text-[16px] px-6 py-3 md:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
            Get a free consultation
          </button>
        </Link>
      </div>

      <div className="relative bg-[#ff7f50] w-full h-[350px] md:h-[500px] lg:h-full flex items-center justify-center">
        <img
          src="https://i.ibb.co/ZpwnD6HV/SOCIAL-MEDIA-ICONS.png"
          alt="social management image"
          className="w-[261px] h-[261px] md:w-[550px] md:h-[550px] object-contain"
        />
      </div>
    </div>
  );
};

export default SocialManagementHeader;
