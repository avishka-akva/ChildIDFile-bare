import React, { useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  ScrollView,
  View,
  Text,
  // Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import * as Progress from "react-native-progress";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import uuid from "react-native-uuid";

import { globleStyles } from "../shared/style";
import { setChildSlice, cleanChildSlice } from "../redux/childSlice";
import {
  toggleExit,
  setUpdate,
  setView,
  setHederNameShow,
  setNextStep,
  setPreviosStep,
  setCurrentStepIndex,
} from "../redux/childManageSlice";
import {
  addChild,
  updateChild,
  saveIncompleteChild,
  finishIncompleteChild,
} from "../redux/childrenListSlice";
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
import { formatDate } from "../shared/date";

function ChildProfile({ navigation, route }) {
  const dispatch = useDispatch();
  const { currentChild, childrenList, childManage } = useSelector(
    (state) => state
  );
  const childId = route?.params?.childId;
  const _view = route?.params?.view;

  let { currentStepIndex } = childManage;
  const [editStarted, setEditStarted] = useState(false);

  const [errorList, setErrorList] = useState([]);

  const setEditStartedTrue = (index) => {
    if (!editStarted) {
      setEditStarted(true);
    }
  };

  const setEditStartedFalse = () => {
    if (editStarted) {
      setEditStarted(false);
    }
  };

  const addNameToErrorList = (name) => {
    setErrorList((previousValue) => [...previousValue, name]);
  };

  const removeNameFromErrorList = (name) => {
    setErrorList((previousValue) => previousValue.filter((n) => n !== name));
  };

  const getFieldValidation = (name) => {
    return errorList.includes(name);
  };

  const steps = [
    {
      required: true,
      compnent: (
        <PersonalInformation
          index={0}
          setEditStartedTrue={setEditStartedTrue}
          setEditStartedFalse={setEditStartedFalse}
          validate={getFieldValidation}
          removeNameFromErrorList={removeNameFromErrorList}
        />
      ),
      validation: () => {
        if (
          currentChild.firstName === "" ||
          currentChild.lastName === "" ||
          currentChild.dob === ""
        ) {
          if (!currentChild.firstName) addNameToErrorList("firstName");
          if (!currentChild.lastName) addNameToErrorList("lastName");
          if (!currentChild.dob) addNameToErrorList("dob");
          return false;
        }

        if (errorList.length) setErrorList([]);
        return true;
      },
    },
    {
      compnent: (
        <PhysicalCharacteristics
          index={1}
          setEditStartedTrue={setEditStartedTrue}
          setEditStartedFalse={setEditStartedFalse}
        />
      ),
    },
    {
      compnent: (
        <DistinguishingCharacteristics
          index={2}
          setEditStartedTrue={setEditStartedTrue}
          setEditStartedFalse={setEditStartedFalse}
        />
      ),
    },
    {
      compnent: (
        <UploadPhoto
          index={3}
          setEditStartedTrue={setEditStartedTrue}
          setEditStartedFalse={setEditStartedFalse}
        />
      ),
    },
    {
      compnent: (
        <MedicalInformation
          index={4}
          setEditStartedTrue={setEditStartedTrue}
          setEditStartedFalse={setEditStartedFalse}
        />
      ),
    },
    {
      compnent: (
        <EmergencyContact
          index={5}
          setEditStartedTrue={setEditStartedTrue}
          setEditStartedFalse={setEditStartedFalse}
        />
      ),
    },
    {
      compnent: (
        <TrustedContact
          index={6}
          setEditStartedTrue={setEditStartedTrue}
          setEditStartedFalse={setEditStartedFalse}
        />
      ),
    },
    {
      compnent: (
        <Fingerprints
          index={7}
          setEditStartedTrue={setEditStartedTrue}
          setEditStartedFalse={setEditStartedFalse}
        />
      ),
    },
  ];

  const getChildWithId = () => {
    const id = uuid.v4();
    const date = new Date();
    return {
      ...currentChild,
      id,
      lastEditDate: formatDate(date),
      lastEditTime: date.toLocaleTimeString(),
    };
  };

  const onFinished = () => {
    const date = new Date();
    if (childId) {
      if (currentChild.incomplete) {
        dispatch(
          finishIncompleteChild({
            ...currentChild,
            id: childId,
            lastEditDate: formatDate(date),
            lastEditTime: date.toLocaleTimeString(),
          })
        );
      } else {
        dispatch(
          updateChild({
            ...currentChild,
            id: childId,
            lastEditDate: formatDate(date),
            lastEditTime: date.toLocaleTimeString(),
          })
        );
      }
    } else {
      const newChild = getChildWithId();
      dispatch(addChild(newChild));
    }

    dispatch(cleanChildSlice());
    navigation.navigate("Home");
  };

  const nextStep = () => {
    if (currentStepIndex + 1 === steps.length) return;

    // return if isValid is false
    if (steps[currentStepIndex].validation) {
      const isValid = steps[currentStepIndex].validation();
      if (!isValid) return;
    }

    setEditStartedFalse();

    if (currentStepIndex === 0) dispatch(setHederNameShow(true));

    dispatch(setNextStep());

    if (childId) {
      const date = new Date();
      dispatch(
        updateChild({
          ...currentChild,
          id: childId,
          lastEditDate: formatDate(date),
          lastEditTime: date.toLocaleTimeString(),
        })
      );
    }
  };

  const previosStep = () => {
    if (!currentStepIndex) return;
    if (currentStepIndex === 1) dispatch(setHederNameShow(false));
    dispatch(setPreviosStep());
  };

  const renderStep = () => {
    const currentStep = steps[currentStepIndex];

    return currentStep.compnent;
  };

  const onExit = () => {
    dispatch(toggleExit());
    dispatch(setUpdate(false));
    dispatch(setView(false));
    dispatch(cleanChildSlice());
    dispatch(setCurrentStepIndex(0));
    if (!childId && currentStepIndex !== 0) {
      const newChild = getChildWithId();
      dispatch(saveIncompleteChild(newChild));
    }
    navigation.navigate("Home");
  };

  useEffect(() => {
    dispatch(setHederNameShow(false));
    if (childId) {
      const childObj = childrenList.find((child) => child.id === childId);
      dispatch(setChildSlice(childObj));
      console.log("???? ~ file: ChildProfile.js:278 ~ useEffect ~ _view:", _view)
      if (_view) {
        dispatch(setView(true));
      } else {
        dispatch(setUpdate(true));
        setEditStartedFalse();
      }
    }

    if (Platform.OS !== "ios") {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          dispatch(toggleExit());
          return true;
        }
      );
      return () => {
        backHandler.remove();
      };
    }
    // else {
    // when keybord open in ios bottom navigation is auto hiding,
    // that's why these two addListener have been used(to show navigation).
    // const keyboardDidShowSubscription = Keyboard.addListener(
    //   "keyboardDidShow",
    //   () => {
    //     setShowFooter(false);
    //   }
    // );
    // const keyboardDidHideSubscription = Keyboard.addListener(
    //   "keyboardDidHide",
    //   () => {
    //     setShowFooter(true);
    //   }
    // );
    // return () => {
    //   keyboardDidShowSubscription?.remove();
    //   keyboardDidHideSubscription?.remove();
    // };
    // }
  }, []);

  const progress = (currentStepIndex + 1) / steps.length;

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          width: "100%",
          paddingHorizontal: 18,
          backgroundColor: "#fff",
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        // keyboardDismissMode="on-drag"
      >
        <View style={styles.progressBarContainer}>
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
          <Text style={styles.progressBarText}>
            {currentStepIndex + 1}/{steps.length}
          </Text>
        </View>

        {renderStep()}

        {/* {Platform.OS === "ios" && !showFooter && ( */}
        {false && (
          <View
            style={[
              styles.footer,
              { paddingBottom: 100, paddingHorizontal: 0 },
            ]}
          >
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
                text={
                  childId
                    ? childManage.view
                      ? "Continue"
                      : editStarted
                      ? "Save & Continue"
                      : "Continue"
                    : editStarted
                    ? "Save & Proceed"
                    : steps[currentStepIndex].required
                    ? "Next Section"
                    : "Skip to Next Section"
                }
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
        )}

        <CustomModal
          transparent
          visible={childManage.exit}
          onClose={() => {
            dispatch(toggleExit());
          }}
        >
          <View style={[globleStyles.rowCenter, { marginBottom: 28 }]}>
            <AntDesign
              name="exclamationcircleo"
              size={26}
              color={COLOR.primary}
              style={{ marginRight: 18 }}
            />
            <Text style={globleStyles.modalText}>
              Are you sure, do you want to exit?
            </Text>
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
              text={
                childManage.view || currentStepIndex === 0 ? "Yes" : "Yes, Save"
              }
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

      {/* this View auto hide on ios */}
      {true && (
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
              text={
                childId
                  ? childManage.view
                    ? "Continue"
                    : editStarted
                    ? "Save & Continue"
                    : "Continue"
                  : editStarted
                  ? "Save & Proceed"
                  : steps[currentStepIndex].required
                  ? "Next Section"
                  : "Skip to Next Section"
              }
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
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  progressBarContainer: {
    flexDirection: "row",
    marginVertical: 22,
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
  },
  progressBarText: {
    marginLeft: 6,
    fontSize: 12,
  },
  footer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: 22,
    paddingHorizontal: 18,
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

export default ChildProfile;
