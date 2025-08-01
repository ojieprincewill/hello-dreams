import React, { useState, useEffect } from "react";

const AcademyComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const launchDate = new Date("2025-07-20T00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = launchDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [launchDate]);

  const formatTime = (num) => String(num).padStart(2, "0");

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="bg-[#f7f7f7] px-[5%] xl:px-[10%] py-5 md:py-20">
      <div className="bg-[#ffffff] p-5 md:p-10 rounded-xl w-full leading-[1.5]">
        <div className="bg-[#1342ff] w-[93px] h-[93px] rounded-full mb-5 "></div>
        <p className="text-[#000000] text-[24px] md:text-[48px] font-bold mb-4 md:mb-7 ">
          Something Amazing
        </p>
        <p className="text-[#667085] text-[16px] md:text-[24px] font-bold mb-4 md:mb-7 ">
          is Coming Soon
        </p>
        <p className="text-[#667085] text-[14px] md:text-[24px] mb-4 md:mb-7 ">
          We are crafting something extraordinary that will revolutionize your
          digital experience. Get ready for innovation like never before.
        </p>
        <p className="text-[#667085] text-[16px] md:text-[24px] font-bold mb-4 md:mb-7 ">
          Launch Countdown
        </p>
        <div className="flex flex-col md:flex-row items-center space-y-5 md:space-x-5 md:space-y-0">
          <div className="border border-[#eaecf0] rounded-md flex flex-col justify-center items-center w-full md:w-[128px] h-[144px] ">
            <span className="text-[#000000] text-[30px] md:text-[40px] font-bold ">
              {formatTime(days)}
            </span>
            <span className="text-[#667085] text-[20px] md:text-[24px] mb-5 ">
              Days
            </span>
          </div>
          <div className="border border-[#eaecf0] rounded-md flex flex-col justify-center items-center w-full md:w-[128px] h-[144px] ">
            <span className="text-[#000000] text-[30px] md:text-[40px] font-bold ">
              {formatTime(hours)}
            </span>
            <span className="text-[#667085] text-[20px] md:text-[24px] mb-5 ">
              Hours
            </span>
          </div>
          <div className="border border-[#eaecf0] rounded-md flex flex-col justify-center items-center w-full md:w-[128px] h-[144px] ">
            <span className="text-[#000000] text-[30px] md:text-[40px] font-bold ">
              {formatTime(minutes)}
            </span>
            <span className="text-[#667085] text-[20px] md:text-[24px] mb-5 ">
              Minutes
            </span>
          </div>
          <div className="border border-[#eaecf0] rounded-md flex flex-col justify-center items-center w-full md:w-[128px] h-[144px] ">
            <span className="text-[#000000] text-[30px] md:text-[40px] font-bold ">
              {formatTime(seconds)}
            </span>
            <span className="text-[#667085] text-[20px] md:text-[24px] mb-5 ">
              Seconds
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyComingSoon;
