import supabase from '../supabase/client';

export async function uploadAvatar(file, userId) {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Please select an image file');
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File size must be less than 5MB');
  }

  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const filePath = `user-avatars/${fileName}`;

  // Upload file to Supabase Storage
  const { data, error } = await supabase.storage
    .from('user-avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('user-avatars')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteAvatar(avatarUrl) {
  if (!avatarUrl) return;

  try {
    // Extract file path from URL
    const urlParts = avatarUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const filePath = `user-avatars/${fileName}`;

    // Delete from storage
    const { error } = await supabase.storage
      .from('user-avatars')
      .remove([filePath]);

    if (error) {
      console.warn('Failed to delete old avatar:', error);
    }
  } catch (error) {
    console.warn('Error deleting avatar:', error);
  }
} 