import { TextInput, Text, View } from "react-native";
import { globleStyles } from "../shared/style";

function CustomTextInput({
  label,
  value,
  onChangeText,
  marginBottom = 16,
  multiline = false,
  numberOfLines = 0
}) {
  return (
    <View style={{ marginBottom }}>
      <Text style={[globleStyles.body, globleStyles.inputLable]}>{label}</Text>
      {multiline ? (
        <TextInput
          style={[globleStyles.input, {height: "auto", textAlignVertical: 'top'}]}
          onChangeText={onChangeText}
          value={value}
          multiline
          numberOfLines={numberOfLines}
        />
      ) : (
        <TextInput
          style={globleStyles.input}
          onChangeText={onChangeText}
          value={value}
        />
      )}
    </View>
  );
}

export default CustomTextInput;
