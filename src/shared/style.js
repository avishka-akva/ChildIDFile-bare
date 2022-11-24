import { StyleSheet } from "react-native";

export const globleStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    margin: 32,
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
    width: 117,
  },

  buttonOutLine: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#000",
    height: 40,
    width: 117,
  },
});
