import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../state-slices/cart/cartSlice";
import productsReducer from "../state-slices/products/productsSlice";
import quickviewReducer from "../state-slices/quickview/quickviewSlice";
import consultationReducer from "../state-slices/ui-consultation/consultationSlice";

const rootReducer = {
  cart: cartReducer,
  products: productsReducer,
  quickview: quickviewReducer,
  consultation: consultationReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export { store };
