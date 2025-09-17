// components/CollectionsManagement.jsx
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
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
import { toast } from "../ui/sonner";
import { useCollections } from "../../../hooks/useCollections";
import supabase from "../../../supabase/client";

const CollectionsManagement = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [newItem, setNewItem] = useState({
    title: "",
    price: 0,
    image: "",
    sizes: [],
    quality: "Regular",
    category: "T-Shirts",
    instock: true,
    shipment: "We ship to all parts of Nigeria",
    ship_time: "Shipping takes 5 to 7 working days",
  });

  // Define the available sizes
  const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const {
    collectionsQuery: { data, fetchNextPage, hasNextPage, isFetchingNextPage },
    createCollection,
    updateCollection,
    deleteCollection,
  } = useCollections();

  const collections = data?.pages.flatMap((page) => page.data) || [];

  // Image upload function
  const uploadImage = async (file) => {
    if (!file) return null;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `collections-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("collections-images")
      .upload(filePath, file);

    if (uploadError) {
      throw new Error("Failed to upload image");
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("collections-images").getPublicUrl(filePath);

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

  // Reset form including image
  const resetForm = () => {
    setNewItem({
      title: "",
      price: 0,
      image: "",
      sizes: [],
      quality: "Regular",
      category: "T-Shirts",
      instock: true,
      shipment: "We ship to all parts of Nigeria",
      ship_time: "Shipping takes 5 to 7 working days",
    });
    setImageFile(null);
    setImagePreview(null);
  };

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

  const confirmDelete = async () => {
    if (!selectedItem) return;
    try {
      await deleteCollection.mutateAsync(selectedItem.id);
      toast.success(`${selectedItem.title} deleted successfully!`);
      setDeleteModalOpen(false);
      setSelectedItem(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSave = async (updatedItem) => {
    try {
      await updateCollection.mutateAsync(updatedItem);
      toast.success(`${updatedItem.title} updated successfully!`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCreate = async () => {
    try {
      let imageUrl = newItem.image;

      // Upload image if a new file is selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      await createCollection.mutateAsync({
        ...newItem,
        image: imageUrl,
      });

      toast.success(`${newItem.title} created successfully!`);
      resetForm();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6 xl:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl xl:text-3xl font-bold text-gray-900">
            Collections Management
          </h1>
          <p className="text-sm xl:text-base text-gray-600 mt-1 xl:mt-2">
            Manage your merchandise and products for sale
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
              <Plus size={18} className="mr-2 xl:w-5 xl:h-5" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 xl:space-y-6">
              <div>
                <Label htmlFor="item-title">Item Title</Label>
                <Input
                  id="item-title"
                  value={newItem.title}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="item-price">Price (₦)</Label>
                  <Input
                    id="item-price"
                    type="number"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="item-sizes">Available Sizes</Label>
                  <Select
                    value=""
                    onValueChange={(value) => {
                      if (newItem.sizes.includes(value)) {
                        setNewItem({
                          ...newItem,
                          sizes: newItem.sizes.filter((s) => s !== value),
                        });
                      } else {
                        setNewItem({
                          ...newItem,
                          sizes: [...newItem.sizes, value],
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
                            <Checkbox
                              id={`checkbox-${size}`}
                              checked={newItem.sizes.includes(size)}
                              onCheckedChange={() => {
                                if (newItem.sizes.includes(size)) {
                                  setNewItem({
                                    ...newItem,
                                    sizes: newItem.sizes.filter(
                                      (s) => s !== size
                                    ),
                                  });
                                } else {
                                  setNewItem({
                                    ...newItem,
                                    sizes: [...newItem.sizes, size],
                                  });
                                }
                              }}
                            />
                            <label htmlFor={`checkbox-${size}`}>{size}</label>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {newItem.sizes.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {newItem.sizes.map((s, i) => (
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="item-shipment">Shipment Info</Label>
                  <Input
                    id="item-shipment"
                    value={newItem.shipment}
                    onChange={(e) =>
                      setNewItem({ ...newItem, shipment: e.target.value })
                    }
                    placeholder="We ship to all parts of Nigeria"
                  />
                </div>

                <div>
                  <Label htmlFor="item-ship-time">Shipping Time</Label>
                  <Input
                    id="item-ship-time"
                    value={newItem.ship_time}
                    onChange={(e) =>
                      setNewItem({ ...newItem, ship_time: e.target.value })
                    }
                    placeholder="Shipping takes 5 to 7 working days"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="item-image">Product Image</Label>
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
                          setNewItem({ ...newItem, image: "" });
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload
                        size={40}
                        className="mx-auto text-gray-400 mb-4 xl:w-12 xl:h-12"
                      />
                      <p className="text-sm xl:text-base text-gray-600">
                        Click to upload product image
                      </p>
                    </>
                  )}
                  <div className="mt-4">
                    <Input
                      type="file"
                      id="item-image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleCreate} className="w-full">
                Add Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
        {collections.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ShoppingBag size={40} className="xl:w-12 xl:h-12" />
                  </div>
                )}
              </div>
              <div className="p-4 xl:p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-base xl:text-lg flex-1 min-w-0">
                    <span className="truncate block">{item.title}</span>
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                      item.instock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.instock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <div className="space-y-2 mb-3 xl:mb-4 text-xs xl:text-sm">
                  <div className="flex justify-between">
                    <span>Title:</span>
                    <span className="font-semibold truncate ml-2">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-semibold">
                      ₦{item.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="truncate ml-2">{item.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={12} className="text-yellow-500 xl:w-4 xl:h-4" />
                    <span>{item.quality}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(item.sizes || []).map((size, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-1 xl:space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(item)}
                    className="flex-1 text-xs xl:text-sm"
                  >
                    <Eye size={14} className="mr-1 xl:w-4 xl:h-4" />
                    <span className="hidden sm:inline">View</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                    className="flex-1 text-xs xl:text-sm"
                  >
                    <Edit size={14} className="mr-1 xl:w-4 xl:h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item)}
                    className="text-red-600 hover:text-red-700 text-xs xl:text-sm"
                  >
                    <Trash2 size={14} className="xl:w-4 xl:h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center mt-4 xl:mt-6">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-full sm:w-auto"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </Button>
        </div>
      )}

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
        title={`Delete "${selectedItem?.title}"`}
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </div>
  );
};

export default CollectionsManagement;
