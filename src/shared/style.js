import { StyleSheet } from "react-native";
import { COLOR } from "./const";

export const globleStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "#FFFFFF",
    backgroundColor: "#F7F7F7",
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
  requiredText: {
    color: COLOR.danger,
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
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
    fontFamily: "Segoe-UI",
    color: "#868282",
    fontSize: 14,
    lineHeight: 18,
  },
  inputText: {
    fontFamily: "Segoe-UI",
    color: "#868282",
    fontSize: 14,
  },
  modalFooter: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  modalText: {
    color: "#434343",
    fontSize: 16,
  },
  modalIcon: {
    marginVertical: 33,
  },
  badgeContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: COLOR.danger,
    borderRadius: 19,
    marginLeft: 26
  },
  badgeContainerPrimary: {
    borderColor: COLOR.primary,
  },
  badgeText: {
    color: COLOR.danger,
    fontSize: 8,
    marginVertical: 2,
    marginHorizontal: 6,
  },
  badgeTextPrimary: {
    color: COLOR.primary,
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowSpaceAround: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  rowEnd: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
