import { createSlice } from "@reduxjs/toolkit";

const childManageSlice = createSlice({
  name: "childManage",
  initialState: {
    view: false,
    edit: false,
    exit: false,
    hederNameShow: false,
  },
  reducers: {
    setUpdate(state, action) {
      state.edit = action.payload;
    },
    setView(state, action) {
      state.view = action.payload;
    },
    toggleExit(state) {
      state.exit = !state.exit;
    },
    setHederNameShow(state, action) {
      state.hederNameShow = action.payload;
    },
  },
});

export const { setUpdate, setView, toggleExit, setHederNameShow } =
  childManageSlice.actions;

export default childManageSlice.reducer;
