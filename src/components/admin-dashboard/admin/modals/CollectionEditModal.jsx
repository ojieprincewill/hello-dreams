import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Switch } from '../../ui/switch';
import { Upload } from 'lucide-react';
import supabase from '../../../../supabase/client';

const CollectionEditModal = ({ item, isOpen, onClose, onSave }) => {
  const [editedItem, setEditedItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Define the available sizes
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  useEffect(() => {
    if (item) {
      setEditedItem({
        ...item,
        sizes: Array.isArray(item.sizes) ? item.sizes : [],
      });
      setImagePreview(item.image);
      setImageFile(null);
    }
  }, [item]);

  // Image upload function
  const uploadImage = async (file) => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `collections-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('collections-images')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error('Failed to upload image');
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('collections-images').getPublicUrl(filePath);

    return publicUrl;
  };

  // Handle image change
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

  const handleSave = async () => {
    if (editedItem) {
      try {
        let imageUrl = editedItem.image;

        // Upload image if a new file is selected
        if (imageFile) {
          imageUrl = await uploadImage(imageFile);
        }

        const updatedItem = {
          ...editedItem,
          image: imageUrl,
        };

        onSave(updatedItem);
        onClose();
      } catch (error) {
        console.error('Error uploading image:', error);
        // Still save the item even if image upload fails
        onSave(editedItem);
        onClose();
      }
    }
  };

  if (!editedItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <Label htmlFor="edit-item-title">Item Title</Label>
            <Input
              id="edit-item-title"
              value={editedItem.title || ''}
              onChange={(e) =>
                setEditedItem({ ...editedItem, title: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-item-price">Price (₦)</Label>
              <Input
                id="edit-item-price"
                type="number"
                value={editedItem.price || 0}
                onChange={(e) =>
                  setEditedItem({
                    ...editedItem,
                    price: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="edit-item-category">Category</Label>
              <Select
                value={editedItem.category || ''}
                onValueChange={(value) =>
                  setEditedItem({ ...editedItem, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="T-Shirts">T-Shirts</SelectItem>
                  <SelectItem value="Hoodies">Hoodies</SelectItem>
                  <SelectItem value="Mugs">Mugs</SelectItem>
                  <SelectItem value="Caps">Caps</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="edit-item-quality">Quality</Label>
            <Select
              value={editedItem.quality || ''}
              onValueChange={(value) =>
                setEditedItem({ ...editedItem, quality: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Regular">Regular</SelectItem>
                <SelectItem value="High-quality">High-quality</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="edit-item-sizes">Available Sizes</Label>
            <Select
              value=""
              onValueChange={(value) => {
                if (editedItem.sizes.includes(value)) {
                  setEditedItem({
                    ...editedItem,
                    sizes: editedItem.sizes.filter((s) => s !== value),
                  });
                } else {
                  setEditedItem({
                    ...editedItem,
                    sizes: [...editedItem.sizes, value],
                  });
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sizes" />
              </SelectTrigger>
              <SelectContent>
                {allSizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`edit-checkbox-${size}`}
                        checked={editedItem.sizes.includes(size)}
                        onChange={() => {
                          if (editedItem.sizes.includes(size)) {
                            setEditedItem({
                              ...editedItem,
                              sizes: editedItem.sizes.filter((s) => s !== size),
                            });
                          } else {
                            setEditedItem({
                              ...editedItem,
                              sizes: [...editedItem.sizes, size],
                            });
                          }
                        }}
                      />
                      <label htmlFor={`edit-checkbox-${size}`}>{size}</label>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {editedItem.sizes.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {editedItem.sizes.map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-item-shipment">Shipment Info</Label>
              <Input
                id="edit-item-shipment"
                value={editedItem.shipment || ''}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, shipment: e.target.value })
                }
                placeholder="We ship to all parts of Nigeria"
              />
            </div>

            <div>
              <Label htmlFor="edit-item-ship-time">Shipping Time</Label>
              <Input
                id="edit-item-ship-time"
                value={editedItem.ship_time || ''}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, ship_time: e.target.value })
                }
                placeholder="Shipping takes 5 to 7 working days"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="edit-in-stock"
              checked={editedItem.instock ?? true}
              onCheckedChange={(checked) =>
                setEditedItem({ ...editedItem, instock: checked })
              }
            />
            <Label htmlFor="edit-in-stock">In Stock</Label>
          </div>

          <div>
            <Label htmlFor="edit-item-image">Product Image</Label>
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
                      setEditedItem({ ...editedItem, image: '' });
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <>
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Click to upload product image</p>
                </>
              )}
              <div className="mt-4">
                <Input
                  type="file"
                  id="edit-item-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>
            </div>
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

export default CollectionEditModal;
