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
import { globleStyles } from "../shared/style";

function Accordion({
  index,
  open,
  onOpen,
  title,
  children,
}) {
  const height = open ? "auto" : 0;
  // const bottomRadius = open ? 0 : 8;
  // const borderWidth = open ? 0 : 1;

  return !open ? (
    <TouchableWithoutFeedback
      onPress={() => {
        onOpen(index);
      }}
    >
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
            <View
              style={[
                globleStyles.badgeContainer,
                globleStyles.badgeContainerPrimary,
                {marginRight: 12}
              ]}
            >
              <Text
                style={[globleStyles.badgeText, globleStyles.badgeTextPrimary]}
              >
                Contact {index + 1}
              </Text>
            </View>

            <TouchableWithoutFeedback onPress={() => onOpen(null)}>
              <View style={styles.backgroundCircle}>
                <Icon name="chevron-up" color={COLOR.primary} size={16} />
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
