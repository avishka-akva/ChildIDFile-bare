import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Card from "../components/Card";
import { globleStyles } from "../shared/style";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";

function EmergencyContact() {
  const [text, onChangeText] = useState("");

  return (
    <View style={styles.main}>
      <View style={styles.titleContainer}>
        <Text style={[globleStyles.title, styles.title]}>
          Emergency Contact Information
        </Text>
        <Text style={styles.added}>1/3 added</Text>
      </View>

      <Card>
        <CustomTextInput
          label={"Emergency Contact"}
          value={text}
          onChangeText={onChangeText}
        />
        <CustomTextInput
          label={"Relationship"}
          value={text}
          onChangeText={onChangeText}
        />
        <CustomTextInput
          label={"Cell (Optional)"}
          value={text}
          onChangeText={onChangeText}
        />
        <CustomTextInput
          label={"Work (Optional)"}
          value={text}
          onChangeText={onChangeText}
        />
        <CustomTextInput
          label={"Address (Optional)"}
          value={text}
          onChangeText={onChangeText}
          multiline={true}
          numberOfLines={6}
          marginBottom={0}
        />
        <View style={styles.addButtonContainer}>
          <CustomButton
            onPress={() => navigation.navigate("Add Child")}
            text={"Add another details"}
            backgroundColor="#A352EB"
            buttonWidth={"100%"}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {},
  added: {
    color: "#707070",
    fontSize: 12,
  },
  addButtonContainer: {
    marginTop: 18
  }
});

export default EmergencyContact;
