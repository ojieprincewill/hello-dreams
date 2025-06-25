import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '@/supabase/client';

export const useChallenges = () => {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      const [ui, ux] = await Promise.all([
        supabase.from('ui_challenges').select('*'),
        supabase.from('ux_challenges').select('*'),
      ]);
      if (ui.error) throw new Error(ui.error.message);
      if (ux.error) throw new Error(ux.error.message);
      return [
        ...ui.data.map((c) => ({ ...c, type: 'ui' })),
        ...ux.data.map((c) => ({ ...c, type: 'ux' })),
      ];
    },
  });
};

export const useCreateChallenge = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (newChallenge) => {
      const table = newChallenge.type === 'ui' ? 'ui_challenges' : 'ux_challenges';
      const { data, error } = await supabase
        .from(table)
        .insert({
          title: newChallenge.title,
          challenge: newChallenge.challenge,
          deliverables: newChallenge.deliverables,
        })
        .select()
        .single();
      if (error) throw new Error(error.message);
      return { ...data, type: newChallenge.type };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['challenges'] }),
  });
};

export const useUpdateChallenge = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (challenge) => {
      const table = challenge.type === 'ui' ? 'ui_challenges' : 'ux_challenges';
      const { data, error } = await supabase
        .from(table)
        .update({
          title: challenge.title,
          challenge: challenge.challenge,
          deliverables: challenge.deliverables,
        })
        .eq('id', challenge.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return { ...data, type: challenge.type };
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['challenges'] }),
  });
};

export const useDeleteChallenge = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (challenge) => {
      const table = challenge.type === 'ui' ? 'ui_challenges' : 'ux_challenges';
      const { error } = await supabase.from(table).delete().eq('id', challenge.id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['challenges'] }),
  });
};
