import React, { useRef, useState } from "react";
import { CommunityChallengeData } from "../../data/community-challenge-data/challenge-data";
import {
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";

const CommunityChallenge = () => {
  const [activeOption, setActiveOption] = useState(null);
  const [copied, setCopied] = useState(false);
  const textRef = useRef(null);

  const toggleModal = (optionId) => {
    setActiveOption(activeOption === optionId ? null : optionId);
  };

  const closeModal = () => {
    setActiveOption(null);
  };

  const handleCopy = async (event) => {
    event.stopPropagation();

    if (textRef.current) {
      try {
        await navigator.clipboard.writeText(textRef.current.innerText);
        setCopied(true);

        // Reset the button text after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text:", err);
      }
    }
  };

  return (
    <>
      <div className="w-full h-[800px] bg-[url('https://i.ibb.co/8nrStGvY/ad662eef6d63161aa45a54bcb30d5cc4dea4d128.jpg')] bg-cover bg-center "></div>
      <div className="px-[10%] py-15 mb-10 space-y-15">
        {CommunityChallengeData.map((data) => (
          <div key={data.id}>
            <p
              className="text-[#010413] text-[40px] font-bold my-10"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {data.header}
            </p>
            <div className="grid grid-cols-3 gap-5">
              {data.options.map((option) => (
                <div
                  key={option.id}
                  className="w-full h-[466px] border border-[#dfdfe2] rounded-xl p-4"
                >
                  <div className="w-full h-[220px] rounded-xl overflow-hidden">
                    <img
                      src={option.image}
                      alt={option.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex flex-row justify-between text-[#010413] py-5">
                    <p className="text-[20px] md:text-[20px] leading-[1.3] font-semibold">
                      {option.title}
                    </p>
                    <div
                      onClick={() => toggleModal(option.id)}
                      className="cursor-pointer"
                    >
                      <ArrowTopRightOnSquareIcon className="w-[23px] h-[23px] md:w-[28px] md:h-[28px]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {activeOption && (
              <div
                onClick={closeModal}
                className="fixed inset-0 flex items-center justify-center bg-[#20202069] z-60"
              >
                <div className="bg-[#fff] p-6 rounded-lg w-[483px]">
                  <div ref={textRef}>
                    {CommunityChallengeData.filter((data) =>
                      data.options.some((option) => option.id === activeOption)
                    ).map((data) => (
                      <div key={data.id}>
                        <div className="flex justify-between items-center text-[#0d111c] mb-3">
                          <h2 className="text-[24px] font-extrabold">
                            {data.header}
                          </h2>
                          <XMarkIcon
                            onClick={closeModal}
                            className="w-[24px] h-[24px] cursor-pointer"
                          />
                        </div>

                        {data.options
                          .filter((option) => option.id === activeOption)
                          .map((option) => (
                            <div key={option.id}>
                              <p className="text-[#0d111c] text-[20px] font-semibold mb-3">
                                {option.title}
                              </p>
                              <div
                                className="space-y-4"
                                style={{
                                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                                }}
                              >
                                <p className="text-[#8d9da8] text-[14px] font-medium">
                                  {option.text1}
                                </p>
                                <p className="text-[#8d9da8] text-[14px] font-medium">
                                  {option.text2}
                                </p>
                                <p className="text-[#8d9da8] text-[14px] font-medium">
                                  {option.tag}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5">
                    <button
                      onClick={handleCopy}
                      className="bg-[#fff] text-[#1b212c] font-semibold border border-[#1a212a] text-[10.91px] lg:text-[16px] px-3 py-2 rounded-xl hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
                    >
                      <span>
                        <ClipboardDocumentIcon className="inline w-5 h-5 align-middle mr-1" />
                      </span>
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default CommunityChallenge;
