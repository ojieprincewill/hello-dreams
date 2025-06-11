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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const CourseEditModal = ({ course, isOpen, onClose, onSave }) => {
  const [editedCourse, setEditedCourse] = useState(null);

  useEffect(() => {
    if (course) {
      setEditedCourse({ ...course });
    }
  }, [course]);

  const handleSave = () => {
    if (editedCourse) {
      onSave(editedCourse);
      onClose();
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
            <Button variant="outline" onClick={onClose} className="flex-1">
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
