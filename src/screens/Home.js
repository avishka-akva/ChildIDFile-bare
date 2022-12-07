import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import CustomButton from "../components/CustomButton";
import { globleStyles } from "../shared/style";

function Home({ navigation }) {
  const childrenList = useSelector((state) => state.childrenList);
  return (
    <SafeAreaView style={globleStyles.container}>
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>Welcome</Text>
        <View>
          <Text style={styles.childrenCount}>{childrenList.length}</Text>
        </View>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainTextContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  },
  childrenCount: {
    color: "#9B9B9B",
    fontSize: 36,
  },
});

export default Home;
