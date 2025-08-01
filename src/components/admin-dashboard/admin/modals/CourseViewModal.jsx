import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Badge } from '../../ui/badge';

const CourseViewModal = ({ course, isOpen, onClose }) => {
  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#fff] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Course Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Cover Image */}
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            {course.cover_image ? (
              <img
                src={course.cover_image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500">Course Cover Image</span>
            )}
          </div>

          {/* Title and Status */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{course.title}</h2>
            <Badge
              variant={course.status === 'Published' ? 'default' : 'secondary'}
            >
              {course.status}
            </Badge>
          </div>

          {/* Instructor Info */}
          {(course.instructor_name ||
            course.instructor_image ||
            course.instructor_title ||
            course.instructor_bio) && (
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              {course.instructor_image && (
                <img
                  src={course.instructor_image}
                  alt={course.instructor_name}
                  className="w-14 h-14 rounded-full object-cover border"
                />
              )}
              <div>
                {course.instructor_name && (
                  <div className="font-semibold text-lg">
                    {course.instructor_name}
                  </div>
                )}
                {course.instructor_title && (
                  <div className="text-sm text-gray-500">
                    {course.instructor_title}
                  </div>
                )}
                {course.instructor_bio && (
                  <div className="text-xs text-gray-600 mt-1">
                    {course.instructor_bio}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Lessons</p>
              <p className="text-lg font-semibold">
                {course.lessons?.count ?? course.total_lessons ?? 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Enrolled Students</p>
              <p className="text-lg font-semibold">
                {course.enrollment_count ?? course.enrolled ?? 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-lg font-semibold">
                {course.price ? `₦${course.price}` : 'Free'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Duration</p>
              <p className="text-lg font-semibold">
                {course.total_duration || '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Difficulty</p>
              <p className="text-lg font-semibold">
                {course.difficulty_level || '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Language</p>
              <p className="text-lg font-semibold">{course.language || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="text-lg font-semibold">{course.category || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Subcategory</p>
              <p className="text-lg font-semibold">
                {course.subcategory || '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Featured</p>
              <p className="text-lg font-semibold">
                {course.featured ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Rating</p>
              <p className="text-lg font-semibold">
                {course.rating ?? '-'}{' '}
                {course.number_of_ratings
                  ? `(${course.number_of_ratings} ratings)`
                  : ''}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-lg font-semibold">
                {course.last_updated
                  ? new Date(course.last_updated).toLocaleDateString()
                  : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="text-lg font-semibold">
                {course.created_at
                  ? new Date(course.created_at).toLocaleDateString()
                  : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Updated At</p>
              <p className="text-lg font-semibold">
                {course.updated_at
                  ? new Date(course.updated_at).toLocaleDateString()
                  : '-'}
              </p>
            </div>
          </div>

          {/* Certificate Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Certificate</p>
              <p className="text-lg font-semibold">
                {course.certificate_available ? 'Available' : 'Not Available'}
              </p>
              {course.certificate_image && (
                <img
                  src={course.certificate_image}
                  alt="Certificate"
                  className="w-24 h-16 rounded border mt-2 object-cover"
                />
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-2">
            {course.description && (
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-700 whitespace-pre-line">
                  {course.description}
                </p>
              </div>
            )}
            {course.requirements && (
              <div>
                <p className="text-sm text-gray-500">Requirements</p>
                <p className="text-gray-700 whitespace-pre-line">
                  {course.requirements}
                </p>
              </div>
            )}
            {course.what_you_will_learn && (
              <div>
                <p className="text-sm text-gray-500">What You Will Learn</p>
                <p className="text-gray-700 whitespace-pre-line">
                  {course.what_you_will_learn}
                </p>
              </div>
            )}
            {course.skills_covered && (
              <div>
                <p className="text-sm text-gray-500">Skills Covered</p>
                <p className="text-gray-700 whitespace-pre-line">
                  {Array.isArray(course.skills_covered)
                    ? course.skills_covered.join(', ')
                    : course.skills_covered}
                </p>
              </div>
            )}
            {course.tags && (
              <div>
                <p className="text-sm text-gray-500">Tags</p>
                <p className="text-gray-700 whitespace-pre-line">
                  {Array.isArray(course.tags)
                    ? course.tags.join(', ')
                    : course.tags}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseViewModal;
