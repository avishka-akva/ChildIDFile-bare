import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ImagePicker from "../components/ImagePicker";
import { globleStyles } from "../shared/style";
import { setImage1, setImage2 } from "../redux/childSlice";

function UploadPhoto({ index, setEditStartedTrue }) {
  const { image1, image2 } = useSelector((state) => state.currentChild);
  const { view } = useSelector((state) => state.childManage);
  const dispatch = useDispatch();

  const onBlur = () => {
    setEditStartedTrue(index);
  };

  return (
    <View style={styles.main}>
      <Text style={[globleStyles.title, styles.title]}>Upload Photo</Text>
      <Text style={[globleStyles.body]}>
        Remember to use a high-resolution images and update it every 6 months.
      </Text>

      <ImagePicker
        image={image1}
        setImage={(uri) => dispatch(setImage1(uri))}
        view={view}
        onBlur={onBlur}
        description="Upload close up face image of your child"
      />

      <ImagePicker
        image={image2}
        setImage={(uri) => dispatch(setImage2(uri))}
        view={view}
        onBlur={onBlur}
        description="Upload close up face image of your child"
      />
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
