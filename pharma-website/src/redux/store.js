import { configureStore } from "@reduxjs/toolkit";
import ProdcutReducer from "./productSlice.js";
export const Store = configureStore({
  reducer: {
    product: ProdcutReducer,
  },
});
