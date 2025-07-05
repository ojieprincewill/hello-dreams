import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Badge } from '../../ui/badge';
import { ShoppingBag, Star, DollarSign } from 'lucide-react';

const CollectionViewModal = ({ item, isOpen, onClose }) => {
  if (!item || typeof item !== 'object') return null;

  const sizes = Array.isArray(item?.sizes) ? item.sizes : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ShoppingBag size={64} className="text-gray-400" />
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <Badge variant={item.instock ? 'default' : 'destructive'}>
                  {item.instock ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <DollarSign size={16} className="text-green-600" />
                  <span className="text-xl font-semibold">
                    ₦{item.price?.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Star size={16} className="text-yellow-500" />
                  <span>{item.quality}</span>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p className="font-semibold">{item.category}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Available Sizes</p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.length > 0 ? (
                      sizes.map((size, index) => (
                        <Badge key={index} variant="outline">
                          {size}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">None listed</span>
                    )}
                  </div>
                </div>

                {item.shipment && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Shipment</p>
                    <p className="font-semibold">{item.shipment}</p>
                  </div>
                )}

                {item.ship_time && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Shipping Time</p>
                    <p className="font-semibold">{item.ship_time}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionViewModal;
