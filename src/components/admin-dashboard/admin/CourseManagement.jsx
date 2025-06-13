import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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

const CourseManagement = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Advanced UI Design",
      description:
        "Master the art of user interface design with advanced techniques and tools.",
      coverImage: "/placeholder-course.jpg",
      lessons: 12,
      enrolled: 156,
      status: "Published",
    },
    {
      id: 2,
      title: "UX Research Fundamentals",
      description:
        "Learn the basics of user experience research and validation methods.",
      coverImage: "/placeholder-course.jpg",
      lessons: 8,
      enrolled: 89,
      status: "Draft",
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sectionModalOpen, setSectionModalOpen] = useState(false);

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    coverImage: "",
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

  const confirmDelete = () => {
    if (selectedCourse) {
      setCourses(courses.filter((c) => c.id !== selectedCourse.id));
      toast({
        title: "Course deleted",
        description: `${selectedCourse.title} has been successfully deleted.`,
      });
      setDeleteModalOpen(false);
      setSelectedCourse(null);
    }
  };

  const handleSave = (updatedCourse) => {
    setCourses(
      courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
    );
    toast({
      title: "Course updated",
      description: `${updatedCourse.title} has been successfully updated.`,
    });
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
            <Button className="bg-blue-600 hover:bg-blue-700 text-[#fff] cursor-pointer">
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

              <Button className="w-full bg-[#010413] text-[#fff]">
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
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.status === "Published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {course.description}
                </p>

                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{course.lessons} lessons</span>
                  <span>{course.enrolled} enrolled</span>
                </div>

                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#eaecf0] hover:bg-[#f0f5f7] cursor-pointer"
                      onClick={() => handleView(course)}
                    >
                      <Eye size={16} className="mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#eaecf0] hover:bg-[#f0f5f7] cursor-pointer"
                      onClick={() => handleEdit(course)}
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(course)}
                      className="text-red-600 hover:text-red-700 border-[#eaecf0] hover:bg-[#f0f5f7] cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 hover:text-[#010413] cursor-pointer"
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
        courseTitle={selectedCourse?.title || ""}
        isOpen={sectionModalOpen}
        onClose={() => setSectionModalOpen(false)}
      />
    </div>
  );
};

export default CourseManagement;
