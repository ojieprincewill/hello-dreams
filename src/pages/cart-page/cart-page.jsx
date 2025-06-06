import React from "react";

import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import CartContent from "../../components/collections/cart-content/cart-content.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const CartPage = () => {
  return (
    <>
      <NavBar />
      <CartContent />
      <FooterSection />
    </>
  );
};

export default CartPage;
