import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "child",
  initialState: {
    firstName: "",
    lastName: "",
    nickName: "",
  },
  reducers: {
    setFirstName(state, action) {
      state.firstName = action.payload;
    },
    setLastName(state, action) {
      state.lastName = action.payload;
    },
    setNickName(state, action) {
      state.nickName = action.payload;
    },
  },
});

export const { setFirstName, setLastName, setNickName } = todosSlice.actions;

export default todosSlice.reducer;
