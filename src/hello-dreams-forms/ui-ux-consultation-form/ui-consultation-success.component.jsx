import React, { useEffect } from "react";

const UiConsultationSuccess = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center px-[5%] py-20">
      <p
        className="text-[20px] md:text-[32px] text-center lg:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Consultation Booked!
      </p>
      <div className="w-full h-auto md:w-[401px] md:h-[267.33px] mt-15 mb-10">
        <img
          src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749909160/forms/11668419_20943563_1_slt2vr.png"
          alt="success illustration"
          className="w-full h-full object-cover"
        />
      </div>
      <p
        className="text-[#667085] text-[14px] md:text-[16px] md:text-center lg:text-[24px] mb-10 lg:mb-20 md:w-[80%] lg:w-[757px] mx-auto leading-[1.5]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Thank you for scheduling a consultation! We have received your request
        and will contact you shortly to confirm your appointment.
      </p>
    </div>
  );
};

export default UiConsultationSuccess;
