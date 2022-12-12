import { createSlice } from "@reduxjs/toolkit";

const childManageSlice = createSlice({
  name: "childManage",
  initialState: {
    edit: false,
    exit: false,
  },
  reducers: {
    setUpdate(state, action) {
      state.update = action.payload;
    },
    toggleExit(state) {
      state.exit = !state.exit;
    },
  },
});

export const { setUpdate, toggleExit } = childManageSlice.actions;

export default childManageSlice.reducer;
