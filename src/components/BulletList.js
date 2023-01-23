import React from "react";
import { Text, View, Platform } from "react-native";

function BulletList({
  containerStyle,
  childStyle,
  pointSize,
  pointColor,
  gap = 10,
  options,
  center = false,
}) {
  const rowStyle = { flexDirection: "row", marginTop: gap };
  const bulletStyle = {
    color: pointColor,
    fontSize: Platform.OS === "ios" ? pointSize / 1.5 : pointSize,
    marginRight: 8,
  };

  if (center) {
    rowStyle.alignItems = "center";
  } else {
    bulletStyle.marginTop = Platform.OS === "ios" ? gap / 1.5 : 0;
  }

  return (
    <View style={containerStyle}>
      {options.map((option) => (
        <View key={option} style={rowStyle}>
          <Text style={bulletStyle}>{`\u25CF`}</Text>
          <Text style={childStyle}>{option}</Text>
        </View>
      ))}
    </View>
  );
}

export default BulletList;
