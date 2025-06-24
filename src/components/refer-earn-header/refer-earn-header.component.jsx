import React from "react";
import NavBar from "../landing-header/nav-bar/nav-bar.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const ReferHeader = () => {
  return (
    <div className="relative w-full h-[328.33px] md:h-[463.33px] lg:h-[800px] pt-3 md:pt-0 bg-[url('https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750283365/Refer%20page/eab56f2c011a401ecc213a990cc9f5928d56f398_vx2tfx.jpg')] bg-cover bg-center ">
      <NavBar />
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute bottom-[140px] left-[50px] md:bottom-[200px] md:left-[150px] lg:bottom-[340px] lg:left-[220px] text-[#ffadd9] text-[13.42px] md:text-[23.17px] lg:text-[40px] text-center font-[900]"
      >
        Refer & Earn
      </motion.p>
    </div>
  );
};

export default ReferHeader;
