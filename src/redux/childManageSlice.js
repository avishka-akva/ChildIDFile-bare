import { createSlice } from "@reduxjs/toolkit";

const childManageSlice = createSlice({
  name: "childManage",
  initialState: {
    view: false,
    edit: false,
    exit: false,
    hederNameShow: false,
    showFooter: true,
    trustedContactsError: false,
    currentStepIndex: 0,
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
    setTrustedContactsError(state, action) {
      state.trustedContactsError = action.payload;
    },
    setNextStep(state) {
      state.currentStepIndex = state.currentStepIndex + 1;
    },
    setPreviosStep(state) {
      state.currentStepIndex = state.currentStepIndex - 1;
    },
    setCurrentStepIndex(state, action) {
      state.currentStepIndex = action.payload;
    },
  },
});

export const {
  setUpdate,
  setView,
  toggleExit,
  setHederNameShow,
  setShowFooter,
  setTrustedContactsError,
  setNextStep,
  setPreviosStep,
  setCurrentStepIndex
} = childManageSlice.actions;

export default childManageSlice.reducer;
