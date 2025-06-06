import { createSlice } from "@reduxjs/toolkit";
import { CollectionData } from "../../data/collections-data/collection.data";

const initialState = {
  items: CollectionData,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
