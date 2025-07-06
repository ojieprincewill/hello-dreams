import supabase from '../supabase/client';

export async function fetchRecentActivitiesPage({ pageParam = 0, limit = 10 }) {
  const from = pageParam * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from('recent_activity')
    .select('*')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    items: data,
    nextPage: data.length < limit ? undefined : pageParam + 1,
    isLastPage: data.length < limit,
  };
}