import React, { useState } from "react";
import { FaqData } from "../../data/faq-data/faq.data";
import { SunIcon } from "@heroicons/react/24/solid"; // Heroicons Import

const FaqSection = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="bg-[#fff] rounded-2xl grid grid-cols-2 w-full gap-4 my-20 p-10">
      <div>
        <p className="text-[56px] text-[#101828] font-bold mb-4">FAQs.</p>
        <div className="flex flex-col space-y-2 h-full">
          {FaqData.map((faq) => (
            <div
              key={faq.id}
              onClick={() => setActiveId(faq.id)}
              className={`w-full flex justify-between items-center text-left text-[#041856] p-4 rounded-xl border border-[#e7eeec] hover:bg-[#101828] hover:text-[#fff] transition-all duration-300 cursor-pointer ${
                activeId === faq.id ? "bg-[#101828] text-[#fff]" : "bg-[#fff]"
              }`}
            >
              <p className=" text-[18px] font-bold">{faq.question}</p>
              {activeId === faq.id && (
                <SunIcon className="h-6 w-6 text-[#ffc501]" /> // Sun Icon only appears when active
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[56px] text-[#101828] font-bold mb-4">Ans.</p>
        <div className="bg-[#1342ff] text-[#fff] rounded-xl p-5 h-[84.5%]">
          {activeId !== null ? (
            <p className="text-[24px] font-bold">
              <span className="mb-2 block">
                <SunIcon className="h-6 w-6 " />
              </span>
              {FaqData.find((faq) => faq.id === activeId)?.answer}
            </p>
          ) : (
            <p className="text-[24px] font-bold">
              Select a question to view the answer.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
