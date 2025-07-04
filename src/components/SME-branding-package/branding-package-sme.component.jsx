import React from "react";
import { BrandingSmeData } from "../../data/pricing-data/pricing-data";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const BrandingPackageSme = () => {
  const HandleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#ededf0] px-5 py-10">
      <p
        className="text-[#000000] text-[20px] md:text-[29.96px] lg:text-[64px] text-center font-bold mb-3 drop-shadow-[0px_4px_4px] drop-shadow-[#3232327a]"
        style={{ fontFamily: "'Radio Canada', sans-serif" }}
      >
        Branding Package for <span className="text-[#3d66fb]">SME</span>
      </p>
      <p
        className="text-[#000000] text-[16px] md:text-[15px] lg:text-[32px] text-center mb-3"
        style={{ fontFamily: "'Sedan', serif" }}
      >
        Hurry now while offer lasts
      </p>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="grid grid-cols-1
    md:grid-cols-3
    gap-6
    justify-items-center
    items-center
    py-10"
      >
        {BrandingSmeData.slice(0, 1).map((data) => (
          <motion.div
            key={data.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className=" bottom-[122px] border-2 border-[#ffffff] rounded-2xl overflow-hidden w-full md:w-[251px] lg:w-[381px] h-max shadow-2xl shadow-[#32323263] md:-mr-2 lg:-mr-16"
          >
            <div className="bg-[#fff] text-[#323232] px-5 py-7 space-y-3">
              <p
                className="text-[10.76px] md:text-[14.98px] lg:text-[32px] text-center font-medium"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                {data.title}
              </p>
              <p
                className="text-[16.91px] md:text-[22.47px] lg:text-[48px] text-center font-bold"
                style={{ fontFamily: "'Sofia Sans', sans-serif" }}
              >
                {data.price}
              </p>
            </div>

            <div className="bg-[#f5f5f5] p-4 md:p-7 space-y-5 border-t-2 border-t-[#00000010]">
              {data.options.map((option) => (
                <div className="flex items-center space-x-3">
                  <CheckIcon className="inline text-[#1342ff] w-4 h-4 lg:w-6 lg:h-6 font-bold" />
                  <p
                    key={option.id}
                    className="text-[#636363] text-[12.11px] md:text-[9.36px] lg:text-[20px]"
                    style={{ fontFamily: "'Sofia Sans', sans-serif" }}
                  >
                    {option.text}
                  </p>
                </div>
              ))}
              <Link
                to="/services/graphics-consultation"
                onClick={HandleOrigins}
                className="mt-10"
              >
                <button className="w-full bg-[#4d42f9]/10 text-[#3d66fb] text-[14px] md:text-[12px] lg:text-[20px] text-center border border-[#3d66fb] py-3 px-6 rounded-md overflow-hidden hover:bg-[#3d66fb] hover:text-[#fff] transition-colors duration-300 cursor-pointer">
                  Buy now
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
        {BrandingSmeData.slice(1, 2).map((data) => (
          <div
            key={data.id}
            className="border-2 border-[#0c4bf6] rounded-2xl overflow-hidden w-full md:w-[300.3px] lg:w-[410px] h-max z-20 shadow-2xl shadow-[#32323263]"
          >
            <div className="w-full h-[50px] bg-[#0c4bf6] flex justify-center items-center">
              <p
                className="text-[#fff] text-[10px] md:text-[11.23px] lg:hidden text-center"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                Most Popular
              </p>
            </div>

            <div className="bg-[#fff] text-[#323232] px-5 py-7 space-y-3">
              <p
                className="text-[12.76px] md:text-[18.72px] lg:text-[40px] text-center font-medium"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                {data.title}
              </p>
              <p
                className="text-[21.52px] md:text-[37.44px] lg:text-[80px] text-center font-bold"
                style={{ fontFamily: "'Sofia Sans', sans-serif" }}
              >
                {data.price}
              </p>
            </div>

            <div className="bg-[#f5f5f5] p-4 md:p-7 space-y-5">
              {data.options.map((option) => (
                <div className="flex items-center space-x-3">
                  <CheckIcon className="inline text-[#1342ff] w-4 h-4 lg:w-6 lg:h-6 font-bold" />
                  <p
                    key={option.id}
                    className="text-[#636363] text-[12.11px] md:text-[9.36px] lg:text-[20px] max-w-[180px] md:max-w-[300px]"
                    style={{ fontFamily: "'Sofia Sans', sans-serif" }}
                  >
                    {option.text}
                  </p>
                </div>
              ))}
              <Link
                to="/services/graphics-consultation"
                onClick={HandleOrigins}
                className="mt-10"
              >
                <button className="w-full bg-[#4d42f9]/10 text-[#3d66fb] text-[14px] md:text-[12px] lg:text-[20px] text-center border border-[#3d66fb] py-3 px-6 rounded-md overflow-hidden hover:bg-[#3d66fb] hover:text-[#fff] transition-colors duration-300 cursor-pointer">
                  Buy now
                </button>
              </Link>
            </div>
          </div>
        ))}
        {BrandingSmeData.slice(2).map((data) => (
          <motion.div
            key={data.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="border-2 border-[#ffffff] rounded-2xl overflow-hidden w-full md:w-[251px] lg:w-[381px] h-max shadow-2xl shadow-[#32323263] md:-ml-2 lg:-ml-16"
          >
            <div className="bg-[#fff] text-[#323232] px-5 py-7 space-y-3">
              <p
                className="text-[10.76px] md:text-[14.98px] lg:text-[32px] text-center font-medium"
                style={{ fontFamily: "'Epilogue', sans-serif" }}
              >
                {data.title}
              </p>
              <p
                className="text-[16.91px] md:text-[22.47px] lg:text-[48px] text-center font-bold"
                style={{ fontFamily: "'Sofia Sans', sans-serif" }}
              >
                {data.price}
              </p>
            </div>

            <div className="bg-[#f5f5f5] p-4 md:p-7 space-y-5 border-t-2 border-t-[#00000010]">
              {data.options.map((option) => (
                <div className="flex items-center space-x-3">
                  <CheckIcon className="inline text-[#1342ff] w-4 h-4 lg:w-6 lg:h-6 font-bold" />
                  <p
                    key={option.id}
                    className="text-[#636363] text-[12.11px] md:text-[9.36px] lg:text-[20px]"
                    style={{ fontFamily: "'Sofia Sans', sans-serif" }}
                  >
                    {option.text}
                  </p>
                </div>
              ))}
              <Link
                to="/services/graphics-consultation"
                onClick={HandleOrigins}
                className="mt-10"
              >
                <button className="w-full bg-[#4d42f9]/10 text-[#3d66fb] text-[14px] md:text-[12px] lg:text-[20px] text-center border border-[#3d66fb] py-3 px-6 rounded-md overflow-hidden hover:bg-[#3d66fb] hover:text-[#fff] transition-colors duration-300 cursor-pointer">
                  Buy now
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BrandingPackageSme;
