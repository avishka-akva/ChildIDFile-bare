import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Card from "../components/Card";
import { globleStyles } from "../shared/style";
import CustomTextInput from "../components/CustomTextInput";
import {
  setPhysicianName,
  setPhysicianOffice,
  setBloodType,
  setAllergies,
  setMedications,
} from "../redux/childSlice";

function MedicalInformation({ index, setEditStartedTrue }) {
  const currentChild = useSelector((state) => state.currentChild);
  const dispatch = useDispatch();

  const onBlur = () => {
    setEditStartedTrue(index);
  };

  const onPhysicianNameChange = (value) => {
    dispatch(setPhysicianName(value));
  };

  const onPhysicianOfficeChange = (value) => {
    dispatch(setPhysicianOffice(value));
  };

  const onBloodTypeChange = (value) => {
    dispatch(setBloodType(value));
  };

  const onAllergiesChange = (value) => {
    dispatch(setAllergies(value));
  };

  const onMedicationsChange = (value) => {
    dispatch(setMedications(value));
  };

  return (
    <View style={styles.main}>
      <Text style={[globleStyles.title, styles.title]}>
        Medical Information
      </Text>

      <Card>
        <CustomTextInput
          label={"Physician's Name"}
          value={currentChild.physicianName}
          onChangeText={onPhysicianNameChange}
          onBlur={onBlur}
        />
        <CustomTextInput
          label={"Clinic Name"}
          value={currentChild.physicianOffice}
          onChangeText={onPhysicianOfficeChange}
          onBlur={onBlur}
        />
        <CustomTextInput
          label={"Blood Type"}
          value={currentChild.bloodType}
          onChangeText={onBloodTypeChange}
          onBlur={onBlur}
        />
        <CustomTextInput
          label={"Allergies/Conditions"}
          value={currentChild.allergies}
          onChangeText={onAllergiesChange}
          multiline={true}
          numberOfLines={4}
          onBlur={onBlur}
        />
        <CustomTextInput
          label={"Medications"}
          value={currentChild.medications}
          onChangeText={onMedicationsChange}
          multiline={true}
          numberOfLines={4}
          marginBottom={0}
          onBlur={onBlur}
          placeholder="e.g. uses inhaler, diabetic requires insulin"
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  title: {
    marginBottom: 12,
  },
});

export default MedicalInformation;
