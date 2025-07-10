import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../state-slices/cart/cartSlice";
import productsReducer from "../state-slices/products/productsSlice";
import quickviewReducer from "../state-slices/quickview/quickviewSlice";
import consultationReducer from "../state-slices/ui-consultation/consultationSlice";
import orderReducer from "../state-slices/order/orderSlice";
import savedClassesReducer from "../state-slices/saved-classes/savedClassesSlice";

const rootReducer = {
  cart: cartReducer,
  products: productsReducer,
  quickview: quickviewReducer,
  consultation: consultationReducer,
  order: orderReducer,
  savedClasses: savedClassesReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export { store };
