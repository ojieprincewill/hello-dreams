import React from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../../../state-slices/cart/cartSlice";
const QuantityControl = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { quantity } = cartItem;

  const handleAddItemClick = () => {
    dispatch(addItem(cartItem));
  };

  const handleRemoveItemClick = () => {
    dispatch(removeItem(cartItem));
  };

  if (!cartItem) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <div
        onClick={handleRemoveItemClick}
        className="flex justify-center items-center p-2 rounded-md text-[#010413] w-[38px] h-[28px] md:w-[48px] md:h-[38px] border border-[#eaecf0] bg-[#fff] hover:bg-[#eaecf0] transition-colors duration-300 cursor-pointer"
      >
        <MinusIcon className="w-4 h-4 md:h-6 md:w-6 " />
      </div>
      <span className="flex justify-center items-center p-2 rounded-md text-[#010413] text-[16px] md:text-[20px] font-medium w-[38px] h-[28px] md:w-[48px] md:h-[38px] border border-[#eaecf0] bg-[#fff]">
        {quantity}
      </span>
      <div
        onClick={handleAddItemClick}
        className="flex justify-center items-center p-2 rounded-md text-[#010413] w-[38px] h-[28px] md:w-[48px] md:h-[38px] border border-[#eaecf0] bg-[#fff] hover:bg-[#eaecf0] transition-colors duration-300 cursor-pointer"
      >
        <PlusIcon className="w-4 h-4 md:h-6 md:w-6 " />
      </div>
    </div>
  );
};

export default QuantityControl;
