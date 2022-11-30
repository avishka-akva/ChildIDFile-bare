import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { globleStyles } from "../shared/style";
import Card from "../components/Card";
import CustomTextInput from "../components/CustomTextInput";
import {
  setSpecialNeeds,
  setOtherCharacteristic,
} from "../redux/childSlice";
function DistinguishingCharacteristics() {
  const currentChild = useSelector((state) => state.currentChild);
  const dispatch = useDispatch();

  const [text, onChangeText] = useState("");

  const onSpecialNeedsChange = (value) => {
    dispatch(setSpecialNeeds(value));
  };

  const onOtherChange = (value) => {
    dispatch(setOtherCharacteristic(value));
  };
  return (
    <View style={styles.main}>
      <Text style={[globleStyles.title, styles.title]}>
        Distinguishing Characteristics
      </Text>
      <Card>
        <CustomTextInput
          label={"My child wears or has (Select Options)"}
          value={text}
          onChangeText={onChangeText}
        />
        <CustomTextInput
          label={"Special Needs"}
          value={currentChild.specialNeeds}
          onChangeText={onSpecialNeedsChange}
          multiline={true}
          numberOfLines={6}
        />
        <CustomTextInput
          label={"Other"}
          value={currentChild.otherCharacteristic}
          onChangeText={onOtherChange}
          multiline={true}
          numberOfLines={6}
          marginBottom={0}
        />
      </Card>
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

export default DistinguishingCharacteristics;
