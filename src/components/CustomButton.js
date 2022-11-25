import { Text, TouchableOpacity } from "react-native";

function CustomButton({
  onPress,
  text,
  textStyle,
  buttonStyle,
  backgroundColor = "#000",
  color = "#fff",
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        buttonStyle
          ? buttonStyle
          : {
              backgroundColor,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
              width: 136,
              height: 48
            }
      }
    >
      <Text
        style={
          textStyle
            ? textStyle
            : {
                color,
                fontSize: 16,
              }
        }
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
