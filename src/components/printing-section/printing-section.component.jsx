import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const PrintingSection = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col-reverse xl:flex-col py-5">
      <div className="w-full  text-center flex flex-col justify-center items-center py-5 px-5 xl:pb-10">
        <h1 className="text-[#010413] text-[24px] md:text-[48px] leading-[1.1] font-semibold md:font-bold">
          Printing
        </h1>
        <p className="mt-3 md:mt-8 text-[16px] md:text-[20px] text-[#667085] font-bold leading-[1.4]">
          Professional & clean
        </p>
        <div className="mt-6 md:mt-12 flex flex-col w-full md:w-[431px] xl:w-full space-y-4 xl:inline xl:space-x-4">
          <Link
            to="/services/printing-consultation"
            onClick={handleOrigins}
            className="bg-[#1a212a] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-6 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            Start Printing
          </Link>
          <Link
            to="/services/printing"
            onClick={handleOrigins}
            className="bg-transparent text-[#010413] font-semibold border border-[#010413] text-[14px] md:text-[16px] px-12 py-4 rounded-lg hover:text-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            View service
          </Link>
        </div>
      </div>
      <div className="bg-[#ffadd9] w-full h-[420px] md:h-[530px] xl:h-[761px] rounded-xl">
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330730/fb3b12a1f7966448ea8070205ed1cd33afc5c66c_oeg7ip.png"
          alt="products mock-up"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default PrintingSection;
