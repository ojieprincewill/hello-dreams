import { createSlice } from "@reduxjs/toolkit";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

const initialState = {
  hidden: true,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cartItems = addItemToCart(state.cartItems, action.payload);
    },
    removeItem: (state, action) => {
      state.cartItems = removeItemFromCart(state.cartItems, action.payload);
    },
    clearItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addItem, clearItem, removeItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
