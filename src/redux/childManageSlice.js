import { createSlice } from "@reduxjs/toolkit";

const childManageSlice = createSlice({
  name: "childManage",
  initialState: {
    edit: false,
    exit: false,
    hederNameShow: false,
  },
  reducers: {
    setUpdate(state, action) {
      state.update = action.payload;
    },
    toggleExit(state) {
      state.exit = !state.exit;
    },
    setHederNameShow(state, action) {
      state.hederNameShow = action.payload;
    },
  },
});

export const { setUpdate, toggleExit, setHederNameShow } = childManageSlice.actions;

export default childManageSlice.reducer;
