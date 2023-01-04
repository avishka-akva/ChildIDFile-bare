import { StyleSheet, View, Modal } from "react-native";

function CustomModal({ children, transparent, visible, setVisible }) {
  return (
    <Modal
      transparent={transparent}
      visible={visible}
      onRequestClose={setVisible}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainner}>{children}</View>
      </View>
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
    paddingHorizontal: 52,
    borderRadius: 8,
    width: "90%",
  },
});

export default CustomModal;
