import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import Checkout from "../../components/collections/checkout/checkout.component";
import FooterSection from "../../components/footer-section/footer-section.component";
import OrderSuccess from "../../components/collections/order-success/order-success.component";
import CheckoutFlow from "../../components/collections/checkout-flow/checkout-flow.component";
const CheckoutPage = () => {
  return (
    <>
      <NavBar />
      <CheckoutFlow />
      <FooterSection />
    </>
  );
};

export default CheckoutPage;
