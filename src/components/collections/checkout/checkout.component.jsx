import React from "react";
import CheckoutForm from "../../../hello-dreams-forms/checkout-form/checkout-form.component";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = parseFloat(
    cartItems
      .reduce(
        (accumulatedQuantity, cartItem) =>
          accumulatedQuantity + cartItem.quantity * cartItem.price,
        0
      )
      .toFixed(2)
  );

  return (
    <div className="bg-[#f7f7f7] flex flex-col-reverse lg:space-y-0 lg:grid lg:grid-cols-[60%_40%] lg:gap-7 px-[5%] md:px-[10%] lg:px-[5%] py-10 md:py-20 lg:py-30 ">
      <CheckoutForm />
      <div className="bg-[#ffffff] rounded-2xl p-5 md:p-10 h-max mb-5">
        <p className="text-[#010413] text-[20px] md:text-[24px] font-bold pb-5 border-b border-b-[#eaecf0] capitalize">
          Order Summary
        </p>
        <div className="space-y-2 py-5 border-b border-b-[#eaecf0] ">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-[#010413]">
              <span className="text-[16px] md:text-[20px] ">{item.title}</span>
              <span className="text-[16px] md:text-[20px] font-medium">
                &#8358;{item.price}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[#010413] text-[20px] md:text-[24px] font-semibold my-5">
          &#8358;{cartTotal}
        </p>
      </div>
    </div>
  );
};

export default Checkout;
