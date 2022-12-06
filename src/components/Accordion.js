import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);

  const height = open ? "auto" : 0;
  const bottomRadius = open ? 0 : 8;
  const borderWidth = open ? 0 : 1;
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
              borderBottomWidth: borderWidth,
            },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
          <View style={styles.backgroundCircle}>
            <Icon name="chevron-down" color="#A352EB" size={16} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {open && <View style={[styles.content, { height }]}>{children}</View>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "#F9F9F9",
    padding: 16,
    borderWidth: 1,
    borderColor: "#70707014",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    color: "#252525",
  },
  items: {
    overflow: "hidden",
  },
  content: {
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderTopWidth:0,
    borderColor: "#70707014",
    padding: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  backgroundCircle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8536CC38",
    height: 18,
    width: 18,
    borderRadius: 9
  }
});

export default Accordion;
