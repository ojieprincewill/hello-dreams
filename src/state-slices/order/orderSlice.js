import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderInfo: [],
  },
  reducers: {
    setOrderInfo: (state, action) => {
      state.orderInfo = action.payload;
    },
    clearOrderInfo: (state) => {
      state.orderInfo = [];
    },
  },
});

export const { setOrderInfo, clearOrderInfo } = orderSlice.actions;
export default orderSlice.reducer;
