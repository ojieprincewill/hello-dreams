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

// Fetch all lessons for a course with enhanced error handling
export const useLessons = (courseId) => {
  return useQuery({
    queryKey: ['lessons', courseId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select(`
            *,
            course:courses(id, title)
          `)
          .eq('course_id', courseId)
          .order('lesson_number', { ascending: true })
          .order('created_at', { ascending: true });

        if (error) {
          logError('useLessons', error, { courseId });
          throw new Error(`Failed to fetch lessons: ${error.message}`);
        }

        return data || [];
      } catch (error) {
        logError('useLessons', error, { courseId });
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
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Fetch a single lesson by ID
export const useLesson = (lessonId) => {
  return useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select(`
            *,
            course:courses(*)
          `)
          .eq('id', lessonId)
          .single();

        if (error) {
          logError('useLesson', error, { lessonId });
          throw new Error(`Failed to fetch lesson: ${error.message}`);
        }

        return data;
      } catch (error) {
        logError('useLesson', error, { lessonId });
        throw error;
      }
    },
    enabled: !!lessonId,
    retry: (failureCount, error) => {
      if (failureCount < 3 && error.message.includes('network')) {
        return true;
      }
      return false;
    },
  });
};

// Create new lesson with enhanced validation
export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lesson) => {
      try {
        // Validate required fields
        const requiredFields = ['title', 'course_id'];
        const missingFields = requiredFields.filter(field => !lesson[field]);
        
        if (missingFields.length > 0) {
          throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        // Get the next lesson number for this course
        const { data: existingLessons } = await supabase
          .from('lessons')
          .select('lesson_number')
          .eq('course_id', lesson.course_id)
          .order('lesson_number', { ascending: false })
          .limit(1);

        const nextLessonNumber = existingLessons && existingLessons.length > 0 
          ? existingLessons[0].lesson_number + 1 
          : 1;

        const { data, error } = await supabase
          .from('lessons')
          .insert([{
            ...lesson,
            lesson_number: nextLessonNumber,
            status: lesson.status || 'draft',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }])
          .select()
          .single();

        if (error) {
          logError('useCreateLesson', error, { lesson: { title: lesson.title, courseId: lesson.course_id } });
          throw new Error(`Failed to create lesson: ${error.message}`);
        }

        return data;
      } catch (error) {
        logError('useCreateLesson', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['lessons', data.course_id]);
      queryClient.invalidateQueries(['course', data.course_id]);
      console.log('Lesson created successfully:', { id: data.id, title: data.title, courseId: data.course_id });
    },
    onError: (error) => {
      logError('useCreateLesson', error);
    },
  });
};

// Update lesson with enhanced validation
export const useUpdateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lesson) => {
      try {
        if (!lesson.id) {
          throw new Error('Lesson ID is required for update');
        }

        const { data, error } = await supabase
          .from('lessons')
          .update({
            ...lesson,
            updated_at: new Date().toISOString(),
          })
          .eq('id', lesson.id)
          .select()
          .single();

        if (error) {
          logError('useUpdateLesson', error, { lessonId: lesson.id });
          throw new Error(`Failed to update lesson: ${error.message}`);
        }

        return data;
      } catch (error) {
        logError('useUpdateLesson', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['lessons', data.course_id]);
      queryClient.invalidateQueries(['lesson', data.id]);
      queryClient.invalidateQueries(['course', data.course_id]);
      console.log('Lesson updated successfully:', { id: data.id, title: data.title });
    },
    onError: (error) => {
      logError('useUpdateLesson', error);
    },
  });
};

// Delete lesson with reordering
export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, courseId }) => {
      try {
        // Get the lesson to be deleted
        const { data: lessonToDelete, error: fetchError } = await supabase
          .from('lessons')
          .select('lesson_number')
          .eq('id', id)
          .single();

        if (fetchError) {
          logError('useDeleteLesson - fetch', fetchError, { lessonId: id });
          throw new Error(`Failed to fetch lesson: ${fetchError.message}`);
        }

        // Delete the lesson
        const { error: deleteError } = await supabase
          .from('lessons')
          .delete()
          .eq('id', id);

        if (deleteError) {
          logError('useDeleteLesson - delete', deleteError, { lessonId: id });
          throw new Error(`Failed to delete lesson: ${deleteError.message}`);
        }

        // Reorder remaining lessons
        const { error: reorderError } = await supabase
          .from('lessons')
          .update({ lesson_number: supabase.raw('lesson_number - 1') })
          .eq('course_id', courseId)
          .gt('lesson_number', lessonToDelete.lesson_number);

        if (reorderError) {
          logError('useDeleteLesson - reorder', reorderError, { courseId });
          // Don't throw error for reordering, just log it
          console.warn('Failed to reorder lessons after deletion:', reorderError);
        }

        return { id, courseId };
      } catch (error) {
        logError('useDeleteLesson', error);
        throw error;
      }
    },
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries(['lessons', courseId]);
      queryClient.invalidateQueries(['course', courseId]);
      console.log('Lesson deleted successfully:', { courseId });
    },
    onError: (error) => {
      logError('useDeleteLesson', error);
    },
  });
};

// Fetch lesson progress for a user
export const useLessonProgress = (userId, courseId) => {
  return useQuery({
    queryKey: ['lesson-progress', userId, courseId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('lesson_progress')
          .select(`
            *,
            lesson:lessons(*)
          `)
          .eq('user_id', userId)
          .eq('course_id', courseId);

        if (error) {
          logError('useLessonProgress', error, { userId, courseId });
          throw new Error(`Failed to fetch lesson progress: ${error.message}`);
        }

        return data || [];
      } catch (error) {
        logError('useLessonProgress', error);
        throw error;
      }
    },
    enabled: !!userId && !!courseId,
    retry: (failureCount, error) => {
      if (failureCount < 3 && error.message.includes('network')) {
        return true;
      }
      return false;
    },
  });
};

// Update lesson progress
export const useUpdateLessonProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (progress) => {
      try {
        const { data, error } = await supabase
          .from('lesson_progress')
          .upsert([progress], {
            onConflict: 'user_id,lesson_id'
          })
          .select()
          .single();

        if (error) {
          logError('useUpdateLessonProgress', error, { progress });
          throw new Error(`Failed to update lesson progress: ${error.message}`);
        }

        return data;
      } catch (error) {
        logError('useUpdateLessonProgress', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['lesson-progress', data.user_id, data.course_id]);
      console.log('Lesson progress updated successfully:', { lessonId: data.lesson_id });
    },
    onError: (error) => {
      logError('useUpdateLessonProgress', error);
    },
  });
};
