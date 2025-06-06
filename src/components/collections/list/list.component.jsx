import React from "react";

import CartIcon from "../cart-icon/cart-icon.component";
import Product from "../product/product.component";
import { useSelector } from "react-redux";
import Quickview from "../quickview/quickview.component";

const CollectionsList = () => {
  const products = useSelector((state) => state.products.items);
  const quickviewHidden = useSelector((state) => state.quickview.hidden);

  return (
    <div className="w-full px-[5%] py-15">
      <p className="text-[#18181b] text-[20px] md:text-[48px] text-center font-semibold mb-3">
        Shop our collections
      </p>
      <p
        className="text-[#483d3d] text-[16px] md:text-[24px] text-center mb-3"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        T-Shirts, mugs, caps, diaries and more.
        <br />
        We ship anywhere in the world.
      </p>

      <div className="w-max mr-5 ml-auto">
        <CartIcon />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 lg:gap-y-15 mt-10">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      {!quickviewHidden && <Quickview />}
    </div>
  );
};

export default CollectionsList;
