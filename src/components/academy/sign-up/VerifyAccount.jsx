import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/logo/logo.component";
import { resendVerificationEmail } from "@/services/auth";
import { toast } from "@/components/admin-dashboard/ui/sonner";

const VerifyAccount = ({ onContinue, onBack, formData }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); // 1 minute timer for resend
  const [isResending, setIsResending] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

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

  const handleContinue = () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      onContinue();
    }, 1000);
  };

  const handleResendVerification = async () => {
    if (!canResend || isResending) return;
    
    setIsResending(true);
    try {
      await resendVerificationEmail(formData.email);
      toast.success("Verification email sent successfully!");
      
      // Reset the timer
      setResendTimer(60);
      setCanResend(false);
    } catch (error) {
      console.error('Error resending verification email:', error);
      toast.error("Failed to resend verification email. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen w-full p-[5%] flex items-center justify-center">
      <div className="w-full md:w-[632px] bg-white rounded-3xl shadow-lg p-4">
        {/* Back arrow */}
        <button
          onClick={onBack}
          className="text-[#101828] hover:text-[#1342ff] text-2xl md:text-3xl transition-colors duration-200 cursor-pointer"
          disabled={isVerifying}
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
            We've sent a verification link to{" "}
            <span className="font-bold">{maskEmail(formData.email)}</span>
          </p>
          
          <div className="w-full flex flex-col items-center space-y-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[#101828] font-semibold text-lg">
                  Check your email
                </p>
                <p className="text-[#667085] text-sm">
                  Click the verification link in your email to complete your account setup.
                </p>
              </div>
            </div>

            <div className="w-full space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Didn't receive the email?</p>
                    <ul className="mt-1 space-y-1">
                      <li>• Check your spam folder</li>
                      <li>• Make sure you entered the correct email address</li>
                      <li>• Wait a few minutes for the email to arrive</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Resend Verification Button */}
              <div className="w-full">
                <button
                  onClick={handleResendVerification}
                  disabled={!canResend || isResending}
                  className={`w-full py-3 rounded-lg text-[16px] md:text-[18px] font-bold transition-colors duration-200 ${
                    canResend && !isResending
                      ? 'bg-[#1342ff] text-white hover:bg-[#2313ff] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isResending ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : canResend ? (
                    'Resend Verification Email'
                  ) : (
                    `Resend in ${resendTimer}s`
                  )}
                </button>
              </div>

              <button
                onClick={handleContinue}
                disabled={isVerifying}
                className="w-full py-3 rounded-lg bg-[#1342ff] text-white text-[16px] md:text-[18px] font-bold hover:bg-[#2313ff] disabled:opacity-60 transition-colors duration-200 cursor-pointer"
              >
                {isVerifying ? "Verifying..." : "Continue to Success"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
