import supabase from '../supabase/client';

// Get all available courses
export async function getAvailableCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data || [];
}

// Get course by ID
export async function getCourseById(courseId) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single();
    
  if (error) throw error;
  return data;
}

// Get lessons for a course
export async function getCourseLessons(courseId) {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', courseId)
    .order('lesson_number', { ascending: true });
    
  if (error) throw error;
  return data || [];
}

// Enroll in a course
export async function enrollInCourse(userId, courseId) {
  const { data, error } = await supabase
    .from('course_enrollments')
    .insert({
      user_id: userId,
      course_id: courseId,
      enrolled_at: new Date().toISOString(),
      progress_percentage: 0,
      certificate_issued: false
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
}

// Get user's course enrollments
export async function getUserEnrollments(userId) {
  const { data, error } = await supabase
    .from('course_enrollments')
    .select(`
      *,
      courses (
        id,
        title,
        description,
        cover_image,
        category,
        instructor_name,
        total_lessons,
        total_duration,
        difficulty_level,
        rating,
        number_of_ratings
      )
    `)
    .eq('user_id', userId)
    .order('enrolled_at', { ascending: false });
    
  if (error) throw error;
  return data || [];
}

// Update course enrollment progress
export async function updateEnrollmentProgress(enrollmentId, progressPercentage) {
  const { data, error } = await supabase
    .from('course_enrollments')
    .update({
      progress_percentage: progressPercentage,
      completed_at: progressPercentage === 100 ? new Date().toISOString() : null
    })
    .eq('id', enrollmentId)
    .select()
    .single();
    
  if (error) throw error;
  return data;
} 