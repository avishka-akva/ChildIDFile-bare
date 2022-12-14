import { StyleSheet } from "react-native";

export const globleStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // margin: 32,
  },
  title: {
    color: "#434343",
    fontSize: 18,
  },
  body: {
    color: "#707070",
    fontSize: 14,
  },

  buttonPrimary: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    height: 40,
    width: 155,
  },

  buttonOutLine: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#000",
    height: 40,
    width: 155,
  },

  inputContainer: {
    marginBottom: 16,
  },
  inputLable: {
    marginBottom: 8,
  },
  input: {
    height: 42,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#70707014",
    shadowColor: "#70707014",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  modalFooter: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalText: {
    color: "#434343",
    fontSize: 16,
  },
  modalIcon: {
    marginVertical: 33,
  },
});
