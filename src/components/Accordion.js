import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { COLOR } from "../shared/const";
import Card from "./Card";

function Accordion({ title, children, onDelete }) {
  const [open, setOpen] = useState(false);

  const height = open ? "auto" : 0;
  // const bottomRadius = open ? 0 : 8;
  // const borderWidth = open ? 0 : 1;

  return !open ? (
    <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
      <View
        style={[
          styles.container,
          {
            // borderBottomLeftRadius: bottomRadius,
            // borderBottomRightRadius: bottomRadius,
            // borderBottomWidth: borderWidth,
          },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        <View style={styles.backgroundCircle}>
          <Icon name="chevron-down" color={COLOR.primary} size={16} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <>
      <Card>
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => (onDelete ? onDelete() : null)}>
              <Text style={styles.headerText}>Delete</Text>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
              <View style={styles.backgroundCircle}>
                <Icon name="chevron-down" color={COLOR.primary} size={16} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          {children}
        </>
      </Card>
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
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#70707014",
    padding: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  headerText: {
    color: COLOR.primary,
    textDecorationLine: "underline",
    marginRight: 22,
  },
  backgroundCircle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8536CC38",
    height: 18,
    width: 18,
    borderRadius: 9,
  },
});

export default Accordion;
