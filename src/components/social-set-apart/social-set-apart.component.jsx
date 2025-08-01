import React from "react";
import { SocialSetApartData } from "../../data/set-apart-data/set-apart-data";
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

const SocialSetApart = () => {
  return (
    <div className="w-full px-[5%] py-15 mb-10">
      <p className="text-[24px] xl:text-[48px] text-[#101828] text-center font-bold mb-2">
        What Sets Us Apart
      </p>
      <p
        className="text-[12px] xl:text-[17.44px] text-[#667085] text-center capitalize"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        innovative solutions, user-centric designs, and cutting-edge
        technologies
      </p>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mt-10">
        {SocialSetApartData.map((data, index) => (
          <motion.div
            key={data.id}
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            custom={index}
            className={`p-3 border border-[#dfdfe2] rounded-2xl ${
              index === SocialSetApartData.length - 1
                ? "md:col-span-2 xl:col-span-1"
                : ""
            }`}
          >
            <div className="bg-[#f6f6f8] flex justify-center items-center p-3 rounded-xl">
              <img
                src={data.image}
                alt={data.title}
                className="w-[162.38px] h-[162.38px]  md:w-[192px] md:h-[192px] "
              />
            </div>
            <p className="text-[#101010] text-[20px] md:text-[22px] font-bold my-3">
              {data.title}
            </p>
            <p className="text-[#667085] text-[14px] md:text-[16px] leading-[1.5] mb-3">
              {data.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SocialSetApart;
