import { configureStore } from "@reduxjs/toolkit";
import ProdcutReducer from "./productSlice.js";
import userReducer from "./userSlice.js";
import contactReducer from "./ContactSlice.js";
import projectRequestSlice from "./ProjectRequestSlice.js";
export const Store = configureStore({
  reducer: {
    product: ProdcutReducer,
    user: userReducer,
    contact: contactReducer,
    projectRequestSlice: projectRequestSlice,
  },
});
