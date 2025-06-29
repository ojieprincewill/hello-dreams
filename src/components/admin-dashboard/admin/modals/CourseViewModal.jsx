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
      <DialogContent className="max-w-2xl bg-[#fff]">
        <DialogHeader>
          <DialogTitle>Course Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
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

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{course.title}</h2>
              <Badge
                variant={
                  course.status === 'Published' ? 'default' : 'secondary'
                }
              >
                {course.status}
              </Badge>
            </div>

            <p className="text-gray-600">{course.description}</p>

            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Lessons</p>
                <p className="text-lg font-semibold">{course.lessons || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Enrolled Students</p>
                <p className="text-lg font-semibold">{course.enrolled || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseViewModal;
