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
    gender: "",
    race: "",
    hairColor: "",
    eyeColor: "",
    height: "",
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
    setGender(state, action) {
      state.gender = action.payload;
    },
    setRace(state, action) {
      state.race = action.payload;
    },
    setHairColor(state, action) {
      state.hairColor = action.payload;
    },
    setEyeColor(state, action) {
      state.eyeColor = action.payload;
    },
    setHeight(state, action) {
      state.height = action.payload;
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
  setGender,
  setRace,
  setHairColor,
  setEyeColor,
  setHeight,
} = todosSlice.actions;

export default todosSlice.reducer;
