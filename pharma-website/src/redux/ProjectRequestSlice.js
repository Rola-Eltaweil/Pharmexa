import { createSlice } from "@reduxjs/toolkit";

const initialvalue = {
  projects: [],
  loading: true,
};

const projectRequestSlice = createSlice({
  name: "project",
  initialState: initialvalue,

  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
      state.loading = false;
    },

    clearProjects: (state) => {
      state.projects = [];
      state.loading = false;
    },
  },
});

export const { setProjects, clearProjects } = projectRequestSlice.actions;

export default projectRequestSlice.reducer;
