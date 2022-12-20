import { TextInput, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { globleStyles } from "../shared/style";

function CustomTextInput({
  label,
  value,
  onChangeText,
  marginBottom = 16,
  multiline = false,
  numberOfLines = 0,
  ...props
}) {
  const { view } = useSelector((state) => state.childManage);

  return (
    <View style={{ marginBottom }}>
      <Text style={[globleStyles.body, globleStyles.inputLable]}>{label}</Text>
      {multiline ? (
        <TextInput
          style={[
            globleStyles.input,
            { height: "auto", textAlignVertical: "top" },
          ]}
          onChangeText={onChangeText}
          value={value}
          multiline
          numberOfLines={numberOfLines}
          {...props}
          editable={!view}
        />
      ) : (
        <TextInput
          style={globleStyles.input}
          onChangeText={onChangeText}
          value={value}
          editable={!view}
          {...props}
        />
      )}
    </View>
  );
}

export default CustomTextInput;
