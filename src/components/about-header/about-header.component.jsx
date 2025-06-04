import React from "react";

const AboutHeader = () => {
  return (
    <>
      <div className="w-full h-[206.77px] md:h-[467px] lg:h-[794px]">
        <video
          className="w-full h-full object-cover"
          controls
          poster="https://i.ibb.co/LXpnYq0S/1db42bac4995832729ae334fa348520949dee99e.png"
        >
          <source
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="px-[5%] py-10 flex justify-center items-center">
        <p className="text-[#000000] text-[16px] md:text-[20px] lg:text-[24px] leading-[2] md:leading-[44px] lg:leading-[64px]">
          Hello Dreams is a multidisciplinary company dedicated to empowering
          individuals and businesses through a comprehensive suite of
          professional services. Our core focus is on delivering exceptional
          design, social media management, educational, and mentorship solutions
          to help clients achieve their personal and professional aspirations.
        </p>
      </div>
    </>
  );
};

export default AboutHeader;
