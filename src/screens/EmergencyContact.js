import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Card from "../components/Card";
import { globleStyles } from "../shared/style";
import CustomButton from "../components/CustomButton";
import Accordion from "../components/Accordion";
import {
  setEmergencyContactValues,
  addNewEmergencyContact,
  removeEmergencyContactValues,
} from "../redux/childSlice";
import {
  COLOR,
  CONTACT_INIT_OBJ,
  MAXIMUM_EMERGENCY_CONTACT_COUNT,
} from "../shared/const";
import ContactForm from "../components/ContactForm";

function EmergencyContact({ index, setEditStartedTrue }) {
  const dispatch = useDispatch();
  const { emergencyContacts } = useSelector((state) => state.currentChild);

  const [openIndex, setOpenIndex] = useState(null);
  const [contactEditIndex, setContactEditIndex] = useState(null);
  const [tempEmergencyContacts, setTempEmergencyContacts] = useState([
    { ...CONTACT_INIT_OBJ },
  ]);

  const onBlur = () => {
    setEditStartedTrue(index);
  };

  const onInputChanged = ({ index, propertyName, value }) => {
    try {
      if (contactEditIndex !== index) setContactEditIndex(index);

      let newTempEmergencyContacts = [...tempEmergencyContacts];
      newTempEmergencyContacts[index][propertyName] = value;
      setTempEmergencyContacts(newTempEmergencyContacts);
    } catch (error) {
      console.error("🚀 ~ file: EmergencyContact.js:40 ~ ", error);
    }
  };

  const onSaveDetails = () => {
    const index = tempEmergencyContacts.length - 1;

    // validation
    const { name, relationship, primaryPhoneNumber } =
      tempEmergencyContacts[index];
    if (!name || !relationship || !primaryPhoneNumber) {
      return;
    }

    if (tempEmergencyContacts.length > emergencyContacts.length) {
      dispatch(addNewEmergencyContact(tempEmergencyContacts[index]));
    } else {
      dispatch(
        setEmergencyContactValues({
          index,
          values: { ...tempEmergencyContacts[index] },
        })
      );
    }

    if (tempEmergencyContacts.length === MAXIMUM_EMERGENCY_CONTACT_COUNT) {
      setOpenIndex(index);
    } else {
      setOpenIndex(null);
    }
    setContactEditIndex(null);
  };

  const onAddAdditional = () => {
    setTempEmergencyContacts([
      ...tempEmergencyContacts,
      { ...CONTACT_INIT_OBJ },
    ]);
    setContactEditIndex(null);
  };

  const onItemsDelete = (name) => {
    setTempEmergencyContacts(
      tempEmergencyContacts.filter((item) => item.name !== name)
    );
    dispatch(removeEmergencyContactValues(name));
  };

  const viewItem = (index, values) => (
    <Accordion
      key={index}
      index={index}
      title={values.name}
      open={index === openIndex}
      isEdit={index === contactEditIndex}
      onSave={() => {
        dispatch(
          setEmergencyContactValues({
            index: contactEditIndex,
            values: { ...tempEmergencyContacts[index] },
          })
        );
        setContactEditIndex(null);
      }}
      onSaveCancel={() => {
        setContactEditIndex(null);
      }}
      onOpen={(index) => {
        setOpenIndex(index);
      }}
      onDelete={() => onItemsDelete(values.name)}
    >
      <ContactForm
        index={index}
        values={values}
        onInputChanged={onInputChanged}
      />
    </Accordion>
  );

  const editItem = (index, values) => {
    return (
      <Card key={index}>
        <ContactForm
          index={index}
          values={values}
          onInputChanged={onInputChanged}
          onBlur={onBlur}
        />
      </Card>
    );
  };

  useEffect(() => {
    if (emergencyContacts.length > 0) {
      const currentContact = emergencyContacts.map((contact) => ({
        ...contact,
      }));
      setTempEmergencyContacts(currentContact);
    }
  }, []);

  const isSave =
    tempEmergencyContacts.length > emergencyContacts.length ||
    (contactEditIndex !== 0 &&
      contactEditIndex === tempEmergencyContacts.length - 1);

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
      {tempEmergencyContacts.map((contactItem, index) => {
        if (
          emergencyContacts.length < MAXIMUM_EMERGENCY_CONTACT_COUNT &&
          tempEmergencyContacts.length - 1 === index
        ) {
          return editItem(index, contactItem);
        }
        return viewItem(index, contactItem);
      })}

      {emergencyContacts.length < MAXIMUM_EMERGENCY_CONTACT_COUNT && (
        <View style={styles.addButtonContainer}>
          <CustomButton
            onPress={isSave ? onSaveDetails : onAddAdditional}
            text={isSave ? "Save Details" : "Add Additional Contacts"}
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
