import React, { useState } from "react";
import { MeetExpertsData } from "../../data/choose-us-data/choose-us.data";

const ExpertTeam = () => {
  const [activeModal, setActiveModal] = useState(null);

  const handleClick = (id) => setActiveModal(id);
  const handleCloseModal = () => setActiveModal(null);

  return (
    <div className="w-full mt-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {MeetExpertsData.map((data, index) => (
        <div
          key={data.id}
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
                  className="fixed inset-0 bg-[#00000060] z-[60]"
                  onClick={handleCloseModal}
                ></div>

                {/* Modal */}
                <div
                  className={`absolute w-[373px] bg-[#f7f7f7] shadow-lg p-4 rounded-lg z-[9999] ${
                    data.modalPosition === "left" ? "right-full" : "left-full"
                  } top-1/2 -translate-y-1/2`}
                >
                  {/* Arrow Pointer */}
                  <div
                    className={`absolute w-4 h-4 bg-[#f7f7f7] rotate-45 ${
                      data.modalPosition === "left" ? "-right-2" : "-left-2"
                    } top-1/2 -translate-y-1/2`}
                  ></div>

                  <p className="text-[#26262b] text-[20px] font-semibold mb-3">
                    {data.name}
                  </p>
                  <p
                    className={`text-[#26262b] w-max text-[14px] font-semibold px-3 py-1 rounded-md bg-[${data.bgColor}] mb-3`}
                  >
                    {data.role}
                  </p>
                  <p className="text-[#7f8090] text-[15.5px] leading-[1.5]">
                    {data.details}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpertTeam;
