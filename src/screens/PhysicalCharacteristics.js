import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Card from "../components/Card";

import { globleStyles } from "../shared/style";

function PhysicalCharacteristics() {
  const [text, onChangeText] = useState("");

  return (
    <View style={styles.main}>
      <Text style={[globleStyles.title, styles.title]}>
        Physical Characteristics
      </Text>
      <Card>
        <View style={styles.inputContainer}>
          <Text style={[globleStyles.body, styles.inputLable]}>Race/Ethnicity</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[globleStyles.body, styles.inputLable]}>Hair Color</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[globleStyles.body, styles.inputLable]}>Eye Color</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View>
          <Text style={[globleStyles.body, styles.inputLable]}>Height</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
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
