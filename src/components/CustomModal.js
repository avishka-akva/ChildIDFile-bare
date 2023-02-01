import { View, Modal, Dimensions, Pressable } from "react-native";

function CustomModal({
  children,
  transparent = true,
  visible,
  onClose,
  alignItems = "center",
  paddingHorizontal = Dimensions.get("window").width / 10,
  backgroundClose = true
}) {
  return (
    <Modal transparent={transparent} visible={visible} onRequestClose={onClose}>
      <Pressable
        onPress={()=>{
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
      </Pressable>
    </Modal>
  );
}

export default CustomModal;
