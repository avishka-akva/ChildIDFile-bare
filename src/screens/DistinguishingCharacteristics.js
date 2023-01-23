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
  const { view } = useSelector((state) => state.childManage);
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
          <MultiSelect
            options={CHARACTERISTICS_OPTIONS}
            onItemChanged={onSelectedItemsChange}
            values={characteristicOptions}
            view={view}
          />
        </View>
        <CustomTextInput
          label={"Describe selected options or add other details"}
          value={otherCharacteristic}
          onChangeText={onOtherChange}
          multiline={true}
          numberOfLines={7}
          marginBottom={0}
          onBlur={onBlur}
          placeholder={
            "Provide grayed examples of Distinguishing features such as: \nScar/tattoo on neck \nChild is autistic \nChild has asthma and uses inhaler \nChild is deaf"
          }
        />
        <CustomTextInput
          label={"Special Needs"}
          value={specialNeeds}
          onChangeText={onSpecialNeedsChange}
          multiline={true}
          numberOfLines={6}
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
});

export default DistinguishingCharacteristics;
