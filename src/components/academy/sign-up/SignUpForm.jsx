import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { checkUserExists } from "@/services/auth";
import { isEmail } from "@/utils/validation";
import { toast } from "@/components/admin-dashboard/ui/sonner";

const SignUpForm = ({ onContinue, formData, setFormData }) => {
  const [emailValidation, setEmailValidation] = useState({
    isValid: false,
    isChecking: false,
    exists: false,
    hasChecked: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const currentYear = new Date().getFullYear();

  // Debounced email validation
  const validateEmail = useCallback(async (email) => {
    if (!email || !isEmail(email)) {
      setEmailValidation({
        isValid: false,
        isChecking: false,
        exists: false,
        hasChecked: false
      });
      return;
    }

    setEmailValidation(prev => ({ ...prev, isChecking: true }));

    try {
      const exists = await checkUserExists(email);
      console.log(exists);
      setEmailValidation({
        isValid: true,
        isChecking: false,
        exists: exists,
        hasChecked: true
      });

      if (exists.account_exists === true) {
        toast.error("This email address is already registered. Please use a different email or sign in instead.");
      }
    } catch (error) {
      console.error('Email validation error:', error);
      setEmailValidation({
        isValid: false,
        isChecking: false,
        exists: false,
        hasChecked: false
      });
      toast.error("Unable to validate email. Please try again.");
    }
  }, []);

  // Debounce email validation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.email) {
        validateEmail(formData.email);
      } else {
        setEmailValidation({
          isValid: false,
          isChecking: false,
          exists: false,
          hasChecked: false
        });
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [formData.email, validateEmail]);

  const handleOrigins = () => {};

  return (
    <div className="min-h-screen w-full px-[5%] xl:px-0 flex items-center justify-center">
      <div className="w-full grid xl:grid-cols-[45%_55%] bg-white shadow-lg overflow-hidden">
        {/* Left: Image and text */}
        <div
          className="hidden xl:flex flex-col justify-between bg-black/80 p-10 relative rounded-tr-[10%] rounded-br-[10%]"
          style={{ minHeight: 600 }}
        >
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/v1749330669/092847268a3ed20155bd2feaccbb06e912a5c3ec_paq3rf.png"
            alt="Sign up visual"
            className="absolute inset-0 w-full h-full object-cover object-center z-0 rounded-tr-[10%] rounded-br-[10%]"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#000000]/10 to-[#000000] rounded-tr-[10%] rounded-br-[10%]" />
          <div className="relative z-20 flex flex-col h-full justify-between">
            <div className="mt-10">
              <span
                className="text-white text-[16px] md:text-[20px] font-bold tracking-wide "
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Acade<span className="text-[#1342ff]">m</span>y
              </span>
            </div>
            <div className="pl-10 -mb-40 mt-auto">
              <h2 className="text-white text-[36px] font-semibold mb-4 leading-tight w-[495px] ">
                Building a brighter future by equipping you with valuable
                skills.
              </h2>
              <div className="flex items-center space-x-2 mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#1342ff]" />
                <span className="inline-block w-2 h-2 rounded-full bg-white/40" />
              </div>
            </div>
            <div className="pl-10 text-white text-[12px] md:text-[14px] mt-auto opacity-80">
              © {currentYear} Hello Dreams Limited. All rights reserved.
            </div>
          </div>
        </div>
        {/* Right: Form */}
        <div
          className="w-full flex flex-col justify-center p-[6%] md:p-12"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <h1 className="text-[#101828] text-[22px] md:text-[38px] xl:text-[48px] font-bold mb-2">
            Sign Up
          </h1>
          <p className="text-[#667085] text-[14px] md:text-[16px] mb-6">
            Fill the information below to create an account on Hello Dream's{" "}
            <span className="font-bold text-[#101828]">
              Acade<span className="text-[#1342ff]">m</span>y
            </span>
            .
          </p>
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              onContinue();
            }}
          >
            <div>
              <label className="block text-[#101828] text-[16px] mb-2">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full px-4 py-3 rounded-lg border border-[#eaecf0] bg-[#f7f7f7] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1342ff]"
                required
              />
            </div>
            <div>
              <label className="block text-[#101828] text-[16px] mb-2">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full px-4 py-3 rounded-lg border border-[#eaecf0] bg-[#f7f7f7] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1342ff]"
                required
              />
            </div>
            <div>
              <label className="block text-[#101828] text-[16px] mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-3 pr-12 rounded-lg border text-[15px] focus:outline-none focus:ring-2 ${
                    emailValidation.isChecking
                      ? 'border-[#1342ff] bg-[#f7f7f7] focus:ring-[#1342ff]'
                      : emailValidation.hasChecked && emailValidation.isValid && !emailValidation.exists
                      ? 'border-green-500 bg-[#f7f7f7] focus:ring-green-500'
                      : emailValidation.hasChecked && emailValidation.exists
                      ? 'border-red-500 bg-[#f7f7f7] focus:ring-red-500'
                      : 'border-[#eaecf0] bg-[#f7f7f7] focus:ring-[#1342ff]'
                  }`}
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {emailValidation.isChecking && (
                    <div className="w-5 h-5 border-2 border-[#1342ff] border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {emailValidation.hasChecked && emailValidation.isValid && !emailValidation.exists && (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {emailValidation.hasChecked && emailValidation.exists && (
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-[#101828] text-[16px] mb-2">
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 rounded-lg border border-[#eaecf0] bg-[#f7f7f7] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1342ff]"
                required
              />
            </div>
            <div>
              <label className="block text-[#101828] text-[16px] mb-2">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-[#eaecf0] bg-[#f7f7f7] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1342ff]"
                required
              >
                <option value="">Choose your country of residence</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Kenya">Kenya</option>
                <option value="South Africa">South Africa</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-lg bg-[#1342ff] text-[#fff] text-[18px] font-bold hover:bg-[#2313ff] disabled:opacity-60 transition-colors duration-200 cursor-pointer"
              disabled={
                !(
                  formData.firstName &&
                  formData.lastName &&
                  formData.email &&
                  formData.phone &&
                  formData.country
                ) ||
                emailValidation.isChecking ||
                (emailValidation.hasChecked && emailValidation.exists) ||
                (emailValidation.hasChecked && !emailValidation.isValid)
              }
            >
              Continue
            </button>
          </form>

          <div className="flex items-center w-full mt-6">
            <hr className="flex-grow border-t border-[#e5e7eb]" />
            <div className="text-center text-[#667085] text-[15px] px-2">
              Already have an account?{" "}
              <Link
                to="/signin"
                onClick={handleOrigins}
                className="text-[#1342ff] font-bold hover:underline"
              >
                Sign in
              </Link>
            </div>
            <hr className="flex-grow border-t border-[#e5e7eb]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
