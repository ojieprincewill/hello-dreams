import React from "react";

const WebDevBanner = () => {
  return (
    <div className="relative w-[90%] mx-auto h-[67.48px] overflow-hidden">
      <img
        src="https://i.ibb.co/HfyjWx3g/green-vector-on-web-dev.png"
        alt="web-dev-vector"
        className="absolute bottom-[-10px] w-[113.87px] h-[59.89px] object-contain"
      />
      <img
        src="https://i.ibb.co/xSp54kZk/green-vector.png"
        alt="web-dev-vector"
        className="absolute top-[-5px] left-[90px] w-[112.68px] h-[59.26px] object-contain"
      />

      <img
        src="https://i.ibb.co/Sw94D1WT/orange-vector.png"
        alt="web-dev-vector"
        className="absolute bottom-[-2px] right-[110px] w-[106.95px] h-[54.32px] object-contain"
      />
      <img
        src="https://i.ibb.co/k62dWZBT/star-yellow-vector.png"
        alt="web-dev-vector"
        className="absolute right-0 bottom-[-20px] w-[118.74px] h-[120.61px] object-contain"
      />
    </div>
  );
};

export default WebDevBanner;
