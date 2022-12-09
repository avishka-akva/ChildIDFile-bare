import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Card from "../components/Card";
import ImagePicker from "../components/ImagePicker";
import { globleStyles } from "../shared/style";
import {
  setImage1,
  setImage2,
} from "../redux/childSlice";

function UploadPhoto() {
  const { image1,image2 } = useSelector((state) => state.currentChild);
  const dispatch = useDispatch();

  return (
    <View style={styles.main}>
      <Text style={[globleStyles.title, styles.title]}>Upload Photo</Text>
      <Text style={[globleStyles.body]}>
        Remember to use a high-resolution images and update it every 6 months.
      </Text>

      <ImagePicker image={image1} setImage={uri => dispatch(setImage1(uri))}/>

      <ImagePicker image={image2} setImage={uri => dispatch(setImage2(uri))}/>

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
