import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Card from "../components/Card";

import { globleStyles } from "../shared/style";

function PersonalInformation() {
  const [text, onChangeText] = useState("Useless Text");

  return (
    <View style={styles.main}>
      <Text style={[globleStyles.title, styles.title]}>
        Personal Information
      </Text>
      <Card>
        <View style={styles.inputContainer}>
          <Text style={[globleStyles.body, styles.inputLable]}>First Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[globleStyles.body, styles.inputLable]}>Last Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View>
          <Text style={[globleStyles.body, styles.inputLable]}>Nickname</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
      </Card>
      <Card>
        <View>
          <Text style={[globleStyles.body, styles.inputLable]}>
            Date of Birth
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
      </Card>
      <Card>
        <View style={styles.inputContainer}>
          <Text style={[globleStyles.body, styles.inputLable]}>Addresse</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[globleStyles.body, styles.inputLable]}>City</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[globleStyles.body, styles.inputLable]}>Zip/Postal Code</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[globleStyles.body, styles.inputLable]}>State/Province/Region</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View>
          <Text style={[globleStyles.body, styles.inputLable]}>Country</Text>
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

export default PersonalInformation;
