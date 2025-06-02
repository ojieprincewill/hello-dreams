import React from "react";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

const Step2 = () => {
  return (
    <div
      className="md:w-max mx-auto space-y-8 md:p-6 mt-3 "
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <p
        className="text-[#000000] text-[24.15px] md:text-[36.02px] lg:text-[40px] text-center font-bold mt-10"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Step 2
      </p>
      <div className="flex justify-center items-center">
        <button className="bg-[#ffffff] border border-[#00000015] text-[#010413] text-[12px] md:text-[14px] px-6 md:px-8 py-3 font-medium text-center rounded-2xl shadow-[inset_0px_-2px_4px] shadow-[#ffe7de90] cursor-pointer">
          <DocumentDuplicateIcon className="inline w-4 h-4 lg:w-5 lg:h-5 align-middle mr-1" />
          Copy Your Referral Id
        </button>
      </div>
      <p className="bg-[#f7f7f7] text-[#000000] text-[12px] md:text-[14.38px] px-5 py-4 rounded-md h-[80px] flex items-center">
        <CheckIcon className="inline text-[#1342ff] w-4 h-4 lg:w-5 lg:h-5 align-middle mr-3" />
        Share our “Get a quote” link with your referral
      </p>
      <p className="bg-[#f7f7f7] text-[#000000] text-[12px] md:text-[14.38px] px-5 py-4 rounded-md h-[80px] flex items-center">
        <CheckIcon className="inline text-[#1342ff] w-4 h-4 lg:w-5 lg:h-5 align-middle mr-3" />
        Ensure your referral submits a quote request
      </p>
      <p className="bg-[#f7f7f7] text-[#000000] text-[12px] md:text-[14.38px] px-5 py-4 rounded-md h-[80px] flex items-center">
        <CheckIcon className="inline text-[#1342ff] w-4 h-4 lg:w-5 lg:h-5 align-middle mr-3" />
        Assist the company to ensure the deal is closed
      </p>
      <p className="bg-[#f7f7f7] text-[#000000] text-[12px] md:text-[14.38px] px-5 py-4 rounded-md h-[80px] flex items-center">
        <CheckIcon className="inline text-[#1342ff] w-4 h-4 lg:w-5 lg:h-5 align-middle mr-3" />
        When successful, you will get 10%
      </p>
      <div className="flex justify-center items-center">
        <button className="bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] text-[12px] md:text-[14px] lg:text-[16px] px-6 py-3 rounded-lg hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step2;
