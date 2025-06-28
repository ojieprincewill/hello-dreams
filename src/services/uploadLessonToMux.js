import supabase from '../supabase/client'

export async function uploadLessonToMux({ videoUrl, course_id, title, duration, description }) {
  const { data, error } = await supabase.functions.invoke('mux-video-upload', {
    body: { videoUrl, course_id, title, duration, description },
  });

  if (error) throw new Error(error.message || 'Mux upload failed');

  return data;
}
