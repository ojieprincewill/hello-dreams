import React from "react";
import { CommunityData } from "../../data/community-data/community.data";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const OurCommunity = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#f6f6f8] px-[5%] py-5 md:py-10">
      <div className="w-full  text-center flex flex-col justify-center items-center p-5 md:pb-10">
        <h1 className="text-[#010413] text-[24px] md:text-[48px] leading-[1.1] font-semibold md:font-bold">
          Our Community
        </h1>
        <p className="mt-4 md:mt-8 text-[16px] md:text-[20px] text-[#667085] md:font-semibold leading-[1.4] md:w-[357px] md:mx-auto">
          Join over <span className="text-[#010413]">2000+</span> beautiful
          people in Hello Dreams Community
        </p>
        <div className="mt-6 md:mt-12 flex flex-col w-full md:w-[431px] md:mx-auto lg:w-full space-y-4 lg:inline lg:space-x-4">
          <Link
            to="/community-challenge"
            onClick={handleOrigins}
            className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-6 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            UI/UX Design Challenge
          </Link>
          <Link
            to="/join-our-community"
            onClick={handleOrigins}
            className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-12 py-4 rounded-lg hover:text-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            Join Community
          </Link>
        </div>
      </div>
      <div className="space-y-1 md:space-y-4 w-[98%]">
        <div className="grid grid-cols-[30%_30%_40%] gap-1 md:gap-4">
          {CommunityData.slice(0, 3).map((data, index) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              className="w-full h-[59.21px] md:h-[135.56px] lg:h-[203.18px]"
            >
              <img
                src={data.image}
                alt={`Bento Grid Image ${data.id}`}
                className="w-full h-full object-cover rounded-sm"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-[40%_30%_30%] gap-1 md:gap-4">
          {CommunityData.slice(3, 6).map((data, index) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              className="w-full h-[59.21px] md:h-[135.56px] lg:h-[203.18px]"
            >
              <img
                src={data.image}
                alt={`Bento Grid Image ${data.id}`}
                className="w-full h-full object-cover rounded-sm"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-[30%_30%_40%] gap-1 md:gap-4">
          {CommunityData.slice(6, 9).map((data, index) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              className="w-full h-[59.21px] md:h-[135.56px] lg:h-[203.18px]"
            >
              <img
                src={data.image}
                alt={`Bento Grid Image ${data.id}`}
                className="w-full h-full object-cover rounded-sm"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurCommunity;
