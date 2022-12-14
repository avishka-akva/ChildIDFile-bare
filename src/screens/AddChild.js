import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Modal, Text } from "react-native";
import * as Progress from "react-native-progress";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import uuid from "react-native-uuid";

import { globleStyles } from "../shared/style";
import { setChildSlice, cleanChildSlice } from "../redux/childSlice";
import { toggleExit, setUpdate } from "../redux/childManageSlice";
import { addChild, updateChild } from "../redux/childrenListSlice";
import CustomButton from "../components/CustomButton";
import PersonalInformation from "./PersonalInformation";
import PhysicalCharacteristics from "./PhysicalCharacteristics";
import DistinguishingCharacteristics from "./DistinguishingCharacteristics";
import MedicalInformation from "./MedicalInformation";
import EmergencyContact from "./EmergencyContact";
import TrustedContact from "./TrustedContact";
import UploadPhoto from "./UploadPhoto";
import Fingerprints from "./Fingerprints";
import CustomModal from "../components/CustomModal";
import { COLOR } from "../shared/const";

function AddChild({ navigation, route }) {
  const dispatch = useDispatch();
  const { currentChild, childrenList, childManage } = useSelector(
    (state) => state
  );
  const childId = route?.params?.childId;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    {
      compnent: <PersonalInformation />,
    },
    {
      compnent: <PhysicalCharacteristics />,
    },
    {
      compnent: <DistinguishingCharacteristics />,
    },
    {
      compnent: <MedicalInformation />,
    },
    {
      compnent: <EmergencyContact />,
    },
    {
      compnent: <TrustedContact />,
    },
    {
      compnent: <UploadPhoto />,
    },
    {
      compnent: <Fingerprints />,
    },
  ];

  const nextStep = () => {
    if (currentStepIndex + 1 === steps.length) return;
    setCurrentStepIndex((previousValue) => ++previousValue);
    if (childId) {
      dispatch(updateChild({ ...currentChild, id: childId }));
    }
  };

  const onFinished = () => {
    if (childId) {
      dispatch(updateChild({ ...currentChild, id: childId }));
    } else {
      const id = uuid.v4();
      const newChild = { ...currentChild, id };
      dispatch(addChild(newChild));
    }

    dispatch(cleanChildSlice());
    navigation.navigate("Home");
  };

  const previosStep = () => {
    if (!currentStepIndex) return;
    setCurrentStepIndex((previousValue) => --previousValue);
  };

  const renderStep = () => {
    const currentStep = steps[currentStepIndex];

    return currentStep.compnent;
  };

  const onExit = () => {
    dispatch(toggleExit());
    dispatch(setUpdate(false));
    dispatch(cleanChildSlice());
    navigation.navigate("Home");
  };

  useEffect(() => {
    dispatch(setUpdate(true));
    if (childId) {
      const childObj = childrenList.find((child) => child.id === childId);
      dispatch(setChildSlice(childObj));
    }
  }, []);

  const progress = (currentStepIndex + 1) / steps.length;

  return (
    <ScrollView
      style={{ width: "100%", paddingHorizontal: 18, backgroundColor: "#fff" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.progressBar}>
        <Progress.Bar
          progress={progress}
          width={null}
          height={9}
          color={COLOR.primary}
          borderColor={"#00000014"}
          borderRadius={8}
        />
      </View>
      {renderStep()}
      <View style={styles.footer}>
        {currentStepIndex > 0 && (
          <CustomButton
            onPress={() => previosStep()}
            text={"Back to Previous Section"}
            buttonStyle={globleStyles.buttonOutLine}
            color="#000"
            fontSize={12}
          />
        )}
        <View style={styles.divider}></View>
        {currentStepIndex !== steps.length - 1 ? (
          <CustomButton
            onPress={() => nextStep()}
            text={"Skip to Next Section"}
            buttonStyle={globleStyles.buttonPrimary}
            fontSize={12}
          />
        ) : (
          <CustomButton
            onPress={onFinished}
            text={"DONE"}
            buttonStyle={globleStyles.buttonPrimary}
            fontSize={12}
          />
        )}
      </View>
      <CustomModal transparent visible={childManage.exit}>
        <Text style={globleStyles.modalText}>
          Are you sure, do you want to exit?
        </Text>
        <View style={globleStyles.modalIcon}>
          <AntDesign name="exclamationcircleo" size={54} color="red" />
        </View>
        <View style={globleStyles.modalFooter}>
          <CustomButton
            onPress={() => {
              dispatch(toggleExit());
            }}
            text={"No"}
            buttonStyle={[
              globleStyles.buttonOutLine,
              { borderColor: COLOR.primary, width: 116, height: 36 },
            ]}
            color={COLOR.primary}
          />
          <CustomButton
            onPress={onExit}
            text={"Yes, Save"}
            buttonStyle={[
              globleStyles.buttonPrimary,
              { backgroundColor: COLOR.primary, width: 116, height: 36 },
            ]}
            backgroundColor={COLOR.primary}
            color="#FFFFFF"
          />
        </View>
      </CustomModal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  progressBar: {
    marginVertical: 22,
  },
  footer: {
    flexDirection: "row",
    marginVertical: 22,
  },
  main: {
    flex: 1,
  },
  divider: {
    flex: 1,
  },
  exitModalFooter: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  exitModalText: {
    color: "#434343",
    fontSize: 16,
  },
  exitModalIcon: {
    marginVertical: 33,
  },
});

export default AddChild;
