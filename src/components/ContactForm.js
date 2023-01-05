import CustomTextInput from "./CustomTextInput";

function ContactForm({ index, onInputChanged, onBlur, values }) {
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
        label={"Contact Name"}
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
      />
      <CustomTextInput
        label={"Relationship"}
        required
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
        required
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

export default ContactForm;
