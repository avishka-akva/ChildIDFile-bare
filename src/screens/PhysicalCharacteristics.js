import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { globleStyles } from "../shared/style";
import Card from "../components/Card";
import RadioButtonGroup from "../components/RadioButtonGroup";
import CustomTextInput from "../components/CustomTextInput";

function PhysicalCharacteristics() {
  const [text, onChangeText] = useState("");

  return (
    <View style={styles.main}>
      <Text style={[globleStyles.title, styles.title]}>
        Physical Characteristics
      </Text>
      <Card>
        <View style={[globleStyles.inputContainer, styles.radioContainer]}>
          <Text style={[globleStyles.body, { marginRight: 20 }]}>Gender</Text>
          <RadioButtonGroup
            values={[
              {
                text: "Male",
              },
              {
                text: "Female",
              },
              {
                text: "Other",
              },
            ]}
            onPress={() => {}}
          />
        </View>
        <CustomTextInput
          label={"Race/Ethnicity"}
          value={text}
          onChangeText={onChangeText}
        />
        <CustomTextInput
          label={"Hair Color"}
          value={text}
          onChangeText={onChangeText}
        />
        <CustomTextInput
          label={"Eye Color "}
          value={text}
          onChangeText={onChangeText}
        />
        <CustomTextInput
          label={"Height"}
          value={text}
          onChangeText={onChangeText}
          marginBottom={0}
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
