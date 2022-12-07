import { configureStore } from "@reduxjs/toolkit";
import childSlice from "./childSlice";
import childrenListSlice from "./childrenListSlice";

export const store = configureStore({
  reducer: {
    currentChild: childSlice,
    childrenList: childrenListSlice,
  },
});
