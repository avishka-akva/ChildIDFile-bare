import { createSlice } from "@reduxjs/toolkit";

const childrenListSlice = createSlice({
  name: "childrenList",
  initialState: [],
  reducers: {
    addChild(state, action) {
      state.push(action.payload);
    },
    saveIncompleteChild(state, action) {
      state.unshift({ incomplete: true, ...action.payload});
    },
    finishIncompleteChild(state, action) {
      state.splice(
        state.findIndex((child) => child.id === action.payload.id),
        1
      );
      delete action.payload.incomplete;
      state.push({...action.payload});
    },
    deleteChild(state, action) {
      state.splice(
        state.findIndex((child) => child.id === action.payload),
        1
      );
    },
    updateChild(state, action) {
      const index = state.findIndex((child) => child.id === action.payload.id);
      state[index] = { ...action.payload };
    },
  },
});

export const { addChild, saveIncompleteChild,finishIncompleteChild, deleteChild, updateChild } = childrenListSlice.actions;

export default childrenListSlice.reducer;
