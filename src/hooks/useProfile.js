import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { 
  getUserProfile, 
  updateUserProfile, 
  createUserProfile, 
  ensureProfileExists,
  testProfileAccess
} from '../services/profile';

export function useProfile() {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Get user profile with optimized caching
  const profileQuery = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User ID is required');
      
      try {
        // Debug: Test profile access first
        if (process.env.NODE_ENV === 'development') {
          await testProfileAccess(user.id);
        }
        
        // Ensure profile exists, create if it doesn't
        return await ensureProfileExists(user.id, user.email);
      } catch (error) {
        console.error('Profile fetch error:', error);
        
        // If we can't fetch or create profile, return a minimal profile object
        // This prevents the app from breaking and allows users to continue
        return {
          id: user.id,
          email: user.email,
          first_name: null,
          last_name: null,
          display_name: user.email,
          role: 'student',
          is_instructor: false,
          is_admin: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
      }
    },
    enabled: !!user?.id && isAuthenticated,
    staleTime: 1000 * 60 * 30, // 30 minutes - data stays fresh longer
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours - cache for a full day
    retry: (failureCount, error) => {
      // Only retry once for network errors, not for auth or 500 errors
      if (failureCount >= 1) return false;
      if (error?.message?.includes('authentication')) return false;
      if (error?.status === 500) return false;
      return true;
    },
    retryDelay: 1000, // 1 second delay between retries
    // Return cached data immediately while refetching in background
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // Update profile mutation
  const updateProfile = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedProfile) => {
      // Optimistically update the cache
      queryClient.setQueryData(['profile', user?.id], updatedProfile);
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error, variables, context) => {
      // Revert optimistic update on error
      if (context?.previousProfile) {
        queryClient.setQueryData(['profile', user?.id], context.previousProfile);
      }
    },
  });

  // Create profile mutation
  const createProfile = useMutation({
    mutationFn: createUserProfile,
    onSuccess: (newProfile) => {
      // Optimistically update the cache
      queryClient.setQueryData(['profile', user?.id], newProfile);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading && !profileQuery.data, // Only show loading if no cached data
    isFetching: profileQuery.isFetching, // Background refetching
    isError: profileQuery.isError,
    error: profileQuery.error,
    updateProfile,
    createProfile,
  };
} 