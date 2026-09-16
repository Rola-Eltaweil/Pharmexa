import { createSlice } from "@reduxjs/toolkit";

const initialvalue = {
  user: null,
  userDetails: null,
  loading: true,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialvalue,
  reducers: {
    setuser: (state, action) => {
      state.user = action.payload;
    },
    setuserDetails: (state, action) => {
      state.userDetails = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.userDetails = null;
      state.loading = false;
    },
  },
});

export const { setuser, setuserDetails, clearUser } = userSlice.actions;
export default userSlice.reducer;
