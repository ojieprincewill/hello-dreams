import React, { useEffect } from "react";

const MentorshipSuccess = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center px-[5%] py-20">
      <p
        className="text-[20px] md:text-[32px] text-center lg:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Application sent
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
        Thanks for filling out the Hello Dreams mentorship form! Our team will
        review your needs and get back to you within 24 hours with your
        customized plan.
      </p>

      <a
        href="https://wa.me/2347016773420"
        target="_blank"
        rel="noopener noreferrer"
        className="block md:flex md:justify-center md:items-center"
      >
        <button className="bg-[#008080] w-full md:w-[369px] text-[#f7f7f7] text-[12px] md:text-[14px] lg:text-[16px] text-center px-6 py-3 md:py-4 rounded-3xl hover:bg-[#008080de] hover:text-[#fff] transition-colors duration-300 cursor-pointer">
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749909159/forms/logos_whatsapp-icon_npjg1n.png"
            alt="whatsapp logo"
            className="inline mr-2 md:mr-3 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 object-contain"
          />
          Chat us on Whatsapp
        </button>
      </a>
    </div>
  );
};

export default MentorshipSuccess;
