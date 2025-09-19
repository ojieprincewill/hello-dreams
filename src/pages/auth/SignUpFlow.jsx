import React, { useState } from "react";
import SignUpForm from "@/components/academy/sign-up/SignUpForm";
import CreatePassword from "@/components/academy/sign-up/CreatePassword";
import VerifyAccount from "@/components/academy/sign-up/VerifyAccount";
import SignUpSuccess from "@/components/academy/sign-up/SignUpSuccess";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/admin-dashboard/ui/sonner";

const SignUpFlow = () => {
  // 0: SignUpForm, 1: CreatePassword, 2: VerifyAccount, 3: SignUpSuccess
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
  });
  const [signUpError, setSignUpError] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleContinue = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleCreateAccount = async () => {
    setIsSigningUp(true);
    setSignUpError("");

    try {
      // Create user metadata
      const userMetadata = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        country: formData.country,
        role: "student",
        email: formData.email,
      };

      // Sign up with Supabase (email verification is automatic)
      // Profile creation is handled automatically by database trigger
      const res = await signUp.mutateAsync({
        email: formData.email,
        password: formData.password,
        user_metadata: userMetadata,
      });

      console.log("Sign up response:", res);

      // Check if sign up was successful before proceeding
      if (res && res.user) {
        // Sign up was successful, move to verification step
        handleContinue();
      } else {
        throw new Error("Sign up failed - no user created");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      const message =
        error?.message || "Failed to create account. Please try again.";
      setSignUpError(message);
      // Surface feedback and return user to the initial form to correct inputs
      toast.error(message);
      setStep(0);
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleVerificationComplete = () => {
    // Move to success step
    handleContinue();
  };

  return (
    <div className="bg-[#f6f6f8]">
      {step === 0 && (
        <SignUpForm
          onContinue={handleContinue}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 1 && (
        <CreatePassword
          onContinue={handleCreateAccount}
          onBack={handleBack}
          formData={formData}
          setFormData={setFormData}
          isLoading={isSigningUp}
          error={signUpError}
        />
      )}
      {step === 2 && (
        <VerifyAccount
          onContinue={handleVerificationComplete}
          onBack={handleBack}
          formData={formData}
        />
      )}
      {step === 3 && (
        <SignUpSuccess 
          formData={formData} 
        />
      )}
    </div>
  );
};

export default SignUpFlow; 