import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePublishedCourses, useCourse } from './useCourses';
import { useLessons } from './useLessons';
import supabase from '@/supabase/client';

// Enhanced error logging utility
const logError = (context, error, additionalData = {}) => {
  console.error(`[${context}] Error:`, {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
    ...additionalData,
    timestamp: new Date().toISOString(),
  });
};

// Hook for academy landing page data
export const useAcademyLandingData = () => {
  const { data: courses = [], isLoading, error } = usePublishedCourses();

  // Transform courses data to match the expected format
  const transformedData = React.useMemo(() => {
    if (!courses.length) return [];

    return courses.map(course => ({
      id: course.id,
      image: course.cover_image,
      title: course.title,
      name: course.instructor_name || 'Instructor',
      totalCourses: course.total_lessons || 0,
      totalTime: course.total_duration || '0h 0m',
      price: course.price || 0,
      difficulty_level: course.difficulty_level || 'Beginner',
      rating: course.rating || 0,
      number_of_ratings: course.number_of_ratings || 0,
      category: course.category || 'General',
      enrollment_count: course.enrollment_count || 0,
    }));
  }, [courses]);

  return {
    data: transformedData,
    isLoading,
    error,
    originalData: courses,
  };
};

// Hook for course preview data
export const useCoursePreviewData = (courseId) => {
  const { data: course, isLoading, error } = useCourse(courseId);

  // Transform course data for preview
  const transformedData = React.useMemo(() => {
    if (!course) return null;

    return {
      id: course.id,
      image: course.cover_image,
      title: course.title,
      totalCourses: course.total_lessons || 0,
      totalTime: course.total_duration || '0h 0m',
      sections: course.lessons?.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        duration: lesson.video_duration_formatted || '0:00',
      })) || [],
      instructor_name: course.instructor_name,
      instructor_title: course.instructor_title,
      instructor_image: course.instructor_image,
      instructor_bio: course.instructor_bio,
      requirements: course.requirements,
      what_you_will_learn: course.what_you_will_learn,
      skills_covered: course.skills_covered || [],
      difficulty_level: course.difficulty_level,
      language: course.language,
      captions_available: course.captions_available,
      certificate_available: course.certificate_available,
      certificate_image: course.certificate_image,
      rating: course.rating,
      number_of_ratings: course.number_of_ratings,
      enrollment_count: course.enrollment_count,
      price: course.price,
      category: course.category,
      subcategory: course.subcategory,
      status: course.status,
    };
  }, [course]);

  return {
    data: transformedData,
    isLoading,
    error,
    originalData: course,
  };
};

// Hook for course sections data
export const useCourseSectionsData = (courseId) => {
  const { data: lessons = [], isLoading, error } = useLessons(courseId);

  // Group lessons by sections
  const sectionsData = React.useMemo(() => {
    if (!lessons.length) return [];

    // Group lessons by section (you might need to add a section_id field to lessons)
    const groupedLessons = lessons.reduce((acc, lesson) => {
      const sectionId = lesson.section_id || 1; // Default to section 1 if no section_id
      if (!acc[sectionId]) {
        acc[sectionId] = {
          id: sectionId,
          title: lesson.section_title || `Section ${sectionId}`,
          lessons: [],
        };
      }
      acc[sectionId].lessons.push({
        id: lesson.id,
        title: lesson.title,
        duration: lesson.video_duration_formatted || '0:00',
        video_url: lesson.video_url,
        thumbnail_image: lesson.thumbnail_image,
        preview_available: lesson.preview_available,
        is_free: lesson.is_free,
        resources_available: lesson.resources_available,
        resources: lesson.resources || [],
        completed: false, // This should come from user progress
      });
      return acc;
    }, {});

    return Object.values(groupedLessons);
  }, [lessons]);

  return {
    data: sectionsData,
    isLoading,
    error,
    originalData: lessons,
  };
};

// // Hook for academy section data (for homepage)
// export const useAcademySectionData = () => {
//   // Optionally, prefetch the full course list for better perceived performance when navigating to the academy page
//   // useQuery(['published-courses'], ... , { enabled: false }); // Prefetch on hover/focus of the "Go to academy" link

//   const { data: courses = [], isLoading, error } = usePublishedCourses();

//   // Transform data for academy section display
//   const academyData = React.useMemo(() => {
//     if (!courses.length) return [];

//     // Take only the first 3 courses for the academy section
//     return courses.slice(0, 3).map(course => ({
//       id: course.id,
//       image: course.cover_image || 'https://via.placeholder.com/400x200?text=Course+Image',
//       title: course.title || 'Untitled Course',
//       name: course.instructor_name || 'Instructor',
//       totalCourses: course.total_lessons || 0,
//       totalTime: course.total_duration || '0h 0m',
//       price: course.price || 0,
//       category: course.category || 'General',
//     }));
//   }, [courses]);

//   // Robust error logging
//   React.useEffect(() => {
//     if (error) {
//       logError('useAcademySectionData', error, { courses });
//     }
//   }, [error, courses]);

//   return {
//     data: academyData,
//     isLoading,
//     error,
//     originalData: courses,
//     // Optionally expose a refetch method if needed in the future
//     // refetch,
//   };
// };

// // Enhanced error logging utility (same as your courses hook)
// const logError = (context, error, additionalData = {}) => {
//   console.error(`[${context}] Error:`, {
//     message: error.message,
//     code: error.code,
//     details: error.details,
//     hint: error.hint,
//     ...additionalData,
//     timestamp: new Date().toISOString(),
//   });
// };

// Hook for academy section data (for homepage)
export const useAcademySectionData = () => {
  const { data: courses = [], isLoading, error } = usePublishedCourses();

  // Transform data for academy section display
  const academyData = React.useMemo(() => {
    if (!courses.length) return [];

    // Transform courses to match the expected format
    return courses.map(course => ({
      id: course.id,
      type: 'course', // Add type for filtering
      image: course.cover_image || 'https://via.placeholder.com/400x200?text=Course+Image',
      title: course.title || 'Untitled Course',
      instructor: course.instructor_name || 'Instructor',
      instructor_name: course.instructor_name || 'Instructor', // Keep both for compatibility
      totalCourses: course.total_lessons || 0,
      totalTime: course.total_duration || '0h 0m',
      price: course.price || 0,
      category: course.category || 'General',
      description: course.description || '',
      difficulty_level: course.difficulty_level || 'Beginner',
      rating: course.rating || 0,
      number_of_ratings: course.number_of_ratings || 0,
      enrollment_count: course.enrollment_count || 0,
      status: course.status,
      created_at: course.created_at,
      updated_at: course.updated_at,
    }));
  }, [courses]);

  // Separate data by category for different preview sections
  const categorizedData = React.useMemo(() => {
    return {
      all: academyData,
      uiux: academyData.filter(course => 
        course.category?.toLowerCase().includes('ui') || 
        course.category?.toLowerCase().includes('ux') ||
        course.category?.toLowerCase().includes('design')
      ),
      tech: academyData.filter(course => 
        course.category?.toLowerCase().includes('tech') ||
        course.category?.toLowerCase().includes('programming') ||
        course.category?.toLowerCase().includes('development') ||
        course.category?.toLowerCase().includes('coding')
      ),
      // Add more categories as needed
    };
  }, [academyData]);

  // Robust error logging
  React.useEffect(() => {
    if (error) {
      logError('useAcademySectionData', error, { courses });
    }
  }, [error, courses]);

  return {
    data: academyData,
    categorizedData,
    isLoading,
    error,
    originalData: courses,
  };
};

// Hook for course categories
export const useCourseCategories = () => {
  return useQuery({
    queryKey: ['course-categories'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('category')
          .eq('status', 'published')
          .not('category', 'is', null);

        if (error) {
          logError('useCourseCategories', error);
          throw new Error(`Failed to fetch course categories: ${error.message}`);
        }

        // Get unique categories
        const categories = [...new Set(data.map(course => course.category))];
        return categories;
      } catch (error) {
        logError('useCourseCategories', error);
        throw error;
      }
    },
    retry: (failureCount, error) => {
      if (failureCount < 3 && error.message.includes('network')) {
        return true;
      }
      return false;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook for course search and filtering
export const useCourseSearch = (searchTerm, category, difficulty) => {
  const { data: courses = [], isLoading, error } = usePublishedCourses();

  const filteredData = React.useMemo(() => {
    if (!courses.length) return [];

    return courses.filter(course => {
      const matchesSearch = !searchTerm || 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor_name?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !category || course.category === category;
      const matchesDifficulty = !difficulty || course.difficulty_level === difficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [courses, searchTerm, category, difficulty]);

  return {
    data: filteredData,
    isLoading,
    error,
    totalResults: filteredData.length,
  };
}; 

// Fetch all tutors and admins for course assignment
export const useTutors = () => {
  return useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      // Fetch all profiles where is_instructor = true OR is_admin = true
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_url, bio, role, is_instructor, is_admin, first_name, last_name')
        .or('is_instructor.eq.true,is_admin.eq.true');
      if (error) throw error;
      return (data || []).map(profile => ({
        id: profile.id,
        name: profile.display_name || `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
        avatar_url: profile.avatar_url || '',
        bio: profile.bio || '',
        role: profile.role || (profile.is_admin ? 'admin' : (profile.is_instructor ? 'tutor' : 'student')),
        is_instructor: profile.is_instructor,
        is_admin: profile.is_admin,
      }));
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
}; 