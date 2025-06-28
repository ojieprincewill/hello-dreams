import React, { useState } from "react";
import Checkout from "../checkout/checkout.component";
import OrderSuccess from "../order-success/order-success.component";
import { useDispatch, useSelector } from "react-redux";
import { setOrderInfo } from "../../../state-slices/order/orderSlice";

const CheckoutFlow = () => {
  const [step, setStep] = useState("form"); // form | success
  const dispatch = useDispatch();
  const orderInfo = useSelector((state) => state.order.orderInfo);

  const handlePaymentSuccess = (order) => {
    dispatch(setOrderInfo(order));
    setStep("success");
  };

  return (
    <>
      {step === "form" && <Checkout onPaymentSuccess={handlePaymentSuccess} />}
      {step === "success" && orderInfo && <OrderSuccess order={orderInfo} />}
    </>
  );
};

export default CheckoutFlow;
