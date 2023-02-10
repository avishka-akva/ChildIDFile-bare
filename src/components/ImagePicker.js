import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { COLOR } from "../shared/const";
import CustomModalBottom from "./CustomModalBottom";
import * as ImageManipulator from "expo-image-manipulator";

function ImagePickerUI({
  image,
  setImage,
  view,
  description = "",
  onBlur,
  aspectRatio = [4, 4],
  finger = false,
}) {
  const [selected, setSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const processImage = async (uri) => {
    const manipulateResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1024 } }],
      // [],
      {
        compress: 0.5,
        base64: true,
      }
    );

    return manipulateResult.base64;
  };

  const pickImageFromGallary = async () => {
    if (view) return;
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.All,
        // base64: true,
        allowsEditing: true,
        aspect: aspectRatio,
        quality: 1,
      });

      setShowModal(false);

      if (result.canceled) return;

      const base64Image = await processImage(result.assets[0].uri);
      setImage(base64Image);

      setSelected(true);

      if (onBlur) onBlur();
    } catch (error) {
      alert(error.message);
    }
  };

  const pickImageFromCamera = async () => {
    if (view) return;
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: aspectRatio,
        quality: 1,
        // base64: true,
      });

      setShowModal(false);

      if (pickerResult.canceled) return;
      const base64Image = await processImage(pickerResult.assets[0].uri);
      setImage(base64Image);
      setSelected(true);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (image) {
      setSelected(true);
    }
  }, []);

  const height = finger ? 180 : 263;

  return (
    <View style={styles.main}>
      {selected ? (
        <>
          {!view && (
            <TouchableWithoutFeedback
              onPress={() => {
                setImage("");
                setSelected(false);
                if (onBlur) onBlur();
              }}
            >
              <View style={styles.close}>
                <AntDesign name="close" size={12} color="white" />
              </View>
            </TouchableWithoutFeedback>
          )}

          <View style={{ height, borderRadius: 18 }}>
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
        <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require("../assets/ImageAddIcon.png")}
            />
            <Text style={styles.text}>{description}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      <CustomModalBottom
        visible={showModal}
        onClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          style={styles.selectContainer}
          onPress={pickImageFromGallary}
        >
          <Text style={styles.selectOption}>Upload Photo from Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectContainer}
          onPress={pickImageFromCamera}
        >
          <Text style={styles.selectOption}>Take Photo</Text>
        </TouchableOpacity>
      </CustomModalBottom>
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
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
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
  selectContainer: {
    width: "100%",
    padding: 14,
  },
  selectOption: {
    fontSize: 14,
    color: "#434343",
  },
});

export default ImagePickerUI;
