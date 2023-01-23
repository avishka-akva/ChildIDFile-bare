import React from "react";
import { Text, View, Platform } from "react-native";

function BulletList({
  containerStyle,
  childStyle,
  pointSize,
  pointColor,
  gap = 10,
  options,
}) {
  return (
    <View style={containerStyle}>
      {options.map((option) => (
        <View style={{ flexDirection: "row", marginTop: gap }}>
          <Text
            style={{
              color: pointColor,
              fontSize: Platform.OS === "ios" ? pointSize / 1.5 : pointSize,
              marginRight: 8,
              marginTop: Platform.OS === "ios" ? gap/1.5 : 0,
            }}
          >{`\u25CF`}</Text>
          <Text style={childStyle}>{option}</Text>
        </View>
      ))}
    </View>
  );
}

export default BulletList;
