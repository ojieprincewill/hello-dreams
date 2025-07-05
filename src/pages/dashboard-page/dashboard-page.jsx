import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { uploadAvatar, deleteAvatar } from '../../services/avatarUpload';
import supabase from '../../supabase/client';
// import { updateUserProfileWithAvatar } from '../../services/auth';

export default function DashboardPage() {
  const { user, signOut, updateProfileWithAvatar } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Form state for editing profile
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [formData, setFormData] = useState({
    full_name: user?.user_metadata?.full_name || '',
    role: user?.user_metadata?.role || '',
    avatar_url: user?.user_metadata?.avatar_url || '',
    bio: user?.user_metadata?.bio || '',
    phone: user?.user_metadata?.phone || '',
    location: user?.user_metadata?.location || '',
    website: user?.user_metadata?.website || '',
    company: user?.user_metadata?.company || '',
    job_title: user?.user_metadata?.job_title || '',
  });

  const handleSignOut = () => {
    signOut.mutate();
    navigate('/login');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      full_name: user?.user_metadata?.full_name || '',
      role: user?.user_metadata?.role || '',
      avatar_url: user?.user_metadata?.avatar_url || '',
      bio: user?.user_metadata?.bio || '',
      phone: user?.user_metadata?.phone || '',
      location: user?.user_metadata?.location || '',
      website: user?.user_metadata?.website || '',
      company: user?.user_metadata?.company || '',
      job_title: user?.user_metadata?.job_title || '',
    });
    setAvatarPreview(null);
    setAvatarFile(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarPreview(null);
    setAvatarFile(null);
  };

  const handleSave = async () => {
    try {
      await updateProfileWithAvatar.mutateAsync({
        user_metadata: formData,
        avatarFile,
        userId: user.id,
      });
      setIsEditing(false);
      setAvatarPreview(null);
      setAvatarFile(null);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setAvatarFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const getAvatarUrl = () => {
    if (avatarPreview) return avatarPreview;
    if (user?.user_metadata?.avatar_url) return user.user_metadata.avatar_url;
    return `https://ui-avatars.com/api/?name=${user?.email}&size=96&background=random`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  User Dashboard
                </h1>
                <div className="flex space-x-3">
                  {!isEditing && (
                    <button
                      onClick={handleEdit}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Edit Profile
                    </button>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-start space-x-6 mb-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      className={`h-24 w-24 rounded-full object-cover ${
                        isEditing ? 'cursor-pointer hover:opacity-80' : ''
                      }`}
                      src={getAvatarUrl()}
                      alt="Profile"
                      onClick={handleAvatarClick}
                    />
                    {isEditing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs">Change</span>
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <div className="mt-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        Upload Avatar
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {user?.user_metadata?.full_name || user?.email}
                  </h2>
                  <p className="text-gray-600">{user?.email}</p>
                  <p className="text-sm text-gray-500">User ID: {user?.id}</p>
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                    Personal Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">
                        {user?.user_metadata?.full_name || 'Not set'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    {isEditing ? (
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                      </select>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">
                        {user?.user_metadata?.role || 'User'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">
                        {user?.user_metadata?.bio || 'No bio added'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                    Contact Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">
                        {user?.user_metadata?.phone || 'Not set'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">
                        {user?.user_metadata?.location || 'Not set'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">
                        {user?.user_metadata?.website || 'Not set'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Company
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">
                        {user?.user_metadata?.company || 'Not set'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Job Title
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="job_title"
                        value={formData.job_title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">
                        {user?.user_metadata?.job_title || 'Not set'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Edit Actions */}
              {isEditing && (
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={updateProfileWithAvatar.isPending}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {updateProfileWithAvatar.isPending
                      ? 'Saving...'
                      : 'Save Changes'}
                  </button>
                </div>
              )}

              {/* Error Message */}
              {updateProfileWithAvatar.isError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">
                    Failed to update profile:{' '}
                    {updateProfileWithAvatar.error?.message}
                  </p>
                </div>
              )}

              {/* Success Message */}
              {updateProfileWithAvatar.isSuccess && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-600 text-sm">
                    Profile updated successfully!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function updateUserProfileWithAvatar({
  user_metadata,
  avatarFile,
  userId,
}) {
  let avatarUrl = user_metadata.avatar_url;
  if (avatarFile) {
    if (avatarUrl) {
      await deleteAvatar(avatarUrl);
    }
    avatarUrl = await uploadAvatar(avatarFile, userId);
    user_metadata.avatar_url = avatarUrl;
  }
  const { data, error } = await supabase.auth.updateUser({
    data: user_metadata,
  });
  if (error) throw error;
  return data;
}
