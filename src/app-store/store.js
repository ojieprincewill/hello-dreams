import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../state-slices/cart/cartSlice";
import productsReducer from "../state-slices/products/productsSlice";
import quickviewReducer from "../state-slices/quickview/quickviewSlice";

const rootReducer = {
  cart: cartReducer,
  products: productsReducer,
  quickview: quickviewReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export { store };
