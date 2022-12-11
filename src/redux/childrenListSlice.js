import { createSlice } from "@reduxjs/toolkit";

const childrenListSlice = createSlice({
  name: "childrenList",
  initialState: [],
  reducers: {
    addChild(state, action) {
      state.push(action.payload);
    },
    deleteChild(state, action) {
      state.splice(state.findIndex((child) => child.id === action.payload), 1);
    },
  },
});

export const { addChild, deleteChild } = childrenListSlice.actions;

export default childrenListSlice.reducer;
