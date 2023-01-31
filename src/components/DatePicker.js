import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";

import { globleStyles } from "../shared/style";
import CustomModal from "./CustomModal";
import { COLOR } from "../shared/const";
import CustomButton from "./CustomButton";

function DatePicker({ value, onChange, error = false }) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const _onChange = (event, selectedDate) => {
    if (showDatePicker) setShowDatePicker(false);
    setDate(selectedDate);
    if (onChange) onChange(selectedDate);
  };

  const _onChangeIos = (event, selectedDate) => {
    setDate(selectedDate);
  };

  const onIosDateConfim = () => {
    if (onChange) onChange(date);
    setShowDatePicker(false);
  };

  return (
    <>
      <TouchableWithoutFeedback
        style={styles.mainContainer}
        onPress={() => setShowDatePicker(true)}
      >
        <View
          style={[
            globleStyles.input,
            styles.datePickerContainer,
            error ? { borderColor: COLOR.danger } : {},
          ]}
        >
          <Text style={[globleStyles.inputText, styles.datePickerText]}>
            {value}
          </Text>
          <AntDesign
            name="calendar"
            size={13}
            color={error ? COLOR.danger : "#707070"}
          />
        </View>
      </TouchableWithoutFeedback>
      {Platform.OS === "ios" ? (
        <CustomModal
          visible={showDatePicker}
          setVisible={() => setShowDatePicker(false)}
        >
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={true}
            display="spinner"
            onChange={_onChangeIos}
            maximumDate={new Date()}
          />
          <View style={globleStyles.modalFooter}>
            <CustomButton
              onPress={() => setShowDatePicker(false)}
              text={"Close"}
              buttonStyle={[
                globleStyles.buttonOutLine,
                { borderColor: COLOR.primary, width: 116, height: 36 },
              ]}
              color={COLOR.primary}
            />
            <CustomButton
              onPress={onIosDateConfim}
              text={"Confirm"}
              buttonStyle={[
                globleStyles.buttonPrimary,
                { backgroundColor: COLOR.primary, width: 116, height: 36 },
              ]}
              backgroundColor={COLOR.primary}
              color="#FFFFFF"
            />
          </View>
        </CustomModal>
      ) : showDatePicker ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          display="spinner"
          androidDisplay="spinner"
          is24Hour={true}
          style={globleStyles.input}
          onChange={_onChange}
          maximumDate={new Date()}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  datePickerText: {
    flex: 1,
    color: "#868282",
    fontSize: 14,
  },
});

export default DatePicker;
