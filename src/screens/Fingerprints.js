import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ImagePickerUI from "../components/ImagePicker";
import { Feather } from "@expo/vector-icons";

import { globleStyles } from "../shared/style";
import { setFingerPrint } from "../redux/childSlice";
import Card from "../components/Card";
import { COLOR } from "../shared/const";
import generatePdf from "../shared/pdf";
import BulletList from "../components/BulletList";

function Fingerprints({ index, setEditStartedTrue }) {
  const { fingerPrint } = useSelector((state) => state.currentChild);
  const { view } = useSelector((state) => state.childManage);
  const dispatch = useDispatch();

  const onBlur = () => {
    setEditStartedTrue(index);
  };

  const onDownlod = (id) => {
    generatePdf("finger");
  };

  return (
    <View style={styles.main}>
      <Text style={[globleStyles.title, styles.title]}>Fingerprints</Text>
      <Text style={[globleStyles.body, { color: "#3F3F3F" }]}>
        Want to create the image for your child's fingerprints?
      </Text>
      <BulletList
        containerStyle={{ marginTop: 5, marginBottom: 15 }}
        childStyle={{
          width: "95%",
          color: "#9B9B9B",
          fontSize: 12,
          fontFamily: "Segoe-UI",
        }}
        center
        pointSize={12}
        pointColor="#9B9B9B"
        options={[
          "Download and print the fingerprint card",
          "Place the child's fingerprint on the printed card",
          "Take a high resolution image of the card with fingerprints",
        ]}
      />
      <Pressable onPress={() => onDownlod()}>
        <Card>
          <View style={styles.downloadContainer}>
            <Text style={[globleStyles.body, styles.downloadText]}>
              Download blank PDF Fingerprint Card here to create your own image
            </Text>
            <View style={styles.iconContainer}>
              <Feather name="download" size={14} color={COLOR.primary} />
            </View>
          </View>
        </Card>
      </Pressable>

      <Text style={[globleStyles.body, { marginTop: 30, color: "#3F3F3F" }]}>
        Do you have an image of your child's fingerprints?
      </Text>
      <ImagePickerUI
        image={fingerPrint}
        setImage={(uri) => dispatch(setFingerPrint(uri))}
        view={view}
        onBlur={onBlur}
        description="Upload Fingerprint Image Here"
        aspectRatio={[16, 9]}
        finger
      />
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
  downloadContainer: {
    alignItems: "center",
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLOR.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  downloadText: {
    fontSize: 13,
    width: 250,
    textAlign: "center",
    marginBottom: 14,
  },
});

export default Fingerprints;
