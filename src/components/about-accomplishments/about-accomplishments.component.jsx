import React from "react";
import { AboutAccomplishmentData } from "../../data/accomplishment-data/accomplishment.data";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const successVariants = {
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

const AboutAccomplishments = () => {
  return (
    <div className="px-[5%] py-5 ">
      <p
        className="text-[#505050] text-[14px] uppercase mb-3"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        what we have accomplished so far
      </p>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-[#000000] text-[12px] md:text-[20px] xl:text-[32px] font-bold mb-3"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        We could not have done it without you
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="text-[#667085] text-[10px] md:text-[13px] xl:text-[16px] leading-[2] xl:leading-[1.7] mb-3 w-[95%] xl:w-[671.12px]"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        Hello Dreams started in 2023 and we have built this community through
        hard work, dedication and beautiful people like you.
      </motion.p>

      <div className="space-y-6 my-6">
        {AboutAccomplishmentData.map((data, index) => (
          <motion.div
            key={data.id}
            initial="hidden"
            whileInView="visible"
            variants={successVariants}
            custom={index}
            className="flex justify-between items-center px-1 md:px-5 py-2 border border-[#eaecf0] rounded-xl"
          >
            <div className="flex space-x-1 md:space-x-3 items-start">
              {data.id === 1 || data.id === 3 ? (
                <div className="bg-[#ff6250] w-[12.92px] h-[12.92px] md:w-[26.8px] md:h-[26.8px] xl:w-[46.8px] xl:h-[46.8px] rounded-tr-full overflow-hidden "></div>
              ) : (
                <div className="bg-[#ff6250] w-[12.92px] h-[12.92px] md:w-[26.8px] md:h-[26.8px] xl:w-[46.8px] xl:h-[46.8px] rounded-br-full overflow-hidden "></div>
              )}
              <div
                className="space-y-1 md:space-y-2"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              >
                <p className="text-[#2d2d2d] text-[12px] md:text-[14px] xl:text-[16px] font-semibold mb-3 ">
                  {data.title}
                </p>
                <p className="text-[#505050] text-[8px] md:text-[12px] xl:text-[14px] leading-[1.5] mb-3 w-[200px] md:w-[337.34px]">
                  {data.text}
                </p>
              </div>
            </div>
            <div className="w-[40px] h-[40px] md:w-[100px] md:h-[80px] xl:w-[128px] xl:h-[108px] rounded-xl overflow-hidden">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutAccomplishments;
