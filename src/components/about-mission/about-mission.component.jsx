import React from "react";
import {
  MissionProfilesData,
  MissionTextData,
  MissionValueData,
} from "../../data/mission-data/mission.data";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const imageVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: -30 },
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

const valueVariants = {
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
const AboutMission = () => {
  return (
    <div className="px-[5%] py-10 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-4 px-2 py-5 gap-y-4 xl:gap-y-6 border border-[#dfdfdf] rounded-xl place-items-center"
        >
          {MissionProfilesData.map((data, index) => (
            <motion.div
              key={data.id}
              initial="hidden"
              whileInView="visible"
              variants={imageVariants}
              viewport={{ once: true }}
              custom={index}
              className="w-[57.55px] h-[57.55px] md:w-[70px] md:h-[70px] xl:w-[102px] xl:h-[102px] rounded-full overflow-hidden"
            >
              <img
                src={data.image}
                alt={`image ${data.id}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="xl:w-[512px] ml-auto"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          <p className="text-[#505050] text-[14px] md:text-[12px] uppercase mb-2 ">
            mission
          </p>
          <p className="text-[#000000] text-[24px] md:text-[30px] xl:text-[40px] font-bold mb-5 leading-[1.5] ">
            We're making building a business and a brand easy and fun
          </p>
          <p className="text-[#505050] text-[14px] md:text-[19.84px] mb-3 ">
            Through structured learning,
          </p>

          <div className="space-y-7 mt-5 md:mt-10 xl:mt-15">
            {MissionTextData.map((data, index) => (
              <motion.div
                key={data.id}
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                custom={index}
              >
                <p className="text-[#000000] text-[14px] md:text-[20px] mb-3 border-l-2 border-l-[#008080] pl-[12px] ">
                  {data.title}
                </p>
                <p className="text-[#505050] text-[12px] md:text-[13.89px] mb-3 pl-[15px] ">
                  {data.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="space-y-5 mt-5">
        {MissionValueData.map((data, index) => (
          <motion.div
            key={data.id}
            initial="hidden"
            whileInView="visible"
            variants={valueVariants}
            custom={index}
            className="px-5 py-5 md:py-10 border border-[#dfdfdf] rounded-xl"
          >
            <p
              className="text-[#505050] text-[14px] uppercase mb-3"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              {data.title}
            </p>
            <p className="text-[#000000] text-[16px] md:text-[20px] xl:text-[40px] font-semibold leading-[1.5] w-full xl:w-[1006px] ">
              {data.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutMission;
