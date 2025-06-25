import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '@/supabase/client';

// Fetch all lessons for a course
export const useLessons = (courseId) => {
  return useQuery({
    queryKey: ['lessons', courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('created_at', { ascending: true });

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!courseId,
  });
};

// Create new lesson
export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lesson) => {
      const { data, error } = await supabase
        .from('lessons')
        .insert([lesson])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['lessons', data.course_id]);
    },
  });
};

// Delete lesson
export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, courseId }) => {
      const { error } = await supabase.from('lessons').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries(['lessons', courseId]);
    },
  });
};
