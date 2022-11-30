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
    specialNeeds: "",
    otherCharacteristic: "",
    physicianName:"",
    physicianOffice:"",
    bloodType:"",
    allergies:"",
    medications:"",
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
    setSpecialNeeds(state, action) {
      state.specialNeeds = action.payload;
    },
    setOtherCharacteristic(state, action) {
      state.otherCharacteristic = action.payload;
    },
    setPhysicianName(state, action) {
      state.physicianName = action.payload;
    },
    setPhysicianOffice(state, action) {
      state.physicianOffice = action.payload;
    },
    setBloodType(state, action) {
      state.bloodType = action.payload;
    },
    setAllergies(state, action) {
      state.allergies = action.payload;
    },
    setMedications(state, action) {
      state.medications = action.payload;
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
  setSpecialNeeds,
  setOtherCharacteristic,
  setPhysicianName,
  setPhysicianOffice,
  setBloodType,
  setAllergies,
  setMedications,
} = todosSlice.actions;

export default todosSlice.reducer;
