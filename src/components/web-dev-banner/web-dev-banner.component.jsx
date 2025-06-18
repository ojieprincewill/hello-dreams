import React from "react";

const WebDevBanner = () => {
  return (
    <div className="relative w-full md:w-[90%] md:mx-auto h-[37.48px] md:h-[57.48px] lg:h-[67.48px] overflow-hidden">
      <img
        src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750251233/Web%20dev%20page/green_vector_on_web_dev_ibd1ie.png"
        alt="web-dev-vector"
        className="absolute bottom-[0] md:bottom-[-10px] w-[60px] h-[17.89px] md:w-[100px] md:h-[39.89px] lg:w-[113.87px] lg:h-[59.89px] object-contain"
      />
      <img
        src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750251233/Web%20dev%20page/green_vector_atk9cf.png"
        alt="web-dev-vector"
        className="absolute top-[-5px] left-[50px] md:left-[90px] w-[48px] h-[24.26px] md:w-[98px] md:h-[49.26px] lg:w-[112.68px] lg:h-[59.26px] object-contain"
      />

      <img
        src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750251234/Web%20dev%20page/orange_vector_ukmlwn.png"
        alt="web-dev-vector"
        className="absolute bottom-[-2px] right-[50px] md:right-[110px] w-[46px] h-[22.22px] md:w-[96px] md:h-[44.32px] lg:w-[106.95px] lg:h-[54.32px] object-contain"
      />
      <img
        src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750251234/Web%20dev%20page/star_yellow_vector_ct9sry.png"
        alt="web-dev-vector"
        className="absolute right-0 bottom-[4px] md:bottom-[-18px] w-[58px] h-[40px] md:w-[108px] md:h-[100px] lg:w-[118.74px] lg:h-[120.61px] object-contain"
      />
    </div>
  );
};

export default WebDevBanner;
