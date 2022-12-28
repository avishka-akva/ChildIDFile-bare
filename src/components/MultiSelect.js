import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { Feather as Icon, AntDesign } from "@expo/vector-icons";

import { globleStyles } from "../shared/style";
import { COLOR } from "../shared/const";
import CustomButton from "./CustomButton";

function MultiSelect({ options, values = [], onConfirm }) {
  const [visible, setVisible] = useState(false);
  const [selectedOptionIds, setSelectedOptionIds] = useState([]);

  const onItemPress = (id) => {
    const isSelected = selectedOptionIds.includes(id);
    if (isSelected) {
      setSelectedOptionIds(selectedOptionIds.filter((itemId) => id !== itemId));
    } else {
      setSelectedOptionIds([...selectedOptionIds, id]);
    }
  };

  useEffect(() => {
    setSelectedOptionIds([...values]);
  }, [values]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <View style={[globleStyles.input, styles.container]}>
          <View style={{flexDirection:"row"}}>
            <Text style={[globleStyles.body, {marginRight: 8}]}>Select Options...</Text>
            {values.length > 0 && (
              <Text style={globleStyles.body}>
                ({values.length}) Selected
              </Text>
            )}
          </View>
          <Icon name="chevron-down" color={"#707070"} size={16} />
        </View>
      </TouchableWithoutFeedback>
      <Modal transparent={true} visible={visible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainner}>
            <View style={styles.container}>
              <Text>Select Options...</Text>
              <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                <AntDesign name="close" size={16} color="black" />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.content}>
              {options?.map((option) => {
                const isSelected = selectedOptionIds.includes(option.id);
                return (
                  <TouchableWithoutFeedback
                    key={option.id}
                    onPress={() => onItemPress(option.id)}
                  >
                    <View style={styles.item}>
                      <Text style={globleStyles.body}>{option.name}</Text>
                      {isSelected && (
                        <AntDesign
                          name="check"
                          size={16}
                          color={COLOR.primary}
                        />
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
            <View style={styles.footer}>
              <CustomButton
                onPress={() => setVisible(false)}
                text={"Close"}
                buttonStyle={[
                  globleStyles.buttonOutLine,
                  { borderColor: COLOR.primary, width: 116, height: 36 },
                ]}
                color={COLOR.primary}
              />
              <CustomButton
                onPress={() => {
                  if (onConfirm) onConfirm([...selectedOptionIds]);
                  setVisible(false);
                }}
                text={"Confirm"}
                buttonStyle={[
                  globleStyles.buttonPrimary,
                  { backgroundColor: COLOR.primary, width: 116, height: 36 },
                ]}
                backgroundColor={COLOR.primary}
                color="#FFFFFF"
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "#00000026",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalContainner: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  content: {
    paddingVertical: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  },
});

export default MultiSelect;
