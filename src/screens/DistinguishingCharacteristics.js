import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
// MaterialIcons
// import SectionedMultiSelect from "react-native-sectioned-multi-select";

import { globleStyles } from "../shared/style";
import Card from "../components/Card";
import CustomTextInput from "../components/CustomTextInput";
import {
  setSpecialNeeds,
  setOtherCharacteristic,
  setCharacteristicOption,
} from "../redux/childSlice";
import { CHARACTERISTICS_OPTIONS } from "../shared/const";
import MultiSelect from "../components/MultiSelect";

function DistinguishingCharacteristics({ index, setEditStartedTrue }) {
  const { characteristicOptions, specialNeeds, otherCharacteristic } =
    useSelector((state) => state.currentChild);
  const dispatch = useDispatch();

  const onBlur = () => {
    setEditStartedTrue(index);
  };

  const onSpecialNeedsChange = (value) => {
    dispatch(setSpecialNeeds(value));
  };

  const onOtherChange = (value) => {
    dispatch(setOtherCharacteristic(value));
  };

  const onSelectedItemsChange = (selectedItems) => {
    dispatch(setCharacteristicOption(selectedItems));
    onBlur();
  };

  const removeSeletedItem = (removeId) => {
    dispatch(
      setCharacteristicOption(
        characteristicOptions.filter((id) => id !== removeId)
      )
    );
  };

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
          {/* <SectionedMultiSelect
            IconRenderer={MaterialIcons}
            items={CHARACTERISTICS_OPTIONS}
            uniqueKey="id"
            subKey="children"
            selectText="Select Options..."
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={characteristicOptions}
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
          /> */}

          <MultiSelect
            options={CHARACTERISTICS_OPTIONS}
            onConfirm={onSelectedItemsChange}
            values={characteristicOptions}
          />
          {characteristicOptions.length > 0 && (
            <View style={styles.optionSelectedContainer}>
              {characteristicOptions.map((id) => {
                const option = CHARACTERISTICS_OPTIONS.find(
                  (val) => val.id === id
                );
                return (
                  <View key={id} style={styles.optionSelectedItems}>
                    <Text
                      style={[globleStyles.body, styles.optionSelectedItemText]}
                    >
                      {option.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        removeSeletedItem(id);
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
          value={specialNeeds}
          onChangeText={onSpecialNeedsChange}
          multiline={true}
          numberOfLines={6}
          onBlur={onBlur}
        />
        <CustomTextInput
          label={"Other"}
          value={otherCharacteristic}
          onChangeText={onOtherChange}
          multiline={true}
          numberOfLines={6}
          marginBottom={0}
          onBlur={onBlur}
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
    marginTop: 5,
  },
  optionSelectedItems: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#A352EBC2",
    margin: 4,
    // width: 1508
    borderRadius: 50,
  },
  optionSelectedItemText: {
    marginRight: 10,
    color: "#FFFFFF",
    fontSize: 12,
  },
});

export default DistinguishingCharacteristics;
