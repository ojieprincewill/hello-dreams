import supabase from '../supabase/client'

// Upload video to Supabase storage first
export async function uploadVideoToStorage(file, onProgress) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `lesson-videos/${fileName}`;

  const { data, error } = await supabase.storage
    .from('lesson-videos')
    .upload(filePath, file, {
      onUploadProgress: (progress) => {
        if (onProgress) {
          const percent = Math.round((progress.loaded / progress.total) * 100);
          onProgress(percent);
        }
      }
    });

  if (error) throw new Error('Failed to upload video to storage');

  const { data: { publicUrl } } = supabase.storage
    .from('lesson-videos')
    .getPublicUrl(filePath);

  return publicUrl;
}

// Send video URL to Mux for processing
export async function uploadLessonToMux({ title, duration, description, course_id, video_url }) {
  const { data, error } = await supabase.functions.invoke('mux-video-upload', {
    body: { title, duration, description, course_id, video_url },
  });

  if (error) throw new Error(error.message || 'Mux upload failed');

  return data;
}

// Combined function for the complete upload process
export async function uploadLessonWithProgress({ file, course_id, title, duration, description, onProgress }) {
  // Step 1: Upload to Supabase storage
  onProgress && onProgress({ stage: 'uploading', percent: 0 });
  const video_url = await uploadVideoToStorage(file, (percent) => {
    onProgress && onProgress({ stage: 'uploading', percent });
  });

  // Step 2: Send to Mux for processing
  onProgress && onProgress({ stage: 'processing', percent: 100 });
  const result = await uploadLessonToMux({ title, duration, description, course_id, video_url });

  return result;
}

// Upload thumbnail image to Supabase storage (lesson-thumbnails bucket)
export async function uploadThumbnailToStorage(file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `lesson-thumbnails/${fileName}`;

  const { data, error } = await supabase.storage
    .from('lesson-thumbnails')
    .upload(filePath, file);

  if (error) throw new Error('Failed to upload thumbnail to storage');

  const { data: { publicUrl } } = supabase.storage
    .from('lesson-thumbnails')
    .getPublicUrl(filePath);

  return publicUrl;
}

// Upload attachments to Supabase storage (lesson-attachments bucket)
export async function uploadAttachmentsToStorage(files) {
  if (!Array.isArray(files)) files = [files];
  const urls = [];
  for (const file of files) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `lesson-attachments/${fileName}`;
    const { data, error } = await supabase.storage
      .from('lesson-attachments')
      .upload(filePath, file);
    if (error) throw new Error('Failed to upload attachment to storage');
    const { data: { publicUrl } } = supabase.storage
      .from('lesson-attachments')
      .getPublicUrl(filePath);
    urls.push(publicUrl);
  }
  return urls;
}
