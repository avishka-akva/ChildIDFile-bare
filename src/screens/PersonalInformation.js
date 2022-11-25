import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";

import Card from "../components/Card";
import CustomTextInput from "../components/CustomTextInput";
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
        <CustomTextInput
          label={"First Name"}
          value={text}
          onChangeText={onChangeText}
        />
        <CustomTextInput
          label={"Last Name"}
          value={text}
          onChangeText={onChangeText}
        />
        <CustomTextInput
          label={"Nickname"}
          value={text}
          onChangeText={onChangeText}
          marginBottom={0}
        />
      </Card>
      <Card>
        <Text style={[globleStyles.body, globleStyles.inputLable]}>
          Date of Birth
        </Text>
        <View style={[globleStyles.input, styles.datePickerContainer]}>
          <Text style={styles.datePickerText}>
            {date.toISOString().slice(0, 10)}
          </Text>
          <TouchableOpacity
            style={styles.mainContainer}
            onPress={() => setShowDatePicker(true)}
          >
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
      </Card>
      <Card>
        <CustomTextInput
          label={"Addresse"}
          value={text}
          onChangeText={onChangeText}
        />
        <CustomTextInput
          label={"Zip/Postal Code"}
          value={text}
          onChangeText={onChangeText}
        />
        <CustomTextInput
          label={"State/Province/Region"}
          value={text}
          onChangeText={onChangeText}
        />
        <CustomTextInput
          label={"Country"}
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
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  datePickerText: {
    flex: 1,
  },
});

export default PersonalInformation;
