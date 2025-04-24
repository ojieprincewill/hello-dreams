import React from "react";

import Marquee from "react-fast-marquee";
import { MARQUEE_DATA } from "../../data/marquee-data/marque.data";

const MarqueeSection = () => {
  const marqueeData = MARQUEE_DATA;

  return (
    <div className="py-10 md:py-20 w-full overflow-hidden whitespace-nowrap">
      <div className="inline-block">
        <Marquee speed={120} direction="left">
          {marqueeData.map((data) => (
            <img
              key={data.id}
              src={data.url}
              alt={data.title}
              className="inline-block w-[456px] h-[405.58px] md:w-[1076px] md:h-[651px] rounded-xl object-cover object-center  mx-2"
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default MarqueeSection;
