import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentSession,
  getCurrentUser,
  signInWithEmail,
  signUpWithEmail,
  signOut,
  resetPassword,
  updatePassword,
  updatePasswordWithToken,
  updateUserProfile,
  updateUserProfileWithAvatar,
} from "../services/auth";

export function useAuth() {
  const queryClient = useQueryClient();

  // Get current session
  const sessionQuery = useQuery({
    queryKey: ["auth", "session"],
    queryFn: getCurrentSession,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Get current user
  const userQuery = useQuery({
    queryKey: ["auth", "user"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
    enabled: !!sessionQuery.data?.user,
  });

  // Sign in mutation
  const signIn = useMutation({
    mutationFn: signInWithEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  // Sign up mutation
  const signUp = useMutation({
    mutationFn: signUpWithEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  // Sign out mutation
  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
      await queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
      queryClient.clear(); // optional, but good for full reset
    },
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
  });

  // Update password mutation (for authenticated users)
  const updatePasswordMutation = useMutation({
    mutationFn: updatePassword,
  });

  // Update password with token mutation (for password reset flow)
  const updatePasswordWithTokenMutation = useMutation({
    mutationFn: updatePasswordWithToken,
  });

  // Update user profile mutation
  const updateProfile = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  // Update user profile with avatar mutation
  const updateProfileWithAvatar = useMutation({
    mutationFn: updateUserProfileWithAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  return {
    // Queries
    session: sessionQuery.data,
    user: userQuery.data,
    isLoading: sessionQuery.isLoading || userQuery.isLoading,
    isError: sessionQuery.isError || userQuery.isError,

    // Mutations
    signIn,
    signUp,
    signOut: signOutMutation,
    resetPassword: resetPasswordMutation,
    updatePassword: updatePasswordMutation,
    updatePasswordWithToken: updatePasswordWithTokenMutation,
    updateProfile,
    updateProfileWithAvatar,

    // Computed values
    isAuthenticated: !!sessionQuery.data?.user,
    isAdmin: sessionQuery.data?.user?.user_metadata?.role === "admin",
  };
}
