import React, { useState } from "react";
import SignUpForm from "@/components/academy/sign-up/SignUpForm";
import VerifyAccount from "@/components/academy/sign-up/VerifyAccount";
import CreatePassword from "@/components/academy/sign-up/CreatePassword";
import SignUpSuccess from "@/components/academy/sign-up/SignUpSuccess";

const SignUpFlow = () => {
  // 0: SignUpForm, 1: VerifyAccount, 2: CreatePassword, 3: SignUpSuccess
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleContinue = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  return (
    <div className=" bg-[#f6f6f8]">
      {step === 0 && (
        <SignUpForm
          onContinue={handleContinue}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 1 && (
        <VerifyAccount
          onContinue={handleContinue}
          onBack={handleBack}
          formData={formData}
        />
      )}
      {step === 2 && (
        <CreatePassword
          onContinue={handleContinue}
          onBack={handleBack}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 3 && <SignUpSuccess formData={formData} />}
    </div>
  );
};

export default SignUpFlow; 