import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "childrenList",
  initialState: [],
  reducers: {
    addChild(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addChild } = todosSlice.actions;

export default todosSlice.reducer;
