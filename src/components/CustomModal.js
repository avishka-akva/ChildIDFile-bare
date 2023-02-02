import {
  View,
  Modal,
  Dimensions,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";

function CustomModal({
  children,
  transparent = true,
  visible,
  onClose,
  alignItems = "center",
  paddingHorizontal = Dimensions.get("window").width / 10,
  backgroundClose = true,
  keyboardAvoid = false,
}) {
  return (
    <Modal transparent={transparent} visible={visible} onRequestClose={onClose}>
      <Pressable
        onPress={() => {
          if (backgroundClose) {
            onClose();
          }
        }}
        style={{
          flex: 1,
          backgroundColor: "#00000026",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {keyboardAvoid ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
            style={{
              width: "90%",
            }}
          >
            <View
              style={{
                alignItems,
                backgroundColor: "#FFFFFF",
                paddingVertical: 28,
                paddingHorizontal,
                borderRadius: 8,
                // width: "90%",
              }}
            >
              {children}
            </View>
          </KeyboardAvoidingView>
        ) : (
          <View
            style={{
              alignItems,
              backgroundColor: "#FFFFFF",
              paddingVertical: 28,
              paddingHorizontal,
              borderRadius: 8,
              width: "90%",
            }}
          >
            {children}
          </View>
        )}
      </Pressable>
    </Modal>
  );
}

export default CustomModal;
