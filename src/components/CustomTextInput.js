import { useRef, useEffect, useState } from "react";
import { TextInput, Text, View, Keyboard } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { globleStyles } from "../shared/style";
import { setShowFooter } from "../redux/childManageSlice";
import { COLOR } from "../shared/const";

function CustomTextInput({
  label,
  value,
  onChangeText,
  marginBottom = 16,
  multiline = false,
  numberOfLines = 0,
  required = false,
  onBlur,
  error = false,
  ...props
}) {
  const dispatch = useDispatch();
  const { view } = useSelector((state) => state.childManage);

  const [_error, setError] = useState(false);

  const localInputRef = useRef();

  const keyboardDidHideCallback = () => {
    localInputRef.current.blur?.();
    dispatch(setShowFooter(true));
  };

  const _onBlur = () => {
    if (onBlur) onBlur();
    if (required && value === "") {
      setError(true);
    } else if (_error) {
      setError(false);
    }
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

  useEffect(() => {
    if (error && !_error) {
      setError(true);
    }
  }, [error]);

  const errorStyles = _error ? { borderColor: COLOR.danger } : {};

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
          onBlur={_onBlur}
        />
      ) : (
        <TextInput
          style={[globleStyles.input, errorStyles]}
          onChangeText={onChangeText}
          value={value}
          editable={!view}
          {...props}
          ref={(ref) => {
            localInputRef && (localInputRef.current = ref);
          }}
          onBlur={_onBlur}
        />
      )}
      {_error && (
        <Text style={{ color: COLOR.danger, fontSize: 10 }}>
          This feild is required
        </Text>
      )}
    </View>
  );
}

export default CustomTextInput;
