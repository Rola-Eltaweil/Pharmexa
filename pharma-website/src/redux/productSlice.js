import { createSlice } from "@reduxjs/toolkit";

const initialvalue = {
  products: [],
  product: [],
};
const productSlice = createSlice({
  name: "products",
  initialState: initialvalue,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setOneproduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setProducts, setOneproduct } = productSlice.actions;
export default productSlice.reducer;
