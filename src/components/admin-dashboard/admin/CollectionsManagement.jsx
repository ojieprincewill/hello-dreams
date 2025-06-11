import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  ShoppingBag,
  Star,
} from "lucide-react";
import CollectionViewModal from "./modals/CollectionViewModal";
import CollectionEditModal from "./modals/CollectionEditModal";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";
import { useToast } from "../hooks/use-toast";

const CollectionsManagement = () => {
  const { toast } = useToast();
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Yellow Hoodie Unisex",
      price: 25000,
      image: "/placeholder-product.jpg",
      sizes: ["S", "M", "L", "XL"],
      quality: "High-quality",
      category: "Hoodies",
      inStock: true,
    },
    {
      id: 2,
      name: "T-Shirt Mockup",
      price: 15000,
      image: "/placeholder-product.jpg",
      sizes: ["S", "M", "L", "XL", "XXL"],
      quality: "Regular",
      category: "T-Shirts",
      inStock: true,
    },
    {
      id: 3,
      name: "Design Notebook",
      price: 8000,
      image: "/placeholder-product.jpg",
      sizes: ["A5"],
      quality: "Premium",
      category: "Accessories",
      inStock: false,
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    image: "",
    sizes: [""],
    quality: "Regular",
    category: "T-Shirts",
  });

  const handleView = (item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedItem) {
      setItems(items.filter((i) => i.id !== selectedItem.id));
      toast({
        title: "Item deleted",
        description: `${selectedItem.name} has been successfully deleted.`,
      });
      setDeleteModalOpen(false);
      setSelectedItem(null);
    }
  };

  const handleSave = (updatedItem) => {
    setItems(items.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
    toast({
      title: "Item updated",
      description: `${updatedItem.name} has been successfully updated.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Collections Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your merchandise and products for sale
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus size={20} className="mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <Label htmlFor="item-name">Item Name</Label>
                <Input
                  id="item-name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  placeholder="Enter item name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="item-price">Price (₦)</Label>
                  <Input
                    id="item-price"
                    type="number"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        price: parseFloat(e.target.value),
                      })
                    }
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="item-category">Category</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) =>
                      setNewItem({ ...newItem, category: value })
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

              <Button className="w-full">Add Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <CollectionViewModal
        item={selectedItem}
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />
      <CollectionEditModal
        item={selectedItem}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
      />
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={`Delete "${selectedItem?.name}"`}
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </div>
  );
};

export default CollectionsManagement;
