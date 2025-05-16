import React from "react";

const AboutStory = () => {
  return (
    <div className="w-full px-[5%] py-10">
      <p className="text-[24px] lg:text-[48px] text-[#101828] text-center font-bold mb-2">
        Our Story
      </p>

      <div className="p-2 border border-[#dfdfdf] rounded-xl flex items-center space-x-5 mt-15">
        <div className="w-[475px] h-[280px] rounded-md overflow-hidden">
          <img
            src="https://i.ibb.co/LXpnYq0S/1db42bac4995832729ae334fa348520949dee99e.png"
            alt="Founder's Photo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-5">
          <p className="text-[#010413] text-[24px] font-bold w-[468.81px]">
            😊 Hi, my name is Pamela and I'm the Founder & CEO of Hello Dreams
          </p>
          <p
            className="text-[#667085] text-[15.88px] leading-[1.5] w-[611px] "
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            I would love to tell you in few minutes, why Hello Dreams was
            started. It's been an awesome journey seeing our team, students, and
            community grow around the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutStory;
