import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Plus, Edit, Trash2, Eye, Upload, BookOpen } from 'lucide-react';
import CourseViewModal from './modals/CourseViewModal';
import CourseEditModal from './modals/CourseEditModal';
import DeleteConfirmModal from './modals/DeleteConfirmModal';
import CourseSectionModal from './modals/CourseSectionModal';
import { useToast } from '../hooks/use-toast';

import {
  useCourses,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
} from '@/hooks/useCourses';

const CourseManagement = () => {
  const { toast } = useToast();
  const { data: courses = [], isLoading } = useCourses();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sectionModalOpen, setSectionModalOpen] = useState(false);

  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    coverImage: '',
  });

  const handleView = (course) => {
    setSelectedCourse(course);
    setViewModalOpen(true);
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setEditModalOpen(true);
  };

  const handleDelete = (course) => {
    setSelectedCourse(course);
    setDeleteModalOpen(true);
  };

  const handleManageContent = (course) => {
    setSelectedCourse(course);
    setSectionModalOpen(true);
  };

  const handleCreateCourse = async () => {
    try {
      await createCourse.mutateAsync({
        title: newCourse.title,
        description: newCourse.description,
        cover_image: newCourse.coverImage || '',
      });
      setNewCourse({ title: '', description: '', coverImage: '' });
      toast({
        title: 'Course created',
        description: 'The course has been successfully added.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
      });
    }
  };

  const handleSave = async (updatedCourse) => {
    try {
      await updateCourse.mutateAsync(updatedCourse);
      toast({
        title: 'Course updated',
        description: `${updatedCourse.title} has been successfully updated.`,
      });
      setEditModalOpen(false);
    } catch (error) {
      toast({
        title: 'Update failed',
        description: error.message,
      });
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteCourse.mutateAsync(selectedCourse.id);
      toast({
        title: 'Course deleted',
        description: `${selectedCourse.title} has been removed.`,
      });
      setSelectedCourse(null);
      setDeleteModalOpen(false);
    } catch (error) {
      toast({
        title: 'Delete failed',
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Course Management
          </h1>
          <p className="text-gray-600 mt-2">
            Create and manage your educational content
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus size={20} className="mr-2" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-[#f7f7f7]">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <Label htmlFor="course-title">Course Title</Label>
                <Input
                  id="course-title"
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                  placeholder="Enter course title"
                />
              </div>

              <div>
                <Label htmlFor="course-description">Description</Label>
                <Textarea
                  id="course-description"
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                  placeholder="Enter course description"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="course-cover">Cover Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Click to upload cover image</p>
                  <Input
                    type="file"
                    className="hidden"
                    id="course-cover"
                    accept="image/*"
                  />
                </div>
              </div>

              <Button
                className="w-full bg-[#010413] text-white"
                onClick={handleCreateCourse}
              >
                Create Course
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                <span className="text-gray-500">Course Cover</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {course.title}
                  </h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Published
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {course.description}
                </p>

                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{course.lessons || 0} lessons</span>
                  <span>{course.enrolled || 0} enrolled</span>
                </div>

                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#eaecf0] hover:bg-[#f0f5f7]"
                      onClick={() => handleView(course)}
                    >
                      <Eye size={16} className="mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#eaecf0] hover:bg-[#f0f5f7]"
                      onClick={() => handleEdit(course)}
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(course)}
                      className="text-red-600 hover:text-red-700 border-[#eaecf0] hover:bg-[#f0f5f7]"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                    onClick={() => handleManageContent(course)}
                  >
                    <BookOpen size={16} className="mr-2" />
                    Manage Content
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CourseViewModal
        course={selectedCourse}
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />
      <CourseEditModal
        course={selectedCourse}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
      />
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={`Delete "${selectedCourse?.title}"`}
        message="Are you sure you want to delete this course? This action cannot be undone and will affect all enrolled students."
      />
      <CourseSectionModal
        courseId={selectedCourse?.id || null}
        courseTitle={selectedCourse?.title || ''}
        isOpen={sectionModalOpen}
        onClose={() => setSectionModalOpen(false)}
      />
    </div>
  );
};

export default CourseManagement;
