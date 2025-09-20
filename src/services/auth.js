import supabase from '../supabase/client';
import { uploadAvatar, deleteAvatar } from './avatarUpload';

// Get current session
export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

// Get current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

// Sign in with email and password
export async function signInWithEmail({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

// Sign up with email and password
export async function signUpWithEmail({ email, password, user_metadata = {} }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: user_metadata,
    },
  });
  if (error) throw error;
  return data;
}

// Reset password - sends reset email
export async function resetPassword({ email }) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
  return true;
}

// Update password (for authenticated users)
export async function updatePassword({ password }) {
  const { error } = await supabase.auth.updateUser({
    password,
  });
  if (error) throw error;
  return true;
}

// Update password with reset token (for password reset flow)
export async function updatePasswordWithToken({ password, accessToken, refreshToken }) {
  // Set the session with the reset tokens
  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
  
  if (error) throw error;

  // Now update the password
  const { error: updateError } = await supabase.auth.updateUser({
    password,
  });
  
  if (updateError) throw updateError;
  return data;
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}

// Update user profile
export async function updateUserProfile({ user_metadata }) {
  const { data, error } = await supabase.auth.updateUser({
    data: user_metadata,
  });
  if (error) throw error;
  return data;
}

// Check if user exists by email using edge function
export async function checkUserExists(email) {
  if (!email) return false;
  
  try {
    const { data, error } = await supabase.functions.invoke('check-email-exists', {
      body: { email }
    });
    
    if (error) {
      console.error('Error calling check-email-exists function:', error);
      throw error;
    }
    
    // The edge function returns account_exists and exists_exact_match
    // We want to use exists_exact_match for precise validation
    return data?.exists_exact_match || false;
  } catch (error) {
    console.error('Exception in checkUserExists:', error);
    throw error;
  }
}

// Resend verification email using edge function
export async function resendVerificationEmail(email) {
  if (!email) throw new Error('Email is required');
  
  try {
    const { data, error } = await supabase.functions.invoke('resend-confirmation', {
      body: { email }
    });
    
    if (error) {
      console.error('Error calling resend-confirmation function:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Exception in resendVerificationEmail:', error);
    throw error;
  }
}

// Update user profile with avatar
export async function updateUserProfileWithAvatar({ user_metadata, avatarFile, userId }) {
  let avatarUrl = user_metadata.avatar_url;

  // Upload new avatar if provided
  if (avatarFile) {
    try {
      // Delete old avatar if exists
      if (avatarUrl) {
        await deleteAvatar(avatarUrl);
      }

      // Upload new avatar
      avatarUrl = await uploadAvatar(avatarFile, userId);
      
      // Update metadata with new avatar URL
      user_metadata.avatar_url = avatarUrl;
    } catch (error) {
      throw new Error(`Avatar upload failed: ${error.message}`);
    }
  }

  // Update user profile
  const { data, error } = await supabase.auth.updateUser({
    data: user_metadata,
  });
  
  if (error) throw error;
  return data;
} 