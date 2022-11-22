import { StyleSheet, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { globleStyles } from "../shared/style";

function AddChild() {
  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View>
          <Text style={globleStyles.title}>Personal Information</Text>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 18,
  },
  progressBar: {
    marginVertical: 22,
  },
});

export default AddChild;
