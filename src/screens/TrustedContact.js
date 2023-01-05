import React, { useEffect, useState } from "react";
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
import { setTrustedContactsError } from "../redux/childManageSlice";
import {
  COLOR,
  CONTACT_INIT_OBJ,
  MAXIMUM_TRUSTED_CONTACT_COUNT,
} from "../shared/const";
import ContactForm from "../components/ContactForm";
import CustomModal from "../components/CustomModal";

function TrustedContact({ index, setEditStartedTrue }) {
  const dispatch = useDispatch();
  const { trustedContacts } = useSelector((state) => state.currentChild);
  const { trustedContactsError } = useSelector((state) => state.childManage);

  const [openIndex, setOpenIndex] = useState(null);
  const [contactEditIndex, setContactEditIndex] = useState(null);
  const [tempTrustedContacts, setTempTrustedContacts] = useState([
    { ...CONTACT_INIT_OBJ },
  ]);

  const onBlur = () => {
    setEditStartedTrue(index);
  };

  const onErrorModelColse = () => {
    dispatch(setTrustedContactsError(false));
  };

  const onInputChanged = ({ index, propertyName, value }) => {
    try {
      if (contactEditIndex !== index) setContactEditIndex(index);

      let newTempTrustedContacts = [...tempTrustedContacts];
      newTempTrustedContacts[index][propertyName] = value;
      setTempTrustedContacts(newTempTrustedContacts);
    } catch (error) {
      console.error("🚀 ~ file: TrustedContact.js:39 ~ ", error);
    }
  };

  const onSaveDetails = () => {
    const index = tempTrustedContacts.length - 1;

    // validation
    const { name, relationship, primaryPhoneNumber } =
      tempTrustedContacts[index];
    if (!name || !relationship || !primaryPhoneNumber) {
      return;
    }

    if (tempTrustedContacts.length > trustedContacts.length) {
      dispatch(addNewTrusedContact(tempTrustedContacts[index]));
    } else {
      dispatch(
        setTrusedContactValues({
          index,
          values: { ...tempTrustedContacts[index] },
        })
      );
    }

    if (tempTrustedContacts.length === MAXIMUM_TRUSTED_CONTACT_COUNT) {
      setOpenIndex(index);
    } else {
      setOpenIndex(null);
    }
    setContactEditIndex(null);
  };

  const onAddAdditional = () => {
    setTempTrustedContacts([...tempTrustedContacts, { ...CONTACT_INIT_OBJ }]);
    setContactEditIndex(null);
  };

  const onItemsDelete = (name) => {
    setTempTrustedContacts(
      tempTrustedContacts.filter((item) => item.name !== name)
    );
    dispatch(removeTrusedContactValues(name));
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
          setTrusedContactValues({
            index: contactEditIndex,
            values: { ...tempTrustedContacts[index] },
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
    if (trustedContacts.length > 0) {
      const currentContact = trustedContacts.map((contact) => ({
        ...contact,
      }));
      setTempTrustedContacts(currentContact);
    }
  }, []);

  const isSave =
    tempTrustedContacts.length > trustedContacts.length ||
    (contactEditIndex !== 0 &&
      contactEditIndex === tempTrustedContacts.length - 1);

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
      {tempTrustedContacts.map((contactItem, index) => {
        if (
          trustedContacts.length < MAXIMUM_TRUSTED_CONTACT_COUNT &&
          tempTrustedContacts.length - 1 === index
        ) {
          return editItem(index, contactItem);
        }
        return viewItem(index, contactItem);
      })}

      {trustedContacts.length < MAXIMUM_TRUSTED_CONTACT_COUNT && (
        <View style={styles.addButtonContainer}>
          <CustomButton
            onPress={isSave ? onSaveDetails : onAddAdditional}
            text={isSave ? "Save Details" : "Add Additional Contacts"}
            backgroundColor={COLOR.primary}
            buttonWidth={"100%"}
          />
        </View>
      )}

      <CustomModal
        visible={trustedContactsError}
        setVisible={onErrorModelColse}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#434343",
            textAlign: "center",
            marginVertical: 24
          }}
        >
          Please Add one or up to 10 Trusted Contacts
        </Text>
        <CustomButton
          onPress={onErrorModelColse}
          text={"Continue"}
          backgroundColor={COLOR.primary}
          buttonWidth={130}
          buttonHeight={40}
        />
      </CustomModal>
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
    marginVertical: 4,
  },
});

export default TrustedContact;
