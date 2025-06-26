// services/fetchCollections.js
import supabase from '../supabase/client';

export async function fetchCollectionsPage({ pageParam = 0, limit = 6 }) {
  const from = pageParam * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .order('id', { ascending: false })
    .range(from, to); // ✅ use correct range here

  if (error) throw error;

  return {
    data,
    nextPage: data.length < limit ? undefined : pageParam + 1,
    isLastPage: data.length < limit,
  };
}
