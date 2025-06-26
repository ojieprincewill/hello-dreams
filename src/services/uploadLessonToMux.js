import supabase from '../supabase/client'

export async function uploadLessonToMux({ videoUrl, courseId, title, duration, description }) {
  const { data, error } = await supabase.functions.invoke('mux-video-upload', {
    body: { videoUrl, courseId, title, duration, description },
  });

  if (error) throw error;

  // const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Mux upload failed');
  }

  return data;
}
