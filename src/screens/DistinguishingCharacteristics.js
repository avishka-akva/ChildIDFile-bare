import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SelectList } from "react-native-dropdown-select-list";
import { AntDesign } from "@expo/vector-icons";

import { globleStyles } from "../shared/style";
import Card from "../components/Card";
import CustomTextInput from "../components/CustomTextInput";
import {
  setSpecialNeeds,
  setOtherCharacteristic,
  addCharacteristicOption,
  removeCharacteristicOption,
} from "../redux/childSlice";
import { CHARACTERISTICS_OPTIONS } from "../shared/const";

function DistinguishingCharacteristics() {
  const currentChild = useSelector((state) => state.currentChild);
  const dispatch = useDispatch();

  const [dataOption, setDataOption] = useState(CHARACTERISTICS_OPTIONS);

  const onSpecialNeedsChange = (value) => {
    dispatch(setSpecialNeeds(value));
  };

  const onOtherChange = (value) => {
    dispatch(setOtherCharacteristic(value));
  };

  const onSelectChange = (key) => {
    setDataOption((previousValue) =>
      previousValue.filter((value) => value.key !== key)
    );
    dispatch(addCharacteristicOption(key));
  };

  const removeSeletedItem = (key) => {
    const option = CHARACTERISTICS_OPTIONS.find((val) => val.key === key);
    setDataOption([...dataOption, option]);
    dispatch(removeCharacteristicOption(key));
  };

  useEffect(() => {
    setDataOption(
      CHARACTERISTICS_OPTIONS.filter(
        (option) => !currentChild.characteristicOptions.includes(option.key)
      )
    );
  }, []);

  return (
    <View style={styles.main}>
      <Text style={[globleStyles.title, styles.title]}>
        Distinguishing Characteristics
      </Text>
      <Card>
        <View style={{ marginBottom: 16 }}>
          <Text style={[globleStyles.body, globleStyles.inputLable]}>
            My child wears or has (Select Options)
          </Text>
          <SelectList
            setSelected={onSelectChange}
            data={dataOption}
            save="key"
            search={false}
            boxStyles={globleStyles.input}
          />
          {currentChild.characteristicOptions.length > 0 && (
            <View style={styles.optionSelectedContainer}>
              {currentChild.characteristicOptions.map((key) => {
                const option = CHARACTERISTICS_OPTIONS.find(
                  (val) => val.key === key
                );
                return (
                  <View key={key} style={styles.optionSelectedItems}>
                    <Text
                      style={[globleStyles.body, styles.optionSelectedItemText]}
                    >
                      {option.value}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        removeSeletedItem(key);
                      }}
                    >
                      <AntDesign name="close" size={10} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </View>
        <CustomTextInput
          label={"Special Needs"}
          value={currentChild.specialNeeds}
          onChangeText={onSpecialNeedsChange}
          multiline={true}
          numberOfLines={6}
        />
        <CustomTextInput
          label={"Other"}
          value={currentChild.otherCharacteristic}
          onChangeText={onOtherChange}
          multiline={true}
          numberOfLines={6}
          marginBottom={0}
        />
      </Card>
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
  optionSelectedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  optionSelectedItems: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#A352EBC2",
    margin: 5,
    // width: 1508
    borderRadius: 50,
  },
  optionSelectedItemText: {
    marginRight: 16,
    color: "#FFFFFF",
    fontSize: 12,
  },
});

export default DistinguishingCharacteristics;
