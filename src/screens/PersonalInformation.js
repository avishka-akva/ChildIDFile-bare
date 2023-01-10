import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import Card from "../components/Card";
import CustomTextInput from "../components/CustomTextInput";
import { globleStyles } from "../shared/style";
import {
  setFirstName,
  setLastName,
  setNickName,
  setDateOfBirth,
  setAddress,
  setCity,
  setPostalCode,
  setProvince,
  setCountry,
} from "../redux/childSlice";
import { COLOR } from "../shared/const";

function PersonalInformation({
  setEditStartedTrue,
  validate,
  removeNameFromErrorList,
}) {
  const currentChild = useSelector((state) => state.currentChild);
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date(1598051730000));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onBlur = () => {
    setEditStartedTrue();
  };

  const onFirstNameChangeText = (value) => {
    dispatch(setFirstName(value));
  };

  const onLastNameChangeText = (value) => {
    dispatch(setLastName(value));
  };

  const onNickNameChangeText = (value) => {
    dispatch(setNickName(value));
  };

  const onAddressChangeText = (value) => {
    dispatch(setAddress(value));
  };

  const onCityChangeText = (value) => {
    dispatch(setCity(value));
  };

  const onPostalCodeChangeText = (value) => {
    dispatch(setPostalCode(value));
  };

  const onProvincChangeText = (value) => {
    dispatch(setProvince(value));
  };

  const onCountrChangeText = (value) => {
    dispatch(setCountry(value));
  };

  const isDobInValid = validate("dob");

  return (
    <View style={styles.main}>
      <Text style={[globleStyles.title, styles.title]}>
        Personal Information
      </Text>
      <Card>
        <CustomTextInput
          label={"First Name"}
          required
          error={validate("firstName")}
          value={currentChild?.firstName}
          onChangeText={onFirstNameChangeText}
          onBlur={onBlur}
        />
        <CustomTextInput
          label={"Last Name"}
          required
          error={validate("lastName")}
          value={currentChild?.lastName}
          onChangeText={onLastNameChangeText}
          onBlur={onBlur}
        />
        <CustomTextInput
          label={"Nickname"}
          required
          error={validate("nickName")}
          value={currentChild?.nickName}
          onChangeText={onNickNameChangeText}
          marginBottom={0}
          onBlur={onBlur}
        />
      </Card>
      <Card>
        <Text style={[globleStyles.body, globleStyles.inputLable]}>
          Date of Birth *
        </Text>
        <TouchableWithoutFeedback
          style={styles.mainContainer}
          onPress={() => setShowDatePicker(true)}
        >
          <View
            style={[
              globleStyles.input,
              styles.datePickerContainer,
              isDobInValid ? { borderColor: COLOR.danger } : {},
            ]}
          >
            <Text style={[globleStyles.inputText, styles.datePickerText]}>
              {currentChild?.dob}
            </Text>
            <AntDesign
              name="calendar"
              size={13}
              color={isDobInValid ? COLOR.danger : "#707070"}
            />
          </View>
        </TouchableWithoutFeedback>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={true}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate;
              setShowDatePicker(false);
              setDate(currentDate);
              dispatch(setDateOfBirth(currentDate.toISOString().slice(0, 10)));
              onBlur();
              if (isDobInValid) {
                removeNameFromErrorList("dob");
              }
            }}
          />
        )}
      </Card>
      <Card>
        <CustomTextInput
          label={"Address"}
          value={currentChild.address}
          onChangeText={onAddressChangeText}
          onBlur={onBlur}
        />
        <CustomTextInput
          label={"City"}
          value={currentChild.city}
          onChangeText={onCityChangeText}
          onBlur={onBlur}
        />
        <CustomTextInput
          label={"Zip/Postal Code"}
          value={currentChild.postalCode}
          onChangeText={onPostalCodeChangeText}
          onBlur={onBlur}
        />
        <CustomTextInput
          label={"State/Province/Region"}
          value={currentChild.province}
          onChangeText={onProvincChangeText}
          onBlur={onBlur}
        />
        <CustomTextInput
          label={"Country"}
          value={currentChild.country}
          onChangeText={onCountrChangeText}
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

export default PersonalInformation;
