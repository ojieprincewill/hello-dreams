import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Logo from '@/components/logo/logo.component';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updatePasswordWithToken, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Get access token from URL params (Supabase sends this in the reset link)
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  // Check if we have the required tokens
  useEffect(() => {
    if (!accessToken) {
      setError('Invalid or expired reset link. Please request a new password reset.');
    }
  }, [accessToken]);

  // Password requirements
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
  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const canSubmit = allPassed && passwordsMatch && accessToken;

  // Password strength bar
  const strength = passed.filter(Boolean).length;
  const strengthColors = [
    "bg-gray-200",
    "bg-red-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-green-500",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsResetting(true);
    setError('');

    try {
      // Update password using Supabase with tokens
      await updatePasswordWithToken.mutateAsync({ 
        password: formData.password,
        accessToken,
        refreshToken
      });
      setSuccess(true);
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsResetting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen w-full p-[5%] flex items-center justify-center bg-[#f6f6f8]">
        <div className="w-full md:w-[635px] bg-white rounded-3xl shadow-lg p-4">
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
            
            <div className="text-center space-y-4 mt-8">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h1 className="text-[#101828] text-[20px] md:text-[30px] xl:text-[48px] font-bold mb-2">
                Password Reset Successfully!
              </h1>
              <p className="text-[#667085] text-[14px] md:text-[16px] mb-6">
                Your password has been updated. You will be redirected to the login page shortly.
              </p>
              
              <button
                onClick={() => navigate('/signin')}
                className="w-full py-3 rounded-lg bg-[#1342ff] text-white text-[16px] md:text-[18px] font-bold hover:bg-[#2313ff] transition-colors duration-200"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-[5%] flex items-center justify-center bg-[#f6f6f8]">
      <div className="w-full md:w-[635px] bg-white rounded-3xl shadow-lg p-4">
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
          
          <h1 className="text-[#101828] text-[20px] md:text-[30px] xl:text-[48px] font-bold mb-2 text-center">
            Reset Your Password
          </h1>
          <p className="text-[#667085] text-[14px] md:text-[16px] mb-6 text-center max-w-md">
            Enter your new password below
          </p>

          {error && (
            <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form
            className="w-full flex flex-col items-center mt-5"
            onSubmit={handleSubmit}
          >
            <div className="w-full mb-4">
              <label className="block text-[#101828] text-[14px] md:text-[15px] mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 rounded-lg border border-[#eaecf0] bg-[#f7f7f7] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1342ff] pr-12 disabled:opacity-60"
                  required
                  disabled={isResetting}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] disabled:opacity-60"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  disabled={isResetting}
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
            </div>

            <div className="w-full mb-4">
              <label className="block text-[#101828] text-[14px] md:text-[15px] mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 rounded-lg border border-[#eaecf0] bg-[#f7f7f7] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1342ff] pr-12 disabled:opacity-60"
                  required
                  disabled={isResetting}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] disabled:opacity-60"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  tabIndex={-1}
                  disabled={isResetting}
                >
                  {showConfirmPassword ? (
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
            <div className="w-full mb-4 flex flex-col space-y-1">
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

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#1342ff] text-white text-[16px] md:text-[18px] font-bold hover:bg-[#2313ff] disabled:opacity-60 transition-colors duration-200 cursor-pointer"
              disabled={!canSubmit || isResetting}
            >
              {isResetting ? "Resetting Password..." : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={() => navigate('/signin')}
              className="w-full mt-3 py-3 rounded-lg border border-[#eaecf0] text-[#667085] text-[16px] md:text-[18px] font-bold hover:bg-gray-50 transition-colors duration-200"
              disabled={isResetting}
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 