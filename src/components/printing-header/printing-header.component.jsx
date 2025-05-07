import React from "react";

const PrintingHeader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full md:h-[463.33px] lg:h-[800px] md:place-items-center bg-[#eef2fe]">
      <div className="relative px-3 py-6 md:px-10">
        <p
          className="text-[#010413] text-[31.06px] md:text-[27.8px] lg:text-[56px] md:w-[306.96px] lg:w-[530px] mb-5 md:mb-7 font-medium"
          style={{ fontFamily: "'inter', sans-serif" }}
        >
          Printing
        </p>
        <p
          className="text-[#667085] text-[11px] lg:text-[16px] leading-[1.8] md:w-[306.96px] lg:w-[530px] mb-10 md:mb-15"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Our professional printing services is designed to bring your creative
          visions to life. Whether you need business cards, banners, flyers,
          brochures, or other marketing materials, we ensure high-quality prints
          that make a lasting impression. From concept to final print, we handle
          every step of the process, providing you with products that
          effectively represent your brand and communicate your message.
        </p>
        <div className="absolute top-[-30px] left-[484px] w-[54px] h-[54px] ">
          <img
            src=""
            alt="pink arrow"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <button className="bg-[#1342ff] lg:bg-[#010413] text-[#f7f7f7] font-semibold border border-[#1342ff] lg:border-[#010413] text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-3xl lg:rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
            Get a free consultation
          </button>
        </div>
      </div>
      <div className="bg-[#ffadd9] w-full h-full">
        <img
          src="https://i.ibb.co/5g545Bcy/fb3b12a1f7966448ea8070205ed1cd33afc5c66c.png"
          alt="products mock-up"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default PrintingHeader;
