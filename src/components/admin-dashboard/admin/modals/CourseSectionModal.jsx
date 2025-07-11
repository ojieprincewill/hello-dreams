import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import {
  Plus,
  Edit,
  Trash2,
  Video,
  Loader2,
  Upload,
  CheckCircle,
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { useLessons, useDeleteLesson } from '@/hooks/useLessons';
import {
  uploadLessonWithProgress,
  uploadThumbnailToStorage,
  uploadAttachmentsToStorage,
} from '../../../../services/uploadLessonToMux.js';
import { Progress } from '../../ui/progress';

const CourseSectionModal = ({ courseId, courseTitle, isOpen, onClose }) => {
  const { toast } = useToast();
  const [newLesson, setNewLesson] = useState({
    title: '',
    duration: '',
    description: '',
    section_title: '',
    thumbnail_image: '',
    resources: [],
    attachments: [],
    videoFile: null,
  });
  const [editingLesson, setEditingLesson] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    stage: '',
    percent: 0,
  });

  const { data: lessons = [], isLoading } = useLessons(courseId);
  const deleteLesson = useDeleteLesson();

  const handleAddLesson = async () => {
    if (
      !newLesson.title.trim() ||
      !newLesson.duration.trim() ||
      !newLesson.videoFile
    ) {
      toast({
        title: 'Missing information',
        description: 'Please provide title, duration, and video file.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setUploading(true);
      setUploadProgress({ stage: 'uploading', percent: 0 });

      // Upload video
      const res = await uploadLessonWithProgress({
        file: newLesson.videoFile,
        course_id: courseId,
        title: newLesson.title,
        duration: newLesson.duration,
        description: newLesson.description,
        onProgress: (progress) => setUploadProgress(progress),
      });

      // Upload thumbnail if present
      let thumbnailUrl = '';
      if (
        newLesson.thumbnail_image &&
        newLesson.thumbnail_image instanceof File
      ) {
        try {
          thumbnailUrl = await uploadThumbnailToStorage(
            newLesson.thumbnail_image,
          );
        } catch (err) {
          toast({
            title: 'Thumbnail upload failed',
            description: err.message,
            variant: 'destructive',
          });
          thumbnailUrl = '';
        }
      }

      // Upload attachments if present
      let attachmentsUrls = [];
      if (
        Array.isArray(newLesson.attachments) &&
        newLesson.attachments.some((a) => a instanceof File)
      ) {
        try {
          const files = newLesson.attachments.filter((a) => a instanceof File);
          attachmentsUrls = await uploadAttachmentsToStorage(files);
        } catch (err) {
          toast({
            title: 'Attachment upload failed',
            description: err.message,
            variant: 'destructive',
          });
          attachmentsUrls = [];
        }
      } else if (typeof newLesson.attachments === 'string') {
        attachmentsUrls = newLesson.attachments.split(',').map((s) => s.trim());
      } else if (Array.isArray(newLesson.attachments)) {
        attachmentsUrls = newLesson.attachments;
      }

      // Save lesson to DB (call your createLesson mutation or API here)
      // Example: await createLesson.mutateAsync({ ...newLesson, thumbnail_image: thumbnailUrl, attachments: attachmentsUrls });
      // You may need to adjust this to fit your actual mutation logic

      toast({
        title: 'Lesson added',
        description:
          'Video uploaded successfully and sent to Mux for processing. This may take a few minutes.',
      });

      setNewLesson({
        title: '',
        duration: '',
        description: '',
        section_title: '',
        thumbnail_image: '',
        resources: [],
        attachments: [],
        videoFile: null,
      });
      setShowAddLesson(false);
      setUploadProgress({ stage: '', percent: 0 });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Upload failed',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      setUploadProgress({ stage: '', percent: 0 });
    }
  };

  const handleDelete = async (lessonId) => {
    try {
      await deleteLesson.mutateAsync({ id: lessonId, courseId });
      toast({
        title: 'Lesson deleted',
        description: 'The lesson has been removed.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (lesson) => {
    setEditingLesson(lesson);
    setNewLesson({
      title: lesson.title,
      duration: lesson.duration,
      description: lesson.description,
      section_title: lesson.section_title || '',
      thumbnail_image: lesson.thumbnail_image || '',
      resources: lesson.resources || [],
      attachments: lesson.attachments || [],
      videoFile: null,
    });
    setShowAddLesson(true);
  };

  const getProgressMessage = () => {
    if (uploadProgress.stage === 'uploading') {
      return `Uploading video... ${uploadProgress.percent}%`;
    } else if (uploadProgress.stage === 'processing') {
      return 'Sending to Mux for processing...';
    }
    return '';
  };

  if (!courseId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Lessons for {courseTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Lessons</h3>
            <Button
              onClick={() => {
                setShowAddLesson(true);
                setNewLesson({
                  title: '',
                  duration: '',
                  description: '',
                  videoFile: null,
                });
                setEditingLesson(null);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus size={16} className="mr-2" />
              Add Lesson
            </Button>
          </div>

          {showAddLesson && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingLesson ? 'Edit Lesson' : 'New Lesson'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Lesson Title</Label>
                    <Input
                      value={newLesson.title}
                      onChange={(e) =>
                        setNewLesson({ ...newLesson, title: e.target.value })
                      }
                      placeholder="Enter title"
                    />
                  </div>
                  <div>
                    <Label>Section Title</Label>
                    <Input
                      value={newLesson.section_title}
                      onChange={(e) =>
                        setNewLesson({
                          ...newLesson,
                          section_title: e.target.value,
                        })
                      }
                      placeholder="Enter section title"
                    />
                  </div>
                  <div>
                    <Label>Duration (formatted)</Label>
                    <Input
                      value={newLesson.duration}
                      onChange={(e) =>
                        setNewLesson({ ...newLesson, duration: e.target.value })
                      }
                      placeholder="e.g., 4min"
                    />
                  </div>
                </div>
                <div>
                  <Label>Upload Video File</Label>
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      setNewLesson({
                        ...newLesson,
                        videoFile: e.target.files?.[0] || null,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Thumbnail Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setNewLesson({
                        ...newLesson,
                        thumbnail_image: e.target.files?.[0] || null,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>
                    Resources (comma separated URLs or file uploads)
                  </Label>
                  <Input
                    type="text"
                    value={
                      Array.isArray(newLesson.resources)
                        ? newLesson.resources.join(',')
                        : newLesson.resources
                    }
                    onChange={(e) =>
                      setNewLesson({
                        ...newLesson,
                        resources: e.target.value
                          .split(',')
                          .map((s) => s.trim()),
                      })
                    }
                    placeholder="https://example.com/resource1, https://example.com/resource2"
                  />
                </div>
                <div>
                  <Label>Attachments (upload one or more files)</Label>
                  <Input
                    type="file"
                    multiple
                    accept="*"
                    onChange={(e) =>
                      setNewLesson({
                        ...newLesson,
                        attachments: Array.from(e.target.files || []),
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Description (optional)</Label>
                  <Textarea
                    value={newLesson.description}
                    onChange={(e) =>
                      setNewLesson({
                        ...newLesson,
                        description: e.target.value,
                      })
                    }
                    placeholder="Write a brief description..."
                    rows={3}
                  />
                </div>

                {/* Upload Progress Indicator */}
                {uploading && (
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      {uploadProgress.stage === 'uploading' ? (
                        <Upload className="h-4 w-4 animate-pulse text-blue-600" />
                      ) : uploadProgress.stage === 'processing' ? (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      <span className="text-sm font-medium text-gray-700">
                        {getProgressMessage()}
                      </span>
                    </div>
                    {uploadProgress.stage === 'uploading' && (
                      <Progress
                        value={uploadProgress.percent}
                        className="w-full"
                      />
                    )}
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button onClick={handleAddLesson} disabled={uploading}>
                    {uploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {uploadProgress.stage === 'uploading'
                          ? 'Uploading...'
                          : 'Processing...'}
                      </>
                    ) : editingLesson ? (
                      'Save Changes'
                    ) : (
                      'Add Lesson'
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddLesson(false);
                      setEditingLesson(null);
                    }}
                    disabled={uploading}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {isLoading ? (
            <p className="text-sm text-gray-500">Loading lessons...</p>
          ) : (
            <div className="space-y-3">
              {lessons.map((lesson, index) => (
                <Card key={lesson.id} className="bg-white border">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500 w-6">
                        {index + 1}.
                      </span>
                      <Video className="text-blue-500" size={18} />
                      <div>
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-sm text-gray-500">
                          {lesson.duration}
                        </p>
                        <p className="text-xs text-gray-400">
                          {lesson.playback_id
                            ? '✔️ Mux Ready'
                            : '⏳ Processing...'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(lesson)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleDelete(lesson.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseSectionModal;
