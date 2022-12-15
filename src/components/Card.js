import { StyleSheet, Text, View } from "react-native";

function Card({ children, style = {} }) {
  return <View style={[styles.card,style]}>{children}</View>;
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
