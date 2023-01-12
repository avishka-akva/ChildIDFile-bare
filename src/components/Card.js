import { StyleSheet, Text, View } from "react-native";

function Card({ children, style = {} }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginVertical: 12,
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default Card;
