import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import CustomButton from "../components/CustomButton";
import { globleStyles } from "../shared/style";

function Home({ navigation }) {
  return (
    <SafeAreaProvider style={globleStyles.container}>
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>Welcome</Text>
      </View>
      <View>
        <Image source={require("../assets/homeImage.png")} />
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do
          eiusmod tempor incididunt
        </Text>
      </View>
      <View>
        <CustomButton
          onPress={() => navigation.navigate("Add Child")}
          text={"Add Child"}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainTextContainer: {
    width: "100%",
  },
  mainText: {
    color: "#000",
    fontSize: 36,
  },
  description: {
    color: "#707070",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  }
});

export default Home;
