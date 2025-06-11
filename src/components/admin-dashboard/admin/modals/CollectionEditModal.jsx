import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Switch } from "../../ui/switch";
import { Upload } from "lucide-react";

const CollectionEditModal = ({ item, isOpen, onClose, onSave }) => {
  const [editedItem, setEditedItem] = useState(null);

  useEffect(() => {
    if (item) {
      setEditedItem({ ...item });
    }
  }, [item]);

  const handleSave = () => {
    if (editedItem) {
      onSave(editedItem);
      onClose();
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
            <Label htmlFor="edit-item-name">Item Name</Label>
            <Input
              id="edit-item-name"
              value={editedItem.name}
              onChange={(e) =>
                setEditedItem({ ...editedItem, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-item-price">Price (₦)</Label>
              <Input
                id="edit-item-price"
                type="number"
                value={editedItem.price}
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
                value={editedItem.category}
                onValueChange={(value) =>
                  setEditedItem({ ...editedItem, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
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
              value={editedItem.quality}
              onValueChange={(value) =>
                setEditedItem({ ...editedItem, quality: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Regular">Regular</SelectItem>
                <SelectItem value="High-quality">High-quality</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="edit-item-sizes">
              Available Sizes (comma separated)
            </Label>
            <Input
              id="edit-item-sizes"
              value={editedItem.sizes.join(", ")}
              onChange={(e) =>
                setEditedItem({
                  ...editedItem,
                  sizes: e.target.value.split(", ").filter((s) => s.trim()),
                })
              }
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="edit-in-stock"
              checked={editedItem.inStock}
              onCheckedChange={(checked) =>
                setEditedItem({ ...editedItem, inStock: checked })
              }
            />
            <Label htmlFor="edit-in-stock">In Stock</Label>
          </div>

          <div>
            <Label htmlFor="edit-item-image">Product Image</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Click to upload product image</p>
              <Input
                type="file"
                className="hidden"
                id="edit-item-image"
                accept="image/*"
              />
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
