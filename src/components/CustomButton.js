import { Text, TouchableOpacity } from "react-native";

function CustomButton({
  onPress,
  text,
  textStyle,
  buttonStyle,
  backgroundColor = "#000",
  buttonWidth = 136,
  buttonHeight = 48,
  color = "#fff",
  fontSize = 16,
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
              width: buttonWidth,
              height: buttonHeight,
            }
      }
    >
      <Text
        style={
          textStyle
            ? textStyle
            : {
                color,
                fontSize,
                textAlign: "center"
              }
        }
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
