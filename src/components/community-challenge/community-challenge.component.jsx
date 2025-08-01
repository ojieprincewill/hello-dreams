import React, { useRef, useState } from "react";
import {
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";
import NavBar from "../landing-header/nav-bar/nav-bar.component";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { useChallenges } from "@/hooks/useChallenges";

const imageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: index * 0.2,
    },
  }),
};

// Placeholder images for UI and UX challenges
const placeholderImages = {
  ui: [
    "https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750331233/community%20page/ee4f8a9ba3213309f1a0780c219cb0d9a5c0ae0b_tewtdw.jpg",
    "https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750331228/community%20page/97066ceb0c086054fffa03e26fa66baac0f0921f_umigw5.jpg",
    "https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750331232/community%20page/1448f11095bef42e135c99d511675ecafb31fad1_wahxlg.jpg",
  ],
  ux: [
    "https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750331232/community%20page/cdacd7b075abfa9341aa4999e5ea2edd3651856b_vfcrpp.jpg",
    "https://i.ibb.co/V0nBBTT9/9c39a4076fcff66a750fb3179d2b3a4262fda3a3.jpg",
    "https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750331233/community%20page/1f99a5012b50e7b5d9b792831e3d8828aaa27a01_txpyja.jpg",
  ],
};

const CommunityChallenge = () => {
  const { data: challenges = [], isLoading } = useChallenges();
  const [activeOption, setActiveOption] = useState(null);
  const [copied, setCopied] = useState(false);
  const textRef = useRef(null);

  // Transform challenges data to match the expected structure
  const transformedData = React.useMemo(() => {
    if (!challenges.length) return [];

    // Group challenges by type
    const uiChallenges = challenges.filter((c) => c.type === "ui");
    const uxChallenges = challenges.filter((c) => c.type === "ux");

    const result = [];

    // Add UI challenges section
    if (uiChallenges.length > 0) {
      result.push({
        id: 1,
        header: "UI Design Challenge",
        options: uiChallenges.map((challenge, index) => ({
          id: challenge.id,
          image: placeholderImages.ui[index % placeholderImages.ui.length],
          title: challenge.title,
          text1: challenge.challenge,
          text2: challenge.deliverables,
          tag: "Share your final work on LinkedIn, Instagram, Twitter, or TikTok. Tag @Hello Dreams and use the hashtags #hellodreams #wedaretodream",
        })),
      });
    }

    // Add UX challenges section
    if (uxChallenges.length > 0) {
      result.push({
        id: 2,
        header: "UX Challenges",
        options: uxChallenges.map((challenge, index) => ({
          id: challenge.id,
          image: placeholderImages.ux[index % placeholderImages.ux.length],
          title: challenge.title,
          text1: challenge.challenge,
          text2: challenge.deliverables,
          tag: "Share your findings on LinkedIn, Instagram, Twitter, or TikTok. Tag @Hello Dreams and use the hashtags #hellodreams #wedaretodream",
        })),
      });
    }

    return result;
  }, [challenges]);

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

  if (isLoading) {
    return (
      <>
        <div className="w-full h-[435px] md:h-[865px] xl:h-[1015px] pt-3 md:pt-0 bg-[url('https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750331234/community%20page/ad662eef6d63161aa45a54bcb30d5cc4dea4d128_ouljqz.jpg')] bg-cover bg-center ">
          <NavBar />
        </div>
        <div className="px-[5%] xl:px-[10%] py-5 mb-10 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1342ff] mx-auto"></div>
            <p className="mt-4 text-[#010413] text-lg">Loading challenges...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full h-[435px] md:h-[865px] xl:h-[1015px] pt-3 md:pt-0 bg-[url('https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750331234/community%20page/ad662eef6d63161aa45a54bcb30d5cc4dea4d128_ouljqz.jpg')] bg-cover bg-center ">
        <NavBar />
      </div>
      <div className="px-[5%] xl:px-[10%] py-5 mb-10 space-y-15">
        {transformedData.map((data) => (
          <div key={data.id}>
            <p
              className="text-[#010413] text-[20px] md:text-[30px] xl:text-[40px] font-bold my-10"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {data.header}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {data.options.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial="hidden"
                  whileInView="visible"
                  variants={imageVariants}
                  custom={index}
                  className={`w-full h-max md:h-[380px] xl:h-[466px] border border-[#dfdfe2] rounded-xl p-4 ${
                    index === data.options.length - 1 &&
                    data.options.length % 2 !== 0
                      ? "md:col-span-2 xl:col-span-1"
                      : ""
                  }`}
                >
                  <div className="w-full h-[261px] rounded-xl overflow-hidden">
                    <img
                      src={option.image}
                      alt={option.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex flex-row justify-between text-[#010413] py-5">
                    <p className="text-[16px] md:text-[20px] leading-[1.3] font-semibold">
                      {option.title}
                    </p>
                    <div
                      onClick={() => toggleModal(option.id)}
                      className="cursor-pointer"
                    >
                      <ArrowTopRightOnSquareIcon className="w-[23px] h-[23px] md:w-[28px] md:h-[28px]" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <AnimatePresence>
              {activeOption && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onClick={closeModal}
                  className="fixed inset-0 flex items-center justify-center bg-[#20202069] z-60"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#fff] p-6 rounded-lg w-[90%] md:w-[483px]"
                  >
                    <div ref={textRef}>
                      {transformedData
                        .filter((data) =>
                          data.options.some(
                            (option) => option.id === activeOption
                          )
                        )
                        .map((data) => (
                          <div key={data.id}>
                            <div className="flex justify-between items-center text-[#0d111c] mb-3">
                              <h2 className="text-[16px] md:text-[20px] xl:text-[24px] font-extrabold">
                                {data.header}
                              </h2>
                              <XMarkIcon
                                onClick={closeModal}
                                className="w-5 h-5 md:w-[24px] md:h-[24px] cursor-pointer"
                              />
                            </div>

                            {data.options
                              .filter((option) => option.id === activeOption)
                              .map((option) => (
                                <div key={option.id}>
                                  <p className="text-[#0d111c] text-[12px] md:text-[16px] xl:text-[20px] font-semibold mb-3">
                                    {option.title}
                                  </p>
                                  <div
                                    className="space-y-4"
                                    style={{
                                      fontFamily:
                                        "'Plus Jakarta Sans', sans-serif",
                                    }}
                                  >
                                    <p className="text-[#8d9da8] text-[10px] md:text-[12px] xl:text-[14px] font-medium">
                                      {option.text1}
                                    </p>
                                    <p className="text-[#8d9da8] text-[10px] md:text-[12px] xl:text-[14px] font-medium">
                                      {option.text2}
                                    </p>
                                    <p className="text-[#8d9da8] text-[10px] md:text-[12px] xl:text-[14px] font-medium">
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
                        className="bg-[#fff] text-[#1b212c] font-semibold border border-[#1a212a] text-[10.91px] md:text-[13.46px] xl:text-[16px] px-3 py-2 rounded-xl hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
                      >
                        <span>
                          <DocumentDuplicateIcon className="inline w-4 h-4 xl:w-5 xl:h-5 align-middle mr-1" />
                        </span>
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommunityChallenge;
