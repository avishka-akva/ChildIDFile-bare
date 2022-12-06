import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

function ImagePicker() {
  const [selected, setSelected] = useState(false);
  return (
    <View style={styles.main}>
      {selected ? (
        <>
          <TouchableWithoutFeedback onPress={() => setSelected(false)}>
            <View style={styles.close}>
              <AntDesign name="close" size={12} color="white" />
            </View>
          </TouchableWithoutFeedback>
          <View style={[styles.container,{height: 263}]}></View>
        </>
      ) : (
        <TouchableWithoutFeedback onPress={() => setSelected(true)}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require("../assets/ImageAddIcon.png")}
            />
            <Text style={styles.text}>
              Upload close up face image of your child
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    marginTop: 28,
    backgroundColor: "white",
    borderRadius: 18,
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
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    backgroundColor: "white",
    borderRadius: 18,
    paddingVertical: 45,
    paddingHorizontal: 25,
  },
  close: {
    backgroundColor: "#A352EB",
    width: 25,
    height: 25,
    borderRadius: 25.0 / 2,
    position: "absolute",
    top: -5,
    right: -5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  image: {
    width: 82,
    height: 82,
    margin: 28,
  },
  text: {
    color: "#707070",
    fontSize: 16,
    width: 198,
    textAlign: "center",
  },
});

export default ImagePicker;
