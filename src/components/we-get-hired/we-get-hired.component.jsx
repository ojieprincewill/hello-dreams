import React from "react";
import { GetHiredData } from "../../data/our-process-data/our-process.data";

const WeGetHired = () => {
  return (
    <div className="w-full px-[5%] lg:px-[10%] py-15">
      <p className="text-[24px] lg:text-[48px] text-[#101828] text-center font-bold mb-2">
        We get hired to design
      </p>
      <p
        className="text-[12px] lg:text-[17.44px] text-[#667085] text-center lg:font-bold"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        The below
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-5 mt-10 md:mt-20">
        {GetHiredData.map((data) => (
          <div
            key={data.id}
            className="h-[380px] shadow-lg shadow-[#0000003c] rounded-xl overflow-hidden"
          >
            <div className="w-full h-[261px] bg-[#f7f7f8]">
              <img
                src={data.image}
                alt={data.text}
                className="w-full h-full object-center"
              />
            </div>
            <p
              className="text-[15.88px] pt-10 md:text-[21px] text-[#30364d] text-center capitalize font-bold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {data.text}
            </p>
          </div>
        ))}
        <div className="h-[380px] shadow-lg shadow-[#0000003c] rounded-xl overflow-hidden">
          <div className="w-full h-[261px] bg-[#f7f7f8] grid grid-cols-1 gap-1 p-2">
            <div className="bg-[#000000]/18 rounded-xl overflow-hidden">
              <img
                src="https://i.ibb.co/4wTSvFLF/cb55d20c2b1ec22f23ecf20d5f992a50b65c90fa.png"
                alt="brand image 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="bg-[#000000]/18 rounded-xl overflow-hidden">
                <img
                  src="https://i.ibb.co/bgMWqYdf/8209fa2379c593cb20cf205367e910a29969623a.png"
                  alt="brand image 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-[#000000]/18 rounded-xl overflow-hidden">
                <img
                  src="https://i.ibb.co/ymNWM1RG/ff635856f47537c2801f71756247c0b2ad520f67.png"
                  alt="brand image 3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <p
            className="text-[15.88px] pt-10 md:text-[21px] text-[#30364d] text-center capitalize font-bold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            branding
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeGetHired;
