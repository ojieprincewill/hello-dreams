import React, { useState } from "react";

const LetsTalk = () => {
  const [selectedService, setSelectedService] = useState("");
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#f8f8f8] md:bg-[#fff] grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-20 px-[5%] py-15 md:py-25">
      <div className="text-[#000000] space-y-6 md:space-y-10 ">
        <div>
          <p
            className="text-[20px] md:text-[32px] lg:text-[64px] font-bold mb-2 md:mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Let's Talk
          </p>
          <p className="text-[14px] md:text-[15px] lg:text-[20px] lg:font-bold leading-[1.5]">
            Have some big idea or brand to develop and need help? Then reach out
            we'd love to hear about your project and provide help
          </p>
        </div>
        <div>
          <p
            className="text-[16px] md:text-[20px] lg:text-[32px] font-bold mb-2 md:mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Email
          </p>
          <a
            href="mailto:support@myhellodreams.com"
            className="block w-max text-[12px] md:text-[16px] lg:font-bold mb-3 hover:text-[#598ac2] transition-colors duration-300"
          >
            Support@myhellodreams.com
          </a>
          <a
            href="mailto:partnership@myhellodreams.com"
            className="block w-max text-[12px] md:text-[16px] lg:font-bold mb-3 hover:text-[#598ac2] transition-colors duration-300"
          >
            Partnership@myhellodreams.com
          </a>
        </div>
        <div>
          <p
            className="text-[16px] md:text-[20px] lg:text-[32px] font-bold mb-2 md:mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Socials
          </p>
          <a
            href="https://www.linkedin.com/company/hello-dreams-limited/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-max text-[12px] md:text-[16px] underline lg:font-bold mb-3 hover:text-[#598ac2] transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/hellodreamss/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-max text-[12px] md:text-[16px] underline lg:font-bold mb-3 hover:text-[#598ac2] transition-colors duration-300"
          >
            Instagram
          </a>
          <a
            href="https://www.youtube.com/@HelloDreamsAcademy"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-max text-[12px] md:text-[16px] underline lg:font-bold mb-3 hover:text-[#598ac2] transition-colors duration-300"
          >
            Youtube
          </a>
          <a
            href="https://www.tiktok.com/@myhellodreams?_t=ZM-8wv4XL55NBu&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-max text-[12px] md:text-[16px] underline lg:font-bold mb-3 hover:text-[#598ac2] transition-colors duration-300"
          >
            Tiktok
          </a>
          <a
            href="https://x.com/MyHelloDreams?t=iiEkr0Z3fveby5O8QVEP9A&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-max text-[12px] md:text-[16px] underline lg:font-bold mb-3 hover:text-[#598ac2] transition-colors duration-300"
          >
            Twitter
          </a>
          <a
            href="https://web.facebook.com/profile.php?id=61565243428696"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-max text-[12px] md:text-[16px] underline lg:font-bold mb-3 hover:text-[#598ac2] transition-colors duration-300"
          >
            Facebook
          </a>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full space-y-6 md:space-y-10 text-[#000000] lg:p-6"
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
            className="w-full text-[#444] text-[10px] md:text-[14px] p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          >
            <option value="" disabled className="text-[#b2b2b2]">
              Select project type
            </option>
            <option value="service1" className="text-[#444]">
              UI/UX Design
            </option>
            <option value="service2" className="text-[#444]">
              Logo Design
            </option>
            <option value="service3" className="text-[#444]">
              Branding
            </option>
            <option value="service4" className="text-[#444]">
              User Research
            </option>
            <option value="service5" className="text-[#444]">
              Redesign
            </option>
            <option value="service6" className="text-[#444]">
              Development
            </option>
            <option value="service7" className="text-[#444]">
              Printing
            </option>
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
