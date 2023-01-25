import { Text, View, Image, SafeAreaView } from "react-native";
import { globleStyles } from "../shared/style";
import BulletList from "../components/BulletList";
import CustomButton from "../components/CustomButton";
import { COLOR } from "../shared/const";
function Auth({ onAuthClick }) {
  const style = {
    color: "#707070",
    fontSize: 14,
    marginTop: 28,
    textAlign: "center",
    fontFamily: "Segoe-UI",
  };

  return (
    <SafeAreaView style={globleStyles.container}>
      <View
        style={{
          justifyContent: "flex-start",
          width: "100%",
          paddingHorizontal: 24,
        }}
      >
        <Text
          style={{
            color: "#434343",
            fontSize: 28,
            fontFamily: "SegoeUI-SemiBold",
            // backgroundColor: "red",
          }}
        >
          Welcome
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 24,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../assets/homeImage.png")}
        />
        <BulletList
          containerStyle={{ marginTop: 20 }}
          childStyle={{
            width: "95%",
            color: "#707070",
            fontSize: 14,
            fontFamily: "Segoe-UI",
          }}
          pointSize={14}
          pointColor="#707070"
          options={[
            "ChildIDFile helps you create an information file for each of your children, which can be easily shared.",
            "This file includes information that law enforcement may find useful in the immediate search for a missing child.",
            "The file can include up to 3 emergency contacts, 10 trusted contacts/locations, and other useful identifying features.",
          ]}
        />
        <Text style={style}>
          It is up to you how much to save and have ready. The data you enter
          and file you create lives on your phone or device only.
        </Text>
      </View>
      <View
        style={{
          padding: 24,
          paddingVertical: 18,
          marginTop: 28,
        }}
      >
        <CustomButton
          onPress={onAuthClick}
          text={"Authenticate"}
          backgroundColor={COLOR.primary}
          color="#FFFFFF"
        />
      </View>
    </SafeAreaView>
  );
}

export default Auth;
