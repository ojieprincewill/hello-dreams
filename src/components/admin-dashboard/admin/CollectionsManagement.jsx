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

              <div>
                <Label htmlFor="item-quality">Quality</Label>
                <Select
                  value={newItem.quality}
                  onValueChange={(value) =>
                    setNewItem({ ...newItem, quality: value })
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
                <Label htmlFor="item-sizes">
                  Available Sizes (comma separated)
                </Label>
                <Input
                  id="item-sizes"
                  value={newItem.sizes.join(", ")}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      sizes: e.target.value.split(", ").filter((s) => s.trim()),
                    })
                  }
                  placeholder="S, M, L, XL"
                />
              </div>

              <div>
                <Label htmlFor="item-image">Product Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Click to upload product image</p>
                  <Input
                    type="file"
                    className="hidden"
                    id="item-image"
                    accept="image/*"
                  />
                </div>
              </div>

              <Button className="w-full">Add Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card
            key={item.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-200 rounded-t-lg flex items-center justify-center">
                <ShoppingBag size={48} className="text-gray-400" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {item.name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="font-semibold">
                      ₦{item.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Category:</span>
                    <span className="text-sm">{item.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-yellow-500" />
                    <span className="text-sm text-gray-600">
                      {item.quality}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.sizes.map((size, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleView(item)}
                    >
                      <Eye size={16} className="mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
