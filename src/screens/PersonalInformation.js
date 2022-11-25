import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";

import Card from "../components/Card";
import { globleStyles } from "../shared/style";

function PersonalInformation() {
  const [text, onChangeText] = useState("");

  const [date, setDateOfBirth] = useState(new Date(1598051730000));
  const [showDatePicker, setShowDatePicker] = useState(false);

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
          <View style={[styles.input,styles.datePickerContainer]}>
            <Text style={styles.datePickerText}>{(date.toISOString().slice(0, 10))}</Text>
            <TouchableOpacity style={styles.mainContainer} onPress={() => setShowDatePicker(true)}>
              <AntDesign name="calendar" size={13} color="#707070" />
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              is24Hour={true}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate;
                setShowDatePicker(false);
                setDateOfBirth(currentDate);
              }}
            />
          )}
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
          <Text style={[globleStyles.body, styles.inputLable]}>
            Zip/Postal Code
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[globleStyles.body, styles.inputLable]}>
            State/Province/Region
          </Text>
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
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  datePickerText: {
    flex: 1
  }
});

export default PersonalInformation;
