import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Card from "../components/Card";
import { globleStyles } from "../shared/style";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import Accordion from "../components/Accordion";
import {
  setTrusedContactValues,
  addNewTrusedContact,
} from "../redux/childSlice";
import { MAXIMUM_TRUSTED_CONTACT_COUNT } from "../shared/const";

function TrustedContact() {
  const { trustedContacts } = useSelector((state) => state.currentChild);
  const dispatch = useDispatch();

  const onInputChanged = (values) => {
    dispatch(setTrusedContactValues(values));
  };

  const onAddButton = () => {
    dispatch(addNewTrusedContact());
  };

  const getForm = (
    index,
    { name, contactNumber, address }
  ) => {
    return (
      <>
        <CustomTextInput
          label={"Name/Location"}
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
          label={"Contact Number (Optional)"}
          value={contactNumber}
          onChangeText={(value) =>
            onInputChanged({
              index,
              propertyName: "contactNumber",
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
          Trusted Contact Information
        </Text>
        <Text style={styles.added}>
          {trustedContacts.length}/{MAXIMUM_TRUSTED_CONTACT_COUNT} added
        </Text>
      </View>
      {trustedContacts.map((contactItem, index) => {
        if (trustedContacts.length - 1 === index) {
          return editItem(index, contactItem);
        }
        return viewItem(index, contactItem);
      })}

      {trustedContacts.length < MAXIMUM_TRUSTED_CONTACT_COUNT && (
        <View style={styles.addButtonContainer}>
          <CustomButton
            onPress={onAddButton}
            text={"Add Additional Contacts"}
            backgroundColor="#A352EB"
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

export default TrustedContact;
