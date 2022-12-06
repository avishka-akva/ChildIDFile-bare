import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import * as Progress from "react-native-progress";

import { globleStyles } from "../shared/style";
import CustomButton from "../components/CustomButton";
import PersonalInformation from "./PersonalInformation";
import PhysicalCharacteristics from "./PhysicalCharacteristics";
import DistinguishingCharacteristics from "./DistinguishingCharacteristics";
import MedicalInformation from "./MedicalInformation";
import EmergencyContact from "./EmergencyContact";
import TrustedContact from "./TrustedContact";
import UploadPhoto from "./UploadPhoto";
import Fingerprints from "./Fingerprints";

function AddChild({navigation}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(6);

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
});

export default AddChild;
