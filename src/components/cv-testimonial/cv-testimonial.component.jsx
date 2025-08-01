import React from "react";
import { CvTestimonialData } from "../../data/testimonial-data/testimonial.data";
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

const CvTestimonial = () => {
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-15">
        {CvTestimonialData.map((data, index) => (
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
                <div className="w-[43.83px] h-[43.83px] xl:w-[77px] xl:h-[77px] bg-[#d9d9d9] flex justify-center items-center rounded-full overflow-hidden">
                  <img
                    src={data.image}
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
              <div className="flex flex-row space-x-3 items-center">
                <div className="hidden xl:flex space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className={`w-5 h-5 md:w-7 md:h-7 ${
                        index < data.rating
                          ? "text-[#ff9d2b]"
                          : "text-[#aeaeae]"
                      }`}
                    />
                  ))}
                </div>
                <div className="w-[27.35px] h-[24.19px] xl:w-[46px] xl:h-[39.03px]">
                  <img
                    src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750070959/UI%20page/quote_icon_flyun2.png"
                    alt="quote icon"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="my-5">
              <p
                className="text-[#101010] text-[12px] leading-[1.5] mb-5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {data.text}
              </p>

              {data.images && (
                <div className="flex justify-center items-center space-x-5">
                  {data.images.map((image, index) => (
                    <div
                      key={index}
                      className="w-[150px] h-[150px] md:w-[206px] md:h-[206px] "
                    >
                      <img
                        src={image}
                        alt="testimonial image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {(data.question1 && data.answer1) ||
              (data.question2 && data.answer2) ? (
                <div className="space-y-4">
                  <p
                    className="text-[#101010] text-[12px] leading-[1.5] font-semibold"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span className="text-[#1342ff]">Q:</span> {data.question1}
                  </p>
                  <p
                    className="text-[#667085] text-[12px] leading-[1.5] "
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span className="text-[#1342ff] font-semibold">A:</span>{" "}
                    {data.answer1}
                  </p>
                  <p
                    className="text-[#101010] text-[12px] leading-[1.5] font-semibold"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span className="text-[#1342ff]">Q:</span> {data.question2}
                  </p>
                  <p
                    className="text-[#667085] text-[12px] leading-[1.5] "
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span className="text-[#1342ff] font-semibold">A:</span>{" "}
                    {data.answer2}
                  </p>
                </div>
              ) : null}
            </div>
            <div className="flex space-x-1 xl:hidden">
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

export default CvTestimonial;
