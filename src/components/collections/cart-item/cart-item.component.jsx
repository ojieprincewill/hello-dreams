import React from "react";
import QuantityControl from "../quantity-control/quantity-control.component";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { clearItem } from "../../../state-slices/cart/cartSlice";
import { toast } from "@/components/admin-dashboard/ui/sonner";

const CartItem = ({ cartProduct }) => {
  const dispatch = useDispatch();
  const { image, title, price } = cartProduct;

  const handleClearItem = () => {
    dispatch(clearItem(cartProduct));
    toast.info("Item removed from cart");
  };

  return (
    <div className="w-[600px] md:w-[800px] xl:w-full flex justify-between items-center py-5 border-b border-b-[#eaecf0]">
      <div className="flex space-x-7 items-center">
        <div className="w-[150px] h-[120px] md:w-[200px] md:h-[170px] xl:w-[259px] xl:h-[161px] rounded-2xl overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-3">
          <p className="text-[#010413] text-[16px] md:text-[20px] font-semibold ">
            {title}
          </p>
          <p className="text-[#667085] text-[16px] md:text-[20px] ">
            &#8358;{price.toLocaleString()}
          </p>

          <QuantityControl cartItem={cartProduct} />
        </div>
      </div>
      <TrashIcon
        onClick={handleClearItem}
        className="w-5 h-5 text-[#ff0000] cursor-pointer"
      />
    </div>
  );
};

export default CartItem;
