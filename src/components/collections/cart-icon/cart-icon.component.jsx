import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemCount =
    Array.isArray(cartItems) && cartItems.length > 0
      ? cartItems.reduce(
          (accumulatedQuantity, cartItem) =>
            accumulatedQuantity + cartItem.quantity,
          0
        )
      : 0;

  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative mt-2 p-2 rounded-md bg-[#fff] border border-[#eaecf0] text-[#010413] hover:text-[#1342ff] transition-colors duration-300 cursor-pointer">
      <Link to="/cart-summary" onClick={handleOrigins}>
        <ShoppingCartIcon className="w-4 h-4 md:h-6 md:w-6 " />
      </Link>
      <span className="absolute top-[-5px] right-[-5px] bg-[#99c8ff] text-[#101828] text-[10px] flex justify-center items-center font-semibold w-4 h-4 text-center rounded-xl p-2">
        {itemCount}
      </span>
    </div>
  );
};

export default CartIcon;
