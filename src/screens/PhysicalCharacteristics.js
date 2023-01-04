import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { globleStyles } from "../shared/style";
import Card from "../components/Card";
import RadioButtonGroup from "../components/RadioButtonGroup";
import CustomTextInput from "../components/CustomTextInput";
import {
  setGender,
  setRace,
  setHairColor,
  setEyeColor,
  setHeight,
  setWeight,
} from "../redux/childSlice";

function PhysicalCharacteristics({ index, setEditStartedTrue }) {
  const currentChild = useSelector((state) => state.currentChild);
  const dispatch = useDispatch();

  const onBlur = () => {
    setEditStartedTrue(index);
  };

  const onGenderChange = (value) => {
    dispatch(setGender(value));
    onBlur();
  };

  const onRaceChange = (value) => {
    dispatch(setRace(value));
  };

  const onHairColorChange = (value) => {
    dispatch(setHairColor(value));
  };

  const onEyeColorChange = (value) => {
    dispatch(setEyeColor(value));
  };

  const onHeightChange = (value) => {
    dispatch(setHeight(value));
  };

  const onWeightChange = (value) => {
    dispatch(setWeight(value));
  };

  return (
    <View style={styles.main}>
      <Text style={[globleStyles.title, styles.title]}>
        Physical Characteristics
      </Text>
      <Card>
        <View style={[globleStyles.inputContainer, styles.radioContainer]}>
          <Text style={[globleStyles.body, { marginRight: 20 }]}>Gender <Text style={globleStyles.requiredText}>*</Text></Text>
          <RadioButtonGroup
            values={[
              {
                text: "Male",
                value: "male",
              },
              {
                text: "Female",
                value: "female",
              },
              {
                text: "X",
                value: "x",
              },
            ]}
            defaultValue={currentChild.gender}
            onPress={onGenderChange}
          />
        </View>
        <CustomTextInput
          label={"Race/Ethnicity"}
          value={currentChild.race}
          onChangeText={onRaceChange}
        />
        <CustomTextInput
          label={"Hair Color"}
          value={currentChild.hairColor}
          onChangeText={onHairColorChange}
          onBlur={onBlur}
        />
        <CustomTextInput
          label={"Eye Color"}
          value={currentChild.eyeColor}
          onChangeText={onEyeColorChange}
          onBlur={onBlur}
        />
        <CustomTextInput
          label={"Approximate Height"}
          value={currentChild.height}
          onChangeText={onHeightChange}
          marginBottom={0}
          onBlur={onBlur}
        />
        <CustomTextInput
          label={"Approximate Weight"}
          value={currentChild.weight}
          onChangeText={onWeightChange}
          marginBottom={0}
          onBlur={onBlur}
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
  inputContainer: {
    marginBottom: 16,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputLable: {
    marginBottom: 8,
  },
  input: {
    height: 42,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#70707014",
    shadowColor: "#70707014",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default PhysicalCharacteristics;
