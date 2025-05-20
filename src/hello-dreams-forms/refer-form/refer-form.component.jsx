import React from "react";

const ReferForm = () => {
  return (
    <div className="px-[10%] py-10">
      <p
        className="text-[#667085] text-[24px] text-center font-bold w-[480px] mx-auto mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Earn Rewards with Our Refer and Earn Program
      </p>
      <p
        className="text-[#010413] text-[48px] text-center w-[840px] mx-auto mb-5"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Share the Benefits and Get Rewarded for Every Referral
      </p>
      <p
        className="text-[#667085] text-[16px] text-center mb-5"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Make up to 10% on commission for every referral of any of our services.
      </p>
      <p
        className="text-[#000000] text-[40px] text-center font-bold mt-6"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Step 1
      </p>
      <form className="w-[401.75px] mx-auto space-y-8 md:p-6 mt-3 ">
        <div>
          <label
            className="block text-[#475569] text-[12px] text-center md:text-[16px] font-medium mb-3 md:mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Select Service <span class="text-red-500">*</span>
          </label>
          <select
            value=""
            onChange=""
            className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#dee2e6] bg-transparent focus:outline-none rounded-md"
          >
            <option value="" disabled className="">
              Select an option
            </option>
            <option value="service1">Instagram</option>
            <option value="service2">Tiktok</option>
            <option value="service3">LinkedIn</option>
            <option value="service3">X (Former Twitter)</option>
            <option value="service3">Facebook</option>
          </select>
        </div>
        <div>
          <label
            className="block text-[#475569] text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Referral Name (Business or Personal){" "}
            <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-3 border border-[#dee2e6] bg-transparent focus:outline-none rounded-md"
          />
        </div>
        <div>
          <label
            className="block text-[#475569] text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
            aria-required
          >
            Full Name <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-3 border border-[#dee2e6] bg-transparent focus:outline-none rounded-md"
          />
        </div>
        <div>
          <label
            className="block text-[#475569] text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
            aria-required
          >
            Referral Email <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-3 border border-[#dee2e6] bg-transparent focus:outline-none rounded-md"
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-[#1342ff] lg:bg-[#010413] text-[#f7f7f7] font-semibold border border-[#1342ff] lg:border-[#010413] mt-3 text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-3xl lg:rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReferForm;
