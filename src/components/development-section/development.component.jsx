import React from "react";
import { Link } from "react-router-dom";
import { DevData } from "../../data/development-data/development.data";
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

const Development = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full px-[5%] py-10">
      <p className="text-[#101828] text-center text-[20px] md:text-[23.98px] lg:text-[48px] font-bold mb-3 ">
        Development
      </p>
      <p
        className="text-[#667085] text-center text-[12px] md:text-[10px] lg:text-[17.44px] mb-7 w-full md:w-[598px] md:mx-auto"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Professional web and mobile app development services tailored to your
        business needs
      </p>
      <Link
        to="/services/app-dev-consultation"
        onClick={handleOrigins}
        className="flex justify-center items-center"
      >
        <button className="bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
          Get a Free Consultation
        </button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10">
        {DevData.map((data, index) => (
          <motion.div
            key={data.id}
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            custom={index}
            className="border border-[#dfdfe2] rounded-xl p-2"
          >
            <div className="w-full h-[280px] lg:h-[360px] rounded-xl overflow-hidden ">
              <img
                src={data.image}
                alt={data.title}
                className={`w-full h-full rounded-xl ${
                  index === 0 || index === 2 ? "object-cover" : "object-contain"
                }`}
              />
            </div>
            <p
              className="text-[#26262b] text-[16px] md:text-[12px] lg:text-[18px] font-medium my-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {data.title}
            </p>
            <p
              className="text-[#7f8090] text-[14px] md:text-[10px] lg:text-[15.5px]  "
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {data.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Development;
