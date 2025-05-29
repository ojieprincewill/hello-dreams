import React from "react";
import { CvTestimonialData } from "../../data/testimonial-data/testimonial.data";
import { StarIcon } from "@heroicons/react/24/solid";

const CvTestimonial = () => {
  return (
    <div className="w-full px-[5%] py-10">
      <p
        className="text-[#041856] text-[20px] md:text-[27.32px] lg:text-[48px] text-center mb-5"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Testimonials
      </p>
      <p
        className="text-[#101010] text-[14px] md:text-[15.94px] lg:text-[28px] text-center font-medium capitalize mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Hear what our clients have to say
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-15">
        {CvTestimonialData.map((data) => (
          <div
            key={data.id}
            className="border border-[#cccccc] rounded-2xl p-3 md:p-5"
          >
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row space-x-3 items-center">
                <div className="w-[43.83px] h-[43.83px] lg:w-[77px] lg:h-[77px] bg-[#d9d9d9] flex justify-center items-center rounded-full overflow-hidden">
                  <img
                    src={data.image}
                    alt={data.client}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <p className="text-[#101010] text-[16px] md:text-[14px] lg:text-[20px]">
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
                <div className="hidden lg:flex space-x-1">
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
                <div className="w-[27.35px] h-[24.19px] lg:w-[46px] lg:h-[39.03px]">
                  <img
                    src="https://i.ibb.co/fY5HPXYb/quote-icon.png"
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
            <div className="flex space-x-1 lg:hidden">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`w-5 h-5 md:w-7 md:h-7 ${
                    index < data.rating ? "text-[#ff9d2b]" : "text-[#aeaeae]"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CvTestimonial;
