import React, { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { Save, Edit, X, Check, RefreshCw } from "lucide-react";

const AccountSettings = () => {
  const { user } = useAuth();
  const { profile, updateProfile, isLoading, isFetching, isError } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    website: "",
    gender: "",
    date_of_birth: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || user?.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
        bio: profile.bio || "",
        website: profile.website || "",
        gender: profile.gender || "",
        date_of_birth: profile.date_of_birth ? new Date(profile.date_of_birth).toISOString().split('T')[0] : "",
      });
    }
  }, [profile, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!profile) return;
    
    setIsSaving(true);
    try {
      // Clean up the data before sending to database
      const cleanedData = {
        ...formData,
        // Convert empty strings to null for date fields
        date_of_birth: formData.date_of_birth && formData.date_of_birth.trim() !== "" ? formData.date_of_birth : null,
        // Convert empty strings to null for other optional fields
        phone: formData.phone && formData.phone.trim() !== "" ? formData.phone : null,
        location: formData.location && formData.location.trim() !== "" ? formData.location : null,
        bio: formData.bio && formData.bio.trim() !== "" ? formData.bio : null,
        website: formData.website && formData.website.trim() !== "" ? formData.website : null,
        gender: formData.gender && formData.gender.trim() !== "" ? formData.gender : null,
        updated_at: new Date().toISOString()
      };

      await updateProfile.mutateAsync({
        id: profile.id,
        ...cleanedData
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to current profile
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || user?.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
        bio: profile.bio || "",
        website: profile.website || "",
        gender: profile.gender || "",
        date_of_birth: profile.date_of_birth ? new Date(profile.date_of_birth).toISOString().split('T')[0] : "",
      });
    }
  };

  // Show error state only if there's no cached data
  if (isError && !profile) {
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
      <div className="w-full xl:w-[804px] xl:mx-auto h-[150px] border border-[#eaecf0] rounded-sm p-8 mb-6 text-center flex flex-col justify-center items-center">
        <h2 className="text-[#010413] text-[20px] md:text-[28px] xl:text-[32px] mb-2">
          Profile
        </h2>
        <div
          className="text-[#3a4459] text-[14px] md:text-[16px] xl:text-[18px] text-center font-medium"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Edit your profile details here
        </div>
      </div>
      
      <div
        className="bg-white rounded-xl shadow-xl p-8 xl:w-[804px] xl:mx-auto"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        {/* Header with edit button */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[#010413] text-[18px] md:text-[20px] font-semibold">
            Personal Information
          </h3>
          <div className="flex items-center gap-3">
            {/* Background sync indicator */}
            {isFetching && (
              <div className="flex items-center gap-2 text-[#667085] text-sm">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Syncing...</span>
              </div>
            )}
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-[#1342ff] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2313ff] transition-colors duration-200"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors duration-200"
                >
                  {isSaving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Show loading state only if no profile data exists */}
        {isLoading && !profile ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1342ff]"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Name Fields */}
            <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-[#667085] text-[12px] mb-1">
              First name
            </label>
            <input
                  className={`w-full text-[14px] md:text-[16px] rounded p-3 border transition-colors duration-200 ${
                    isEditing 
                      ? "bg-white border-[#1342ff] focus:outline-none focus:ring-2 focus:ring-[#1342ff]/20" 
                      : "bg-[#f7f7f7] border-[#eaecf0]"
                  }`}
                  value={formData.first_name}
                  onChange={handleChange}
                  name="first_name"
                  disabled={!isEditing}
                  placeholder="Enter your first name"
            />
          </div>
          <div className="flex-1">
            <label className="block text-[#667085] text-[12px] mb-1">
              Last name
            </label>
            <input
                  className={`w-full text-[14px] md:text-[16px] rounded p-3 border transition-colors duration-200 ${
                    isEditing 
                      ? "bg-white border-[#1342ff] focus:outline-none focus:ring-2 focus:ring-[#1342ff]/20" 
                      : "bg-[#f7f7f7] border-[#eaecf0]"
                  }`}
                  value={formData.last_name}
                  onChange={handleChange}
                  name="last_name"
                  disabled={!isEditing}
                  placeholder="Enter your last name"
            />
          </div>
        </div>

            {/* Email */}
            <div>
          <label className="block text-[#667085] text-[12px] mb-1">
            Email address
          </label>
          <input
            className="w-full bg-[#f7f7f7] text-[14px] md:text-[16px] rounded p-3 border border-[#eaecf0]"
                value={formData.email}
                disabled
              />
              <p className="text-[#667085] text-xs mt-1">Email cannot be changed</p>
            </div>

            {/* Phone */}
            <div>
            <label className="block text-[#667085] text-[12px] mb-1">
              Phone number
            </label>
            <input
                className={`w-full text-[14px] md:text-[16px] rounded p-3 border transition-colors duration-200 ${
                  isEditing 
                    ? "bg-white border-[#1342ff] focus:outline-none focus:ring-2 focus:ring-[#1342ff]/20" 
                    : "bg-[#f7f7f7] border-[#eaecf0]"
                }`}
                value={formData.phone}
                onChange={handleChange}
                name="phone"
                disabled={!isEditing}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-[#667085] text-[12px] mb-1">
                Location
              </label>
              <input
                className={`w-full text-[14px] md:text-[16px] rounded p-3 border transition-colors duration-200 ${
                  isEditing 
                    ? "bg-white border-[#1342ff] focus:outline-none focus:ring-2 focus:ring-[#1342ff]/20" 
                    : "bg-[#f7f7f7] border-[#eaecf0]"
                }`}
                value={formData.location}
                onChange={handleChange}
                name="location"
                disabled={!isEditing}
                placeholder="Enter your location"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-[#667085] text-[12px] mb-1">
                Bio
              </label>
              <textarea
                className={`w-full text-[14px] md:text-[16px] rounded p-3 border transition-colors duration-200 resize-none ${
                  isEditing 
                    ? "bg-white border-[#1342ff] focus:outline-none focus:ring-2 focus:ring-[#1342ff]/20" 
                    : "bg-[#f7f7f7] border-[#eaecf0]"
                }`}
                value={formData.bio}
                onChange={handleChange}
                name="bio"
                disabled={!isEditing}
                placeholder="Tell us about yourself"
                rows={3}
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-[#667085] text-[12px] mb-1">
                Website
              </label>
              <input
                className={`w-full text-[14px] md:text-[16px] rounded p-3 border transition-colors duration-200 ${
                  isEditing 
                    ? "bg-white border-[#1342ff] focus:outline-none focus:ring-2 focus:ring-[#1342ff]/20" 
                    : "bg-[#f7f7f7] border-[#eaecf0]"
                }`}
                value={formData.website}
                onChange={handleChange}
                name="website"
                disabled={!isEditing}
                placeholder="https://your-website.com"
              />
            </div>

            {/* Additional Fields */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-[#667085] text-[12px] mb-1">
                  Gender
                </label>
                <select
                  className={`w-full text-[14px] md:text-[16px] rounded p-3 border transition-colors duration-200 ${
                    isEditing 
                      ? "bg-white border-[#1342ff] focus:outline-none focus:ring-2 focus:ring-[#1342ff]/20" 
                      : "bg-[#f7f7f7] border-[#eaecf0]"
                  }`}
                  value={formData.gender}
                  onChange={handleChange}
                  name="gender"
                  disabled={!isEditing}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-[#667085] text-[12px] mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className={`w-full text-[14px] md:text-[16px] rounded p-3 border transition-colors duration-200 ${
                    isEditing 
                      ? "bg-white border-[#1342ff] focus:outline-none focus:ring-2 focus:ring-[#1342ff]/20" 
                      : "bg-[#f7f7f7] border-[#eaecf0]"
                  }`}
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  name="date_of_birth"
                  disabled={!isEditing}
            />
          </div>
        </div>
          </div>
        )}

        {/* Error message */}
        {updateProfile.isError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            Error updating profile: {updateProfile.error?.message || 'Something went wrong'}
          </div>
        )}

        {/* Success message */}
        {updateProfile.isSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
            Profile updated successfully!
        </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
