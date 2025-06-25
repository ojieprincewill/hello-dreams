import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '@/supabase/client';

const PAGE_SIZE = 10;

export const useBlogs = () => {
  return useInfiniteQuery({
    queryKey: ['blogs'],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const { data, error } = await supabase
        .from('blogs')
        .select(
          'id, title, published, created_at, content, profiles(full_name, avatar_url)'
        )
        .order('created_at', { ascending: false })
        .range(from, to);
      if (error) throw new Error(error.message);
      return { items: data, nextPage: data.length === PAGE_SIZE ? pageParam + 1 : null };
    },
    getNextPageParam: (last) => last.nextPage,
    staleTime: 1000 * 60 * 5,         // cache for 5 minutes
    keepPreviousData: true,
  });
};

export const useCreateBlog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (newBlog) => {
      const { data, error } = await supabase
        .from('blogs')
        .insert([newBlog])
        .select('id');
      if (error) throw new Error(error.message);
      return data[0];
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blogs'] }),
  });
};

export const useUpdateBlog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (blog) => {
      const { data, error } = await supabase
        .from('blogs')
        .update({
          title: blog.title,
          content: blog.content,
          published: blog.published,
          updated_at: new Date().toISOString(),
        })
        .eq('id', blog.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blogs'] }),
  });
};

export const useDeleteBlog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blogs'] }),
  });
};
