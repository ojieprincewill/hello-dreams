import React from "react";
import { Link } from "react-router-dom";

const GraphicsConsultationSuccess = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col justify-center items-center py-20 px-[5%]">
      <p
        className="text-[20px] md:text-[32px] text-center lg:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Request Received!
      </p>
      <div className="w-full h-auto md:w-[401px] md:h-[267.33px]">
        <img
          src=""
          alt="success illustration"
          className="w-full h-full object-cover"
        />
      </div>
      <p
        className="text-[#667085] text-[14px] md:text-[16px] md:text-center lg:text-[24px] mb-10 lg:mb-20 md:w-[80%] lg:w-[757px] mx-auto leading-[1.5]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Thank you for considering our graphics and branding services! We have
        received your request and will contact you shortly to confirm your
        request. In the meantime, feel free to explore our{" "}
        <Link
          to="/portfolio"
          onClick={handleOrigins}
          className="text-[#1342ff] underline "
        >
          portfolio
        </Link>{" "}
        and{" "}
        <Link
          to="/"
          onClick={handleOrigins}
          className="text-[#1342ff] underline "
        >
          testimonials
        </Link>{" "}
        to see how we've helped other clients.
      </p>
    </div>
  );
};

export default GraphicsConsultationSuccess;
