import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '@/supabase/client';

export const useJobs = () =>
  useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });

export const useCreateJob = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (newJob) => {
      const { data, error } = await supabase
        .from('job_postings')
        .insert([newJob])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jobs'] }),
  });
};

export const useUpdateJob = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (job) => {
      const { data, error } = await supabase
        .from('job_postings')
        .update({
          title: job.title,
          description: job.description,
          experience_level: job.experience_level,
          work_hours: job.hoursNeeded,
          pay_type: job.payType,
          payment_reference: job.transactionRef,
          application_instructions: job.applicationInstructions,
          company_name: job.companyName,
          company_email: job.companyEmail,
          updated_at: new Date().toISOString(),
        })
        .eq('id', job.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['jobs'] }),
  });
};

export const useDeleteJob = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }) => {
      const { error } = await supabase.from('job_postings').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jobs'] }),
  });
};
