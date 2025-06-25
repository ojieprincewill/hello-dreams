// hooks/useCollections.ts
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCollectionsPage } from '../services/fetchCollections';
import supabase from '../supabase/client';

export function useCollections(limit = 6) {
  const queryClient = useQueryClient();

  // 🌀 Infinite fetch using your existing service
  const collectionsQuery = useInfiniteQuery({
    queryKey: ['collections'],
    queryFn: ({ pageParam = 0 }) => fetchCollectionsPage({ pageParam, limit }),
    getNextPageParam: (lastPage) => lastPage?.nextPage,
    staleTime: 1000 * 60 * 5,
  });

  // ➕ Create collection
  const createCollection = useMutation({
    mutationFn: async (newItem) => {
      const { data, error } = await supabase
        .from('collections')
        .insert(newItem)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });

  // ✏️ Update collection
  const updateCollection = useMutation({
    mutationFn: async (updatedItem) => {
      const { id, ...fields } = updatedItem;
      const { data, error } = await supabase
        .from('collections')
        .update(fields)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });

  // ❌ Delete collection
  const deleteCollection = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('collections').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });

  return {
    collectionsQuery,
    createCollection,
    updateCollection,
    deleteCollection,
  };
}
