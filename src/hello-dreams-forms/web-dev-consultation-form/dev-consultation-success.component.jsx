import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const DevConsultationSuccess = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleOrigins = () => {};

  return (
    <div className="flex flex-col justify-center items-center px-[5%] py-20">
      <p
        className="text-[20px] md:text-[32px] text-center xl:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Request Received
      </p>
      <div className="w-full h-auto md:w-[401px] md:h-[267.33px] mt-15 mb-10">
        <img
          src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749909160/forms/11668419_20943563_1_slt2vr.png"
          alt="success illustration"
          className="w-full h-full object-cover"
        />
      </div>
      <p
        className="text-[#667085] text-[14px] md:text-[16px] md:text-center xl:text-[24px] mb-10 xl:mb-20 md:w-[80%] xl:w-[757px] mx-auto leading-[1.5]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Thank you for requesting for our quote! We have received your request
        and will contact you shortly to confirm your request. In the meantime,
        feel free to explore our{" "}
        <Link
          to="/portfolio"
          onClick={handleOrigins}
          className="text-[#1342ff] underline "
        >
          portfolio
        </Link>{" "}
        to see how we've helped other clients.
      </p>
    </div>
  );
};

export default DevConsultationSuccess;
