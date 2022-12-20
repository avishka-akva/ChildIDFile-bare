import CustomTextInput from "./CustomTextInput";

function ContactForm({ index, onInputChanged, values }) {
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
        label={"Emergency Contact *"}
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
        label={"Relationship *"}
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
        label={"Primary Phone Number *"}
        value={primaryPhoneNumber}
        keyboardType="phone-pad"
        onChangeText={(value) =>
          onInputChanged({
            index,
            propertyName: "primaryPhoneNumber",
            value,
          })
        }
      />
      <CustomTextInput
        label={"Secondary Phone Number"}
        value={secondaryPhoneNumber}
        keyboardType="phone-pad"
        onChangeText={(value) =>
          onInputChanged({
            index,
            propertyName: "secondaryPhoneNumber",
            value,
          })
        }
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
      />
    </>
  );
}

export default ContactForm;
