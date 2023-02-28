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
          onBlur={onBlur}
          placeholder={
            "Type and style of glasses?\nType and location of tattoos?\nSize and location of scars or birthmarks?\nUnique piercings?"
          }
        />
        <CustomTextInput
          label={"Special Needs"}
          value={specialNeeds}
          onChangeText={onSpecialNeedsChange}
          multiline={true}
          numberOfLines={9}
          onBlur={onBlur}
          placeholder={
            "Child is autistic, has asthma, or needs inhaler?\nChild is deaf/blind/hard-of-hearing/seeing?\nChild speaks language not common to local area?\nChild is disabled? Child is missing limbs/teeth?\nChild is unable to swim/walk/run/ride a bicycle?"
          }
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
