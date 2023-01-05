import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Feather as Icon, AntDesign } from "@expo/vector-icons";

import { globleStyles } from "../shared/style";
import { COLOR } from "../shared/const";
import CustomButton from "./CustomButton";

function ModalBottom({ children, visible, onClose }) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <Pressable style={styles.modalBackground} onPress={() => onClose()}>
        <View style={styles.modalContainner}>{children}</View>
      </Pressable>
    </Modal>
  );
}

function OptionChip({ name, onRemove }) {
  return (
    <View style={styles.optionSelectedItems}>
      <Text style={[globleStyles.body, styles.optionSelectedItemText]}>
        {name}
      </Text>
      <TouchableOpacity style={styles.optionClose} onPress={onRemove}>
        <AntDesign name="close" size={10} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

function MultiSelect({ options, values = [], onItemChanged, view }) {
  const [visible, setVisible] = useState(false);
  const [tempSelectedOptionIds, setTempSelectedOptionIds] = useState([]);

  const onItemPress = (id) => {
    const isSelected = tempSelectedOptionIds.includes(id);
    if (isSelected) {
      setTempSelectedOptionIds(
        tempSelectedOptionIds.filter((itemId) => id !== itemId)
      );
    } else {
      setTempSelectedOptionIds([...tempSelectedOptionIds, id]);
    }
  };

  const onOpen = () => {
    if (view) return;

    setVisible(true);
    if (values.length) setTempSelectedOptionIds([...values]);
  };

  const onClose = () => {
    setVisible(false);
    setTempSelectedOptionIds([]);
  };

  const onPressConfirm = () => {
    onItemChanged([...tempSelectedOptionIds]);
    setVisible(false);
  };

  const removeSeletedItem = (removeId) => {
    if (view) return;
    onItemChanged(values.filter((id) => id !== removeId));
  };

  useEffect(() => {
    setTempSelectedOptionIds([...values]);
  }, [values]);

  return (
    <>
      <TouchableWithoutFeedback onPress={onOpen}>
        <View style={[globleStyles.input, styles.container]}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[globleStyles.body, { marginRight: 8 }]}>
              Select Options...
            </Text>
            {values.length > 0 && (
              <Text style={globleStyles.body}>({values.length}) Selected</Text>
            )}
          </View>
          <Icon name="chevron-down" color={"#707070"} size={16} />
        </View>
      </TouchableWithoutFeedback>
      {values.length > 0 && (
        <View style={styles.optionSelectedContainer}>
          {values.map((id) => {
            const option = options.find((val) => val.id === id);
            return (
              <OptionChip
                key={id}
                name={option.name}
                onRemove={() => removeSeletedItem(id)}
              />
            );
          })}
        </View>
      )}
      <ModalBottom visible={visible} onClose={onClose}>
        <View style={styles.container}>
          <Text>Select Options...</Text>
          <TouchableWithoutFeedback onPress={onClose}>
            <AntDesign name="close" size={16} color="black" />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.content}>
          {options?.map((option) => {
            const isSelected = tempSelectedOptionIds.includes(option.id);
            return (
              <TouchableWithoutFeedback
                key={option.id}
                onPress={() => onItemPress(option.id)}
              >
                <View style={styles.item}>
                  <Text style={globleStyles.body}>{option.name}</Text>
                  {isSelected && (
                    <AntDesign name="check" size={16} color={COLOR.primary} />
                  )}
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
        <View style={styles.footer}>
          <CustomButton
            onPress={onClose}
            text={"Close"}
            buttonStyle={[
              globleStyles.buttonOutLine,
              { borderColor: COLOR.primary, width: 116, height: 36 },
            ]}
            color={COLOR.primary}
          />
          <CustomButton
            onPress={onPressConfirm}
            text={"Confirm"}
            buttonStyle={[
              globleStyles.buttonPrimary,
              { backgroundColor: COLOR.primary, width: 116, height: 36 },
            ]}
            backgroundColor={COLOR.primary}
            color="#FFFFFF"
          />
        </View>
      </ModalBottom>
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
    width: "96%",
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
  optionSelectedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 5,
  },
  optionSelectedItems: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#A352EBC2",
    margin: 4,
    borderRadius: 25,
  },
  optionSelectedItemText: {
    marginLeft: 12,
    marginRight: 5,
    color: "#FFFFFF",
    fontSize: 12,
  },
  optionClose: {
    marginRight: 12
  }
});

export default MultiSelect;
