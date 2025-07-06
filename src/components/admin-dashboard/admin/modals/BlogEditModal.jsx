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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Upload, User } from 'lucide-react';

const BlogEditModal = ({
  article,
  isOpen,
  onClose,
  onSave,
  imageFile,
  setImageFile,
  imagePreview,
  setImagePreview,
  handleImageChange,
  authorImageFile,
  setAuthorImageFile,
  authorImagePreview,
  setAuthorImagePreview,
  handleAuthorImageChange,
}) => {
  const [editedArticle, setEditedArticle] = useState(null);

  useEffect(() => {
    if (article) {
      setEditedArticle({ ...article });
    }
  }, [article]);

  const handleSave = () => {
    if (editedArticle) {
      // Merge the edited article with any new image files
      const updatedArticle = {
        ...editedArticle,
        // If there are new image files, they will be handled by the parent component
        // The parent component will upload them and update the URLs
      };
      onSave(updatedArticle);
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
            <Label htmlFor="edit-article-author">Author</Label>
            <Input
              id="edit-article-author"
              value={editedArticle.author || ''}
              onChange={(e) =>
                setEditedArticle({
                  ...editedArticle,
                  author: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="edit-author-image">Author Avatar</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {authorImagePreview ? (
                <div className="space-y-4">
                  <img
                    src={authorImagePreview}
                    alt="Author Preview"
                    className="mx-auto w-20 h-20 rounded-full object-cover"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setAuthorImageFile(null);
                      setAuthorImagePreview(null);
                    }}
                  >
                    Remove Avatar
                  </Button>
                </div>
              ) : (
                <>
                  <User size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Click to upload author avatar</p>
                </>
              )}
              <div className="mt-4">
                <Input
                  type="file"
                  id="edit-author-image"
                  accept="image/*"
                  onChange={handleAuthorImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="edit-article-image">Featured Image</Label>
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
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <>
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">
                    Click to upload featured image
                  </p>
                </>
              )}
              <div className="mt-4">
                <Input
                  type="file"
                  id="edit-article-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
              </div>
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
              value={editedArticle.published ? 'Published' : 'Draft'}
              onValueChange={(value) =>
                setEditedArticle({
                  ...editedArticle,
                  published: value === 'Published',
                })
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
