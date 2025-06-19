import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  closeQuickview,
  clearSelectedProduct,
} from "../../../state-slices/quickview/quickviewSlice";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { addItem } from "../../../state-slices/cart/cartSlice";

const Quickview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const selectedProduct = useSelector(
    (state) => state.quickview.selectedProduct
  );

  if (!selectedProduct) return null;

  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  const handlePay = () => {
    dispatch(addItem(selectedProduct));
    closeQuickview();
    navigate("/cart-summary");
    handleOrigins();
  };

  const product = products.find((p) => p.id === selectedProduct.id);
  if (!product) return null;

  const handleCloseQuickview = () => {
    dispatch(closeQuickview());
    setTimeout(() => {
      dispatch(clearSelectedProduct());
    }, 300);
  };

  const { id, title, image, size, quality, shipTime, price, shipment } =
    product;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={handleCloseQuickview}
      className="fixed inset-0 bg-[#20202069] z-60 flex justify-center items-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        // transition={{ duration: 0.3, ease: "easeInOut" }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        key={id}
        className="bg-[#fff] w-[90%] md:w-[427px] h-max md:h-[90vh] lg:h-[564.09px] p-2 rounded-sm overflow-auto"
      >
        <div className="flex justify-between items-center mb-3 pb-1 border-b border-b-[#e6e2dd] text-[#1b212c]">
          <h2 className=" text-[14px] lg:text-[16px] font-medium  ">
            Product Details
          </h2>
          <XMarkIcon
            onClick={handleCloseQuickview}
            className="w-6 h-6 cursor-pointer"
          />
        </div>
        <p className="text-[#1e1e1e] text-[16px] md:text-[20px] text-center font-semibold my-3">
          {title}
        </p>
        <div className="w-full h-[316.11px] rounded-md overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <ul className="list-disc pl-6 space-y-2 text-[#4a4b54] text-[14px] my-3">
          <li>{size}</li>
          <li>{quality}</li>
          <li>{shipment}</li>
          <li>{shipTime}</li>
        </ul>

        <button
          onClick={handlePay}
          className="w-full bg-[#010413] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[16px] text-center px-4 py-3 mt-3 rounded-sm hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
        >
          Pay &#8358;{price}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Quickview;
