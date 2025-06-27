import React from "react";
import NavBar from "../../landing-header/nav-bar/nav-bar.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const CollectionsHeader = () => {
  const scrollToShop = () => {
    document
      .getElementById("shop-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className=" bg-[#eef2fe] pt-3 md:pt-0">
        <NavBar />
        <div className="w-full h-max lg:h-[900px] flex flex-col-reverse lg:grid lg:grid-cols-2 lg:place-items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-start justify-start text-[#010413] px-5 py-5"
          >
            <h1
              className="text-[22px] md:text-[32px] lg:text-[56px] lg:w-[509px] leading-[1.1] font-semibold md:font-extrabold "
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Hello Dreams Collections
            </h1>
            <p
              className="mt-8 text-[16px] md:text-[20px] lg:text-[24px]  text-[#667085] lg:text-[#010413] lg:w-[530px] leading-[1.6]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Shop from our collection of quality T-shirts, hoodies, and custom
              two-piece sets. You can also find essentials like jotters, diaries
              etc.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8 md:mt-10 w-[164px] md:w-[273px]"
            >
              <button
                onClick={scrollToShop}
                className="bg-[#010413] w-full text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[20px] text-center px-4 py-3 rounded-sm hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
              >
                Shop now
              </button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full h-[391px] md:h-full"
          >
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749411724/hello%20dreams%20collection/collection%20page/ad625f059d4c14c3194e4dfc8466bf552e36e87f_ldsqlz.png"
              alt="pamela ohaeri"
              className="w-full h-full object-contain md:object-contain lg:object-cover"
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CollectionsHeader;
