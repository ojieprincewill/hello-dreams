import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus, Edit, Trash2, Eye, Upload, BookOpen } from "lucide-react";
import CourseViewModal from "./modals/CourseViewModal";
import CourseEditModal from "./modals/CourseEditModal";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";
import CourseSectionModal from "./modals/CourseSectionModal";
import { useToast } from "../hooks/use-toast";
import supabase from "@/supabase/client";

import {
  useCourses,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
} from '@/hooks/useCourses';
import { useTutors } from '@/hooks/useAcademy';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';

const CourseManagement = () => {
  const { toast } = useToast();
  const { data: courses = [], isLoading } = useCourses();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();
  const { data: tutors = [], isLoading: tutorsLoading } = useTutors();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sectionModalOpen, setSectionModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    cover_image: '',
    instructor_name: '',
    instructor_title: '',
    instructor_image: '',
    instructor_bio: '',
    price: '',
    total_lessons: '',
    total_duration: '',
    difficulty_level: '',
    language: '',
    captions_available: false,
    last_updated: null,
    certificate_available: false,
    certificate_image: '',
    requirements: '',
    what_you_will_learn: '',
    skills_covered: '',
    category: '',
    subcategory: '',
    tags: '',
    featured: false,
    status: 'Draft',
  });

  const resetForm = () => {
    setNewCourse({
      title: '',
      description: '',
      cover_image: '',
      instructor_name: '',
      instructor_title: '',
      instructor_image: '',
      instructor_bio: '',
      price: '',
      total_lessons: '',
      total_duration: '',
      difficulty_level: '',
      language: '',
      captions_available: false,
      last_updated: null,
      certificate_available: false,
      certificate_image: '',
      requirements: '',
      what_you_will_learn: '',
      skills_covered: '',
      category: '',
      subcategory: '',
      tags: '',
      featured: false,
      status: 'Draft',
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    if (!file) return null;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `course-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("course-images")
      .upload(filePath, file);

    if (uploadError) {
      throw new Error("Failed to upload image");
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("course-images").getPublicUrl(filePath);

    return publicUrl;
  };

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
    if (!newCourse.title || !newCourse.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Clean up the data before sending to database
      const courseData = {
        ...newCourse,
        cover_image: imageUrl || null,
        last_updated: newCourse.last_updated ? new Date(newCourse.last_updated).toISOString().split('T')[0] : null,
        skills_covered: newCourse.skills_covered
          ? newCourse.skills_covered.split(',').map((s) => s.trim()).filter(s => s)
          : [],
        tags: newCourse.tags
          ? newCourse.tags.split(',').map((s) => s.trim()).filter(s => s)
          : [],
        price: newCourse.price ? parseFloat(newCourse.price) : null,
        total_lessons: newCourse.total_lessons ? parseInt(newCourse.total_lessons) : null,
      };

      await createCourse.mutateAsync(courseData);
      resetForm();
      setCreateModalOpen(false);
      toast({
        title: "Course created",
        description: "The course has been successfully added.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSave = async (updatedCourse) => {
    try {
      await updateCourse.mutateAsync(updatedCourse);
      toast({
        title: "Course updated",
        description: `${updatedCourse.title} has been successfully updated.`,
      });
      setEditModalOpen(false);
    } catch (error) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteCourse.mutateAsync(selectedCourse.id);
      toast({
        title: "Course deleted",
        description: `${selectedCourse.title} has been removed.`,
      });
      setSelectedCourse(null);
      setDeleteModalOpen(false);
    } catch (error) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 xl:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl xl:text-3xl font-bold text-gray-900">
            Course Management
          </h1>
          <p className="text-sm xl:text-base text-gray-600 mt-1 xl:mt-2">
            Create and manage your educational content
          </p>
        </div>

        <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
              <Plus size={18} className="mr-2 xl:w-5 xl:h-5" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-[#f7f7f7] mx-4 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 xl:space-y-6">
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
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 xl:p-6 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto max-h-32 rounded-lg"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload
                        size={40}
                        className="mx-auto text-gray-400 mb-4 xl:w-12 xl:h-12"
                      />
                      <p className="text-sm xl:text-base text-gray-600">
                        Click to upload cover image
                      </p>
                    </>
                  )}
                  <div className="mt-4">
                    <Input
                      type="file"
                      id="course-cover"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="tutor-select">Tutor</Label>
                <Select
                  value={newCourse.instructor_name || ''}
                  onValueChange={(value) => {
                    const selected = tutors.find((t) => t.name === value);
                    setNewCourse({
                      ...newCourse,
                      instructor_name: selected?.name || '',
                      instructor_title: selected?.title || '',
                      instructor_image: selected?.avatar_url || '',
                      instructor_bio: selected?.bio || '',
                    });
                  }}
                  disabled={tutorsLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {newCourse.instructor_name ? (
                        <div className="flex items-center gap-2">
                          {newCourse.instructor_image && (
                            <img
                              src={newCourse.instructor_image}
                              alt="Tutor avatar"
                              className="w-6 h-6 rounded-full"
                            />
                          )}
                          <span>{newCourse.instructor_name}</span>
                        </div>
                      ) : (
                        <span>Select a tutor</span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {tutors.map((tutor) => (
                      <SelectItem key={tutor.id} value={tutor.name}>
                        <div className="flex items-center gap-2">
                          {tutor.avatar_url && (
                            <img
                              src={tutor.avatar_url}
                              alt="Tutor avatar"
                              className="w-6 h-6 rounded-full"
                            />
                          )}
                          <span>{tutor.name}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({tutor.role})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {newCourse.instructor_name && (
                  <div className="flex items-center mt-2 space-x-2">
                    {newCourse.instructor_image && (
                      <img
                        src={newCourse.instructor_image}
                        alt="Tutor avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span>{newCourse.instructor_name}</span>
                    <span className="text-xs text-gray-500">
                      {newCourse.instructor_title}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="price">Price (NGN)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newCourse.price}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, price: e.target.value })
                  }
                  placeholder="Enter price"
                />
              </div>
              <div>
                <Label htmlFor="total_lessons">Total Lessons</Label>
                <Input
                  id="total_lessons"
                  type="number"
                  value={newCourse.total_lessons}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      total_lessons: e.target.value,
                    })
                  }
                  placeholder="Enter total lessons"
                />
              </div>
              <div>
                <Label htmlFor="total_duration">Total Duration</Label>
                <Input
                  id="total_duration"
                  value={newCourse.total_duration}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      total_duration: e.target.value,
                    })
                  }
                  placeholder="e.g. 5h 43m"
                />
              </div>
              <div>
                <Label htmlFor="difficulty_level">Difficulty Level</Label>
                <Input
                  id="difficulty_level"
                  value={newCourse.difficulty_level}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      difficulty_level: e.target.value,
                    })
                  }
                  placeholder="e.g. Beginner, Intermediate, Advanced"
                />
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  value={newCourse.language}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, language: e.target.value })
                  }
                  placeholder="e.g. English"
                />
              </div>
              <div>
                <Label htmlFor="captions_available">Captions Available</Label>
                <input
                  id="captions_available"
                  type="checkbox"
                  checked={newCourse.captions_available}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      captions_available: e.target.checked,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="last_updated">Last Updated</Label>
                <Input
                  id="last_updated"
                  type="date"
                  value={newCourse.last_updated || ''}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, last_updated: e.target.value || null })
                  }
                />
              </div>
              <div>
                <Label htmlFor="certificate_available">
                  Certificate Available
                </Label>
                <input
                  id="certificate_available"
                  type="checkbox"
                  checked={newCourse.certificate_available}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      certificate_available: e.target.checked,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="certificate_image">Certificate Image URL</Label>
                <Input
                  id="certificate_image"
                  value={newCourse.certificate_image}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      certificate_image: e.target.value,
                    })
                  }
                  placeholder="Enter certificate image URL"
                />
              </div>
              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={newCourse.requirements}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, requirements: e.target.value })
                  }
                  placeholder="Enter course requirements"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="what_you_will_learn">What You Will Learn</Label>
                <Textarea
                  id="what_you_will_learn"
                  value={newCourse.what_you_will_learn}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      what_you_will_learn: e.target.value,
                    })
                  }
                  placeholder="Enter what students will learn"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="skills_covered">
                  Skills Covered (comma separated)
                </Label>
                <Input
                  id="skills_covered"
                  value={newCourse.skills_covered}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      skills_covered: e.target.value,
                    })
                  }
                  placeholder="e.g. Figma, Auto Layout, Responsive Design"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newCourse.category}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, category: e.target.value })
                  }
                  placeholder="e.g. UI/UX Design"
                />
              </div>
              <div>
                <Label htmlFor="subcategory">Subcategory</Label>
                <Input
                  id="subcategory"
                  value={newCourse.subcategory}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, subcategory: e.target.value })
                  }
                  placeholder="e.g. Figma"
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newCourse.tags}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, tags: e.target.value })
                  }
                  placeholder="e.g. design, web, beginner"
                />
              </div>
              <div>
                <Label htmlFor="featured">Featured</Label>
                <input
                  id="featured"
                  type="checkbox"
                  checked={newCourse.featured}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, featured: e.target.checked })
                  }
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={newCourse.status}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, status: e.target.value })
                  }
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center overflow-hidden">
                {course.cover_image ? (
                  <img
                    src={course.cover_image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm xl:text-base">
                    Course Cover
                  </span>
                )}
              </div>
              <div className="p-4 xl:p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-base xl:text-lg text-gray-900 flex-1 min-w-0">
                    <span className="truncate block">{course.title}</span>
                  </h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2">
                    Published
                  </span>
                </div>
                <p className="text-gray-600 text-xs xl:text-sm mb-3 xl:mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex justify-between text-xs lg:text-sm text-gray-500 mb-3 lg:mb-4">
                  <span>{course.lessons?.count ?? 0} lessons</span>
                  <span>{course.enrolled || 0} enrolled</span>
                </div>

                <div className="space-y-2">
                  <div className="flex space-x-1 xl:space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#eaecf0] hover:bg-[#f0f5f7] text-xs xl:text-sm"
                      onClick={() => handleView(course)}
                    >
                      <Eye size={14} className="mr-1 xl:w-4 xl:h-4" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#eaecf0] hover:bg-[#f0f5f7] text-xs xl:text-sm"
                      onClick={() => handleEdit(course)}
                    >
                      <Edit size={14} className="mr-1 xl:w-4 xl:h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(course)}
                      className="text-red-600 hover:text-red-700 border-[#eaecf0] hover:bg-[#f0f5f7] text-xs xl:text-sm"
                    >
                      <Trash2 size={14} className="xl:w-4 xl:h-4" />
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 text-xs xl:text-sm"
                    onClick={() => handleManageContent(course)}
                  >
                    <BookOpen size={14} className="mr-2 xl:w-4 xl:h-4" />
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
        courseTitle={selectedCourse?.title || ""}
        isOpen={sectionModalOpen}
        onClose={() => setSectionModalOpen(false)}
      />
    </div>
  );
};

export default CourseManagement;
