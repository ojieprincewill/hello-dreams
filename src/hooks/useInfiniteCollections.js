// hooks/useInfiniteCollections.js
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCollectionsPage } from '../services/fetchCollections';

export function useInfiniteCollections(limit = 6) {
  return useInfiniteQuery({
    queryKey: ['collections'],
    queryFn: ({ pageParam = 0 }) => fetchCollectionsPage({ pageParam, limit }),
    getNextPageParam: (lastPage) => lastPage?.nextPage,
    staleTime: 1000 * 60 * 5,
  });
}
