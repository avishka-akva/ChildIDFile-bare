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
  const [_error, setError] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const currentDate = new Date();

  const _onChange = (event, selectedDate) => {
    if (showDatePicker) setShowDatePicker(false);

    if (selectedDate > currentDate) {
      setError(true);
    } else {
      setError(false);
    }
    setDate(selectedDate);
    if (onChange) onChange(selectedDate);
  };

  const _onChangeIos = (event, selectedDate) => {
    if (selectedDate > currentDate) setError(true);
    else setError(false);

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
            error || (_error && Platform.OS !== "ios")
              ? { borderColor: COLOR.danger }
              : {},
          ]}
        >
          <Text
            style={[
              globleStyles.inputText,
              styles.datePickerText,
              error || (_error && Platform.OS !== "ios")
                ? { color: COLOR.danger }
                : {},
            ]}
          >
            {value}
          </Text>
          <AntDesign
            name="calendar"
            size={13}
            color={
              error || (_error && Platform.OS !== "ios")
                ? COLOR.danger
                : "#707070"
            }
          />
        </View>
      </TouchableWithoutFeedback>
      {_error && Platform.OS !== "ios" && (
        <View style={{ width: "100%", marginBottom: 12 }}>
          <Text style={{ color: COLOR.danger, fontSize: 11 }}>
            Birthday should be less than the present date.
          </Text>
        </View>
      )}

      {Platform.OS === "ios" ? (
        <CustomModal
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
        >
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={true}
            display="spinner"
            onChange={_onChangeIos}
            // maximumDate={new Date()}
          />
          {_error && (
            <View style={{ width: "100%", marginBottom: 12 }}>
              <Text style={{ color: COLOR.danger, fontSize: 12 }}>
                Birthday should be less than the present date.
              </Text>
            </View>
          )}

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
                {
                  backgroundColor: _error ? COLOR.disabled : COLOR.primary,
                  width: 116,
                  height: 36,
                },
              ]}
              backgroundColor={COLOR.primary}
              color="#FFFFFF"
              disabled={_error}
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
          // maximumDate={new Date()}
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
