import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  Customers: [],
};

const contactSlice = createSlice({
  initialState: initialValue,
  name: "Contact",
  reducers: {
    setCustomersData: (state, action) => {
      state.Customers = action.payload;
    },
  },
});

export const { setCustomersData } = contactSlice.actions;

export default contactSlice.reducer;
