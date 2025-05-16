import React from "react";
import { AboutAccomplishmentData } from "../../data/accomplishment-data/accomplishment.data";

const AboutAccomplishments = () => {
  return (
    <div className="px-[5%] py-5 ">
      <p
        className="text-[#505050] text-[14px] uppercase mb-3"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        what we have accomplished so far
      </p>
      <p
        className="text-[#000000] text-[32px] font-bold mb-3"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        We could not have done it without you
      </p>
      <p
        className="text-[#667085] text-[16px] leading-[1.5] mb-3 w-[671.12px]"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        Hello Dreams started in 2023 and we have built this community through
        hard work, dedication and beautiful people like you.
      </p>

      <div className="space-y-6 my-6">
        {AboutAccomplishmentData.map((data) => (
          <div
            key={data.id}
            className="flex justify-between items-center px-5 py-2 border border-[#eaecf0] rounded-xl"
          >
            <div className="flex space-x-3 items-start">
              {data.id === 1 || data.id === 3 ? (
                <div className="bg-[#ff6250] w-[46.8px] h-[46.8px] rounded-tr-full overflow-hidden "></div>
              ) : (
                <div className="bg-[#ff6250] w-[46.8px] h-[46.8px] rounded-br-full overflow-hidden "></div>
              )}
              <div
                className="space-y-2"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              >
                <p className="text-[#2d2d2d] text-[16px] font-semibold mb-3 ">
                  {data.title}
                </p>
                <p className="text-[#505050] text-[14px] leading-[1.5] mb-3 w-[337.34px]">
                  {data.text}
                </p>
              </div>
            </div>
            <div className="w-[128px] h-[108px] rounded-xl overflow-hidden">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutAccomplishments;
