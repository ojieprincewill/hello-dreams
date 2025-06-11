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
import { User } from "lucide-react";

const BlogEditModal = ({ article, isOpen, onClose, onSave }) => {
  const [editedArticle, setEditedArticle] = useState(null);

  useEffect(() => {
    if (article) {
      setEditedArticle({ ...article });
    }
  }, [article]);

  const handleSave = () => {
    if (editedArticle) {
      onSave(editedArticle);
      onClose();
    }
  };

  if (!editedArticle) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Article</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <Label htmlFor="edit-article-title">Article Title</Label>
            <Input
              id="edit-article-title"
              value={editedArticle.title}
              onChange={(e) =>
                setEditedArticle({ ...editedArticle, title: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="edit-publisher-name">Publisher Name</Label>
            <Input
              id="edit-publisher-name"
              value={editedArticle.publisherName}
              onChange={(e) =>
                setEditedArticle({
                  ...editedArticle,
                  publisherName: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="edit-publisher-image">Publisher Image</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <User size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Click to upload publisher image</p>
              <Input
                type="file"
                className="hidden"
                id="edit-publisher-image"
                accept="image/*"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="edit-article-content">Article Content</Label>
            <Textarea
              id="edit-article-content"
              value={editedArticle.content}
              onChange={(e) =>
                setEditedArticle({ ...editedArticle, content: e.target.value })
              }
              rows={15}
              className="min-h-[300px]"
            />
          </div>

          <div>
            <Label htmlFor="edit-article-status">Status</Label>
            <Select
              value={editedArticle.status}
              onValueChange={(value) =>
                setEditedArticle({ ...editedArticle, status: value })
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

export default BlogEditModal;
