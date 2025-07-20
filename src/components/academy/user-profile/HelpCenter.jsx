import React, { useState } from "react";

const HelpCenter = () => {
  const [copied, setCopied] = useState({ email: false, phone: false });

  const handleCopy = (type, value) => {
    navigator.clipboard.writeText(value);
    setCopied((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [type]: false })), 1500);
  };

  return (
    <div className="w-full px-[5%] py-10 ">
      <div className="w-full flex justify-center items-center lg:w-[804px] lg:mx-auto h-[150px] border border-[#eaecf0] rounded-sm p-8 mb-6 text-center">
        <h2 className="text-[#010413] text-[20px] md:text-[28px] lg:text-[32px] mb-2">
          Contact Support
        </h2>
      </div>
      <div
        className="bg-white rounded-xl shadow-xl p-8 lg:w-[804px] lg:mx-auto space-y-6"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        <div>
          <label className="block text-[#667085] text-[12px] mb-1">
            Email address
          </label>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#f7f7f7] text-[14px] md:text-[16px] rounded p-3 border border-[#eaecf0]">
            <a
              href="mailto:support@myhellodreams.com"
              className="text-[#101828] mb-2 sm:mb-0 hover:text-[#ff7f50] transition-colors duration-200"
            >
              Support@myhellodreams.com
            </a>
            <button
              className="bg-[#1342ff] text-white px-4 py-2 rounded font-bold hover:bg-[#2313ff] transition-colors duration-200 cursor-pointer w-full sm:w-auto"
              onClick={() => handleCopy("email", "Support@myhellodreams.com")}
            >
              {copied.email ? "Copied!" : "copy"}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-[#667085] text-[12px] mb-1">
            Phone number
          </label>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#f7f7f7] text-[14px] md:text-[16px] rounded p-3 border border-[#eaecf0]">
            <a
              href="https://wa.me/2347016773420"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#101828] mb-2 sm:mb-0 hover:text-[#ff7f50] transition-colors duration-200"
            >
              07016773420
            </a>
            <button
              className="bg-[#1342ff] text-white px-4 py-2 rounded font-bold hover:bg-[#2313ff] transition-colors duration-200 cursor-pointer w-full sm:w-auto"
              onClick={() => handleCopy("phone", "07016773420")}
            >
              {copied.phone ? "Copied!" : "copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
