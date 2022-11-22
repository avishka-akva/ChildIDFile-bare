import { StyleSheet,ScrollView, Text, View } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { globleStyles } from "../shared/style";

function PersonalInformation() {
  return (
    <SafeAreaProvider style={globleStyles.container}>
      <ScrollView>
        <View>
          <Text>Personal Information</Text>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PersonalInformation