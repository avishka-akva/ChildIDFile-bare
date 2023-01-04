import { useRef, useEffect } from "react";
import { TextInput, Text, View, Keyboard } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { globleStyles } from "../shared/style";
import { setShowFooter } from "../redux/childManageSlice";

function CustomTextInput({
  label,
  value,
  onChangeText,
  marginBottom = 16,
  multiline = false,
  numberOfLines = 0,
  required = false,
  ...props
}) {
  const dispatch = useDispatch();
  const { view } = useSelector((state) => state.childManage);

  const localInputRef = useRef();

  const keyboardDidHideCallback = () => {
    localInputRef.current.blur?.();
    dispatch(setShowFooter(true));
  };

  useEffect(() => {
    const keyboardDidHideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHideCallback
    );

    return () => {
      keyboardDidHideSubscription?.remove();
    };
  }, []);

  return (
    <View style={{ marginBottom }}>
      <Text style={[globleStyles.body, globleStyles.inputLable]}>
        {label} {required && <Text style={globleStyles.requiredText}>*</Text>}
      </Text>
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
          ref={(ref) => {
            localInputRef && (localInputRef.current = ref);
          }}
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
          ref={(ref) => {
            localInputRef && (localInputRef.current = ref);
          }}
        />
      )}
    </View>
  );
}

export default CustomTextInput;
