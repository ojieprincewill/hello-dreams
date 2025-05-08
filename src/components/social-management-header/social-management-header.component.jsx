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
          className="text-[#667085] text-[11px] lg:text-[16px] leading-[1.8] lg:w-[530px] mb-10 md:mb-15"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Our social media Management service are designed to elevate your
          online presence. We handle everything from creating engaging content
          and scheduling posts to analyziing performance and interacting with
          your audience
        </p>

        <Link to="/services/social-consultation" onClick={HandleOrigins}>
          <button className="bg-[#1342ff] md:bg-[#010413] text-[#f7f7f7] font-semibold border border-[#1342ff] md:border-[#010413] text-[10.91px] lg:text-[16px] px-6 py-3 md:py-4 rounded-3xl md:rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
            Get a free consultation
          </button>
        </Link>
      </div>

      <div className="relative bg-[#ff7f50] w-full h-[350px] md:h-[500px] lg:h-full flex items-center justify-center">
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
    </div>
  );
};

export default SocialManagementHeader;
