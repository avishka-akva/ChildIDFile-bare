import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Card from "../components/Card";
import { globleStyles } from "../shared/style";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import Accordion from "../components/Accordion";
import {
  setEmergencyContactValues,
  addNewEmergencyContact,
} from "../redux/childSlice";
import { COLOR, MAXIMUM_EMERGENCY_CONTACT_COUNT } from "../shared/const";


function EmergencyContact() {
  const { emergencyContacts } = useSelector((state) => state.currentChild);
  const dispatch = useDispatch();

  const onInputChanged = (values) => {
    dispatch(setEmergencyContactValues(values));
  };

  const onAddButton = () => {
    dispatch(addNewEmergencyContact());
  };

  const getForm = (
    index,
    { name, relationship, cell, home, work, address }
  ) => {
    return (
      <>
        <CustomTextInput
          label={"Emergency Contact"}
          value={name}
          onChangeText={(value) =>
            onInputChanged({
              index,
              propertyName: "name",
              value,
            })
          }
        />
        <CustomTextInput
          label={"Relationship"}
          value={relationship}
          onChangeText={(value) =>
            onInputChanged({
              index,
              propertyName: "relationship",
              value,
            })
          }
        />
        <CustomTextInput
          label={"Cell (Optional)"}
          value={cell}
          onChangeText={(value) =>
            onInputChanged({
              index,
              propertyName: "cell",
              value,
            })
          }
        />
        <CustomTextInput
          label={"Home (Optional)"}
          value={home}
          onChangeText={(value) =>
            onInputChanged({
              index,
              propertyName: "home",
              value,
            })
          }
        />
        <CustomTextInput
          label={"Work (Optional)"}
          value={work}
          onChangeText={(value) =>
            onInputChanged({
              index,
              propertyName: "work",
              value,
            })
          }
        />
        <CustomTextInput
          label={"Address (Optional)"}
          value={address}
          onChangeText={(value) =>
            onInputChanged({
              index,
              propertyName: "address",
              value,
            })
          }
          multiline={true}
          numberOfLines={4}
          marginBottom={0}
        />
      </>
    );
  };

  const viewItem = (index, props) => (
    <Accordion key={index} title={props.name}>
      {getForm(index, props)}
    </Accordion>
  );

  const editItem = (index, props) => {
    return <Card key={index}>{getForm(index, props)}</Card>;
  };

  return (
    <View style={styles.main}>
      <View style={styles.titleContainer}>
        <Text style={[globleStyles.title, styles.title]}>
          Emergency Contact Information
        </Text>
        <Text style={styles.added}>
          {emergencyContacts.length}/{MAXIMUM_EMERGENCY_CONTACT_COUNT} added
        </Text>
      </View>
      {emergencyContacts.map((contactItem, index) => {
        if (emergencyContacts.length - 1 === index) {
          return editItem(index, contactItem);
        }
        return viewItem(index, contactItem);
      })}

      {emergencyContacts.length < MAXIMUM_EMERGENCY_CONTACT_COUNT && (
        <View style={styles.addButtonContainer}>
          <CustomButton
            onPress={onAddButton}
            text={"Add Additional Contacts"}
            backgroundColor={COLOR.primary}
            buttonWidth={"100%"}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {},
  added: {
    color: "#707070",
    fontSize: 12,
  },
  addButtonContainer: {
    marginTop: 18,
  },
});

export default EmergencyContact;
