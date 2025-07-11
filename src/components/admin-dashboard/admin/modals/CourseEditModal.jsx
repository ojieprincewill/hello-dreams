import React, { useState, useEffect } from 'react';
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
import { Upload } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../ui/select';
import supabase from '@/supabase/client';
import { useTutors } from '@/hooks/useAcademy';

const CourseEditModal = ({ course, isOpen, onClose, onSave }) => {
  const [editedCourse, setEditedCourse] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { data: tutors = [], isLoading: tutorsLoading } = useTutors();

  useEffect(() => {
    if (course) {
      setEditedCourse({ ...course });
      setImagePreview(course.cover_image);
      setImageFile(null);
    }
  }, [course]);

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

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `course-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('course-images')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error('Failed to upload image');
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('course-images').getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSave = async () => {
    if (editedCourse) {
      try {
        let imageUrl = editedCourse.cover_image;
        if (imageFile) {
          imageUrl = await uploadImage(imageFile);
        }

        const updatedCourse = {
          ...editedCourse,
          cover_image: imageUrl,
          skills_covered:
            typeof editedCourse.skills_covered === 'string'
              ? editedCourse.skills_covered.split(',').map((s) => s.trim())
              : editedCourse.skills_covered,
          tags:
            typeof editedCourse.tags === 'string'
              ? editedCourse.tags.split(',').map((s) => s.trim())
              : editedCourse.tags,
        };

        onSave(updatedCourse);
        onClose();
      } catch (error) {
        console.error('Error uploading image:', error);
        // Still save the course even if image upload fails
        onSave(editedCourse);
        onClose();
      }
    }
  };

  if (!editedCourse) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <Label htmlFor="edit-course-title">Course Title</Label>
            <Input
              id="edit-course-title"
              value={editedCourse.title}
              onChange={(e) =>
                setEditedCourse({ ...editedCourse, title: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="edit-course-description">Description</Label>
            <Textarea
              id="edit-course-description"
              value={editedCourse.description}
              onChange={(e) =>
                setEditedCourse({
                  ...editedCourse,
                  description: e.target.value,
                })
              }
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="edit-course-cover">Cover Image</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                      setEditedCourse({ ...editedCourse, cover_image: '' });
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <>
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Click to upload cover image</p>
                </>
              )}
              <div className="mt-4">
                <Input
                  type="file"
                  id="edit-course-cover"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Replace instructor fields with tutor select */}
          <div>
            <Label htmlFor="edit-tutor-select">Tutor</Label>
            <Select
              value={editedCourse.tutor_id || ''}
              onValueChange={(value) => {
                const selected = tutors.find((t) => t.id === value);
                setEditedCourse({
                  ...editedCourse,
                  tutor_id: selected?.id || '',
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
                  {editedCourse.tutor_id ? (
                    <div className="flex items-center gap-2">
                      {editedCourse.instructor_image && (
                        <img
                          src={editedCourse.instructor_image}
                          alt="Tutor avatar"
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <span>{editedCourse.instructor_name}</span>
                    </div>
                  ) : (
                    <span>Select a tutor</span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {tutors.map((tutor) => (
                  <SelectItem key={tutor.id} value={tutor.id}>
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
            {editedCourse.tutor_id && (
              <div className="flex items-center mt-2 space-x-2">
                {editedCourse.instructor_image && (
                  <img
                    src={editedCourse.instructor_image}
                    alt="Tutor avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span>{editedCourse.instructor_name}</span>
                <span className="text-xs text-gray-500">
                  {editedCourse.instructor_title}
                </span>
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="edit-price">Price (NGN)</Label>
            <Input
              id="edit-price"
              type="number"
              value={editedCourse.price || ''}
              onChange={(e) =>
                setEditedCourse({ ...editedCourse, price: e.target.value })
              }
              placeholder="Enter price"
            />
          </div>
          <div>
            <Label htmlFor="edit-total_lessons">Total Lessons</Label>
            <Input
              id="edit-total_lessons"
              type="number"
              value={editedCourse.total_lessons || ''}
              onChange={(e) =>
                setEditedCourse({
                  ...editedCourse,
                  total_lessons: e.target.value,
                })
              }
              placeholder="Enter total lessons"
            />
          </div>
          <div>
            <Label htmlFor="edit-total_duration">Total Duration</Label>
            <Input
              id="edit-total_duration"
              value={editedCourse.total_duration || ''}
              onChange={(e) =>
                setEditedCourse({
                  ...editedCourse,
                  total_duration: e.target.value,
                })
              }
              placeholder="e.g. 5h 43m"
            />
          </div>
          <div>
            <Label htmlFor="edit-difficulty_level">Difficulty Level</Label>
            <Input
              id="edit-difficulty_level"
              value={editedCourse.difficulty_level || ''}
              onChange={(e) =>
                setEditedCourse({
                  ...editedCourse,
                  difficulty_level: e.target.value,
                })
              }
              placeholder="e.g. Beginner, Intermediate, Advanced"
            />
          </div>
          <div>
            <Label htmlFor="edit-language">Language</Label>
            <Input
              id="edit-language"
              value={editedCourse.language || ''}
              onChange={(e) =>
                setEditedCourse({ ...editedCourse, language: e.target.value })
              }
              placeholder="e.g. English"
            />
          </div>
          <div>
            <Label htmlFor="edit-captions_available">Captions Available</Label>
            <input
              id="edit-captions_available"
              type="checkbox"
              checked={!!editedCourse.captions_available}
              onChange={(e) =>
                setEditedCourse({
                  ...editedCourse,
                  captions_available: e.target.checked,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="edit-last_updated">Last Updated</Label>
            <Input
              id="edit-last_updated"
              type="date"
              value={editedCourse.last_updated || ''}
              onChange={(e) =>
                setEditedCourse({
                  ...editedCourse,
                  last_updated: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="edit-certificate_available">
              Certificate Available
            </Label>
            <input
              id="edit-certificate_available"
              type="checkbox"
              checked={!!editedCourse.certificate_available}
              onChange={(e) =>
                setEditedCourse({
                  ...editedCourse,
                  certificate_available: e.target.checked,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="edit-certificate_image">
              Certificate Image URL
            </Label>
            <Input
              id="edit-certificate_image"
              value={editedCourse.certificate_image || ''}
              onChange={(e) =>
                setEditedCourse({
                  ...editedCourse,
                  certificate_image: e.target.value,
                })
              }
              placeholder="Enter certificate image URL"
            />
          </div>
          <div>
            <Label htmlFor="edit-requirements">Requirements</Label>
            <Textarea
              id="edit-requirements"
              value={editedCourse.requirements || ''}
              onChange={(e) =>
                setEditedCourse({
                  ...editedCourse,
                  requirements: e.target.value,
                })
              }
              placeholder="Enter course requirements"
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="edit-what_you_will_learn">
              What You Will Learn
            </Label>
            <Textarea
              id="edit-what_you_will_learn"
              value={editedCourse.what_you_will_learn || ''}
              onChange={(e) =>
                setEditedCourse({
                  ...editedCourse,
                  what_you_will_learn: e.target.value,
                })
              }
              placeholder="Enter what students will learn"
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="edit-skills_covered">
              Skills Covered (comma separated)
            </Label>
            <Input
              id="edit-skills_covered"
              value={
                Array.isArray(editedCourse.skills_covered)
                  ? editedCourse.skills_covered.join(', ')
                  : editedCourse.skills_covered || ''
              }
              onChange={(e) =>
                setEditedCourse({
                  ...editedCourse,
                  skills_covered: e.target.value,
                })
              }
              placeholder="e.g. Figma, Auto Layout, Responsive Design"
            />
          </div>
          <div>
            <Label htmlFor="edit-category">Category</Label>
            <Input
              id="edit-category"
              value={editedCourse.category || ''}
              onChange={(e) =>
                setEditedCourse({ ...editedCourse, category: e.target.value })
              }
              placeholder="e.g. UI/UX Design"
            />
          </div>
          <div>
            <Label htmlFor="edit-subcategory">Subcategory</Label>
            <Input
              id="edit-subcategory"
              value={editedCourse.subcategory || ''}
              onChange={(e) =>
                setEditedCourse({
                  ...editedCourse,
                  subcategory: e.target.value,
                })
              }
              placeholder="e.g. Figma"
            />
          </div>
          <div>
            <Label htmlFor="edit-tags">Tags (comma separated)</Label>
            <Input
              id="edit-tags"
              value={
                Array.isArray(editedCourse.tags)
                  ? editedCourse.tags.join(', ')
                  : editedCourse.tags || ''
              }
              onChange={(e) =>
                setEditedCourse({ ...editedCourse, tags: e.target.value })
              }
              placeholder="e.g. design, web, beginner"
            />
          </div>
          <div>
            <Label htmlFor="edit-featured">Featured</Label>
            <input
              id="edit-featured"
              type="checkbox"
              checked={!!editedCourse.featured}
              onChange={(e) =>
                setEditedCourse({ ...editedCourse, featured: e.target.checked })
              }
            />
          </div>

          <div>
            <Label htmlFor="edit-course-status">Status</Label>
            <Select
              value={editedCourse.status}
              onValueChange={(value) =>
                setEditedCourse({ ...editedCourse, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 ">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseEditModal;
