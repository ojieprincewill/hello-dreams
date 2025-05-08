import React from "react";
const SocialConsultationForm = () => {
  return (
    <div className="bg-[#f8f8f8] lg:bg-[#fff] w-full px-[5%] lg:px-[10%] py-15 md:py-25">
      <p
        className="text-[20px] md:text-[32px] text-center lg:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Manage Your Social Media
      </p>
      <p
        className="text-[#667085] text-[14px] md:text-[16px] text-center lg:text-[18px] mb-10 lg:mb-20 lg:w-[793px] mx-auto leading-[1.5]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Please fill out the form below with your social media needs and
        preferences. Once submitted, our team will review your request and get
        back to you within 1 to 5 days.
      </p>
      <form className="w-full grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:gap-x-20  space-y-8 text-[#000000] md:p-6 ">
        <div>
          <label
            className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            aria-required
          >
            Name <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          />
        </div>
        <div>
          <label
            className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            aria-required
          >
            Email <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          />
        </div>
        <div>
          <label
            className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            aria-required
          >
            Phone number <span class="text-red-500">*</span>
          </label>
          <input
            type="tel"
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          />
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Paste your social media account link
          </label>
          <input
            type="text"
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          />
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Social Media Platforms You Want Managed{" "}
            <span class="text-red-500">*</span>
          </label>
          <select
            value=""
            onChange=""
            className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
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
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Select services
          </label>
          <select
            value=""
            onChange=""
            className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          >
            <option value="" disabled className="">
              Select an option
            </option>
            <option value="service1">Option 1</option>
            <option value="service2">Option 2</option>
            <option value="service3">Option 3</option>
          </select>
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Any Competitors or Pages You Admire?
          </label>
          <select
            value=""
            onChange=""
            className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          >
            <option value="" disabled className="">
              Select an option
            </option>
            <option value="service1">Option 1</option>
            <option value="service2">Option 2</option>
            <option value="service3">Option 3</option>
          </select>
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Do You Already Have a Brand Style Guide?
          </label>
          <select
            value=""
            onChange=""
            className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          >
            <option value="" disabled className="">
              Select an option
            </option>
            <option value="service1">Option 1</option>
            <option value="service2">Option 2</option>
            <option value="service3">Option 3</option>
          </select>
        </div>
        <div>
          <label
            className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            aria-required
          >
            What Are Your Social Media Goals?{" "}
            <span class="text-red-500">*</span>
          </label>
          <textarea
            value=""
            onChange=""
            className="w-full h-[200px] resize-none p-3 border border-[#c9c9c9] focus:outline-none rounded-sm"
          />
        </div>
        <div className="space-y-5 md:space-y-10">
          <div>
            <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
              How did you hear about us?
            </label>
            <select
              value=""
              onChange=""
              className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            >
              <option value="" disabled className="">
                Select an option
              </option>
              <option value="service1">Option 1</option>
              <option value="service2">Option 2</option>
              <option value="service3">Option 3</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#1342ff] w-full lg:bg-[#010413] text-[#f7f7f7] font-semibold border border-[#1342ff] lg:border-[#010413] mt-7 text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-3xl lg:rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              Proceed
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SocialConsultationForm;
