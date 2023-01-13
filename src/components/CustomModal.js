import { StyleSheet, View, Modal, Dimensions, Pressable } from "react-native";

function CustomModal({ children, transparent = true, visible, setVisible }) {
  return (
    <Modal
      transparent={transparent}
      visible={visible}
      onRequestClose={setVisible}
    >
      <Pressable onPress={setVisible} style={styles.modalBackground}>
        <View style={styles.modalContainner}>{children}</View>
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "#00000026",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainner: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 28,
    paddingHorizontal: Dimensions.get("window").width / 10,
    borderRadius: 8,
    width: "90%",
  },
});

export default CustomModal;
