import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '@/supabase/client';

// Enhanced error logging utility
const logError = (context, error, additionalData = {}) => {
  console.error(`[${context}] Error:`, {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
    ...additionalData,
    timestamp: new Date().toISOString(),
  });
};

// Fetch all courses with enhanced error handling
export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select(`
            *,
            lessons:lessons(count)
          `)
          .order('created_at', { ascending: false });

        if (error) {
          logError('useCourses', error);
          throw new Error(`Failed to fetch courses: ${error.message}`);
        }

        return data || [];
      } catch (error) {
        logError('useCourses', error);
        throw error;
      }
    },
    retry: (failureCount, error) => {
      // Retry up to 3 times for network errors, but not for validation errors
      if (failureCount < 3 && error.message.includes('network')) {
        return true;
      }
      return false;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Fetch a single course by ID
export const useCourse = (courseId) => {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select(`
            *,
            lessons:lessons(*)
          `)
          .eq('id', courseId)
          .single();

        if (error) {
          logError('useCourse', error, { courseId });
          throw new Error(`Failed to fetch course: ${error.message}`);
        }

        return data;
      } catch (error) {
        logError('useCourse', error, { courseId });
        throw error;
      }
    },
    enabled: !!courseId,
    retry: (failureCount, error) => {
      if (failureCount < 3 && error.message.includes('network')) {
        return true;
      }
      return false;
    },
  });
};

// Fetch published courses for public display
export const usePublishedCourses = () => {
  return useQuery({
    queryKey: ['published-courses'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select(`
            id,
            title,
            description,
            cover_image,
            instructor_name,
            instructor_title,
            price,
            total_lessons,
            total_duration,
            difficulty_level,
            rating,
            number_of_ratings,
            enrollment_count,
            category,
            status,
            created_at,
            updated_at
          `)
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) {
          logError('usePublishedCourses', error);
          throw new Error(`Failed to fetch published courses: ${error.message}`);
        }

        return data || [];
      } catch (error) {
        logError('usePublishedCourses', error);
        throw error;
      }
    },
    retry: (failureCount, error) => {
      if (failureCount < 3 && error.message.includes('network')) {
        return true;
      }
      return false;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes for public data
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create new course with enhanced validation
export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCourse) => {
      try {
        // Validate required fields
        const requiredFields = ['title', 'description'];
        const missingFields = requiredFields.filter(field => !newCourse[field]);
        
        if (missingFields.length > 0) {
          throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        const { data, error } = await supabase
          .from('courses')
          .insert([{
            ...newCourse,
            status: newCourse.status || 'draft',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }])
          .select()
          .single();

        if (error) {
          logError('useCreateCourse', error, { newCourse: { title: newCourse.title } });
          throw new Error(`Failed to create course: ${error.message}`);
        }

        return data;
      } catch (error) {
        logError('useCreateCourse', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['published-courses'] });
      console.log('Course created successfully:', { id: data.id, title: data.title });
    },
    onError: (error) => {
      logError('useCreateCourse', error);
    },
  });
};

// Update course with enhanced validation
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedCourse) => {
      try {
        if (!updatedCourse.id) {
          throw new Error('Course ID is required for update');
        }

        const { data, error } = await supabase
          .from('courses')
          .update({
            ...updatedCourse,
            updated_at: new Date().toISOString(),
          })
          .eq('id', updatedCourse.id)
          .select()
          .single();

        if (error) {
          logError('useUpdateCourse', error, { courseId: updatedCourse.id });
          throw new Error(`Failed to update course: ${error.message}`);
        }

        return data;
      } catch (error) {
        logError('useUpdateCourse', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['course', data.id] });
      queryClient.invalidateQueries({ queryKey: ['published-courses'] });
      console.log('Course updated successfully:', { id: data.id, title: data.title });
    },
    onError: (error) => {
      logError('useUpdateCourse', error);
    },
  });
};

// Delete course with cascade handling
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      try {
        // First, delete related lessons
        const { error: lessonsError } = await supabase
          .from('lessons')
          .delete()
          .eq('course_id', id);

        if (lessonsError) {
          logError('useDeleteCourse - lessons', lessonsError, { courseId: id });
          throw new Error(`Failed to delete course lessons: ${lessonsError.message}`);
        }

        // Then delete the course
        const { error } = await supabase
          .from('courses')
          .delete()
          .eq('id', id);

        if (error) {
          logError('useDeleteCourse', error, { courseId: id });
          throw new Error(`Failed to delete course: ${error.message}`);
        }
      } catch (error) {
        logError('useDeleteCourse', error);
        throw error;
      }
    },
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['course', courseId] });
      queryClient.invalidateQueries({ queryKey: ['published-courses'] });
      console.log('Course deleted successfully:', { courseId });
    },
    onError: (error) => {
      logError('useDeleteCourse', error);
    },
  });
};
