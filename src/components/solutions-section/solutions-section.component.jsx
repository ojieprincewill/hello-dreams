import React, { useState } from "react";

const SolutionsSection = () => {
  const [selectedService, setSelectedService] = useState("");
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ selectedService, userInput });
  };

  return (
    <div className="hidden md:block bg-[#010413] text-[#fff] p-20">
      <h1 className="text-[48px] semibold leading-[1.5] text-center">
        We would love to provide you with a solution
        <br />
        for your current professional pain points
      </h1>
      <div className="grid grid-cols-[55%_45%] gap-2 mt-20">
        <div className="w-full h-[800] bg-[#ffc501] rounded-2xl">
          <img
            src="https://i.ibb.co/60TNJtL3/ae3bfa13ccf709991e22a3b74450b625f5b8f7f0.png"
            alt="lady vector image"
            className="w-full h-full object-contain object-center"
          />
        </div>
        <div className="mt-25">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg mx-auto p-6 rounded-xl shadow-md space-y-6"
          >
            <div>
              <label className="block text-[20px] font-bold text-[#fff]">
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
                <option value="service1">Service 1</option>
                <option value="service2">Service 2</option>
                <option value="service3">Service 3</option>
              </select>
            </div>

            <div>
              <label className="block text-[20px] font-bold text-[#fff]">
                Tell us what you need
              </label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="mt-2 w-full h-[200px] p-3 border placeholder-[#667085] border-[#eaecf0] bg-transparent focus:outline-none rounded-sm"
                placeholder="Type description here"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1342ff] text-[#fff] text-[24px] font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SolutionsSection;
