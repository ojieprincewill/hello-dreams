import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../state-slices/cart/cartSlice";
import productsReducer from "../state-slices/products/productsSlice";
import quickviewReducer from "../state-slices/quickview/quickviewSlice";
import consultationReducer from "../state-slices/ui-consultation/consultationSlice";
import orderReducer from "../state-slices/order/orderSlice";
import savedClassesReducer from "../state-slices/saved-classes/savedClassesSlice";
import inProgressClassesReducer from "../state-slices/in-progress-classes/inProgressClassesSlice";
import completedClassesReducer from "../state-slices/completed-classes/completedClassesSlice";

const rootReducer = {
  cart: cartReducer,
  products: productsReducer,
  quickview: quickviewReducer,
  consultation: consultationReducer,
  order: orderReducer,
  savedClasses: savedClassesReducer,
  inProgressClasses: inProgressClassesReducer,
  completedClasses: completedClassesReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export { store };
