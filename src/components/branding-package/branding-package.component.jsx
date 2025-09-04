import React from "react";
import { BrandingPackageData } from "../../data/pricing-data/pricing-data";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: index * 0.2,
    },
  }),
};

const BrandingPackage = () => {
  const handleOrigins = () => {};

  return (
    <div className="w-full h-max md:h-[542.68px] xl:h-[937px] bg-gradient-to-b from-[#010413] to-[#ffffff] px-[3%] md:px-0 py-5 md:py-15 xl:py-30 my-10">
      <p
        className="text-[24px] md:text-[27.8px] xl:text-[64px] text-[#f7f7f7] text-center mb-2 md:mb-4"
        style={{ fontFamily: "'Radio Canada', sans-serif" }}
      >
        Branding Package for <span className="font-bold">SME</span>
      </p>
      <p
        className="text-[12px] md:text-[16.22px] xl:text-[28px] text-[#f7f7f7] font-medium xl:font-medium text-center xl:w-[893px] xl:mx-auto mb-5 xl:mb-7"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Clear and competitive pricing for our combo deal of printing services.
        You can also get Custom Quotes, contact us for personalized quotes
        tailored to your specific requirements and bulk orders
      </p>

      <div className="flex flex-column md:flex-row justify-center items-center mt-10 xl:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="md:relative w-full h-max md:w-[642.68px] md:h-[295px] xl:w-[937px] xl:h-[467px] rounded-xl md:rounded-3xl md:bg-[#fff] p-1 md:p-5 xl:px-10 xl:py-7 flex flex-col space-y-4 md:flex-row"
        >
          {BrandingPackageData.slice(0, 2).map((data, index) => (
            <motion.div
              key={data.id}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              custom={index}
              className="md:mr-15 p-5 md:p-0 relative bg-[#fff] rounded-xl md:bg-none md:rounded-none"
            >
              <p className="text-[#010413] text-[20.85px] xl:text-[36px] font-bold mb-3">
                {data.price}{" "}
                <span className="text-[#667085] text-[9.85px]  xl:text-[17px] font-medium">
                  /{data.purpose}
                </span>
              </p>
              <p className="text-[#010413] text-[11.58px] xl:text-[20px] font-medium mb-3 xl:w-[250px]">
                {data.title}
              </p>
              <p className="text-[#667085] text-[8.69px] xl:text-[15px] font-medium mb-3 md:mb-6">
                {data.text}
              </p>

              <div className="space-y-3 xl:space-y-4">
                {data.options.map((data) => (
                  <div className="flex flex-row items-center space-x-2">
                    <p className="bg-[#efece9] w-[11.58px] h-[11.58px] xl:w-[20px] xl:h-[20px] rounded-full flex justify-center items-center">
                      <CheckIcon className="inline text-[#1342ff] w-3 h-3 xl:w-4 xl:h-4 font-bold" />
                    </p>
                    <p
                      key={data.id}
                      className="text-[#667085] text-[8.69px] xl:text-[15px] font-medium md:max-w-[120px] xl:max-w-[200px]"
                    >
                      {data.option}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                to="/services/printing-consultation"
                onClick={handleOrigins}
                className="xl:absolute xl:bottom-0 xl:left-0 xl:right-0"
              >
                <button className="bg-[#efece9] w-full text-[#101828] font-bold border border-[#efece9] text-[8.91px] xl:text-[15px] mt-5 px-6 py-2 xl:py-3 rounded-3xl hover:text-white hover:bg-[#101828] hover:border-[#101828] transition-colors duration-300 cursor-pointer">
                  Order now
                </button>
              </Link>
            </motion.div>
          ))}
          {BrandingPackageData.slice(2).map((data) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
              className="md:absolute md:top-[-20px] md:right-[6px] bg-[#1342ff] w-full h-max md:w-[200.12px] xl:w-[292px] xl:h-[504px] rounded-xl md:rounded-3xl p-5 overflow-hidden drop-shadow-2xl drop-shadow-[#5243c253] "
            >
              <div className="flex justify-end">
                <button className="bg-[#eef2fe] text-[#010413] text-[8.79px] xl:text-[10px] font-extrabold text-center px-4 py-2 rounded-4xl md:[letter-spacing:0.1em]">
                  {data.message}
                </button>
              </div>
              <p className="text-[#f7f7f7] text-[20.85px] xl:text-[36px] font-bold mt-6 mb-3">
                {data.price}
              </p>
              <p className="text-[#f7f7f7] text-[11.58px] xl:text-[20px] font-medium mb-5">
                {data.title}
              </p>

              <div className="space-y-2 md:space-y-1 xl:space-y-4 mb-7">
                {data.options.map((data) => (
                  <div className="flex flex-row items-center space-x-2">
                    <p className="bg-[#2a55ff] w-[11.58px] h-[11.58px] xl:w-[20px] xl:h-[20px] rounded-full flex justify-center items-center">
                      <CheckIcon className="inline text-[#f7f7f7] w-3 h-3 xl:w-4 xl:h-4 font-bold" />
                    </p>
                    <p
                      key={data.id}
                      className="text-[#f7f7f7] text-[8.69px] xl:text-[15px] font-medium"
                    >
                      {data.option}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                to="/services/printing-consultation"
                onClick={handleOrigins}
              >
                <button className="bg-[#efece9] w-full text-[#101828] font-bold border border-[#efece9] text-[8.91px] xl:text-[15px] px-6 py-2 xl:py-3 rounded-3xl hover:text-white hover:bg-[#101828] hover:border-[#101828] transition-colors duration-300 cursor-pointer">
                  Order now
                </button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BrandingPackage;
