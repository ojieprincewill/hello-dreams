import React from "react";
import { PrintingData } from "../../data/printing-data/printing.data";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

function PrintingServicesWeOffer() {
  return (
    <div className="w-full px-[5%] py-10">
      <p
        className="text-[#18181b] text-[24px] lg:text-[48px] text-center mb-3 md:w-[321.83px] lg:w-[626px] md:mx-auto"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Types of Printing Services we offer
      </p>

      <div>
        {PrintingData.map((data) => (
          <div key={data.id}>
            <p
              className="text-[#483d3d] text-[12.34px] lg:text-[24px] text-center my-10 "
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {data.header}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
              {data.options.map((option, index) => (
                <div
                  key={option.id}
                  className={`w-full lg:h-[450px] border border-[#dfdfe2] rounded-xl p-3 lg:p-4 ${
                    index === data.options.length - 1 &&
                    data.options.length % 2 !== 0
                      ? "md:col-span-2 lg:col-span-1"
                      : ""
                  }`}
                >
                  <div className="w-full h-[120px] md:h-[180px] lg:h-[220px] rounded-xl overflow-hidden ">
                    <img
                      src={option.image}
                      alt={option.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex flex-row justify-between text-[#1e1e1e] py-5">
                    <p
                      className="text-[14.28px] md:text-[20px] leading-[1.3]"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {option.title}
                    </p>
                    <div>
                      <ArrowTopRightOnSquareIcon className="w-[23px] h-[23px] md:w-[28px] md:h-[28px]" />
                    </div>
                  </div>
                  <ul className="list-disc pl-3 space-y-4">
                    {option.sub.map((data) => (
                      <li
                        key={data.id}
                        className="text-[#4a4b54] text-[10px] md:text-[14px]  "
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {data.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrintingServicesWeOffer;
