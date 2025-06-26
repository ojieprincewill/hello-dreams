import React from "react";
import { PolicyData } from "../../data/policy-data/policy.data";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#f7f7f7] px-[5%] py-5 md:py-10">
      <div className="bg-[#ffffff] p-5 md:p-10 rounded-xl w-full leading-[1.5]">
        <p className="text-[#667085] text-[18px] md:text-[24px] lg:text-[32px] font-bold md:mb-1 ">
          Privacy Policy for Hello Dreams
        </p>
        <p className="text-[#667085] text-[12px] md:text-[16px] lg:text-[20px] ">
          18th June, 2025
        </p>
        <p className="text-[#667085] text-[12px] md:text-[16px] lg:text-[20px] py-4 md:py-7">
          At Hello Dreams, your privacy is very important to us. This Privacy
          Policy outlines the types of personal information we collect, how we
          use it, and the steps we take to safeguard your information.
        </p>

        {PolicyData.map((data) => (
          <div key={data.id} className="mb-5 md:mb-10">
            {data.title && (
              <p className="text-[#667085] text-[12px] md:text-[16px] lg:text-[20px] font-bold mb-2 md:mb-5">
                {data.title}
              </p>
            )}
            {data.text1 && (
              <p className="text-[#667085] text-[12px] md:text-[16px] lg:text-[20px]">
                {data.text1}
              </p>
            )}
            {Array.isArray(data.options) && data.options.length > 0 && (
              <ul className="list-disc pl-4 md:pl-8 space-y-1">
                {data.options.map((option, index) => (
                  <li
                    key={index}
                    className="text-[#667085] text-[12px] md:text-[16px] lg:text-[20px]"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
            {data.text2 && (
              <p
                className={`text-[12px] md:text-[16px] lg:text-[20px] ${
                  data.id === 9
                    ? "text-[#336aea] font-medium underline" // or any standout style you like
                    : "text-[#667085]"
                }`}
              >
                {data.id === 9 ? (
                  <a href={`mailto:${data.text2}`} className="hover:opacity-80">
                    {data.text2}
                  </a>
                ) : (
                  data.text2
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
