import React from "react";

const AddToCart = ({ handleAddToCart }) => {
  return (
    <button
      onClick={handleAddToCart}
      className="w-full md:w-[95px] bg-[#010413] text-[#fff] font-semibold border border-[#010413] text-[16px] text-center px-4 py-3 rounded-sm hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
    >
      Buy
    </button>
  );
};

export default AddToCart;
