import React, { useState } from "react";
import { FaqData } from "../../data/faq-data/faq.data";
import { SunIcon } from "@heroicons/react/24/solid";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";

const FaqSection = () => {
  const [activeId, setActiveId] = useState(1);

  const toggleQuestion = (id) => {
    setActiveId(activeId === id ? null : id); // Toggle active answer visibility
  };

  return (
    <div className="md:bg-[#fff] rounded-2xl md:grid md:grid-cols-2 w-full md:gap-4 my-8 p-8 lg:my-15 lg:p-10">
      <div>
        <p className="text-[15.05px] md:text-[30.05px] lg:text-[56px] text-[#101828] font-bold mb-4">
          FAQs.
        </p>
        <div className="flex flex-col space-y-2 md:h-[330px] lg:h-[616px] overflow-auto">
          {FaqData.map((faq) => (
            <div key={faq.id} onClick={() => toggleQuestion(faq.id)}>
              <div
                className={`w-full flex justify-between items-center text-left text-[#041856] rounded-md px-2 py-4 md:rounded-xl border border-[#e7eeec] hover:bg-[#101828] hover:text-[#fff] transition-all duration-300 cursor-pointer ${
                  activeId === faq.id ? "bg-[#101828] text-[#fff]" : "bg-[#fff]"
                }`}
              >
                <p className="text-[14px] md:text-[10px] lg:text-[18px] w-[230px] md:w-full font-bold">
                  {faq.question}{" "}
                  {activeId === faq.id && (
                    <span>
                      <SunIcon className="md:hidden inline align-middle h-[18px] w-[18px] text-[#ffc501]" />
                    </span>
                  )}
                </p>
                {activeId === faq.id && (
                  <SunIcon className="hidden md:block md:w-3 md:h-3 lg:h-6 lg:w-6  text-[#ffc501]" />
                )}
                {activeId === faq.id ? (
                  <MinusIcon className="h-6 w-6 font-bold md:hidden" />
                ) : (
                  <PlusIcon className="h-6 w-6 font-bold md:hidden" />
                )}
              </div>

              <AnimatePresence>
                {activeId === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="md:hidden bg-[#1342ff] text-[#fff] rounded-xl p-4"
                  >
                    <p className="text-[14px]">
                      <SunIcon className="block h-[18px] w-[18px] mb-2 " />
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block">
        <p className="md:text-[30.05px] lg:text-[56px] text-[#101828] font-bold mb-4">
          Ans.
        </p>
        <div className="bg-[#1342ff] text-[#fff] rounded-xl p-5 md:h-[330px] lg:h-[74%] overflow-auto">
          {activeId !== null ? (
            <p className="md:text-[12px] lg:text-[24px] lg:font-bold">
              <span className="mb-2 block">
                <SunIcon className="md:w-3 md:h-3 lg:h-6 lg:w-6 " />
              </span>
              {FaqData.find((faq) => faq.id === activeId)?.answer}
            </p>
          ) : (
            <p className="md:text-[12px] lg:text-[24px] lg:font-bold">
              Select a question to view the answer.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
