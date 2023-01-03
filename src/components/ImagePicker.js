import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { COLOR } from "../shared/const";

function ImagePickerUI({ image, setImage, view }) {
  const [selected, setSelected] = useState(false);

  const pickImage = async () => {
    if (view) return;
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    if (!result.assets[0].canceled) {
      setImage(result.assets[0].base64);
      setSelected(true);
    }
  };

  useEffect(() => {
    if (image) {
      setSelected(true);
    }
  }, []);

  return (
    <View style={styles.main}>
      {selected ? (
        <>
          {!view && (
            <TouchableWithoutFeedback onPress={() => setSelected(false)}>
              <View style={styles.close}>
                <AntDesign name="close" size={12} color="white" />
              </View>
            </TouchableWithoutFeedback>
          )}

          <View style={{ height: 263, borderRadius: 18 }}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 18,
              }}
              source={{
                uri: image ? `data:image/jpg;base64,${image}` : null,
              }}
            />
          </View>
        </>
      ) : (
        <TouchableWithoutFeedback onPress={() => pickImage()}>
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
    marginHorizontal: 24,
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
    backgroundColor: COLOR.primary,
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

export default ImagePickerUI;
