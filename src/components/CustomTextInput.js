import { TextInput, Text, View } from "react-native";
import { globleStyles } from "../shared/style";

function CustomTextInput({ label, value, onChangeText, marginBottom = 16 }) {
  return (
    <View style={{marginBottom,}}>
      <Text style={[globleStyles.body, globleStyles.inputLable]}>
        {label}
      </Text>
      <TextInput
        style={globleStyles.input}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

export default CustomTextInput;
