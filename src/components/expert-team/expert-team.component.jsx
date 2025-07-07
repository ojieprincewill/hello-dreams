import React, { useState } from "react";
import { MeetExpertsData } from "../../data/choose-us-data/choose-us.data";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const cardVariants = {
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

const ExpertTeam = () => {
  const [activeModal, setActiveModal] = useState(null);

  const handleClick = (id) => setActiveModal(id);
  const handleCloseModal = () => setActiveModal(null);

  return (
    <div className="w-full mt-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {MeetExpertsData.map((data, index) => (
        <motion.div
          key={data.id}
          initial="hidden"
          whileInView="visible"
          variants={cardVariants}
          custom={index}
          className={`relative p-3 border border-[#dfdfe2] rounded-xl ${
            index >= MeetExpertsData.length - 2 ? "lg:col-span-2" : ""
          }`}
        >
          {/* Click Wrapper */}
          <div className="relative">
            {/* Image */}
            <div
              className="w-full h-[221.35px] md:h-[286.65px] lg:h-[360px] mb-5 cursor-pointer"
              onClick={() => handleClick(data.id)}
            >
              <img
                src={data.image}
                alt={data.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Name & Read More */}
            <p className="text-[#26262b] text-[12px] md:text-[14px] lg:text-[18px] font-medium mb-2">
              {data.name}
            </p>
            <p className="text-[#7f8090] text-[11px] lg:text-[15.5px] leading-[1.5] mb-3">
              {data.text}{" "}
              <span
                onClick={() => handleClick(data.id)}
                className="font-bold cursor-pointer"
              >
                read more
              </span>
            </p>

            {/* Backdrop + Modal */}
            {activeModal === data.id && (
              <>
                {/* Backdrop - Click to Close */}
                <div
                  className="fixed inset-0 bg-[#00000060] z-60"
                  onClick={handleCloseModal}
                ></div>

                {/* Modal - Responsive Positioning */}
                <div
                  className={`absolute bg-[#f7f7f7] shadow-lg rounded-lg z-[9999] 
                    lg:w-[373px] top-1/2 -translate-y-1/2
                    ${
                      data.modalPosition === "left"
                        ? "lg:right-full"
                        : "lg:left-full"
                    } 
                    w-full md:w-[320px]`}
                >
                  {/* Arrow Pointer - Hidden on Mobile */}
                  <div
                    className={`absolute lg:block hidden w-4 h-4 bg-[#f7f7f7] rotate-45 ${
                      data.modalPosition === "left" ? "-right-2" : "-left-2"
                    } top-1/2 -translate-y-1/2`}
                  ></div>

                  <div className="max-h-[444px] md:max-h-[500px] p-4 overflow-auto">
                    <p className="text-[#26262b] text-[20px] font-semibold mb-3">
                      {data.name}
                    </p>
                    <p
                      className={`text-[#26262b] w-max text-[14px] font-semibold px-3 py-1 rounded-md bg-[${data.bgColor}] mb-3`}
                    >
                      {data.role}
                    </p>
                    <p className="text-[#7f8090] text-[12px] lg:text-[15.5px] leading-[1.5] mb-4">
                      {data.text1}
                    </p>
                    {data.text2 && (
                      <p className="text-[#7f8090] text-[12px] lg:text-[15.5px] leading-[1.5] mb-4">
                        {data.text2}
                      </p>
                    )}
                    {data.text3 && (
                      <p className="text-[#7f8090] text-[12px] lg:text-[15.5px] leading-[1.5] mb-4">
                        {data.text3}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExpertTeam;
