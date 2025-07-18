import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

const AcademyPricing = () => {
  return (
    <div className="w-full px-[5%] lg:px-[14%] py-10">
      <div>
        <h1
          className="text-[#101828] text-[20px] md:text-[30px] lg:text-[48px] font-bold text-center mb-4"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Pricing
        </h1>

        <div
          className="text-[#667085] text-[14px] md:text-[16px] lg:text-[18px] md:text-center font-medium mb-10"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          <p>
            At Hello Dreams, we offer two distinct payment options to enhance
            your learning experience:
          </p>
          <ul className="list-disc list-inside md:text-center space-y-4 md:space-y-6 mb-2">
            <li>
              <b>One-Time Course Purchase:</b> Gain lifetime access to a
              specific course with a single payment. This allows you to revisit
              the content whenever you want, ensuring you master the material at
              your own pace.
            </li>
            <li>
              <b>Monthly Subscription:</b> Subscribe monthly to enjoy unlimited
              access to all our live classes (This covers just UX Design Topics
              for now). While the subscription covers all classes during your
              active period, please note that courses are sold separately and
              are not included in the subscription.
              <br />
              This way, you can choose the best option for your learning journey
              and continue to grow with Hello Dreams.
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 md:my-15">
          {/* One time payment card */}
          <div className=" bg-white rounded-2xl shadow-2xl p-4 md:p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <span className="inline-block bg-[#ff7f50] text-[#fff] text-[10px] tracking-[1px] font-extrabold rounded-full px-4 py-2 mb-8">
                One time payment
              </span>
              <h2 className="text-[#101828] text-[20px] md:text-[28px] lg:text-[36px] font-bold mb-1">
                Buy a course
              </h2>
              <div className="text-[#101828] text-[14px] md:text-[16px] font-medium mb-2">
                /One time payment
              </div>
              <div className="text-[#101828] text-[12px] font-medium my-5">
                Choose the learning style that suits you.
              </div>
              <div className="space-y-2 my-10">
                <div className="flex items-center text-[#101828] text-[14px] md:text-[15px] font-medium">
                  <span className="bg-[#f2f2f2] w-5 h-5 flex justify-center items-center rounded-full mr-2">
                    <CheckIcon className="w-4 h-4 text-[#010413]" />{" "}
                  </span>
                  Unlimited UX/UI classes
                </div>
                <div className="flex items-center text-[#101828] text-[14px] md:text-[15px] font-medium">
                  <span className="bg-[#f2f2f2] w-5 h-5 flex justify-center items-center rounded-full mr-2">
                    <CheckIcon className="w-4 h-4 text-[#010413]" />{" "}
                  </span>
                  Certificates
                </div>
                <div className="flex items-center text-[#101828] text-[14px] md:text-[15px] font-medium">
                  <span className="bg-[#f2f2f2] w-5 h-5 flex justify-center items-center rounded-full mr-2">
                    <CheckIcon className="w-4 h-4 text-[#010413]" />{" "}
                  </span>
                  Flexible learning schedule
                </div>
              </div>
            </div>
            <button
              className="w-full bg-[#101828] text-white text-[15.13px] font-bold rounded-lg py-3 hover:bg-[#1342ff] transition-colors duration-300 cursor-pointer"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Explore Courses
            </button>
          </div>
          {/* Subscription card */}
          <div className="bg-[#1342ff] rounded-2xl shadow-2xl p-4 md:p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <span className="inline-block bg-[#ff7f50] text-[#fff] text-[10px] tracking-[1px] font-extrabold rounded-full px-4 py-2 mb-8">
                Recommended
              </span>
              <h2 className="flex items-center text-white text-[20px] md:text-[28px] lg:text-[36px] font-bold mb-1">
                ₦12,000{" "}
                <span className="text-[14px] font-medium ml-2">
                  /monthly billed annually
                </span>
              </h2>
              <div className="text-white text-[12px] font-medium my-5">
                You can enhance your UI/UX skills with our various video
                classes.
              </div>
              <div className="space-y-2 my-10">
                <div className="flex items-center text-[#fff] text-[14px] md:text-[15px] font-medium">
                  <span className="bg-[#2450fe] w-5 h-5 flex justify-center items-center rounded-full mr-2">
                    <CheckIcon className="w-4 h-4 text-[#fff]" />{" "}
                  </span>
                  Unlimited UX/UI classes
                </div>
                <div className="flex items-center text-[#fff] text-[14px] md:text-[15px] font-medium">
                  <span className="bg-[#2450fe] w-5 h-5 flex justify-center items-center rounded-full mr-2">
                    <CheckIcon className="w-4 h-4 text-[#fff]" />{" "}
                  </span>
                  Certificates
                </div>
                <div className="flex items-center text-[#fff] text-[14px] md:text-[15px] font-medium">
                  <span className="bg-[#2450fe] w-5 h-5 flex justify-center items-center rounded-full mr-2">
                    <CheckIcon className="w-4 h-4 text-[#fff]" />{" "}
                  </span>
                  Flexible learning schedule
                </div>
              </div>
            </div>
            <button
              className="w-full bg-white text-[#101828] text-[15.13px] font-bold rounded-lg py-3 mt-auto hover:bg-[#eaecf0] transition-colors duration-300 cursor-pointer"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Pay ₦144,000/for a year
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyPricing;
