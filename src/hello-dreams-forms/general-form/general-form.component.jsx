import React, { useState } from "react";

const GeneralForm = () => {
  const [selectedService, setSelectedService] = useState("");
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ selectedService, userInput });
  };

  return (
    <div className="grid grid-cols-[55%_45%] gap-2 mt-20">
      <div className="w-full h-full lg:h-[800] bg-[#ffc501] rounded-2xl overflow-hidden">
        <img
          src="https://i.ibb.co/60TNJtL3/ae3bfa13ccf709991e22a3b74450b625f5b8f7f0.png"
          alt="lady vector image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="lg:mt-25">
        <form
          onSubmit={handleSubmit}
          className="w-full pl-6 pr-4 py-4 rounded-xl shadow-md space-y-6"
        >
          <div>
            <label className="block md:text-[16px] lg:text-[20px] lg:font-bold text-[#fff]">
              Choose Service
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="mt-2 text-[#667085] w-full p-3 border border-[#eaecf0] bg-transparent focus:outline-none rounded-sm"
            >
              <option value="" disabled className="text-[16px] ">
                Select a service
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
            <label className="block md:text-[16px] lg:text-[20px] lg:font-bold text-[#fff]">
              Tell us what you need
            </label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="mt-2 w-full md:h-[150px] lg:h-[200px] p-3 resize-none border placeholder-[#667085] border-[#eaecf0] bg-transparent focus:outline-none rounded-sm"
              placeholder="Type description here"
            />
          </div>

          <div>
            <label className="block md:text-[16px] lg:text-[20px] lg:font-bold text-[#fff]">
              Enter your email
            </label>
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="mt-2 w-full p-3 border placeholder-[#667085] border-[#eaecf0] bg-transparent focus:outline-none rounded-sm"
              placeholder="email@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1342ff] text-[#fff] text-[16px] lg:text-[24px] font-semibold py-3 mt-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeneralForm;
