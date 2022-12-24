import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Card from "../components/Card";
import { globleStyles } from "../shared/style";
import CustomButton from "../components/CustomButton";
import Accordion from "../components/Accordion";
import {
  setTrusedContactValues,
  addNewTrusedContact,
  removeTrusedContactValues,
} from "../redux/childSlice";
import { COLOR, MAXIMUM_TRUSTED_CONTACT_COUNT } from "../shared/const";
import ContactForm from "../components/ContactForm";

function TrustedContact({ index, setEditStartedTrue }) {
  const { trustedContacts } = useSelector((state) => state.currentChild);
  const dispatch = useDispatch();

  const onInputChanged = (values) => {
    dispatch(setTrusedContactValues(values));
  };

  const onAddButton = () => {
    dispatch(addNewTrusedContact());
  };

  const onItemsDelete = (name) => {
    dispatch(removeTrusedContactValues(name));
  };

  const viewItem = (index, values) => (
    <Accordion
      key={index}
      title={values.name}
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
        />
      </Card>
    );
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

export default TrustedContact;
