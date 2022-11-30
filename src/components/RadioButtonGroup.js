import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { globleStyles } from "../shared/style";


function RadioButton({ isChecked, text, onRadioButtonPress }) {
  const _renderCheckedView = () => {
    if (!isChecked) return null;

    return <View style={[styles.radioButtonIconInnerIcon]} />;
  };

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onRadioButtonPress}>
      <View style={[styles.radioButtonIcon]}>{_renderCheckedView()}</View>
      <View style={[styles.radioButtonTextContainer]}>
        <Text style={globleStyles.body}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

function RadioButtonGroup({ values, onPress, vertical = false }) {
  const [currentSelectedItem, setCurrentSelectedItem] = useState(0);

  const _onPress = (index) => {
    onPress(values[index].value);
    setCurrentSelectedItem(index);
  };

  const renderRadioButtons = () => {
    return (values || []).map((listItem, index) => {
      let isChecked = currentSelectedItem === index;
      return (
        <RadioButton
          key={index}
          onRadioButtonPress={() => _onPress(index)}
          isChecked={isChecked}
          text={listItem.text}
        />
      );
    });
  };
  return (
    <View
      style={{
        flexDirection: vertical ? "column" : "row",
        alignItems: vertical ? "flex-start" : "center",
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      {renderRadioButtons()}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonIcon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#707070",
    height: 13,
    width: 13,
    borderRadius: 13.0 / 2,
    marginRight: 7,
  },
  radioButtonIconInnerIcon: {
    height: 9,
    width: 9,
    backgroundColor: "#A352EB",
    borderRadius: 9.0 / 2,
    borderColor: "white",
  },
  radioButtonTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonText: {
    fontSize: 14,
  },
});

export default RadioButtonGroup;
