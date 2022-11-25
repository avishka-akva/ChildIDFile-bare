import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Card from "../components/Card";

import { globleStyles } from "../shared/style";

function DistinguishingCharacteristics() {
  const [text, onChangeText] = useState("");

  return (
    <View style={styles.main}>
      <Text style={[globleStyles.title, styles.title]}>
        Distinguishing Characteristics
      </Text>
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
