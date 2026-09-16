import { configureStore } from "@reduxjs/toolkit";
import ProdcutReducer from "./productSlice.js";
import userReducer from "./userSlice.js";
export const Store = configureStore({
  reducer: {
    product: ProdcutReducer,
    user: userReducer,
  },
});
