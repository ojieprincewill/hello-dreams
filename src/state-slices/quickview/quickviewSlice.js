import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hidden: true,
  selectedProduct: null,
};

export const quickviewSlice = createSlice({
  name: "quickview",
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    openQuickview: (state) => {
      state.hidden = false;
    },
    closeQuickview: (state) => {
      state.hidden = true;
      state.selectedProduct = null;
    },
  },
});

export const { openQuickview, closeQuickview, selectProduct } =
  quickviewSlice.actions;
export default quickviewSlice.reducer;
