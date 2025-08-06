import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { 
  getUserEnrollments, 
  enrollInCourse as enrollInCourseService,
  updateEnrollmentProgress as updateEnrollmentProgressService
} from '../services/courses';
import supabase from '../supabase/client';

// Get user's lesson progress
export async function getUserLessonProgress(userId) {
  if (!userId) throw new Error('User ID is required');
  
  const { data, error } = await supabase
    .from('lesson_progress')
    .select(`
      *,
      lessons (
        id,
        title,
        duration,
        video_duration,
        video_duration_formatted,
        course_id
      )
    `)
    .eq('user_id', userId)
    .order('last_watched_at', { ascending: false });
    
  if (error) throw error;
  return data;
}

// Update lesson progress
export async function updateLessonProgress({ userId, lessonId, watchedDuration, completed, bookmarked }) {
  const updateData = {
    user_id: userId,
    lesson_id: lessonId,
    watched_duration: watchedDuration || 0,
    last_watched_at: new Date().toISOString()
  };

  if (completed !== undefined) {
    updateData.completed = completed;
    if (completed) {
      updateData.completed_at = new Date().toISOString();
    }
  }

  if (bookmarked !== undefined) {
    updateData.bookmarked = bookmarked;
  }

  const { data, error } = await supabase
    .from('lesson_progress')
    .upsert(updateData, { onConflict: 'user_id,lesson_id' })
    .select()
    .single();
    
  if (error) throw error;
  return data;
}

// Get course progress summary
export async function getCourseProgressSummary(userId) {
  if (!userId) throw new Error('User ID is required');
  
  const { data, error } = await supabase
    .from('course_enrollments')
    .select(`
      progress_percentage,
      completed_at,
      courses (
        total_duration
      )
    `)
    .eq('user_id', userId);
    
  if (error) throw error;
  
  // Calculate summary statistics
  const totalCourses = data.length;
  const completedCourses = data.filter(course => course.completed_at).length;
  const totalProgress = data.reduce((sum, course) => sum + (course.progress_percentage || 0), 0);
  const averageProgress = totalCourses > 0 ? totalProgress / totalCourses : 0;
  
  // Calculate total watch time (this would need to be calculated from lesson_progress)
  const { data: lessonProgress } = await supabase
    .from('lesson_progress')
    .select('watched_duration')
    .eq('user_id', userId);
    
  const totalWatchTimeMinutes = lessonProgress?.reduce((sum, lesson) => sum + (lesson.watched_duration || 0), 0) || 0;
  const totalWatchTimeHours = Math.floor(totalWatchTimeMinutes / 60);
  const totalWatchTimeRemainingMinutes = totalWatchTimeMinutes % 60;
  
  return {
    totalCourses,
    completedCourses,
    averageProgress,
    totalWatchTime: {
      hours: totalWatchTimeHours,
      minutes: totalWatchTimeRemainingMinutes,
      totalMinutes: totalWatchTimeMinutes
    }
  };
}

export function useCourseProgress() {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Get course enrollments with optimized caching
  const enrollmentsQuery = useQuery({
    queryKey: ['course-enrollments', user?.id],
    queryFn: () => getUserEnrollments(user?.id),
    enabled: !!user?.id && isAuthenticated,
    staleTime: 1000 * 60 * 15, // 15 minutes - data stays fresh longer
    cacheTime: 1000 * 60 * 60 * 2, // 2 hours - cache for 2 hours
    retry: (failureCount, error) => {
      // Only retry once for network errors, not for auth or 500 errors
      if (failureCount >= 1) return false;
      if (error?.message?.includes('authentication')) return false;
      if (error?.status === 500) return false;
      return true;
    },
    retryDelay: 1000, // 1 second delay between retries
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // Get lesson progress with optimized caching
  const lessonProgressQuery = useQuery({
    queryKey: ['lesson-progress', user?.id],
    queryFn: () => getUserLessonProgress(user?.id),
    enabled: !!user?.id && isAuthenticated,
    staleTime: 1000 * 60 * 10, // 10 minutes - lesson progress updates more frequently
    cacheTime: 1000 * 60 * 60, // 1 hour - cache for 1 hour
    retry: (failureCount, error) => {
      // Only retry once for network errors, not for auth or 500 errors
      if (failureCount >= 1) return false;
      if (error?.message?.includes('authentication')) return false;
      if (error?.status === 500) return false;
      return true;
    },
    retryDelay: 1000, // 1 second delay between retries
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // Get progress summary with optimized caching
  const progressSummaryQuery = useQuery({
    queryKey: ['course-progress-summary', user?.id],
    queryFn: () => getCourseProgressSummary(user?.id),
    enabled: !!user?.id && isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes - summary updates more frequently
    cacheTime: 1000 * 60 * 30, // 30 minutes - cache for 30 minutes
    retry: (failureCount, error) => {
      // Only retry once for network errors, not for auth or 500 errors
      if (failureCount >= 1) return false;
      if (error?.message?.includes('authentication')) return false;
      if (error?.status === 500) return false;
      return true;
    },
    retryDelay: 1000, // 1 second delay between retries
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // Enroll in course mutation
  const enrollInCourseMutation = useMutation({
    mutationFn: ({ courseId }) => enrollInCourseService(user?.id, courseId),
    onSuccess: (newEnrollment) => {
      // Optimistically update the cache
      queryClient.setQueryData(['course-enrollments', user?.id], (oldData) => {
        return oldData ? [newEnrollment, ...oldData] : [newEnrollment];
      });
      queryClient.invalidateQueries({ queryKey: ['course-enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['course-progress-summary'] });
    },
  });

  // Update lesson progress mutation
  const updateLessonProgressMutation = useMutation({
    mutationFn: updateLessonProgress,
    onSuccess: (updatedProgress) => {
      // Optimistically update the cache
      queryClient.setQueryData(['lesson-progress', user?.id], (oldData) => {
        if (!oldData) return [updatedProgress];
        return oldData.map(item => 
          item.lesson_id === updatedProgress.lesson_id ? updatedProgress : item
        );
      });
      queryClient.invalidateQueries({ queryKey: ['lesson-progress'] });
      queryClient.invalidateQueries({ queryKey: ['course-progress-summary'] });
    },
  });

  // Update enrollment progress mutation
  const updateEnrollmentProgressMutation = useMutation({
    mutationFn: ({ enrollmentId, progressPercentage }) => 
      updateEnrollmentProgressService(enrollmentId, progressPercentage),
    onSuccess: (updatedEnrollment) => {
      // Optimistically update the cache
      queryClient.setQueryData(['course-enrollments', user?.id], (oldData) => {
        if (!oldData) return [updatedEnrollment];
        return oldData.map(item => 
          item.id === updatedEnrollment.id ? updatedEnrollment : item
        );
      });
      queryClient.invalidateQueries({ queryKey: ['course-enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['course-progress-summary'] });
    },
  });

  return {
    enrollments: enrollmentsQuery.data || [],
    lessonProgress: lessonProgressQuery.data || [],
    progressSummary: progressSummaryQuery.data,
    isLoading: (enrollmentsQuery.isLoading && !enrollmentsQuery.data) || 
               (lessonProgressQuery.isLoading && !lessonProgressQuery.data) || 
               (progressSummaryQuery.isLoading && !progressSummaryQuery.data),
    isFetching: enrollmentsQuery.isFetching || lessonProgressQuery.isFetching || progressSummaryQuery.isFetching,
    isError: enrollmentsQuery.isError || lessonProgressQuery.isError || progressSummaryQuery.isError,
    enrollInCourse: enrollInCourseMutation,
    updateLessonProgress: updateLessonProgressMutation,
    updateEnrollmentProgress: updateEnrollmentProgressMutation,
  };
} 