import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import Checkout from "../../components/collections/checkout/checkout.component";
import FooterSection from "../../components/footer-section/footer-section.component";
import OrderSuccess from "../../components/collections/order-success/order-success.component";
const CheckoutPage = () => {
  return (
    <>
      <NavBar />
      <Checkout />
      <OrderSuccess />
      <FooterSection />
    </>
  );
};

export default CheckoutPage;
