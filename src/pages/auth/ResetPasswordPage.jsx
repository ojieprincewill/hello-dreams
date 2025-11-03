import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/admin-dashboard/ui/sonner";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const { updatePasswordWithToken, session } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Password requirements (matching the signup flow)
  const requirements = [
    {
      label: "At least 8 characters strong",
      test: (pw) => pw.length >= 8,
    },
    {
      label: "One lower case character",
      test: (pw) => /[a-z]/.test(pw),
    },
    {
      label: "One upper case",
      test: (pw) => /[A-Z]/.test(pw),
    },
    {
      label: "One special symbol (@>!?.*%$)",
      test: (pw) => /[@>!?.*%$]/.test(pw),
    },
  ];

  const password = formData.password;
  const confirmPassword = formData.confirmPassword;
  const passed = requirements.map((r) => r.test(password));
  const allPassed = passed.every(Boolean);
  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;
  const canSubmit = allPassed && passwordsMatch;

  // Password strength bar
  const strength = passed.filter(Boolean).length;
  const strengthColors = [
    "bg-gray-200",
    "bg-red-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-green-500",
  ];

  // Check if we have valid tokens in the URL
  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    
    if (accessToken && refreshToken) {
      setIsValidToken(true);
    } else {
      setError("Invalid or expired reset link. Please request a new password reset.");
    }
    setIsCheckingToken(false);
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (session?.user && !isCheckingToken) {
      navigate("/userprofile");
    }
  }, [session, navigate, isCheckingToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');

      if (!accessToken || !refreshToken) {
        throw new Error("Invalid reset link. Please request a new password reset.");
      }

      await updatePasswordWithToken.mutateAsync({
        password: formData.password,
        accessToken,
        refreshToken,
      });

      toast.success("Password updated successfully!");
      navigate("/signin");
    } catch (error) {
      console.error("Password reset error:", error);
      const message =
        error?.message || "Failed to update password. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  // Show loading state while checking token
  if (isCheckingToken) {
    return (
      <div className="w-full h-screen px-[5%] xl:px-0 flex items-center justify-center">
        <div className="w-full grid xl:grid-cols-[45%_55%] bg-white shadow-lg overflow-hidden">
          <div className="hidden h-screen xl:flex flex-col justify-center items-center bg-black/80 p-10 relative rounded-tr-[10%] rounded-br-[10%]">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white mt-4">Verifying reset link...</p>
          </div>
          <div className="w-full flex flex-col justify-center items-center p-[6%] md:p-12">
            <div className="w-8 h-8 border-2 border-[#1342ff] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#667085] mt-4">Verifying reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error if invalid token
  if (!isValidToken) {
    return (
      <div className="w-full h-screen px-[5%] xl:px-0 flex items-center justify-center">
        <div className="w-full grid xl:grid-cols-[45%_55%] bg-white shadow-lg overflow-hidden">
          {/* Left: Image and text */}
          <div className="hidden h-screen xl:flex flex-col justify-between bg-black/80 p-10 relative rounded-tr-[10%] rounded-br-[10%]">
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/v1752698465/Academy/sign%20up/ef9d88980ccdbe63c578ec2f42fdc6e46f8282e1_guckoj.jpg"
              alt="Reset password visual"
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
                  Reset your password securely
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
          {/* Right: Error message */}
          <div
            className="w-full flex flex-col justify-center p-[6%] md:p-12"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="text-[#101828] text-[22px] md:text-[38px] xl:text-[48px] font-bold mb-2">
                Invalid Reset Link
              </h1>
              <p className="text-[#667085] text-[14px] md:text-[16px] mb-6">
                {error}
              </p>
              <button
                onClick={() => navigate("/signin")}
                className="w-full py-3 rounded-lg bg-[#1342ff] text-white text-[18px] font-bold hover:bg-[#2313ff] transition-colors duration-200 cursor-pointer"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen px-[5%] xl:px-0 flex items-center justify-center">
      <div className="w-full grid xl:grid-cols-[45%_55%] bg-white shadow-lg overflow-hidden">
        {/* Left: Image and text */}
        <div className="hidden h-screen xl:flex flex-col justify-between bg-black/80 p-10 relative rounded-tr-[10%] rounded-br-[10%]">
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/v1752698465/Academy/sign%20up/ef9d88980ccdbe63c578ec2f42fdc6e46f8282e1_guckoj.jpg"
            alt="Reset password visual"
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
                Reset your password securely
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
            Reset Password
          </h1>
          <p className="text-[#667085] text-[14px] md:text-[16px] mb-6">
            Enter your new password below
          </p>

          {/* Error display */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[#101828] text-[16px] mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your new password"
                  className="w-full px-4 py-3 rounded-lg border border-[#eaecf0] bg-[#f7f7f7] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1342ff] pr-12 disabled:opacity-60"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] disabled:opacity-60"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <span role="img" aria-label="Hide">
                      <EyeSlashIcon className="w-4 h-4 text-[#667085] cursor-pointer" />
                    </span>
                  ) : (
                    <span role="img" aria-label="Show">
                      <EyeIcon className="w-4 h-4 text-[#667085] cursor-pointer" />
                    </span>
                  )}
                </button>
              </div>
              {/* Strength bar */}
              {password && (
                <div className="flex items-center mt-2 space-x-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${
                        i < strength ? strengthColors[strength] : "bg-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-xs font-bold text-[#667085]">
                    {strength === 4
                      ? "Strong"
                      : strength === 3
                      ? "Good"
                      : strength === 2
                      ? "Fair"
                      : "Weak"}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[#101828] text-[16px] mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-3 rounded-lg border border-[#eaecf0] bg-[#f7f7f7] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1342ff] pr-12 disabled:opacity-60"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] disabled:opacity-60"
                  onClick={() => setShowConfirm((v) => !v)}
                  tabIndex={-1}
                  disabled={isLoading}
                >
                  {showConfirm ? (
                    <span role="img" aria-label="Hide">
                      <EyeSlashIcon className="w-4 h-4 text-[#667085] cursor-pointer" />
                    </span>
                  ) : (
                    <span role="img" aria-label="Show">
                      <EyeIcon className="w-4 h-4 text-[#667085] cursor-pointer" />
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Requirements checklist */}
            {password && (
              <div className="mb-4 flex flex-col space-y-1">
                {requirements.map((r, i) => (
                  <div key={i} className="flex items-center text-[14px]">
                    <span
                      className={`mr-2 text-lg ${
                        passed[i] ? "text-green-500" : "text-gray-300"
                      }`}
                    >
                      ●
                    </span>
                    <span
                      className={passed[i] ? "text-green-600" : "text-[#667085]"}
                    >
                      {r.label}
                    </span>
                  </div>
                ))}
                <div className="flex items-center text-[14px] mt-1">
                  <span
                    className={`mr-2 text-lg ${
                      passwordsMatch ? "text-green-500" : "text-gray-300"
                    }`}
                  >
                    ●
                  </span>
                  <span
                    className={
                      passwordsMatch ? "text-green-600" : "text-[#667085]"
                    }
                  >
                    Passwords match
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-lg bg-[#1342ff] text-[#fff] text-[18px] font-bold hover:bg-[#2313ff] disabled:opacity-60 transition-colors duration-200 cursor-pointer"
              disabled={!canSubmit || isLoading}
            >
              {isLoading ? "Updating Password..." : "Update Password"}
            </button>
          </form>

          <div className="flex items-center w-full mt-6">
            <hr className="flex-grow border-t border-[#e5e7eb]" />
            <div className="text-center text-[#667085] text-[15px] px-2">
              Remember your password?{" "}
              <button
                onClick={() => navigate("/signin")}
                className="text-[#1342ff] font-bold hover:underline cursor-pointer"
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>
            <hr className="flex-grow border-t border-[#e5e7eb]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
