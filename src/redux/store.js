import { configureStore } from "@reduxjs/toolkit";
import childSlice from "./childSlice";
import childrenListSlice from "./childrenListSlice";
import childManageSlice from "./childManageSlice";

export const store = configureStore({
  reducer: {
    currentChild: childSlice,
    childrenList: childrenListSlice,
    childManage:childManageSlice,
  },
});
