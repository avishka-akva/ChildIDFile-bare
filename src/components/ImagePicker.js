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

  const pickImageFromGallary = async () => {
    if (view) return;
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: aspectRatio,
        quality: 1,
        base64: true,
      });

      if (result.canceled) {
        setShowModal(false);
        return;
      }

      if (!result.assets[0].canceled) {
        setImage(result.assets[0].base64);
        setSelected(true);
      }

      if (onBlur) onBlur();

      setShowModal(false);
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
        base64: true,
      });

      if (pickerResult.canceled) {
        setShowModal(false);
        return;
      }

      if (!pickerResult.assets[0].canceled) {
        setImage(pickerResult.assets[0].base64);
        setSelected(true);
      }

      setShowModal(false);
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
          <Text style={styles.selectOption}>Gallary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectContainer}
          onPress={pickImageFromCamera}
        >
          <Text style={styles.selectOption}>Camera</Text>
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
