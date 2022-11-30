import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "child",
  initialState: {
    firstName: "",
    lastName: "",
    nickName: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    country: "",
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
    setAddress(state, action) {
      state.address = action.payload;
    },
    setCity(state, action) {
      state.city = action.payload;
    },
    setPostalCode(state, action) {
      state.postalCode = action.payload;
    },
    setProvince(state, action) {
      state.province = action.payload;
    },
    setCountry(state, action) {
      state.country = action.payload;
    },
  },
});

export const {
  setFirstName,
  setLastName,
  setNickName,
  setAddress,
  setCity,
  setPostalCode,
  setProvince,
  setCountry,
} = todosSlice.actions;

export default todosSlice.reducer;
