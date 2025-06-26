// components/CollectionsManagement.jsx
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  ShoppingBag,
  Star,
} from 'lucide-react';
import CollectionViewModal from './modals/CollectionViewModal';
import CollectionEditModal from './modals/CollectionEditModal';
import DeleteConfirmModal from './modals/DeleteConfirmModal';
import { useToast } from '../hooks/use-toast';
import { useCollections } from '../../../hooks/useCollections';

const CollectionsManagement = () => {
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    name: '',
    price: 0,
    image: '',
    sizes: [''],
    quality: 'Regular',
    category: 'T-Shirts',
    inStock: true,
  });

  // Define the available sizes
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  const {
    collectionsQuery: { data, fetchNextPage, hasNextPage, isFetchingNextPage },
    createCollection,
    updateCollection,
    deleteCollection,
  } = useCollections();

  const collections = data?.pages.flatMap((page) => page.data) || [];

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
      toast({
        title: 'Collection Deleted',
        description: `${selectedItem.name} was successfully removed.`,
      });
      setDeleteModalOpen(false);
      setSelectedItem(null);
    } catch (err) {
      toast({
        title: 'Error deleting collection',
        description: err.message,
      });
    }
  };

  const handleSave = async (updatedItem) => {
    try {
      await updateCollection.mutateAsync(updatedItem);
      toast({
        title: 'Collection Updated',
        description: `${updatedItem.name} was successfully updated.`,
      });
    } catch (err) {
      toast({ title: 'Error updating collection', description: err.message });
    }
  };

  const handleCreate = async () => {
    try {
      await createCollection.mutateAsync(newItem);
      toast({
        title: 'Collection Created',
        description: `${newItem.name} was successfully added.`,
      });
      setNewItem({
        name: '',
        price: 0,
        image: '',
        sizes: [''],
        quality: 'Regular',
        category: 'T-Shirts',
        inStock: true,
      });
    } catch (err) {
      toast({ title: 'Error creating collection', description: err.message });
    }
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
                <Label>Sizes</Label>
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
                                    (s) => s !== size,
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

              <div>
                <Label htmlFor="item-image">Image URL</Label>
                <Input
                  id="item-image"
                  value={newItem.image}
                  onChange={(e) =>
                    setNewItem({ ...newItem, image: e.target.value })
                  }
                  placeholder="https://your-image-url"
                />
              </div>

              <Button onClick={handleCreate} className="w-full">
                Add Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ShoppingBag size={48} />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.instock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.instock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-semibold">{item.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-semibold">
                      ₦{item.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span>{item.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-yellow-500" />
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

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(item)}
                    className="flex-1"
                  >
                    <Eye size={16} className="mr-1" /> View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                    className="flex-1"
                  >
                    <Edit size={16} className="mr-1" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item)}
                    className="text-red-600"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center mt-6">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
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
        title={`Delete "${selectedItem?.name}"`}
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </div>
  );
};

export default CollectionsManagement;
