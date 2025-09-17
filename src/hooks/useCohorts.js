import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@/supabase/client";

export function useCohorts() {
  return useQuery({
    queryKey: ["cohorts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cohorts")
        .select("*")
        .order("start_date", { ascending: true });
      if (error) {
        console.error("Cohorts query error:", error);
        throw error;
      }
      return data || [];
    },
    staleTime: 60 * 1000,
    retry: false, // Don't retry on 404 errors
  });
}

export function useUpcomingCohort() {
  return useQuery({
    queryKey: ["cohorts", "upcoming"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cohorts")
        .select("*")
        .eq("is_upcoming", true)
        .limit(1)
        .maybeSingle();
      if (error && error.code !== "PGRST116") {
        console.error("Upcoming cohort query error:", error);
        throw error;
      }
      return data || null;
    },
    staleTime: 60 * 1000,
    retry: false, // Don't retry on 404 errors
  });
}

export function useClosestCohort() {
  return useQuery({
    queryKey: ["cohorts", "closest"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cohorts")
        .select("*")
        .order("start_date", { ascending: true })
        .limit(1)
        .maybeSingle();
      if (error && error.code !== "PGRST116") {
        console.error("Closest cohort query error:", error);
        throw error;
      }
      return data || null;
    },
    staleTime: 60 * 1000,
    retry: false, // Don't retry on 404 errors
  });
}

export function useUpsertCohort() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cohort) => {
      const { data, error } = await supabase
        .from("cohorts")
        .upsert(cohort)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cohorts"] });
      queryClient.invalidateQueries({ queryKey: ["cohorts", "upcoming"] });
      queryClient.invalidateQueries({ queryKey: ["cohorts", "closest"] });
    },
  });
}


