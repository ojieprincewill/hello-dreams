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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import supabase from '@/supabase/client';

const CourseEditModal = ({ course, isOpen, onClose, onSave }) => {
  const [editedCourse, setEditedCourse] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
      <DialogContent className="max-w-2xl">
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
