import { Text, StyleSheet, View } from "react-native";

function CustomHeader({
  text
}) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  headerText: {
    fontSize: 16,
    color: "#434343",
    fontWeight: "500"
  }
});

export default CustomHeader;
