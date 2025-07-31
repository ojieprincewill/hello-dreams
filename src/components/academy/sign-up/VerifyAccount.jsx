import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/logo/logo.component";

const VerifyAccount = ({ onContinue, onBack, formData }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Handle OTP input
  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length > 1) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };
  const handlePaste = (e) => {
    const pasted = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");
    if (pasted.length === 6) setOtp(pasted);
  };
  const isComplete = otp.every((d) => d);

  // Mask phone/email for display
  const maskPhone = (phone) =>
    phone ? phone.replace(/(\d{4})\d{3}(\d{2})/, "$1***$2") : "";
  const maskEmail = (email) => {
    if (!email) return "";
    const [user, domain] = email.split("@");
    return user.slice(0, 2) + "*****" + user.slice(-1) + "@" + domain;
  };

  return (
    <div className="min-h-screen w-full p-[5%] flex items-center justify-center">
      <div className="w-full md:w-[632px] bg-white rounded-3xl shadow-lg p-4">
        {/* Back arrow */}
        <button
          onClick={onBack}
          className="text-[#101828] hover:text-[#1342ff] text-2xl md:text-3xl transition-colors duration-200 cursor-pointer"
        >
          <span aria-label="Back" role="img">
            <ArrowLeft size={24} strokeWidth={2.5} />
          </span>
        </button>
        <div className="w-full flex flex-col items-center mt-2">
          <div className="flex flex-col justify-center items-center">
            <div className="flex-shrink-0 w-[38.17px] h-[28.44px] md:w-[67px] md:h-[46.75px]">
              <Logo />
            </div>
            <span
              className="text-[18px] md:text-[20px] font-bold mb-2"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Acade<span className="text-[#1342ff]">m</span>y
            </span>
          </div>
          <h1 className="text-[#14142a] text-[20px] md:text-[30px] xl:text-[48px] font-bold mb-2 text-center">
            Verify your account
          </h1>
          <p className="text-[#667085] text-[14px] md:text-[16px] mb-6 text-center max-w-md">
            Kindly enter the 6-digits OTP we sent to{" "}
            <span className="font-bold">{maskPhone(formData.phone)}</span> &{" "}
            <span className="font-bold">{maskEmail(formData.email)}</span>
          </p>
          <form
            className="w-full flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              if (isComplete) onContinue();
            }}
          >
            <p className="text-[#394455] text-[14px] uppercase mb-3">pin</p>
            <div className="flex space-x-2 mb-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={handlePaste}
                  className="w-full h-10 md:w-full md:h-14 text-center text-[28px] font-bold border border-[#eaecf0] rounded-lg bg-[#f7f7f7] focus:outline-none focus:ring-2 focus:ring-[#1342ff]"
                  autoFocus={idx === 0}
                />
              ))}
            </div>
            <div className="flex flex-col space-y-2 mb-6">
              <span className="text-[#0c111d] text-[14px] md:text-[16px]">
                Didn't receive OTP?
              </span>
              <div className="flex space-x-2 text-[14px] md:text-[16px] font-bold">
                <span className="text-[#db9308] ">{`00:${timer
                  .toString()
                  .padStart(2, "0")}`}</span>
                <button
                  type="button"
                  className="text-[#667085] hover:text-[#1342ff] font-bold disabled:opacity-50 transition-colors duration-200 cursor-pointer"
                  disabled={timer > 0}
                  onClick={() => setTimer(30)}
                >
                  Resend
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#1342ff] text-white text-[16px] md:text-[18px] font-bold hover:bg-[#2313ff] disabled:opacity-60 transition-colors duration-200 cursor-pointer"
              disabled={!isComplete}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
