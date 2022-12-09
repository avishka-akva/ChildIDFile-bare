import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ImagePickerUI from "../components/ImagePicker";

import { globleStyles } from "../shared/style";
import { setFingerPrint } from "../redux/childSlice";

function Fingerprints() {
  const { fingerPrint } = useSelector((state) => state.currentChild);
  const dispatch = useDispatch();

  return (
    <View style={styles.main}>
      <Text style={[globleStyles.title, styles.title]}>Fingerprints</Text>
      <Text style={[globleStyles.body]}>
        Remember to use a high-resolution images and update it every 6 months.
      </Text>
      <ImagePickerUI image={fingerPrint} setImage={uri => dispatch(setFingerPrint(uri))}/>
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

export default Fingerprints;
