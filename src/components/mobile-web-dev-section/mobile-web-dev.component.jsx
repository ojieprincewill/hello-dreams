import React from "react";
import { MobileWebData } from "../../data/mobile-web-data/mobile-web.data";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: index * 0.2,
    },
  }),
};

const MobileWebDev = () => {
  return (
    <div className="space-y-5">
      {MobileWebData.map((data) => (
        <div key={data.id} className="px-[5%] py-10">
          <p className="text-[#101828] text-[24px] xl:text-[48px] text-center font-bold mb-5 ">
            {data.header}
          </p>
          <p
            className="text-[#667085] text-[12px] xl:text-[17.44px] text-center mb-5 "
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {data.subHeader}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">
            {data.options.map((option, index) => (
              <motion.div
                key={option.id}
                initial="hidden"
                whileInView="visible"
                variants={cardVariants}
                custom={index}
                className="p-1"
              >
                <p
                  className="text-[#336aea]/80 text-[15px] md:[14px] xl:text-[12px] font-semibold uppercase mb-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {option.title}
                </p>
                <p
                  className={`text-[#424242] text-[12px] md:text-[17px] mb-5 leading-[1.5] ${
                    data.id === 1 && (index === 0 || index === 1)
                      ? "w-[200px]"
                      : "w-full"
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {option.text}
                </p>
                <div className="w-full h-[168px] ">
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileWebDev;
