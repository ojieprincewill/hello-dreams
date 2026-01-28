import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import supabase from "@/supabase/client";

export const useJobs = () =>
  useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_postings")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });

export const usePublicJobs = (pageSize = 6) =>
  useInfiniteQuery({
    queryKey: ["public-jobs"],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await supabase
        .from("job_postings")
        .select("*", { count: "exact" })
        .eq("published", true)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw new Error(error.message);

      return {
        data,
        nextPage: data.length === pageSize ? pageParam + 1 : undefined,
        hasMore: data.length === pageSize,
        total: count || 0,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

export const useCreateJob = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (newJob) => {
      const { data, error } = await supabase
        .from("job_postings")
        .insert([newJob])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs"] }),
  });
};

export const useUpdateJob = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (job) => {
      const updateData = {
        title: job.title,
        description: job.description,
        experience_level: job.experience_level,
        work_hours: job.hoursNeeded,
        pay_type: job.payType,
        pay_amount: job.payAmount,
        payment_reference: job.transactionRef,
        application_instructions: job.applicationInstructions,
        company_name: job.companyName,
        company_email: job.companyEmail,
        updated_at: new Date().toISOString(),
      };

      // Add published field if it exists
      if (job.published !== undefined) {
        updateData.published = job.published;
      }

      const { data, error } = await supabase
        .from("job_postings")
        .update(updateData)
        .eq("id", job.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      // Real-time subscriptions will handle the cache updates automatically
      // Just invalidate queries to ensure consistency
      qc.invalidateQueries({ queryKey: ["jobs"] });
      qc.invalidateQueries({ queryKey: ["public-jobs"] });
    },
  });
};

export const useDeleteJob = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }) => {
      const { error } = await supabase
        .from("job_postings")
        .delete()
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs"] }),
  });
};
