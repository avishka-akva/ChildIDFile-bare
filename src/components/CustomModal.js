import {
  View,
  Modal,
  Dimensions,
  Pressable,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

function CustomModal({
  children,
  transparent = true,
  visible,
  onClose,
  alignItems = "center",
  paddingHorizontal = Dimensions.get("window").width / 10,
  paddingVertical = 28,
  backgroundClose = true,
  keyboardAvoid = false,
}) {
  return (
    <Modal transparent={transparent} visible={visible} onRequestClose={onClose}>
      <Pressable
        onPress={() => {
          onClose();
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
            <TouchableOpacity activeOpacity={1}>
              <View
                style={{
                  alignItems,
                  backgroundColor: "#FFFFFF",
                  paddingVertical,
                  paddingHorizontal,
                  borderRadius: 18,
                  // width: "90%",
                }}
              >
                {children}
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        ) : (
          <TouchableOpacity
            activeOpacity={1}
            style={{
              alignItems,
              backgroundColor: "#FFFFFF",
              paddingVertical,
              paddingHorizontal,
              borderRadius: 8,
              width: "90%",
            }}
            pointerEvents="none"
          >
            {children}
          </TouchableOpacity>
        )}
      </Pressable>
    </Modal>
  );
}

export default CustomModal;
