import React from "react";
import { Link } from "react-router-dom";
import { DevData } from "../../data/development-data/development.data";

const Development = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full px-[5%] py-10">
      <p className="text-[#101828] text-center text-[48px] font-bold mb-3 ">
        Development
      </p>
      <p
        className="text-[#667085] text-center text-[17.44px] mb-7 "
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Professional web and mobile app development services tailored to your
        <br />
        business needs
      </p>
      <Link
        to="/services/app-dev-consultation"
        onClick={handleOrigins}
        className="flex justify-center items-center"
      >
        <button className="bg-[#1342ff] lg:bg-[#010413] text-[#f7f7f7] font-semibold border border-[#1342ff] lg:border-[#010413] text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-3xl lg:rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
          Get a Free Consultation
        </button>
      </Link>

      <div className="grid grid-cols-4 gap-5 my-10">
        {DevData.map((data, index) => (
          <div key={data.id} className="border border-[#dfdfe2] rounded-xl p-2">
            <div className="w-full h-[360px] rounded-xl overflow-hidden ">
              <img
                src={data.image}
                alt={data.title}
                className={`w-full h-full rounded-xl ${
                  index === 0 || index === 2 ? "object-cover" : "object-contain"
                }`}
              />
            </div>
            <p
              className="text-[#26262b] text-[18px] font-medium my-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {data.title}
            </p>
            <p
              className="text-[#7f8090] text-[15.5px]  "
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {data.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Development;
