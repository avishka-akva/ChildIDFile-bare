import { createSlice } from "@reduxjs/toolkit";
import {
  CONTACT_INIT_OBJ,
  MAXIMUM_EMERGENCY_CONTACT_COUNT,
  MAXIMUM_TRUSTED_CONTACT_COUNT,
} from "../shared/const";

const initialState = {
  id: null,
  firstName: "",
  lastName: "",
  nickName: "",
  dob: "",
  address: "",
  city: "",
  postalCode: "",
  province: "",
  country: "",
  gender: "male",
  race: "",
  hairColor: "",
  eyeColor: "",
  height: "",
  characteristicOptions: [],
  specialNeeds: "",
  otherCharacteristic: "",
  physicianName: "",
  physicianOffice: "",
  bloodType: "",
  allergies: "",
  medications: "",
  emergencyContacts: [
    {
      ...CONTACT_INIT_OBJ,
    },
  ],
  trustedContacts: [
    {
      ...CONTACT_INIT_OBJ,
    },
  ],
  image1: null,
  image2: null,
  fingerPrint: null,
};

const childSlice = createSlice({
  name: "child",
  initialState,
  reducers: {
    cleanChildSlice() {
      return { ...initialState };
    },
    setChildSlice(state, action) {
      return { ...state, ...action.payload };
    },
    setFirstName(state, action) {
      state.firstName = action.payload;
    },
    setLastName(state, action) {
      state.lastName = action.payload;
    },
    setNickName(state, action) {
      state.nickName = action.payload;
    },
    setDateOfBirth(state, action) {
      state.dob = action.payload;
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
    setCharacteristicOption(state, action) {
      state.characteristicOptions = action.payload;
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
    setEmergencyContactValues(state, action) {
      const { index, propertyName, value } = action.payload;
      state.emergencyContacts[index][propertyName] = value;
    },
    addNewEmergencyContact(state) {
      if (state.emergencyContacts.length > MAXIMUM_EMERGENCY_CONTACT_COUNT)
        return;
      state.emergencyContacts.push({ ...CONTACT_INIT_OBJ });
    },
    removeEmergencyContactValues(state, action) {
      if (state.emergencyContacts.length > 0) {
        state.emergencyContacts = state.emergencyContacts.filter(
          (item) => item.name !== action.payload
        );
      }
    },
    setTrusedContactValues(state, action) {
      const { index, propertyName, value } = action.payload;
      state.trustedContacts[index][propertyName] = value;
    },
    addNewTrusedContact(state) {
      if (state.trustedContacts.length < MAXIMUM_TRUSTED_CONTACT_COUNT) {
        state.trustedContacts.push({ ...CONTACT_INIT_OBJ });
      }
    },
    removeTrusedContactValues(state, action) {
      if (state.trustedContacts.length > 0) {
        state.trustedContacts = state.trustedContacts.filter(
          (item) => item.name !== action.payload
        );
      }
    },
    setImage1(state, action) {
      state.image1 = action.payload;
    },
    setImage2(state, action) {
      state.image2 = action.payload;
    },
    setFingerPrint(state, action) {
      state.fingerPrint = action.payload;
    },
  },
});

export const {
  setChildSlice,
  cleanChildSlice,
  setFirstName,
  setLastName,
  setNickName,
  setDateOfBirth,
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
  setCharacteristicOption,
  setSpecialNeeds,
  setOtherCharacteristic,
  setPhysicianName,
  setPhysicianOffice,
  setBloodType,
  setAllergies,
  setMedications,
  setEmergencyContactValues,
  addNewEmergencyContact,
  removeEmergencyContactValues,
  setTrusedContactValues,
  addNewTrusedContact,
  removeTrusedContactValues,
  setImage1,
  setImage2,
  setFingerPrint,
} = childSlice.actions;

export default childSlice.reducer;
