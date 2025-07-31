import React from "react";
import { PrintingTestimonialData } from "../../data/testimonial-data/testimonial.data";
import { StarIcon } from "@heroicons/react/24/solid";
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

const PrintingTestimonial = () => {
  return (
    <div className="w-full px-[5%] py-10">
      <p
        className="text-[#041856] text-[20px] md:text-[27.32px] xl:text-[48px] text-center mb-5"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Testimonials
      </p>
      <p
        className="text-[#101010] text-[14px] md:text-[15.94px] xl:text-[28px] text-center font-medium capitalize mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Hear what our clients have to say
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-15">
        {PrintingTestimonialData.map((data, index) => (
          <motion.div
            key={data.id}
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            custom={index}
            className="border border-[#cccccc] rounded-2xl p-3 md:p-5"
          >
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row space-x-3 items-center">
                <div className="w-[45.77px] h-[45.77px] md:w-[43.83px] md:h-[43.83px] xl:w-[77px] xl:h-[77px] bg-[#d9d9d9] flex justify-center items-center rounded-full overflow-hidden">
                  <img
                    src={data.logo}
                    alt={data.client}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <p className="text-[#101010] text-[16px] md:text-[14px] xl:text-[20px]">
                    {data.client}
                  </p>
                  <p
                    className="text-[#aeaeae] text-[12px] font-bold"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {data.service}
                  </p>
                </div>
              </div>
              <div className="w-[27.35px] h-[24.19px] xl:w-[46px] xl:h-[39.03px]">
                <img
                  src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750070959/UI%20page/quote_icon_flyun2.png"
                  alt="quote icon"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="my-5">
              <p
                className="text-[#101010] text-[12px] leading-[1.5]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {data.text}
              </p>
              <p
                className="text-[#101010] text-[12px] mt-5 leading-[1.5]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {data.text2}
              </p>
            </div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`w-5 h-5 md:w-7 md:h-7 ${
                    index < data.rating ? "text-[#ff9d2b]" : "text-[#aeaeae]"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PrintingTestimonial;
