import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
function Home({ navigation }) {
  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>Welcome</Text>
      </View>
      <View>
        <Image source={require("../assets/homeImage.png")} />
        <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Personal Information')}>
          <Text style={styles.buttonText}>Add Child</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    margin: 32,
  },
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
  },
  button: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    padding: 24,
    width: 136,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
  },
});

export default Home;
