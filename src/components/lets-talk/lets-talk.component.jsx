import React, { useState } from "react";

const LetsTalk = () => {
  const [selectedService, setSelectedService] = useState("");
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#f8f8f8] md:bg-[#fff] grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20 px-[5%] py-15 md:py-25">
      <div className="text-[#000000] space-y-6 md:space-y-10 ">
        <div>
          <p
            className="text-[32px] md:text-[64px] font-bold mb-2 md:mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Let's Talk
          </p>
          <p className="text-[15px] md:text-[20px] font-bold leading-[1.5]">
            Have some big idea or brand to develop and need help? Then reach out
            we'd love to hear about your project and provide help
          </p>
        </div>
        <div>
          <p
            className="text-[16px] md:text-[32px] font-bold mb-2 md:mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Email
          </p>
          <p className="text-[12px] md:text-[16px] font-bold mb-3">
            Support@myhellodreams.com
          </p>
          <p className="text-[12px] md:text-[16px] font-bold mb-3">
            Partnership@myhellodreams.com
          </p>
        </div>
        <div>
          <p
            className="text-[16px] md:text-[32px] font-bold mb-2 md:mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Socials
          </p>
          <p className="text-[12px] md:text-[16px] underline font-bold mb-3 cursor-pointer">
            LinkedIn
          </p>
          <p className="text-[12px] md:text-[16px] underline font-bold mb-3 cursor-pointer">
            Instagram
          </p>
          <p className="text-[12px] md:text-[16px] underline font-bold mb-3 cursor-pointer">
            Youtube
          </p>
          <p className="text-[12px] md:text-[16px] underline font-bold mb-3 cursor-pointer">
            Twitter
          </p>
          <p className="text-[12px] md:text-[16px] underline font-bold mb-3 cursor-pointer">
            Facebook
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full space-y-6 md:space-y-10 text-[#000000] md:p-6"
      >
        <div>
          <label className="block text-[12px] md:text-[16px] font-bold mb-3 md:mb-4">
            Name
          </label>
          <input
            type="text"
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          />
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-bold mb-3 md:mb-4">
            Email
          </label>
          <input
            type="text"
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          />
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-bold mb-3 md:mb-4">
            What service are you interested in?
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-bold p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          >
            <option value="" disabled className="">
              Select project type
            </option>
            <option value="service1">Service 1</option>
            <option value="service2">Service 2</option>
            <option value="service3">Service 3</option>
          </select>
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-bold mb-3 md:mb-4">
            Budget
          </label>
          <input
            type="text"
            placeholder="$"
            className="w-full p-3 border border-[#c9c9c9] placeholder-[#000000] bg-transparent focus:outline-none rounded-sm"
          />
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-bold mb-3 md:mb-4">
            Message
          </label>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full h-[200px] resize-none p-3 border border-[#c9c9c9] focus:outline-none rounded-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#eef2fe] text-[#667085] text-[14px] md:text-[16px] font-semibold py-3 rounded-4xl hover:bg-blue-700 hover:text-[#fff] transition-colors duration-300 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LetsTalk;
