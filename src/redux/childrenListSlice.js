import { createSlice } from "@reduxjs/toolkit";

const childrenListSlice = createSlice({
  name: "childrenList",
  initialState: [],
  reducers: {
    addChild(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addChild } = childrenListSlice.actions;

export default childrenListSlice.reducer;
