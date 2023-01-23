import React from "react";
import { StyleSheet, Text, View } from "react-native";
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
import DatePicker from "../components/DatePicker";
import { COLOR } from "../shared/const";
import { formatDate } from "../shared/date";

function PersonalInformation({
  setEditStartedTrue,
  validate,
  removeNameFromErrorList,
}) {
  const currentChild = useSelector((state) => state.currentChild);
  const dispatch = useDispatch();

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
          label={"Child's First Name(s)"}
          required
          error={validate("firstName")}
          value={currentChild?.firstName}
          onChangeText={onFirstNameChangeText}
          onBlur={onBlur}
        />
        <CustomTextInput
          label={"Child's Last Name(s)"}
          required
          error={validate("lastName")}
          value={currentChild?.lastName}
          onChangeText={onLastNameChangeText}
          onBlur={onBlur}
        />
        <CustomTextInput
          label={"Child's Nickname"}
          error={validate("nickName")}
          value={currentChild?.nickName}
          onChangeText={onNickNameChangeText}
          marginBottom={0}
          onBlur={onBlur}
        />
      </Card>
      <Card>
        <Text style={[globleStyles.body, globleStyles.inputLable]}>
          Child's Date of Birth <Text style={{ color: COLOR.danger }}>*</Text>
        </Text>
        <DatePicker
          value={currentChild?.dob}
          onChange={(selectedDate) => {
            dispatch(setDateOfBirth(formatDate(selectedDate)));
            onBlur();
            if (isDobInValid) {
              removeNameFromErrorList("dob");
            }
          }}
          error={isDobInValid}
        />
      </Card>
      <Card>
        <CustomTextInput
          label={"Child's Address"}
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
});

export default PersonalInformation;
