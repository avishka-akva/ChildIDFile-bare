import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

import { globleStyles } from "../shared/style";
import Card from "../components/Card";
import CustomTextInput from "../components/CustomTextInput";
import {
  setSpecialNeeds,
  setOtherCharacteristic,
  setCharacteristicOption,
} from "../redux/childSlice";
import { CHARACTERISTICS_OPTIONS, COLOR } from "../shared/const";

function DistinguishingCharacteristics() {
  const currentChild = useSelector((state) => state.currentChild);
  const dispatch = useDispatch();

  const onSpecialNeedsChange = (value) => {
    dispatch(setSpecialNeeds(value));
  };

  const onOtherChange = (value) => {
    dispatch(setOtherCharacteristic(value));
  };

  onSelectedItemsChange = (selectedItems) => {
    dispatch(setCharacteristicOption(selectedItems));
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.main}>
      <Text style={[globleStyles.title, styles.title]}>
        Distinguishing Characteristics
      </Text>
      <Card>
        <View style={{ marginBottom: 16 }}>
          <Text style={[globleStyles.body, globleStyles.inputLable]}>
            My child wears or has
          </Text>
          <SectionedMultiSelect
            IconRenderer={MaterialIcons}
            items={CHARACTERISTICS_OPTIONS}
            uniqueKey="id"
            subKey="children"
            selectText="Select Options..."
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={currentChild.characteristicOptions}
            hideSearch
            showDropDowns={false}
            readOnlyHeadings
            styles={{
              selectToggle: globleStyles.input,
              chipText: {
                color: COLOR.white,
              },
              chipContainer: {
                backgroundColor: COLOR.primary,
                borderColor: COLOR.primary,
              },
              chipIcon: {
                color: COLOR.white,
              },
              modalWrapper: {
                paddingVertical: "60%",
              }
            }}
            colors={{
              primary: COLOR.primary,
              success: COLOR.primary,
              subText: "#707070",
              selectToggleTextColor: "#707070",
            }}
          />
          {currentChild.characteristicOptions.length > 0 && false && (
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
