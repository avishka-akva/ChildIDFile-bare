import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import Card from "../components/Card";
import { globleStyles } from "../shared/style";
import CustomButton from "../components/CustomButton";

import {
  setTrusedContactValues,
  addNewTrusedContact,
  removeTrusedContactValues,
} from "../redux/childSlice";
import {
  COLOR,
  TRUSTED_CONTACT_INIT_OBJ,
  MAXIMUM_TRUSTED_CONTACT_COUNT,
} from "../shared/const";
import CustomModal from "../components/CustomModal";
import CustomTextInput from "../components/CustomTextInput";
import BulletList from "../components/BulletList";

function ContactForm({
  index,
  onInputChanged,
  onBlur,
  values,
  isNameEmpty = false,
}) {
  const {
    name,
    relationship,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    address,
  } = values;
  return (
    <>
      <CustomTextInput
        label={"Trusted contact/ location"}
        required
        value={name}
        onChangeText={(value) =>
          onInputChanged({
            index,
            propertyName: "name",
            value,
          })
        }
        onBlur={onBlur ? onBlur : () => {}}
        error={isNameEmpty}
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
        onBlur={onBlur ? onBlur : () => {}}
      />
      <CustomTextInput
        label={"Primary Phone Number "}
        value={primaryPhoneNumber}
        keyboardType="phone-pad"
        onChangeText={(value) =>
          onInputChanged({
            index,
            propertyName: "primaryPhoneNumber",
            value,
          })
        }
        onBlur={onBlur ? onBlur : () => {}}
      />
      <CustomTextInput
        label={"Address"}
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
        onBlur={onBlur ? onBlur : () => {}}
      />
    </>
  );
}

function AddNewContact({ onSubmit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addContact, setAddContact] = useState({ ...TRUSTED_CONTACT_INIT_OBJ });
  const [errorList, setErrorList] = useState([]);

  const onModalClose = () => {
    setIsModalOpen(false);
    setAddContact({ ...TRUSTED_CONTACT_INIT_OBJ });
    setErrorList([]);
  };

  const onAddInputChanged = ({ propertyName, value }) => {
    const newValue = { ...addContact };
    newValue[propertyName] = value;
    setAddContact(newValue);
  };

  const addToErrorList = (name) => {
    if (getFeildValidation(name)) return;
    setErrorList((previousValue) => [...previousValue, name]);
  };

  const getFeildValidation = (name) => {
    return errorList.includes(name);
  };

  const _onSubmit = () => {
    // validation
    if (!addContact.name) {
      addToErrorList("name");
      return;
    }
    // clear error list
    if (errorList.length) setErrorList([]);

    onSubmit({ ...addContact });
    onModalClose();
    setAddContact({ ...TRUSTED_CONTACT_INIT_OBJ });
  };

  return (
    <>
      <CustomButton
        onPress={() => setIsModalOpen(true)}
        text={"Add New Contact"}
        buttonStyle={[
          globleStyles.buttonPrimary,
          {
            backgroundColor: COLOR.primary,
            height: 36,
          },
        ]}
      />

      <CustomModal
        visible={isModalOpen}
        onClose={onModalClose}
        alignItems="stretch"
        paddingHorizontal={0}
        backgroundClose={false}
        keyboardAvoid
      >
        <ScrollView
          style={{
            width: "100%",
            backgroundColor: "#fff",
            paddingHorizontal: 28,
          }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[globleStyles.rowSpaceBetween, { marginBottom: 22 }]}>
            <Text>Add New Contact</Text>
            <TouchableWithoutFeedback onPress={onModalClose}>
              <AntDesign name="close" size={12} color="#000" />
            </TouchableWithoutFeedback>
          </View>
          <ContactForm
            values={addContact}
            onInputChanged={onAddInputChanged}
            validate={getFeildValidation}
          />

          <View style={[globleStyles.rowEnd, { marginTop: 22 }]}>
            <CustomButton
              onPress={_onSubmit}
              text={"Save Details"}
              buttonStyle={[
                globleStyles.buttonPrimary,
                {
                  backgroundColor: COLOR.primary,
                  width: 116,
                  height: 36,
                },
              ]}
            />
          </View>
        </ScrollView>
      </CustomModal>
    </>
  );
}

function ContactModal({
  isModalOpen,
  onModalClose,
  selectedIdex,
  contacts,
  onItemDelete,
  onSubmit,
}) {
  const [contactValues, setContactValues] = useState({
    ...TRUSTED_CONTACT_INIT_OBJ,
  });
  const [isEditStarted, setIsEditStarted] = useState(false);

  const onInputChanged = ({ propertyName, value }) => {
    const newValue = { ...contactValues };
    newValue[propertyName] = value;
    setContactValues(newValue);
  };

  const _onSubmit = () => {
    // validation
    if (!contactValues.name) {
      return;
    }

    onSubmit(selectedIdex, { ...contactValues });
    onModalClose();
    setContactValues({ ...TRUSTED_CONTACT_INIT_OBJ });
  };

  const _onDelete = () => {
    onItemDelete(selectedIdex);
    onModalClose();
  };

  useEffect(() => {
    setContactValues({
      ...contacts[selectedIdex],
    });
    setIsEditStarted(false);
  }, [selectedIdex, isModalOpen]);

  return (
    <CustomModal
      visible={isModalOpen}
      onClose={onModalClose}
      alignItems="stretch"
      paddingHorizontal={0}
      backgroundClose={false}
      keyboardAvoid
    >
      <ScrollView
        style={{
          width: "100%",
          backgroundColor: "#fff",
          paddingHorizontal: 28,
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[globleStyles.rowSpaceBetween, { marginBottom: 22 }]}>
          <Text>Edit New Contact</Text>
          <TouchableWithoutFeedback onPress={onModalClose}>
            <AntDesign name="close" size={12} color="#000" />
          </TouchableWithoutFeedback>
        </View>

        <ContactForm
          values={contactValues}
          onInputChanged={onInputChanged}
          onBlur={() => {
            if (!isEditStarted) setIsEditStarted(true);
          }}
        />

        <View style={[globleStyles.rowSpaceAround, { marginTop: 22 }]}>
          <CustomButton
            onPress={_onDelete}
            text={"Delete"}
            buttonStyle={[
              globleStyles.buttonPrimary,
              {
                backgroundColor: COLOR.primary,
                width: 116,
                height: 36,
              },
            ]}
          />
          <CustomButton
            onPress={_onSubmit}
            text={"Save Details"}
            buttonStyle={[
              globleStyles.buttonPrimary,
              {
                backgroundColor: isEditStarted ? COLOR.primary : "#dddddd",
                width: 116,
                height: 36,
              },
            ]}
            disabled={!isEditStarted}
          />
        </View>
      </ScrollView>
    </CustomModal>
  );
}

function TrustedContact({ index, setEditStartedTrue }) {
  const dispatch = useDispatch();
  const { trustedContacts } = useSelector((state) => state.currentChild);

  const [selectedIdex, setSelectedIdex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const onItemDelete = (index) => {
    dispatch(removeTrusedContactValues(index));
  };

  const ViewItem = ({ index, values }) => (
    <Pressable
      onPress={() => {
        setSelectedIdex(index);
        setIsContactModalOpen(true);
      }}
    >
      <Card>
        <View style={[globleStyles.rowSpaceBetween, { marginBottom: 8 }]}>
          <Text>Contact {index + 1}</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              onItemDelete(index);
            }}
          >
            <AntDesign name="close" size={12} color="#000" />
          </TouchableWithoutFeedback>
        </View>
        <Text style={[globleStyles.body, { marginBottom: 4 }]}>
          Name : {values.name}
        </Text>
        <Text style={[globleStyles.body, { marginBottom: 4 }]}>
          Relationship : {values.relationship}
        </Text>
        <Text style={globleStyles.body}>
          Primary Phone Number : {values.primaryPhoneNumber}
        </Text>
      </Card>
    </Pressable>
  );

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

      <View style={styles.titleContainer}>
        <Text style={[globleStyles.title, styles.subTitle]}>
          Added Contact List
        </Text>
        <AddNewContact
          onSubmit={(values) => dispatch(addNewTrusedContact(values))}
        />
      </View>

      {trustedContacts.length > 0 ? (
        trustedContacts.map((contactItem, index) => (
          <ViewItem key={index} index={index} values={contactItem} />
        ))
      ) : (
        <View>
          <BulletList
            containerStyle={{ marginTop: 20 }}
            childStyle={{
              width: "95%",
              color: "#707070",
              fontSize: 14,
              fontFamily: "Segoe-UI",
            }}
            pointSize={14}
            pointColor="#707070"
            options={[
              "Please Add Trusted Contacts (Parents/Guardians)",
              "In this section, you can add up to 10 additional Trusted Contacts or Locations where your child may be",
            ]}
          />
        </View>
      )}

      <ContactModal
        selectedIdex={selectedIdex}
        isModalOpen={isContactModalOpen}
        onModalClose={() => setIsContactModalOpen(false)}
        contacts={trustedContacts}
        onItemDelete={onItemDelete}
        onSubmit={(index, values) =>
          dispatch(setTrusedContactValues({ index, values }))
        }
      />
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
