import { StyleSheet, Text, View } from "react-native";

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 18,
    paddingVertical: 45,
    paddingHorizontal: 25,
    marginVertical: 12,
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 18,
    elevation: 3,
  },
});

export default Card;
