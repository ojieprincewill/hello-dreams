import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
};

export const consultationSlice = createSlice({
  name: "consultation",
  initialState,
  reducers: {
    setConsultationType: (state, action) => {
      state.type = action.payload;
    },
    resetConsultationType: (state) => {
      state.type = null;
    },
  },
});

export const { setConsultationType, resetConsultationType } =
  consultationSlice.actions;
export default consultationSlice.reducer;
