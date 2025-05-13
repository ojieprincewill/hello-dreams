import React from "react";

const OurStorySection = () => {
  return (
    <div className="bg-[#f6f6f8] px-[5%] py-10 md:py-20">
      <h1 className="text-center text-[#1b212c34] text-[24px] md:text-[96px] font-bold pb-10 md:pb-20 flex items-center justify-center gap-2">
        Our Story
        <span className="ml-1">
          <img
            src="https://i.ibb.co/dhxXhPY/arrow-block-down.png"
            alt="arrow-block"
            className="w-[36.67px] h-[36.67px] lg:w-[128px] lg:h-[128px] object-cover"
          />
        </span>
      </h1>
      <div className="w-full h-[221px] md:h-[800px] rounded-2xl bg-[#008080]">
        <video
          className="w-full h-full object-cover rounded-2xl shadow-lg"
          controls
          poster="https://i.ibb.co/N6WtTsVr/ba1eb8a6e990e81f5fc28bf52459d03f55f76d4a.png"
        >
          <source
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

export default OurStorySection;
