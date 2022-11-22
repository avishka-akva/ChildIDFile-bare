import { StyleSheet, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";

import { globleStyles } from "../shared/style";

function AddChild() {
  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.progressBar}>
          <Progress.Bar
            progress={0.3}
            width={null}
            height={9}
            color={"#A352EB"}
            borderColor={"#00000014"}
            borderRadius={8}
          />
        </View>
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
