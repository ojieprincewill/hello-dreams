// hooks/useDashboardData.js
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats, fetchRecentActivity } from '../services/dashboardStats';

export function useDashboardData() {
  const stats = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchDashboardStats,
    staleTime: 1000 * 60 * 5, // 5 mins
  });

  const activity = useQuery({
    queryKey: ['dashboard', 'recentActivity'],
    queryFn: fetchRecentActivity,
    staleTime: 1000 * 60 * 2,
  });

  return {
    stats,
    activity,
  };
}
