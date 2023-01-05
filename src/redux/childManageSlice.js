import { createSlice } from "@reduxjs/toolkit";

const childManageSlice = createSlice({
  name: "childManage",
  initialState: {
    view: false,
    edit: false,
    exit: false,
    hederNameShow: false,
    showFooter: true,
    emergencyContactsError: false,
    trustedContactsError: false,
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
    setShowFooter(state, action) {
      state.showFooter = action.payload;
    },
    setEmergencyContactsError(state, action) {
      state.emergencyContactsError = action.payload;
    },
    setTrustedContactsError(state, action) {
      state.trustedContactsError = action.payload;
    },
  },
});

export const {
  setUpdate,
  setView,
  toggleExit,
  setHederNameShow,
  setShowFooter,
  setEmergencyContactsError,
  setTrustedContactsError
} = childManageSlice.actions;

export default childManageSlice.reducer;
