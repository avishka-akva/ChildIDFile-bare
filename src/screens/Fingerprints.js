import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ImagePickerUI from "../components/ImagePicker";
import { Feather } from "@expo/vector-icons";

import { globleStyles } from "../shared/style";
import { setFingerPrint } from "../redux/childSlice";
import Card from "../components/Card";
import { COLOR } from "../shared/const";
import generatePdf from "../shared/pdf";

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
      <Text style={[globleStyles.body]}>
        Remember to use a high-resolution images and update it every 6 months.
      </Text>
      <ImagePickerUI
        image={fingerPrint}
        setImage={(uri) => dispatch(setFingerPrint(uri))}
        view={view}
        onBlur={onBlur}
        description="Upload a fingerPrint image of your child"
        aspectRatio={[16, 9]}
      />
      <Text style={[globleStyles.body, { marginTop: 40 }]}>
        Want to create the image for your child's fingerprints?
      </Text>
      <Card style={{ borderRadius: 2 }}>
        <View style={styles.downloadContainer}>
          <Text style={[globleStyles.body, { fontSize: 13, width: 250 }]}>
            Download blank PDF Fingerprint Card here to create your own image
          </Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => onDownlod()}
          >
            <Feather name="download" size={14} color={COLOR.primary} />
          </TouchableOpacity>
        </View>
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
  downloadContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
});

export default Fingerprints;
