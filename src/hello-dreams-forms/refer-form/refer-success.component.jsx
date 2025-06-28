import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const ReferSuccess = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-[#f7f7f7] my-10 px-3 md:px-5 py-2 md:py-4 rounded-md md:w-[450.75px] mx-auto h-[80px] flex space-x-2 md:space-x-4 items-center"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <img
        src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750929468/Refer%20page/check_1_kqd4qy.png"
        alt="check icon"
        className="w-[30px] h-[30px] md:w-[44px] md:h-[44px] object-contain "
      />
      <p className="text-[#000000] text-[12px] md:text-[14.38px]">
        Your referral has been successfully submitted
      </p>
    </motion.div>
  );
};

export default ReferSuccess;
