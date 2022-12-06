import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import Card from "../components/Card";
import ImagePicker from "../components/ImagePicker";
import { globleStyles } from "../shared/style";

function UploadPhoto() {
  const [text, onChangeText] = useState("");

  return (
    <View style={styles.main}>
      <Text style={[globleStyles.title, styles.title]}>Upload Photo</Text>
      <Text style={[globleStyles.body]}>
        Remember to use a high-resolution images and update it every 6 months.
      </Text>

      <ImagePicker />

      <ImagePicker />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  title: {
    marginBottom: 12,
  },
});

export default UploadPhoto;
