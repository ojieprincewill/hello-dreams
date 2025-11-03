import React from "react";

import {
  openQuickview,
  selectProduct,
} from "../../../state-slices/quickview/quickviewSlice";
import { addItem } from "../../../state-slices/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import AddToCart from "../add-to-cart/add-to-cart.component";
import QuantityControl from "../quantity-control/quantity-control.component";
import { toast } from "@/components/admin-dashboard/ui/sonner";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItem = cartItems.find((cartItem) => cartItem.id === product.id);

  const openQuickView = () => {
    dispatch(selectProduct(product));
    dispatch(openQuickview());
  };

  const handleAddToCart = () => {
    dispatch(addItem(product));
    toast.success(`Item added to cart`);
  };

  const { image, title, price, size, quality } = product;

  return (
    <div className="md:p-2">
      <div className="w-full h-[351.61px] md:h-[400px] rounded-sm overflow-hidden ">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex justify-between items-center text-[#1e1e1e] text-[16px] md:text-[20px] font-semibold mt-6 mb-3">
        <p className="max-w-[200px] leading-snug line-clamp-2">{title}</p>
        <p>&#8358;{price.toLocaleString()}</p>
      </div>
      <ul className="list-disc pl-6 space-y-3 text-[#4a4b54] text-[14px] mb-3">
        {size && <li>{size}</li>}
        {quality && <li>{quality}</li>}
      </ul>

      <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0 items-center mt-6">
        {cartItem ? (
          <QuantityControl cartItem={cartItem} />
        ) : (
          <AddToCart handleAddToCart={handleAddToCart} />
        )}

        <button
          onClick={openQuickView}
          className="w-full md:w-[104px] bg-[#eef2fe] text-[#010413] font-semibold border border-[#eef2fe] text-[16px] text-center px-4 py-3 rounded-sm hover:bg-[#1342ff] hover:border-[#1342ff] hover:text-[#f7f7f7] transition-colors duration-300 cursor-pointer"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default Product;
