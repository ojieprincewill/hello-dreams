import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Eye, EyeOff, Shield, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

const AccountSecurity = () => {
  const { user, updatePassword } = useAuth();
  const { profile, isLoading: profileLoading, isFetching: profileFetching, isError: profileError } = useProfile();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { currentPassword, newPassword, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const isFormComplete = currentPassword && newPassword && confirmPassword;
  const passwordsMatch = newPassword === confirmPassword;
  const isPasswordValid = newPassword.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormComplete || !passwordsMatch || !isPasswordValid) {
      return;
    }

    setIsSubmitting(true);
    try {
      await updatePassword.mutateAsync({ password: newPassword });
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error('Password update failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show error state only if there's no cached data
  if (profileError && !profile) {
    return (
      <div className="w-full px-[5%] py-10">
        <div className="text-center text-red-600">
          Error loading profile data. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-[5%] py-10">
      <div className="w-full xl:w-[810px] xl:mx-auto h-[150px] border border-[#eaecf0] rounded-sm px-8 py-4 mb-6 flex flex-col justify-center items-center">
        <h2 className="text-[#010413] text-[20px] md:text-[28px] xl:text-[32px] mb-2">
          Account Security
        </h2>
        <div
          className="text-[#3a4459] text-[14px] md:text-[16px] xl:text-[18px] text-center font-medium"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Manage your account security settings and change your password
        </div>
      </div>
      
      <div
        className="bg-white rounded-xl shadow-xl p-8 xl:w-[877px] xl:mx-auto"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        {/* Account Information */}
        <div className="mb-8">
          <h3 className="text-[#010413] text-[18px] md:text-[20px] font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#1342ff]" />
            Account Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="text-[#667085] text-[12px] mb-1">Email address</div>
              <div className="bg-[#f7f7f7] border border-[#eaecf0] rounded p-3 text-[#101828] font-medium text-[14px] md:text-[16px]">
                {user?.email || profile?.email || "No email available"}
              </div>
            </div>
            
            <div>
              <div className="text-[#667085] text-[12px] mb-1">Account created</div>
              <div className="bg-[#f7f7f7] border border-[#eaecf0] rounded p-3 text-[#101828] font-medium text-[14px] md:text-[16px]">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Unknown"}
              </div>
            </div>
            
            <div>
              <div className="text-[#667085] text-[12px] mb-1">Last sign in</div>
              <div className="bg-[#f7f7f7] border border-[#eaecf0] rounded p-3 text-[#101828] font-medium text-[14px] md:text-[16px]">
                {profile?.last_sign_in ? new Date(profile.last_sign_in).toLocaleString() : "Unknown"}
              </div>
            </div>
          </div>
        </div>

        {/* Password Change Section */}
        <div>
          <h3 className="text-[#010413] text-[18px] md:text-[20px] font-semibold mb-4">
            Change Password
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-[#667085] text-[12px] mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  className="w-full p-3 rounded bg-[#f7f7f7] border border-[#eaecf0] placeholder:text-[#4b556a] placeholder:text-[14px] md:placeholder:text-[16px] outline-none focus:border-[#1342ff] focus:ring-2 focus:ring-[#1342ff]/20 transition-colors duration-200"
                  placeholder="Enter your current password"
                  type={showPasswords.current ? "text" : "password"}
                  name="currentPassword"
                  value={currentPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#667085] hover:text-[#101828] transition-colors duration-200"
                >
                  {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-[#667085] text-[12px] mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  className={`w-full p-3 rounded border placeholder:text-[#4b556a] placeholder:text-[14px] md:placeholder:text-[16px] outline-none transition-colors duration-200 ${
                    newPassword && !isPasswordValid
                      ? "bg-red-50 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "bg-[#f7f7f7] border-[#eaecf0] focus:border-[#1342ff] focus:ring-2 focus:ring-[#1342ff]/20"
                  }`}
                  placeholder="Enter new password"
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#667085] hover:text-[#101828] transition-colors duration-200"
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {newPassword && (
                <div className="mt-1 flex items-center gap-1 text-xs">
                  {isPasswordValid ? (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-red-500" />
                  )}
                  <span className={isPasswordValid ? "text-green-600" : "text-red-600"}>
                    Password must be at least 8 characters long
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[#667085] text-[12px] mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  className={`w-full p-3 rounded border placeholder:text-[#4b556a] placeholder:text-[14px] md:placeholder:text-[16px] outline-none transition-colors duration-200 ${
                    confirmPassword && !passwordsMatch
                      ? "bg-red-50 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "bg-[#f7f7f7] border-[#eaecf0] focus:border-[#1342ff] focus:ring-2 focus:ring-[#1342ff]/20"
                  }`}
                  placeholder="Confirm new password"
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#667085] hover:text-[#101828] transition-colors duration-200"
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && (
                <div className="mt-1 flex items-center gap-1 text-xs">
                  {passwordsMatch ? (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-red-500" />
                  )}
                  <span className={passwordsMatch ? "text-green-600" : "text-red-600"}>
                    {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                  </span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className={`w-max text-[14px] md:text-[16px] font-bold rounded-lg py-2 px-3 transition-colors duration-200 cursor-pointer flex items-center gap-2 ${
                  isFormComplete && passwordsMatch && isPasswordValid && !isSubmitting
                    ? "bg-[#1342ff] text-[#fff] hover:bg-[#2313ff]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!isFormComplete || !passwordsMatch || !isPasswordValid || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Error message */}
        {updatePassword.isError && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Error updating password</span>
            </div>
            <p className="text-red-600 text-sm mt-1">
              {updatePassword.error?.message || 'Something went wrong. Please try again.'}
            </p>
          </div>
        )}

        {/* Success message */}
        {updatePassword.isSuccess && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Password updated successfully!</span>
            </div>
            <p className="text-green-600 text-sm mt-1">
              Your password has been changed. Please use your new password for future logins.
            </p>
          </div>
        )}

        {/* Security Tips */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-[#010413] text-[16px] font-semibold mb-2">Security Tips</h4>
          <ul className="text-[#667085] text-sm space-y-1">
            <li>• Use a strong password with at least 8 characters</li>
            <li>• Include a mix of letters, numbers, and special characters</li>
            <li>• Never share your password with anyone</li>
            <li>• Consider using a password manager for better security</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;
