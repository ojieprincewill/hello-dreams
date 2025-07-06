import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRecentActivitiesPage } from '../services/fetchRecentActivities';

export function useInfiniteRecentActivities(limit = 10) {
  return useInfiniteQuery({
    queryKey: ['recent-activities'],
    queryFn: ({ pageParam = 0 }) => fetchRecentActivitiesPage({ pageParam, limit }),
    getNextPageParam: (lastPage) => lastPage?.nextPage,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
} 