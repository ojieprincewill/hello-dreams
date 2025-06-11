import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Plus, Edit, Trash2, Upload, Video } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

const CourseSectionModal = ({ courseId, courseTitle, isOpen, onClose }) => {
  const { toast } = useToast();
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Section & Div Block",
      lessons: [
        {
          id: 1,
          title: "Read-only version of chat app",
          duration: "4min",
          videoUrl: "",
        },
        { id: 2, title: "Site Settings", duration: "4min", videoUrl: "" },
      ],
    },
  ]);

  const [newSection, setNewSection] = useState({ title: "" });
  const [newLesson, setNewLesson] = useState({
    title: "",
    duration: "",
    videoUrl: "",
    description: "",
    sectionId: 0,
  });
  const [editingSection, setEditingSection] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [showAddSection, setShowAddSection] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState(null);

  const addSection = () => {
    if (newSection.title.trim()) {
      const section = {
        id: Date.now(),
        title: newSection.title,
        lessons: [],
      };
      setSections([...sections, section]);
      setNewSection({ title: "" });
      setShowAddSection(false);
      toast({
        title: "Section added",
        description: `${section.title} has been added to the course.`,
      });
    }
  };

  const addLesson = (sectionId) => {
    if (newLesson.title.trim() && newLesson.duration.trim()) {
      const lesson = {
        id: Date.now(),
        title: newLesson.title,
        duration: newLesson.duration,
        videoUrl: newLesson.videoUrl,
        description: newLesson.description,
      };

      setSections(
        sections.map((section) =>
          section.id === sectionId
            ? { ...section, lessons: [...section.lessons, lesson] }
            : section
        )
      );

      setNewLesson({
        title: "",
        duration: "",
        videoUrl: "",
        description: "",
        sectionId: 0,
      });
      setShowAddLesson(null);
      toast({
        title: "Lesson added",
        description: `${lesson.title} has been added to the section.`,
      });
    }
  };

  const deleteSection = (sectionId) => {
    setSections(sections.filter((s) => s.id !== sectionId));
    toast({
      title: "Section deleted",
      description: "Section has been removed from the course.",
    });
  };

  const deleteLesson = (sectionId, lessonId) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.filter((l) => l.id !== lessonId),
            }
          : section
      )
    );
    toast({
      title: "Lesson deleted",
      description: "Lesson has been removed from the section.",
    });
  };

  if (!courseId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Course Content - {courseTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Course Sections</h3>
            <Button
              onClick={() => setShowAddSection(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus size={16} className="mr-2" />
              Add Section
            </Button>
          </div>

          {showAddSection && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="section-title">Section Title</Label>
                  <Input
                    id="section-title"
                    value={newSection.title}
                    onChange={(e) =>
                      setNewSection({ ...newSection, title: e.target.value })
                    }
                    placeholder="Enter section title"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={addSection}>Add Section</Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddSection(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {sections.map((section) => (
              <Card key={section.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAddLesson(section.id)}
                      >
                        <Plus size={16} className="mr-1" />
                        Add Lesson
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteSection(section.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {showAddLesson === section.id && (
                    <Card className="mb-4 bg-gray-50">
                      <CardContent className="p-4 space-y-4">
                        <h4 className="font-semibold">Add New Lesson</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`lesson-title-${section.id}`}>
                              Lesson Title
                            </Label>
                            <Input
                              id={`lesson-title-${section.id}`}
                              value={newLesson.title}
                              onChange={(e) =>
                                setNewLesson({
                                  ...newLesson,
                                  title: e.target.value,
                                })
                              }
                              placeholder="Enter lesson title"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`lesson-duration-${section.id}`}>
                              Duration
                            </Label>
                            <Input
                              id={`lesson-duration-${section.id}`}
                              value={newLesson.duration}
                              onChange={(e) =>
                                setNewLesson({
                                  ...newLesson,
                                  duration: e.target.value,
                                })
                              }
                              placeholder="e.g., 4min"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`lesson-video-${section.id}`}>
                            Video Upload
                          </Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <Upload
                              size={32}
                              className="mx-auto text-gray-400 mb-2"
                            />
                            <p className="text-gray-600 text-sm">
                              Click to upload video file
                            </p>
                            <Input
                              type="file"
                              className="hidden"
                              id={`lesson-video-${section.id}`}
                              accept="video/*"
                              onChange={(e) =>
                                setNewLesson({
                                  ...newLesson,
                                  videoUrl: e.target.files?.[0]?.name || "",
                                })
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`lesson-description-${section.id}`}>
                            Description (Optional)
                          </Label>
                          <Textarea
                            id={`lesson-description-${section.id}`}
                            value={newLesson.description}
                            onChange={(e) =>
                              setNewLesson({
                                ...newLesson,
                                description: e.target.value,
                              })
                            }
                            placeholder="Enter lesson description"
                            rows={3}
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={() => addLesson(section.id)}>
                            Add Lesson
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setShowAddLesson(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {section.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3 bg-white border rounded-lg hover:shadow-sm"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500 font-mono w-6">
                          {index + 1}.
                        </span>
                        <Video size={16} className="text-blue-500" />
                        <div>
                          <p className="font-medium">{lesson.title}</p>
                          <p className="text-sm text-gray-500">
                            {lesson.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingLesson(lesson)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteLesson(section.id, lesson.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseSectionModal;
