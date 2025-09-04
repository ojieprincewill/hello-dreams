import React from "react";

import { useSelector, useDispatch } from "react-redux";
import CartItem from "../cart-item/cart-item.component";
import { resetCart } from "../../../state-slices/cart/cartSlice";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
const CartContent = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleClearAllItems = () => {
    dispatch(resetCart());
    toast.info("All items cleared from cart");
  };

  const cartTotal = parseFloat(
    cartItems
      .reduce(
        (accumulatedQuantity, cartItem) =>
          accumulatedQuantity + cartItem.quantity * cartItem.price,
        0
      )
      .toFixed(2)
  );

  const handleOrigins = () => {};

  return (
    <div className="bg-[#f7f7f7] px-[5%] xl:px-[10%] py-10 md:py-20 xl:py-30 ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-[#ffffff] px-5 py-10 md:px-10 md:py-15 rounded-2xl"
      >
        <p className="text-[#010413] text-[20px] md:text-[26px] xl:text-[32px] font-bold pb-5 border-b border-b-[#eaecf0] capitalize">
          your shopping cart
        </p>
        {cartItems.length ? (
          <div>
            <p className="text-[#667085] text-[16px] md:text-[24px] font-medium my-5 capitalize">
              order summary
            </p>

            <div className="max-h-[90vh] overflow-auto">
              {cartItems.map((item) => (
                <CartItem key={item.id} cartProduct={item} />
              ))}
            </div>

            <p className="text-[#0c111d] text-[18px] md:text-[24px] font-semibold w-max ml-auto mr-1 mt-5">
              Total: &#8358;{cartTotal}
            </p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-[300px] md:h-[400px]">
            <ShoppingCartIcon className="w-8 h-8 md:h-15 md:w-15 text-[#1342ff] " />
            <p className="text-[#667085] text-[16px] md:text-[24px] text-center  my-7">
              There are no items in your cart!
            </p>
            <Link
              to="/services/our-collection"
              onClick={handleOrigins}
              className="flex justify-center items-center"
            >
              <button className="bg-transparent text-[#212121] border border-[#eaecf0] text-[12px] md:text-[14px] xl:text-[16px] px-6 py-3 xl:py-4 rounded-lg hover:text-[#fff] hover:bg-[#010413] hover:border-[#010413] transition-colors duration-300 cursor-pointer">
                Continue shopping
              </button>
            </Link>
          </div>
        )}
      </motion.div>
      {!cartItems.length < 1 && (
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:justify-between md:items-center mt-6">
          <Link to="/services/our-collection" onClick={handleOrigins}>
            <button className="bg-transparent w-full md:w-max text-[#212121] border border-[#eaecf0] text-[12px] md:text-[14px] xl:text-[16px] px-6 py-3 xl:py-4 rounded-lg hover:text-[#fff] hover:bg-[#010413] hover:border-[#010413] transition-colors duration-300 cursor-pointer">
              Continue shopping
            </button>
          </Link>

          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 md:items-center">
            <button
              onClick={handleClearAllItems}
              className="bg-transparent w-full md:w-max text-[#212121] border border-[#eaecf0] text-[12px] md:text-[14px] xl:text-[16px] px-6 py-3 xl:py-4 rounded-lg hover:text-[#fff] hover:bg-[#010413] hover:border-[#010413] transition-colors duration-300 cursor-pointer"
            >
              Clear cart
            </button>
            <Link to="/checkout" onClick={handleOrigins}>
              <button className="bg-[#010413] w-full md:w-max text-[#f7f7f7] font-semibold border border-[#010413] text-[12px] md:text-[14px] xl:text-[16px] px-6 py-3 xl:py-4 rounded-lg hover:text-[#fff] hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
                Proceed to checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartContent;
