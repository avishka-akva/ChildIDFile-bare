import { Text, View, Image, SafeAreaView } from "react-native";
import { globleStyles } from "../shared/style";
import BulletList from "../components/BulletList";
import CustomButton from "../components/CustomButton";
import { COLOR } from "../shared/const";
import { Fontisto } from "@expo/vector-icons";

function Auth({ onAuthClick, securityLevel }) {
  const style = {
    color: "#707070",
    fontSize: 14,
    marginTop: 28,
    textAlign: "center",
    fontFamily: "Segoe-UI",
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        // justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        // margin: 32,
      }}
    >
      <View
        style={{
          justifyContent: "flex-start",
          width: "100%",
          paddingHorizontal: 24,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 36,
        }}
      >
        <Fontisto
          style={{ marginBottom: 8 }}
          name="locked"
          size={32}
          color={COLOR.primary}
        />
        <Text
          style={{
            color: "#434343",
            fontSize: 18,
            fontFamily: "SegoeUI-SemiBold",
            // backgroundColor: "red",
          }}
        >
          ChildIDFile Locked
        </Text>
      </View>
      <View
        style={{
          padding: 24,
          paddingVertical: 18,
          marginTop: 28,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "#707070",
            fontSize: 12,
            fontFamily: "SegoeUI-SemiBold",
            marginBottom: 8,
          }}
        >
          {securityLevel === 1
            ? "Use PIN, Pattern or Password to Authenticate"
            : securityLevel === 2
            ? "Use Fingerprint or FaceID to Authenticate"
            : ""}
        </Text>
        <CustomButton
          onPress={onAuthClick}
          text={"Unlock"}
          backgroundColor={COLOR.primary}
          color="#FFFFFF"
          buttonWidth={100}
        />
      </View>
    </SafeAreaView>
  );
}

export default Auth;
