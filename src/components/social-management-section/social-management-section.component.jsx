import React from "react";

const SocialManagementSection = () => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
        <div className="relative bg-[#f5f5f7] w-full h-[420px] md:h-[590px] flex items-center justify-center">
          <img
            src="https://i.ibb.co/LDcbC1ff/6404ffd43bf81ee5e991b071f594271308e31a7d.png"
            alt="social management image"
            className="absolute w-[300px] md:w-[450px] h-[auto] top-[60px] left-[20px] md:top-[110px] md:left-[80px]"
          />
          <img
            src="https://i.ibb.co/Q3Ktwms4/8d52f7a6caa78d1e4ab9bfdc1803179890cfa1d5.png"
            alt="youtube image"
            className="absolute w-[132.61px] h-[132.61px] md:w-[203.2px] md:h-[203.2px] top-[45.16px] left-[-25px] md:top-[75.16px] md:left-[5px] "
          />
          <img
            src="https://i.ibb.co/3Y7Chp4y/d4528e7142bd937895ce01873966e7893a54f8f5.png"
            alt="instagram image"
            className="absolute w-[112.89px] h-[89px] md:w-[180.99px] md:h-[150.44px] top-[32px] left-[110px] md:top-[62px] md:left-[210px] "
          />
          <img
            src="https://i.ibb.co/DgV3JRdT/45af69c3f7520d70caa5c6c88e098e228d4e893a.png"
            alt="snapchat image"
            className="absolute w-[114.16px] h-[114.16px] md:w-[174.94px] md:h-[174.94px] top-[65.42px] left-[186.99px] md:top-[103.42px] md:left-[346.99px]"
          />
          <img
            src="https://i.ibb.co/B5y60KBq/b5c92114af7a5b7f5ad0ac7a063b7704a49937bb.png"
            alt="facebook image"
            className="absolute w-[96.99px] h-[96.99px] md:w-[148.63px] md:h-[148.63px] top-[160.8px] left-[220px] md:top-[203.8px] md:left-[380.61px]"
          />
          <img
            src="https://i.ibb.co/p5swnyV/8a9cf612a0a8531c3ad37a28d1e0b01299afe391.png"
            alt="pinterest image"
            className="absolute w-[106.21px] h-[106.21px] md:w-[162.76px] md:h-[162.76px] top-[240.1px] left-[120.57px] md:top-[365.1px] md:left-[210.57px]"
          />
          <img
            src="https://i.ibb.co/6RY51F5b/7d057fa93d3ee7acecde53a79b6999a2b1a0d311.png"
            alt="tiktok image"
            className="absolute w-[92.86px] h-[92.86px] md:w-[142.29px] md:h-[142.29px] top-[200.48px] left-[50.73px] md:top-[331.48px] md:left-[107.73px]"
          />
          <img
            src="https://i.ibb.co/9Hf3fTHn/4b89fd79c23f434ef5b9c0a31f1cdb83aecca0e2.png"
            alt="linkedin image"
            className="absolute w-[118.3px] h-[118.3px] md:w-[181.28px] md:h-[181.28px] top-[127.2px] left-[-10.93px] md:top-[227.2px] md:left-[10.93px]"
          />
        </div>
        <div className="bg-[#f5f5f7] w-full h-[420px] md:h-[590px] text-center flex flex-col justify-center items-center p-5 md:p-0">
          <h1 className="text-[#010413] text-[24px] md:text-[64px] leading-[1.1] font-semibold md:font-bold">
            Social Media
            <br />
            Management
          </h1>
          <div className="mt-6 flex flex-col w-full space-y-4 md:inline md:space-x-4">
            <button className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[18px] px-6 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
              Manage your social media
            </button>
            <button className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[14px] md:text-[18px] px-12 py-4 rounded-lg hover:text-[#1342ff] transition-colors duration-300 cursor-pointer">
              View service
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:grid md:grid-cols-2 w-full gap-3">
        <div className="bg-[#f5f5f7] w-full h-[420px] md:h-[590px] text-center flex flex-col justify-center items-center p-5 md:p-0">
          <h1 className="text-[#010413] text-[24px] md:text-[64px] leading-[1.1] font-semibold md:font-bold">
            Graphic Design &
            <br />
            Branding
          </h1>
          <div className="mt-6 flex flex-col w-full space-y-4 md:inline md:space-x-4">
            <button className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[18px] px-6 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
              Design your brand
            </button>
            <button className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[14px] md:text-[18px] px-12 py-4 rounded-lg hover:text-[#1342ff] transition-colors duration-300 cursor-pointer">
              View service
            </button>
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
