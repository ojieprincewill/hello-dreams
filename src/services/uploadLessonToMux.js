export async function uploadLessonToMux({ videoUrl, lessonId }) {
  const res = await fetch('/functions/mux-upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoUrl, lessonId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Mux upload failed');
  }

  return data;
}
