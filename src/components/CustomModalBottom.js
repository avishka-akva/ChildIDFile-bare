import { View, Modal, Pressable, Platform } from "react-native";

function CustomModalBottom({
  children,
  visible,
  onClose,
  roundRadius = false,
}) {
  const modalContainnerStyles = {
    backgroundColor: "#FFFFFF",
    width: "100%",
  };

  if (roundRadius) {
    modalContainnerStyles.width = "96%";
    modalContainnerStyles.paddingVertical = 16;
    modalContainnerStyles.paddingHorizontal = 28;
    modalContainnerStyles.borderTopLeftRadius = 18;
    modalContainnerStyles.borderTopRightRadius = 18;
  }

  if (Platform.OS === "ios") {
    modalContainnerStyles.paddingBottom = 28;
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "#00000026",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        onPress={() => onClose()}
      >
        <View style={modalContainnerStyles}>{children}</View>
      </Pressable>
    </Modal>
  );
}

export default CustomModalBottom;
