import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Modal, Text } from "react-native";
import * as Progress from "react-native-progress";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import { globleStyles } from "../shared/style";
import { toggleExit } from "../redux/childSlice";
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

function AddChild({ navigation }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { exit } = useSelector((state) => state.currentChild);
  const dispatch = useDispatch();
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
  };

  const previosStep = () => {
    if (!currentStepIndex) return;
    setCurrentStepIndex((previousValue) => --previousValue);
  };

  const renderStep = () => {
    const currentStep = steps[currentStepIndex];

    return currentStep.compnent;
  };

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
          color={"#A352EB"}
          borderColor={"#00000014"}
          borderRadius={8}
        />
      </View>
      {renderStep()}
      <View style={styles.footer}>
        {currentStepIndex > 0 && (
          <CustomButton
            onPress={() => previosStep()}
            text={"BACK"}
            buttonStyle={globleStyles.buttonOutLine}
            color="#000"
          />
        )}
        <View style={styles.divider}></View>
        {currentStepIndex !== steps.length - 1 ? (
          <CustomButton
            onPress={() => nextStep()}
            text={"NEXT"}
            buttonStyle={globleStyles.buttonPrimary}
          />
        ) : (
          <CustomButton
            onPress={() => navigation.goBack()}
            text={"DONE"}
            buttonStyle={globleStyles.buttonPrimary}
          />
        )}
      </View>
      <CustomModal transparent visible={exit}>
        <Text style={styles.exitModalText}>
          Are you sure, do you want to exit?
        </Text>
        <View style={styles.exitModalIcon}>
          <AntDesign name="exclamationcircleo" size={54} color="red" />
        </View>
        <View style={styles.exitModalFooter}>
          <CustomButton
            onPress={() => {
              dispatch(toggleExit());
            }}
            text={"No"}
            buttonStyle={[
              globleStyles.buttonOutLine,
              { borderColor: "#A352EB", width: 116, height: 36 },
            ]}
            color="#A352EB"
          />
          <CustomButton
            onPress={() => {
              dispatch(toggleExit());
              navigation.goBack();
            }}
            text={"Yes, Save"}
            buttonStyle={[
              globleStyles.buttonPrimary,
              { backgroundColor: "#A352EB", width: 116, height: 36 },
            ]}
            backgroundColor="#A352EB"
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
