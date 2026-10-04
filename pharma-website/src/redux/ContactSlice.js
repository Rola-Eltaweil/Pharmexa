import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  Customers: [],
  Requests: [],
};

const contactSlice = createSlice({
  initialState: initialValue,
  name: "Contact",

  reducers: {
    setCustomersData: (state, action) => {
      state.Customers = action.payload;
    },

    setRequestsData: (state, action) => {
      state.Requests = action.payload;
    },
  },
});

export const { setCustomersData, setRequestsData } = contactSlice.actions;

export default contactSlice.reducer;
